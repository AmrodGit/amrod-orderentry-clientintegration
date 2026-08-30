using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class CreditNotesApi
{
    private readonly GraphQlSdkClient _client;

    public CreditNotesApi(GraphQlSdkClient client) => _client = client;

    public async Task<CreditNote?> GetByIdAsync(string id)
    {
        const string query = """
        query GetCreditNoteById($id: ID!) {
          creditNote(id: $id) { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId }
        }
        """;
        var response = await _client.ExecuteAsync<CreditNoteResponse>(query, new { id });
        return response.CreditNote;
    }

    public async Task<CreditNote?> GetByNumberAsync(string creditNoteNumber)
    {
        const string query = """
        query GetCreditNoteByNumber($creditNoteNumber: String!) {
          creditNotes(where: { creditNoteNumber: { eq: $creditNoteNumber } }, first: 1) {
            totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
          }
        }
        """;
        var response = await _client.ExecuteAsync<CreditNotesResponse>(query, new { creditNoteNumber });
        return response.CreditNotes?.Nodes?.FirstOrDefault();
    }

    public Task<CreditNotesConnection> ListAsync(int? first = 20, string? after = null, string? before = null) =>
        ExecuteConnectionAsync("""
        query ListCreditNotes($first: Int, $after: String, $before: String) {
          creditNotes(first: $first, after: $after, before: $before) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax } }
          }
        }
        """, new { first, after, before });

    public Task<CreditNotesConnection> GetBySalesOrderNumberAsync(string salesOrderNumber) =>
        ExecuteConnectionAsync("""
        query GetCreditNotesBySalesOrderNumber($salesOrderNumber: String!) {
          creditNotes(first: 100, where: { salesOrder: { salesOrderNumber: { eq: $salesOrderNumber } } }) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax creditNoteDetails { sku quantity } } }
          }
        }
        """, new { salesOrderNumber });

    public Task<CreditNotesConnection> GetByDateRangeAsync(string startDate, string endDate) =>
        ExecuteConnectionAsync("""
        query GetCreditNotesByDateRange($startDate: DateTime!, $endDate: DateTime!) {
          creditNotes(first: 100, where: { creditNoteDate: { gte: $startDate, lte: $endDate } }) {
            totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax creditNoteDetails { sku quantity } }
          }
        }
        """, new { startDate, endDate });

    private async Task<CreditNotesConnection> ExecuteConnectionAsync(string query, object variables)
    {
        var response = await _client.ExecuteAsync<CreditNotesResponse>(query, variables);
        return response.CreditNotes ?? new CreditNotesConnection();
    }

    private sealed class CreditNoteResponse
    {
        public CreditNote? CreditNote { get; set; }
    }

    private sealed class CreditNotesResponse
    {
        public CreditNotesConnection? CreditNotes { get; set; }
    }
}

public class CreditNotesConnection
{
    public int TotalCount { get; set; }
    public PageInfo PageInfo { get; set; } = new();
    public List<CreditNoteEdge> Edges { get; set; } = [];
    public List<CreditNote> Nodes { get; set; } = [];
}

public class CreditNoteEdge
{
    public string Cursor { get; set; } = "";
    public CreditNote Node { get; set; } = null!;
}