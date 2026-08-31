// src/client.ts
import { GraphQLClient, ClientError } from "graphql-request";

// src/errors.ts
var AmrodApiException = class extends Error {
  statusCode;
  graphQlErrors;
  constructor(message, statusCode, graphQlErrors = [], options) {
    super(message, options);
    this.name = "AmrodApiException";
    this.statusCode = statusCode;
    this.graphQlErrors = graphQlErrors;
  }
};
var AmrodAuthenticationException = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "AmrodAuthenticationException";
  }
};

// src/logger.ts
var noopLogger = {
  debug: () => {
  },
  info: () => {
  },
  warn: () => {
  },
  error: () => {
  }
};
var consoleLogger = {
  debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
  info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
  warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
  error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args)
};

// src/client.ts
var GraphQlSdkClient = class {
  constructor(options) {
    this.options = options;
    if (!options.endpoint?.trim()) {
      throw new Error("options.endpoint is required.");
    }
    this.logger = options.logger ?? noopLogger;
  }
  options;
  logger;
  async execute(query, variables) {
    let token;
    try {
      token = await this.options.authProvider?.getAccessToken();
    } catch (err) {
      if (err instanceof AmrodAuthenticationException) {
        throw err;
      }
      this.logger.error(
        `Failed to acquire access token for endpoint ${this.options.endpoint}`,
        err
      );
      throw new AmrodAuthenticationException(
        "Failed to acquire access token.",
        { cause: err }
      );
    }
    const impersonation = await this.options.impersonationProvider?.getImpersonationHeader();
    const client = new GraphQLClient(
      this.options.endpoint,
      {
        headers: {
          ...token && {
            Authorization: `Bearer ${token}`
          },
          ...impersonation && {
            "x-gateway-impersonate": impersonation
          }
        }
      }
    );
    this.logger.debug(`Sending GraphQL request to ${this.options.endpoint}`);
    try {
      return await client.request(query, variables);
    } catch (err) {
      if (err instanceof ClientError) {
        const messages = err.response.errors?.map((e) => e.message) ?? [];
        if (messages.length > 0) {
          for (const message of messages) {
            this.logger.warn(
              `GraphQL error returned from ${this.options.endpoint}: ${message}`
            );
          }
          throw new AmrodApiException(
            `GraphQL errors: ${messages.join("; ")}`,
            err.response.status,
            messages,
            { cause: err }
          );
        }
        this.logger.error(
          `Gateway request to ${this.options.endpoint} failed with status ${err.response.status}`,
          err
        );
        throw new AmrodApiException(
          `Gateway request failed with status ${err.response.status}.`,
          err.response.status,
          [],
          { cause: err }
        );
      }
      this.logger.error(
        `Network error while calling gateway at ${this.options.endpoint}`,
        err
      );
      throw new AmrodApiException(
        "Network error while calling the gateway.",
        void 0,
        [],
        { cause: err }
      );
    }
  }
};

// src/apis/viewer-api.ts
var ViewerApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  async getViewer() {
    const query = `
      query Viewer {
        viewer {
          identity
          identityType
          customer {
            code
            name
          }
          customerContact {
            id
            code
            emailAddress
            firstName
            lastName
          }
          impersonationScope {
            code
            name
            customerContacts {
              id
              code
              emailAddress
              firstName
              lastName
            }
          }
        }
      }
    `;
    const response = await this.client.execute(query);
    return response.viewer;
  }
};

