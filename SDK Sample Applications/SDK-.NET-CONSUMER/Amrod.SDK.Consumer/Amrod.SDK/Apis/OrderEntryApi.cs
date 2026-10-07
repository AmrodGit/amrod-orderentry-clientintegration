using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class OrderEntryApi
{
    private readonly GraphQlSdkClient _client;

    public OrderEntryApi(GraphQlSdkClient client) => _client = client;

    public Task<OrderMutationResponse> PlaceOrderAsync(OrderRequest request, CancellationToken cancellationToken = default) =>
        ExecuteOrderAsync<OrderMutationResponse>(request, request.Options.ValidateOnly, cancellationToken);

    public Task<PlaceOrderResponse> PlaceOrderAsync(PlaceOrderInput request, CancellationToken cancellationToken = default) =>
        ExecuteOrderAsync<PlaceOrderResponse>(request, request.Options.ValidateOnly, cancellationToken);

    public Task<OrderMutationResponse> ValidateOrderAsync(OrderRequest request, CancellationToken cancellationToken = default) =>
        ExecuteOrderAsync<OrderMutationResponse>(request, true, cancellationToken);

    public Task<PlaceOrderResponse> ValidateOrderAsync(PlaceOrderInput request, CancellationToken cancellationToken = default) =>
        ExecuteOrderAsync<PlaceOrderResponse>(request, true, cancellationToken);

    private Task<TResponse> ExecuteOrderAsync<TResponse>(OrderRequest request, bool validateOnly, CancellationToken cancellationToken)
    {
        var input = new
        {
            request.OrderNumber,
            Options = new { request.Options.OrderType, ValidateOnly = validateOnly, request.Options.ApplyInclusiveBranding },
            request.Collection,
            Contact = new
            {
                Notifications = new
                {
                    request.Contact.Notifications.Order,
                    request.Contact.Notifications.Branding
                },
                request.Contact.Logo24
            },
            request.Details
        };

        const string query = """
        mutation PlaceOrder($input: PlaceOrderInput!) {
          placeOrder(input: $input) {
            errors { __typename ... on BadRequestException { message } ... on ConflictException { message }
              ... on InputValidationException { message } ... on ServerError { message } }
            placeOrderPayloadType { orders { leadTimeInDays leadTimeInHours orderDate orderNumber salesOrderNumber totalExcl
              details { id items { name quantity sku unitPrice } branding { brandingCode brandingPosition brandingUnitPriceExcl description dyeChargeExcl dyeChargeName printQuantity setupChargeCode setupChargeExcl } } }
              warnings { code message warningType } }
          }
        }
        """;
        return ExecuteAsync<TResponse>(query, new { input }, cancellationToken);
    }

    private Task<T> ExecuteAsync<T>(string query, object variables, CancellationToken cancellationToken) => _client.ExecuteAsync<T>(query, variables, cancellationToken);
}

public class JobCardWorkflowApi
{
    private readonly GraphQlSdkClient _client;

    public JobCardWorkflowApi(GraphQlSdkClient client) => _client = client;

    public Task<WorkflowMutationResponse> ApproveAsync(string jobCardNumber, string proofId, int? optionNumber = null, CancellationToken cancellationToken = default) =>
        ExecuteAsync("""
        mutation ApproveJobCard($input: ApproveJobCardInput!) {
          approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = new { jobCardNumber, proofId, optionNumber } }, cancellationToken);

    public Task<WorkflowMutationResponse> UpdateBrandingAsync(UpdateJobCardBrandingRequest request, CancellationToken cancellationToken = default) =>
        ExecuteAsync("""
        mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
          updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = request }, cancellationToken);

    public Task<WorkflowMutationResponse> RequestChangeAsync(RequestJobCardChangeRequest request, CancellationToken cancellationToken = default) =>
        ExecuteAsync("""
        mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
          requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = request }, cancellationToken);

    private Task<WorkflowMutationResponse> ExecuteAsync(string query, object variables, CancellationToken cancellationToken) =>
        _client.ExecuteAsync<WorkflowMutationResponse>(query, variables, cancellationToken);
}

public class OrderMutationResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public OrderResult? PlaceOrderPayloadType { get; set; }
}

public class WorkflowMutationResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public MutationResult? ResultPayloadType { get; set; }
}

public class PlaceOrderResponse : OrderMutationResponse
{
}