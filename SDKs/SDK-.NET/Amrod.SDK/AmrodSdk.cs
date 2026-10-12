using Amrod.SDK.Apis;

namespace Amrod.SDK;

public class AmrodSdk : IDisposable
{
    private readonly GraphQlSdkClient _client;

    public ViewerApi Viewer { get; }

    public SalesOrdersApi SalesOrders { get; }

    public CreditNotesApi CreditNotes { get; }

    public JobCardsApi JobCards { get; }

    public OrderEntryApi Orders { get; }

    public JobCardWorkflowApi JobCardWorkflow { get; }

    public AmrodSdk(
        AmrodSdkOptions options)
    {
        ArgumentNullException.ThrowIfNull(options);
        ArgumentException.ThrowIfNullOrWhiteSpace(options.Endpoint);

        _client = new GraphQlSdkClient(options);

        Viewer =
            new ViewerApi(_client);

        SalesOrders =
            new SalesOrdersApi(_client);

        CreditNotes = new CreditNotesApi(_client);
        JobCards = new JobCardsApi(_client);
        Orders = new OrderEntryApi(_client);
        JobCardWorkflow = new JobCardWorkflowApi(_client);
    }

    public void Dispose() => _client.Dispose();
}
