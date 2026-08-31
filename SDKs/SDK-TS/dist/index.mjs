// src/client.ts
import { GraphQLClient } from "graphql-request";
var GraphQlSdkClient = class {
  constructor(options) {
    this.options = options;
  }
  async execute(query, variables) {
    const token = await this.options.authProvider?.getAccessToken();
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
    return client.request(
      query,
      variables
    );
  }
};

// src/apis/viewer-api.ts
var ViewerApi = class {
  constructor(client) {
    this.client = client;
  }
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
};

// src/index.ts
var AmrodSdk = class {
  constructor(options) {
    const client = new GraphQlSdkClient(options);
    this.viewer = new ViewerApi(client);
    this.salesOrders = new SalesOrdersApi(client);
  }
};
export {
  AmrodSdk
};
