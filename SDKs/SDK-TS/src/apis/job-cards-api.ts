import { GraphQlSdkClient } from "../client";
import { JobCard, JobCardsConnection } from "../models/job-card";
import { PageInfo } from "../models/common";

export class JobCardsApi {
  constructor(private client: GraphQlSdkClient) {}

  async getById(id: string): Promise<JobCard | null> {
    const query = `
      query GetJobCardById($id: ID!) {
        jobCard(id: $id) { id jobCardNumber status created isActive lastModifiedDate
          salesOrder { salesOrderNumber }
          jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement logo colors brandingSizeWidth brandingSizeHeight }
          jobCardDate { actionDate dueDate leadTime }
        }
      }
    `;

    const response = await this.client.execute<{ jobCard: JobCard | null }>(
      query,
      { id }
    );

    return response.jobCard;
  }

  async getByNumber(jobCardNumber: string): Promise<JobCard | null> {
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

  async getWithAssetsAndProofs(jobCardNumber: string): Promise<JobCard | null> {
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

  async getBySalesOrderNumber(
    salesOrderNumber: string
  ): Promise<JobCardsConnection> {
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

  async list(
    first = 20,
    after?: string,
    before?: string
  ): Promise<JobCardsConnection> {
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

  private async getByNumberConnection(
    jobCardNumber: string,
    selection: string
  ): Promise<JobCardsConnection> {
    const query = `
      query GetJobCardByNumber($jobCardNumber: String!) {
        jobCards(where: { jobCardNumber: { eq: $jobCardNumber } }, first: 1) {
          totalCount nodes { id jobCardNumber status created isActive salesOrder { salesOrderNumber customerReference status } ${selection} }
        }
      }
    `;

    return this.executeConnection(query, { jobCardNumber });
  }

  private async executeConnection(
    query: string,
    variables: Record<string, unknown>
  ): Promise<JobCardsConnection> {
    const response = await this.client.execute<{
      jobCards?: JobCardsConnection;
    }>(query, variables);

    return (
      response.jobCards ?? {
        totalCount: 0,
        pageInfo: {} as PageInfo,
        edges: [],
        nodes: [],
      }
    );
  }
}
