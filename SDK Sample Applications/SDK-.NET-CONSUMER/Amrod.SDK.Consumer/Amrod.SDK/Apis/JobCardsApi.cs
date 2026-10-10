using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class JobCardsApi
{
  private readonly GraphQlSdkClient _client;

  public JobCardsApi(GraphQlSdkClient client) => _client = client;

  public async Task<JobCard?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
  {
    const string query = """
        query GetJobCardById($id: ID!) {
          jobCard(id: $id) { id jobCardNumber status created isActive lastModifiedDate
            salesOrder { salesOrderNumber }
            jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement logo colors brandingSizeWidth brandingSizeHeight }
            jobCardDate { actionDate dueDate leadTime }
          }
        }
        """;
    var response = await _client.ExecuteAsync<JobCardResponse>(query, new { id }, cancellationToken).ConfigureAwait(false);
    return response.JobCard;
  }

  public async Task<JobCard?> GetByNumberAsync(string jobCardNumber, CancellationToken cancellationToken = default)
  {
    var connection = await GetByNumberConnectionAsync(jobCardNumber, """
          jobCardBrandingDetail { brandingCode brandingPosition brandingPlacement logo colors brandingSizeWidth brandingSizeHeight foilColor siliconeColor vinylColor }
          jobCardDate { actionDate dueDate leadTime }
          jobCardAssets { id name type url assetId }
        """, cancellationToken).ConfigureAwait(false);
    return connection.Nodes.FirstOrDefault();
  }

  public async Task<JobCard?> GetWithAssetsAndProofsAsync(string jobCardNumber, CancellationToken cancellationToken = default)
  {
    var connection = await GetByNumberConnectionAsync(jobCardNumber, """
          jobCardBrandingDetail { brandingCode brandingPosition logo colors brandingSizeWidth brandingSizeHeight }
          jobCardDate { actionDate dueDate leadTime }
          jobCardAssets { id name type url assetId }
          jobCardProofs { id url version numberOfOptions jobCardProofOptions { number isRecommended pageRange } }
          jobCardDetail { sku quantity }
          salesOrder { salesOrderNumber customerReference status }
        """, cancellationToken).ConfigureAwait(false);
    return connection.Nodes.FirstOrDefault();
  }

  public Task<JobCardsConnection> GetBySalesOrderNumberAsync(string salesOrderNumber, CancellationToken cancellationToken = default) =>
      ExecuteConnectionAsync("""
        query GetJobCardsBySalesOrderNumber($salesOrderNumber: String!) {
          jobCards(first: 100, where: { salesOrder: { salesOrderNumber: { eq: $salesOrderNumber } } }) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            edges { cursor node { id jobCardNumber status created isActive
              jobCardBrandingDetail { brandingCode brandingPosition logo colors brandingSizeWidth brandingSizeHeight foilColor siliconeColor vinylColor }
              jobCardDate { actionDate dueDate leadTime } jobCardAssets { name type url } jobCardDetail { sku quantity }
            } }
          }
        }
        """, new { salesOrderNumber }, cancellationToken);

  public Task<JobCardsConnection> ListAsync(int? first = 20, string? after = null, string? before = null, CancellationToken cancellationToken = default) =>
      ExecuteConnectionAsync("""
        query ListJobCards($first: Int, $after: String, $before: String) {
          jobCards(first: $first, after: $after, before: $before) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            edges { cursor node { id jobCardNumber status created isActive jobCardBrandingDetail { brandingCode logo } jobCardDate { dueDate leadTime } } }
          }
        }
        """, new { first, after, before }, cancellationToken);

  private Task<JobCardsConnection> GetByNumberConnectionAsync(string jobCardNumber, string selection, CancellationToken cancellationToken) =>
      ExecuteConnectionAsync($$$"""
        query GetJobCardByNumber($jobCardNumber: String!) {
          jobCards(where: { jobCardNumber: { eq: $jobCardNumber } }, first: 1) {
            totalCount nodes { id jobCardNumber status created isActive salesOrder { salesOrderNumber customerReference status } {{{selection}}} }
          }
        }
        """, new { jobCardNumber }, cancellationToken);

  private async Task<JobCardsConnection> ExecuteConnectionAsync(string query, object variables, CancellationToken cancellationToken)
  {
    var response = await _client.ExecuteAsync<JobCardsResponse>(query, variables, cancellationToken).ConfigureAwait(false);
    return response.JobCards ?? new JobCardsConnection();
  }

  private sealed class JobCardResponse
  {
    public JobCard? JobCard { get; set; }
  }

  private sealed class JobCardsResponse
  {
    public JobCardsConnection? JobCards { get; set; }
  }
}

public class JobCardsConnection
{
  public int TotalCount { get; set; }
  public PageInfo PageInfo { get; set; } = new();
  public List<JobCardEdge> Edges { get; set; } = [];
  public List<JobCard> Nodes { get; set; } = [];
}

public class JobCardEdge
{
  public string Cursor { get; set; } = "";
  public JobCard Node { get; set; } = null!;
}