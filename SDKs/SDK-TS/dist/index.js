"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AmrodSdk: () => AmrodSdk
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var import_graphql_request = require("graphql-request");
var GraphQlSdkClient = class {
  constructor(options) {
    this.options = options;
  }
  async execute(query, variables) {
    const token = await this.options.authProvider?.getAccessToken();
    const impersonation = await this.options.impersonationProvider?.getImpersonationHeader();
    const client = new import_graphql_request.GraphQLClient(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AmrodSdk
});
