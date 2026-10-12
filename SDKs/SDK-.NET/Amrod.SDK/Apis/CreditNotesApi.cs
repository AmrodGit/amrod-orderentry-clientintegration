using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class CreditNotesApi
{
  private readonly GraphQlSdkClient _client;

  public CreditNotesApi(GraphQlSdkClient client) => _client = client;

  public async Task<CreditNote?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
  {
    const string query = """
        query GetCreditNoteById($id: ID!) {
          creditNote(id: $id) { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
        }
        """;
    var response = await _client.ExecuteAsync<CreditNoteResponse>(query, new IdVariables { Id = id }, cancellationToken).ConfigureAwait(false);
    return response.CreditNote;
  }

  public async Task<CreditNote?> GetByNumberAsync(string creditNoteNumber, CancellationToken cancellationToken = default)
  {
    const string query = """
        query GetCreditNoteByNumber($creditNoteNumber: String!) {
          creditNotes(where: { creditNoteNumber: { eq: $creditNoteNumber } }, first: 1) {
            totalCount nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
          }
        }
        """;
    var response = await _client.ExecuteAsync<CreditNotesResponse>(query, new CreditNoteNumberVariables { CreditNoteNumber = creditNoteNumber }, cancellationToken).ConfigureAwait(false);
    return response.CreditNotes?.Nodes?.FirstOrDefault();
  }

  public Task<CreditNotesConnection> ListAsync(int? first = 20, string? after = null, string? before = null, CancellationToken cancellationToken = default) =>
      ExecuteConnectionAsync("""
        query ListCreditNotes($first: Int, $after: String, $before: String) {
          creditNotes(first: $first, after: $after, before: $before) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
            edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } } }
          }
        }
        """, new ConnectionVariables { First = first, After = after, Before = before }, cancellationToken);

  public Task<CreditNotesConnection> GetBySalesOrderNumberAsync(string salesOrderNumber, CancellationToken cancellationToken = default) =>
      ExecuteConnectionAsync("""
        query GetCreditNotesBySalesOrderNumber($salesOrderNumber: String!) {
          creditNotes(first: 100, where: { salesOrder: { salesOrderNumber: { eq: $salesOrderNumber } } }) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
            edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } } }
          }
        }
        """, new SalesOrderNumberVariables { SalesOrderNumber = salesOrderNumber }, cancellationToken);

  public Task<CreditNotesConnection> GetByDateRangeAsync(
      string startDate,
      string endDate,
      CancellationToken cancellationToken = default) =>
      GetByDateRangeAsync(startDate, endDate, 100, cancellationToken: cancellationToken);

  public Task<CreditNotesConnection> GetByDateRangeAsync(
      string startDate,
      string endDate,
      int? first,
      string? after = null,
      string? before = null,
      CancellationToken cancellationToken = default) =>
      ExecuteConnectionAsync("""
        query GetCreditNotesByDateRange($startDate: DateTime!, $endDate: DateTime!, $first: Int, $after: String, $before: String) {
          creditNotes(first: $first, after: $after, before: $before, where: { creditNoteDate: { gte: $startDate, lte: $endDate } }) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            nodes { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } }
            edges { cursor node { id creditNoteNumber creditNoteDate totalExcl tax assetUri internalId creditNoteDetails { sku quantity } } }
          }
        }
        """, new CreditNoteDateRangeVariables { StartDate = startDate, EndDate = endDate, First = first, After = after, Before = before }, cancellationToken);

  private async Task<CreditNotesConnection> ExecuteConnectionAsync(string query, object variables, CancellationToken cancellationToken)
  {
    var response = await _client.ExecuteAsync<CreditNotesResponse>(query, variables, cancellationToken).ConfigureAwait(false);
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