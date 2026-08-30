using Amrod.SDK.Apis;

namespace Amrod.SDK;

public class AmrodSdk
{
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

        var client =
            new GraphQlSdkClient(options);

        Viewer =
            new ViewerApi(client);

        SalesOrders =
            new SalesOrdersApi(client);

        CreditNotes = new CreditNotesApi(client);
        JobCards = new JobCardsApi(client);
        Orders = new OrderEntryApi(client);
        JobCardWorkflow = new JobCardWorkflowApi(client);
    }
}