// src/apis/sales-orders-api.ts
var SalesOrdersApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  async getByNumber(salesOrderNumber) {
    const query = `
      query GetSalesOrderByNumber($salesOrderNumber: String!) {
        salesOrders(
          where: {
            salesOrderNumber: {
              eq: $salesOrderNumber
            }
          }
          first: 1
        ) {
          totalCount
          nodes {
            id
            salesOrderNumber
            customerReference
            orderDate
            status
            totalExcl
            tax
            balanceOutstanding
            isPaid
            isActive
            customer {
              id
              name
              code
            }
            contact {
              fullName
              emailAddress
              telephoneNumber
            }
            salesOrderDetails {
              rowNumber
              sku
              quantity
              unitPriceExcl
              lineTotalExcl
            }
          }
        }
      }
    `;
    const response = await this.client.execute(query, {
      salesOrderNumber
    });
    return response.salesOrders.nodes[0] ?? null;
  }
  async getById(id) {
    const query = `
      query GetSalesOrderById($id: ID!) {
        salesOrder(id: $id) {
          id salesOrderNumber customerReference orderDate status totalExcl tax balanceOutstanding isPaid isActive lastModifiedDate
          customer { id name code } contact { fullName emailAddress }
        }
      }
    `;
    const response = await this.client.execute(
      query,
      { id }
    );
    return response.salesOrder;
  }
  async list(first = 20, after, before) {
    const query = `
      query ListSalesOrders($first: Int, $after: String, $before: String) {
        salesOrders(first: $first, after: $after, before: $before) {
          totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          edges { cursor node { id salesOrderNumber customerReference orderDate status totalExcl isPaid } }
        }
      }
    `;
    return this.executeConnection(query, { first, after, before });
  }
  async getWithJobCards(salesOrderNumber) {
    const query = `
      query GetSalesOrderWithJobCards($salesOrderNumber: String!) {
        salesOrders(where: { salesOrderNumber: { eq: $salesOrderNumber } }, first: 1) {
          nodes { id salesOrderNumber customerReference orderDate status totalExcl tax customer { id name code }
            contact { fullName emailAddress } salesOrderDetails { rowNumber sku quantity unitPriceExcl lineTotalExcl }
            jobCards { id jobCardNumber status created isActive lastModifiedDate
              jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement brandingSizeWidth brandingSizeHeight logo colors }
              jobCardDate { actionDate dueDate leadTime } }
          }
        }
      }
    `;
    const response = await this.client.execute(query, { salesOrderNumber });
    return response.salesOrders.nodes[0] ?? null;
  }
  async executeConnection(query, variables) {
    const response = await this.client.execute(query, variables);
    return response.salesOrders ?? {
      totalCount: 0,
      pageInfo: {},
      edges: [],
      nodes: []
    };
  }
};

// src/apis/credit-notes-api.ts
var CreditNotesApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  async getById(id) {
    const query = `
      query GetCreditNoteById($id: ID!) {
        creditNote(id: $id) { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId }
      }
    `;
    const response = await this.client.execute(
      query,
      { id }
    );
    return response.creditNote;
  }
  async getByNumber(creditNoteNumber) {
    const query = `
      query GetCreditNoteByNumber($creditNoteNumber: String!) {
        creditNotes(where: { creditNoteNumber: { eq: $creditNoteNumber } }, first: 1) {
          totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
        }
      }
    `;
    const response = await this.client.execute(query, { creditNoteNumber });
    return response.creditNotes?.nodes[0] ?? null;
  }
  async list(first = 20, after, before) {
    const query = `
      query ListCreditNotes($first: Int, $after: String, $before: String) {
        creditNotes(first: $first, after: $after, before: $before) {
          totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax } }
        }
      }
    `;
    return this.executeConnection(query, { first, after, before });
  }
  async getBySalesOrderNumber(salesOrderNumber) {
    const query = `
      query GetCreditNotesBySalesOrderNumber($salesOrderNumber: String!) {
        creditNotes(first: 100, where: { salesOrder: { salesOrderNumber: { eq: $salesOrderNumber } } }) {
          totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax creditNoteDetails { sku quantity } } }
        }
      }
    `;
    return this.executeConnection(query, { salesOrderNumber });
  }
  async getByDateRange(startDate, endDate) {
    const query = `
      query GetCreditNotesByDateRange($startDate: DateTime!, $endDate: DateTime!) {
        creditNotes(first: 100, where: { creditNoteDate: { gte: $startDate, lte: $endDate } }) {
          totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax creditNoteDetails { sku quantity } }
        }
      }
    `;
    return this.executeConnection(query, { startDate, endDate });
  }
  async executeConnection(query, variables) {
    const response = await this.client.execute(query, variables);
    return response.creditNotes ?? {
      totalCount: 0,
      pageInfo: {},
      edges: [],
      nodes: []
    };
  }
};

