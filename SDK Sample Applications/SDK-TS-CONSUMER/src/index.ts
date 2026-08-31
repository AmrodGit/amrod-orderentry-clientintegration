import "dotenv/config";
import {
  AmrodSdk,
  OAuthClientCredentialsProvider,
  GatewayImpersonationProvider,
  AmrodApiException,
  AmrodAuthenticationException,
  consoleLogger,
  PlaceOrderRequest,
} from "@amrod/sdk-ts";

async function run(): Promise<void> {
  const graphQlUrl = requireEnv("AMROD_GRAPHQL_ENDPOINT");
  const tokenUrl = requireEnv("AMROD_TOKEN_URL");
  const clientId = requireEnv("AMROD_CLIENT_ID");
  const username = requireEnv("AMROD_USERNAME");
  const secret = requireEnv("AMROD_SECRET");

  const authProvider = new OAuthClientCredentialsProvider(
    tokenUrl,
    clientId,
    username,
    secret,
    consoleLogger
  );

  const sdk = new AmrodSdk({
    endpoint: graphQlUrl,
    authProvider,
    logger: consoleLogger,
  });

  const token = await authProvider.getAccessToken();

  if (!token) {
    throw new AmrodAuthenticationException(
      "No token received from the OAuth provider."
    );
  }

  console.log("Token acquired successfully");
  console.log("Loading viewer...");

  const viewer = await sdk.viewer.getViewer();

  console.log(`Identity     : ${viewer.identity}`);
  console.log(`Identity Type: ${viewer.identityType}`);

  if (viewer.customer) {
    console.log(`Customer     : ${viewer.customer.code} - ${viewer.customer.name}`);
  }

  console.log();
  console.log("Impersonation Scope:");

  if (viewer.impersonationScope.length === 0) {
    console.log("  (No impersonation scope available)");
    return;
  }

  for (const scope of viewer.impersonationScope) {
    console.log(`  Customer: ${scope.code} - ${scope.name}`);

    for (const contact of scope.customerContacts) {
      console.log(
        `    Contact: ${contact.id} | ${contact.code} | ${contact.emailAddress}`
      );
    }
  }

  const firstScope = viewer.impersonationScope[0];
  const firstContact = firstScope.customerContacts[0];

  const sdkWithImpersonation = new AmrodSdk({
    endpoint: graphQlUrl,
    authProvider: new OAuthClientCredentialsProvider(
      tokenUrl,
      clientId,
      username,
      secret,
      consoleLogger
    ),
    impersonationProvider: new GatewayImpersonationProvider(
      firstContact.id,
      firstScope.code
    ),
    logger: consoleLogger,
  });

  console.log();
  console.log("Loading sales order...");

  const salesOrder = await sdkWithImpersonation.salesOrders.getByNumber(
    "SO06273610"
  );

  if (!salesOrder) {
    console.log("Sales order not found");

    // Place a new order since the sales order was not found
    const request: PlaceOrderRequest = {
      salesOrderNumber: "CUSTOMER-ORDER-0001",
      options: {
        orderType: "STANDARD",
        validateOnly: false,
        applyInclusiveBranding: false,
      },
      collection: {
        collectionType: "COLLECTION_HEAD_OFFICE",
      },
      contact: {
        notifications: {
          order: {
            firstName: "Jane",
            lastName: "Customer",
            email: "jane.customer@example.com",
            contactNumber: "+27110000000",
          },
        },
      },
      details: [
        {
          id: "GROUP-1",
          items: [{ sku: "SKU-001", quantity: 10, price: 25.0 }],
        },
      ],
    };

    const orderResponse = await sdkWithImpersonation.orders.placeOrder(request);

    for (const error of orderResponse.errors) {
      console.warn(`Order error: ${error.message}`);
    }

    for (const order of orderResponse.placeOrderPayloadType?.orders ?? []) {
      console.log(`Created sales order: ${order.salesOrderNumber}`);
      console.log(`Order number       : ${order.orderNumber}`);
      console.log(`Total excl         : ${order.totalExcl}`);
    }
  } else {
    console.log(`Order Number : ${salesOrder.salesOrderNumber}`);
    console.log(`Status       : ${salesOrder.status}`);
    console.log(`Customer Ref : ${salesOrder.customerReference}`);
    console.log(`Total Excl   : ${salesOrder.totalExcl}`);
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured. Copy .env.example to .env and fill in real values.`);
  }

  return value;
}

run().catch((err) => {
  if (err instanceof AmrodAuthenticationException) {
    console.error("Authentication failed:", err.message);
  } else if (err instanceof AmrodApiException) {
    console.error(
      `Gateway request failed (status ${err.statusCode ?? "unknown"}):`,
      err.graphQlErrors.join("; ") || err.message
    );
  } else {
    console.error("Unexpected error running the sample:", err);
  }

  process.exitCode = 1;
});
