using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class SalesOrdersApi
{
  private readonly GraphQlSdkClient _client;

  public SalesOrdersApi(
      GraphQlSdkClient client)
  {
    _client = client;
  }

  public async Task<SalesOrder?> GetByNumberAsync(
      string salesOrderNumber)
  {
    const string query = """
        query GetSalesOrderByNumber($salesOrderNumber: String!) {
          salesOrders(
            where: {
              salesOrderNumber: { eq: $salesOrderNumber }
            }
            first: 1
          ) {
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
        """;

    var response =
        await _client.ExecuteAsync<
            SalesOrderResponse>(
            query,
            new { salesOrderNumber });

    return response
        .SalesOrders
        .Nodes
        .FirstOrDefault();
  }

  public async Task<SalesOrder?> GetByIdAsync(string id)
  {
    const string query = """
        query GetSalesOrderById($id: ID!) {
          salesOrder(id: $id) { id salesOrderNumber customerReference orderDate status totalExcl tax balanceOutstanding isPaid isActive lastModifiedDate
            customer { id name code } contact { fullName emailAddress } }
        }
        """;
    var response = await _client.ExecuteAsync<SingleSalesOrderResponse>(query, new { id });
    return response.SalesOrder;
  }

  public Task<SalesOrdersConnection> ListAsync(int? first = 20, string? after = null, string? before = null) =>
      ExecuteConnectionAsync("""
        query ListSalesOrders($first: Int, $after: String, $before: String) {
          salesOrders(first: $first, after: $after, before: $before) {
            totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
            edges { cursor node { id salesOrderNumber customerReference orderDate status totalExcl isPaid } }
          }
        }
        """, new { first, after, before });

  public async Task<SalesOrder?> GetWithJobCardsAsync(string salesOrderNumber)
  {
    const string query = """
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
        """;
    var response = await _client.ExecuteAsync<SalesOrderResponse>(query, new { salesOrderNumber });
    return response.SalesOrders.Nodes.FirstOrDefault();
  }

  private async Task<SalesOrdersConnection> ExecuteConnectionAsync(string query, object variables)
  {
    var response = await _client.ExecuteAsync<ConnectionSalesOrderResponse>(query, variables);
    return response.SalesOrders ?? new SalesOrdersConnection();
  }

  private class SalesOrderResponse
  {
    public SalesOrderConnection SalesOrders
    {
      get;
      set;
    } = null!;
  }

  private class SalesOrderConnection
  {
    public List<SalesOrder> Nodes
    {
      get;
      set;
    } = [];
  }

  private class SingleSalesOrderResponse
  {
    public SalesOrder? SalesOrder { get; set; }
  }

  private class ConnectionSalesOrderResponse
  {
    public SalesOrdersConnection? SalesOrders { get; set; }
  }
}

public class SalesOrdersConnection
{
  public int TotalCount { get; set; }
  public PageInfo PageInfo { get; set; } = new();
  public List<SalesOrderEdge> Edges { get; set; } = [];
  public List<SalesOrder> Nodes { get; set; } = [];
}

public class SalesOrderEdge
{
  public string Cursor { get; set; } = "";
  public SalesOrder Node { get; set; } = null!;
}
