import { GraphQlSdkClient } from "../client";
import { CreditNote, CreditNotesConnection } from "../models/credit-note";
import { PageInfo } from "../models/common";

export class CreditNotesApi {
  constructor(private client: GraphQlSdkClient) {}

  async getById(id: string): Promise<CreditNote | null> {
    const query = `
      query GetCreditNoteById($id: ID!) {
        creditNote(id: $id) { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId }
      }
    `;

    const response = await this.client.execute<{ creditNote: CreditNote | null }>(
      query,
      { id }
    );

    return response.creditNote;
  }

  async getByNumber(creditNoteNumber: string): Promise<CreditNote | null> {
    const query = `
      query GetCreditNoteByNumber($creditNoteNumber: String!) {
        creditNotes(where: { creditNoteNumber: { eq: $creditNoteNumber } }, first: 1) {
          totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
        }
      }
    `;

    const response = await this.client.execute<{
      creditNotes?: { nodes: CreditNote[] };
    }>(query, { creditNoteNumber });

    return response.creditNotes?.nodes[0] ?? null;
  }

  async list(
    first = 20,
    after?: string,
    before?: string
  ): Promise<CreditNotesConnection> {
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

  async getBySalesOrderNumber(
    salesOrderNumber: string
  ): Promise<CreditNotesConnection> {
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

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<CreditNotesConnection> {
    const query = `
      query GetCreditNotesByDateRange($startDate: DateTime!, $endDate: DateTime!) {
        creditNotes(first: 100, where: { creditNoteDate: { gte: $startDate, lte: $endDate } }) {
          totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax creditNoteDetails { sku quantity } }
        }
      }
    `;

    return this.executeConnection(query, { startDate, endDate });
  }

  private async executeConnection(
    query: string,
    variables: Record<string, unknown>
  ): Promise<CreditNotesConnection> {
    const response = await this.client.execute<{
      creditNotes?: CreditNotesConnection;
    }>(query, variables);

    return (
      response.creditNotes ?? {
        totalCount: 0,
        pageInfo: {} as PageInfo,
        edges: [],
        nodes: [],
      }
    );
  }
}