// src/apis/job-cards-api.ts
var JobCardsApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  async getById(id) {
    const query = `
      query GetJobCardById($id: ID!) {
        jobCard(id: $id) { id jobCardNumber status created isActive lastModifiedDate
          salesOrder { salesOrderNumber }
          jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement logo colors brandingSizeWidth brandingSizeHeight }
          jobCardDate { actionDate dueDate leadTime }
        }
      }
    `;
    const response = await this.client.execute(
      query,
      { id }
    );
    return response.jobCard;
  }
  async getByNumber(jobCardNumber) {
    const connection = await this.getByNumberConnection(
      jobCardNumber,
      `
        jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement logo colors brandingSizeWidth brandingSizeHeight foilColor siliconeColor vinylColor }
        jobCardDate { actionDate dueDate leadTime }
        jobCardAssets { id name type url assetId }
      `
    );
    return connection.nodes[0] ?? null;
  }
  async getWithAssetsAndProofs(jobCardNumber) {
    const connection = await this.getByNumberConnection(
      jobCardNumber,
      `
        jobCardBrandingDetail { brandingCode brandingPosition logo colors brandingSizeWidth brandingSizeHeight }
        jobCardDate { actionDate dueDate leadTime }
        jobCardAssets { id name type url assetId }
        jobCardProofs { id url version numberOfOptions jobCardProofOptions { number isRecommended pageRange } }
        jobCardDetail { sku quantity }
        salesOrder { salesOrderNumber customerReference status }
      `
    );
    return connection.nodes[0] ?? null;
  }
  async getBySalesOrderNumber(salesOrderNumber) {
    const query = `
      query GetJobCardsBySalesOrderNumber($salesOrderNumber: String!) {
        jobCards(first: 100, where: { salesOrder: { salesOrderNumber: { eq: $salesOrderNumber } } }) {
          totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          edges { cursor node { id jobCardNumber status created isActive
            jobCardBrandingDetail { brandingCode brandingPosition logo colors brandingSizeWidth brandingSizeHeight foilColor siliconeColor vinylColor }
            jobCardDate { actionDate dueDate leadTime } jobCardAssets { name type url } jobCardDetail { sku quantity }
          } }
        }
      }
    `;
    return this.executeConnection(query, { salesOrderNumber });
  }
  async list(first = 20, after, before) {
    const query = `
      query ListJobCards($first: Int, $after: String, $before: String) {
        jobCards(first: $first, after: $after, before: $before) {
          totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          edges { cursor node { id jobCardNumber status created isActive jobCardBrandingDetail { brandingCode logo } jobCardDate { dueDate leadTime } } }
        }
      }
    `;
    return this.executeConnection(query, { first, after, before });
  }
  async getByNumberConnection(jobCardNumber, selection) {
    const query = `
      query GetJobCardByNumber($jobCardNumber: String!) {
        jobCards(where: { jobCardNumber: { eq: $jobCardNumber } }, first: 1) {
          totalCount nodes { id jobCardNumber status created isActive salesOrder { salesOrderNumber customerReference status } ${selection} }
        }
      }
    `;
    return this.executeConnection(query, { jobCardNumber });
  }
  async executeConnection(query, variables) {
    const response = await this.client.execute(query, variables);
    return response.jobCards ?? {
      totalCount: 0,
      pageInfo: {},
      edges: [],
      nodes: []
    };
  }
};

// src/models/order.ts
function toPlaceOrderInput(request) {
  const { salesOrderNumber, ...rest } = request;
  return { orderNumber: salesOrderNumber, ...rest };
}

// src/apis/order-entry-api.ts
var PLACE_ORDER_MUTATION = `
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      errors { __typename ... on BadRequestException { message } ... on ConflictException { message }
        ... on InputValidationException { message } ... on ServerError { message } }
      placeOrderPayloadType { orders { leadTimeInDays leadTimeInHours orderDate orderNumber salesOrderNumber totalExcl
        details { id items { name quantity sku unitPrice } branding { brandingCode brandingPosition brandingUnitPriceExcl description dyeChargeExcl dyeChargeName printQuantity setupChargeCode setupChargeExcl } } }
        warnings { code message warningType } }
    }
  }
`;
var OrderEntryApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  placeOrder(request) {
    return this.executeOrder(toPlaceOrderInput(request), request.options.validateOnly);
  }
  validateOrder(request) {
    return this.executeOrder(toPlaceOrderInput(request), true);
  }
  executeOrder(input, validateOnly) {
    const variables = {
      input: {
        ...input,
        options: { ...input.options, validateOnly }
      }
    };
    return this.client.execute(
      PLACE_ORDER_MUTATION,
      variables
    );
  }
};

