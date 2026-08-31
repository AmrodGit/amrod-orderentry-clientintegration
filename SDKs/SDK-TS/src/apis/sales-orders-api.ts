import { GraphQlSdkClient } from "../client";
import { SalesOrder } from "../models/sales-order";

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
}
