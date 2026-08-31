import { GraphQlSdkClient } from "../client";
import { SalesOrder, SalesOrdersConnection } from "../models/sales-order";
import { PageInfo } from "../models/common";

export class SalesOrdersApi {
  constructor(private client: GraphQlSdkClient) {}

  async getByNumber(
    salesOrderNumber: string
  ): Promise<SalesOrder | null> {
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

    const response = await this.client.execute<{
      salesOrders: {
        totalCount: number;
        nodes: SalesOrder[];
      };
    }>(query, {
      salesOrderNumber,
    });

    return response.salesOrders.nodes[0] ?? null;
  }

  async getById(id: string): Promise<SalesOrder | null> {
    const query = `
      query GetSalesOrderById($id: ID!) {
        salesOrder(id: $id) {
          id salesOrderNumber customerReference orderDate status totalExcl tax balanceOutstanding isPaid isActive lastModifiedDate
          customer { id name code } contact { fullName emailAddress }
        }
      }
    `;

    const response = await this.client.execute<{ salesOrder: SalesOrder | null }>(
      query,
      { id }
    );

    return response.salesOrder;
  }

  async list(
    first = 20,
    after?: string,
    before?: string
  ): Promise<SalesOrdersConnection> {
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

  async getWithJobCards(
    salesOrderNumber: string
  ): Promise<SalesOrder | null> {
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

    const response = await this.client.execute<{
      salesOrders: { nodes: SalesOrder[] };
    }>(query, { salesOrderNumber });

    return response.salesOrders.nodes[0] ?? null;
  }

  private async executeConnection(
    query: string,
    variables: Record<string, unknown>
  ): Promise<SalesOrdersConnection> {
    const response = await this.client.execute<{
      salesOrders?: SalesOrdersConnection;
    }>(query, variables);

    return (
      response.salesOrders ?? {
        totalCount: 0,
        pageInfo: {} as PageInfo,
        edges: [],
        nodes: [],
      }
    );
  }
}