// src/apis/job-card-workflow-api.ts
var JobCardWorkflowApi = class {
  constructor(client) {
    this.client = client;
  }
  client;
  approve(input) {
    const query = `
      mutation ApproveJobCard($input: ApproveJobCardInput!) {
        approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;
    return this.client.execute(query, { input });
  }
  updateBranding(input) {
    const query = `
      mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
        updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;
    return this.client.execute(query, { input });
  }
  requestChange(input) {
    const query = `
      mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
        requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;
    return this.client.execute(query, { input });
  }
};

// src/auth/jwt-auth-provider.ts
var JwtAuthProvider = class {
  constructor(token) {
    this.token = token;
    if (!token?.trim()) {
      throw new Error("token is required.");
    }
  }
  token;
  async getAccessToken() {
    return this.token;
  }
};

// src/auth/gateway-impersonation-provider.ts
var GatewayImpersonationProvider = class {
  constructor(contactId, customerCode) {
    this.contactId = contactId;
    this.customerCode = customerCode;
    if (!contactId?.trim()) {
      throw new Error("contactId is required.");
    }
    if (!customerCode?.trim()) {
      throw new Error("customerCode is required.");
    }
  }
  contactId;
  customerCode;
  async getImpersonationHeader() {
    return Buffer.from(
      `${this.contactId};${this.customerCode}`
    ).toString("base64");
  }
};

// src/auth/oath-client-credentials-provider.ts
var OAuthClientCredentialsProvider = class {
  constructor(tokenUrl, clientId, username, secret, logger) {
    this.tokenUrl = tokenUrl;
    this.clientId = clientId;
    this.username = username;
    this.secret = secret;
    if (!tokenUrl?.trim()) {
      throw new Error("tokenUrl is required.");
    }
    if (!clientId?.trim()) {
      throw new Error("clientId is required.");
    }
    if (!username?.trim()) {
      throw new Error("username is required.");
    }
    if (!secret?.trim()) {
      throw new Error("secret is required.");
    }
    this.logger = logger ?? noopLogger;
  }
  tokenUrl;
  clientId;
  username;
  secret;
  token;
  expiresAt;
  logger;
  async getAccessToken() {
    if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
      return this.token;
    }
    const clientSecret = Buffer.from(
      `${this.username}:${this.secret}`
    ).toString("base64");
    this.logger.debug(`Requesting OAuth token from ${this.tokenUrl}`);
    let response;
    try {
      response = await fetch(this.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: clientSecret,
          scope: "amrod.integration amrod.gateway"
        })
      });
    } catch (err) {
      this.logger.error(`OAuth token request to ${this.tokenUrl} failed`, err);
      throw new AmrodAuthenticationException(
        "Failed to reach the OAuth token endpoint.",
        { cause: err }
      );
    }
    this.logger.debug(`OAuth token response status: ${response.status}`);
    if (!response.ok) {
      this.logger.error(
        `OAuth token request failed with status ${response.status}`
      );
      throw new AmrodAuthenticationException(
        `OAuth token request failed (${response.status}).`
      );
    }
    let json;
    try {
      json = await response.json();
    } catch (err) {
      this.logger.error("Failed to deserialize OAuth token response", err);
      throw new AmrodAuthenticationException(
        "Failed to deserialize the OAuth token response.",
        { cause: err }
      );
    }
    if (!json?.access_token) {
      this.logger.error("OAuth token response did not contain an access token");
      throw new AmrodAuthenticationException(
        "OAuth token response did not contain an access token."
      );
    }
    this.token = json.access_token;
    this.expiresAt = Date.now() + (json.expires_in - 60) * 1e3;
    this.logger.info(
      `OAuth token acquired, expires in ${json.expires_in} seconds`
    );
    return this.token;
  }
};

// src/index.ts
var AmrodSdk = class {
  viewer;
  salesOrders;
  creditNotes;
  jobCards;
  orders;
  jobCardWorkflow;
  constructor(options) {
    const client = new GraphQlSdkClient(options);
    this.viewer = new ViewerApi(client);
    this.salesOrders = new SalesOrdersApi(client);
    this.creditNotes = new CreditNotesApi(client);
    this.jobCards = new JobCardsApi(client);
    this.orders = new OrderEntryApi(client);
    this.jobCardWorkflow = new JobCardWorkflowApi(client);
  }
};
export {
  AmrodApiException,
  AmrodAuthenticationException,
  AmrodSdk,
  GatewayImpersonationProvider,
  GraphQlSdkClient,
  JwtAuthProvider,
  OAuthClientCredentialsProvider,
  consoleLogger,
  noopLogger,
  toPlaceOrderInput
};
