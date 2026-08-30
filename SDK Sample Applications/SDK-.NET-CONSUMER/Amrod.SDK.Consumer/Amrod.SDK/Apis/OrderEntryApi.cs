using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class OrderEntryApi
{
    private readonly GraphQlSdkClient _client;

    public OrderEntryApi(GraphQlSdkClient client) => _client = client;

    public Task<OrderMutationResponse> PlaceOrderAsync(OrderRequest request) =>
        ExecuteOrderAsync<OrderMutationResponse>(request, request.Options.ValidateOnly);

    public Task<PlaceOrderResponse> PlaceOrderAsync(PlaceOrderInput request) =>
        ExecuteOrderAsync<PlaceOrderResponse>(request, request.Options.ValidateOnly);

    public Task<OrderMutationResponse> ValidateOrderAsync(OrderRequest request) =>
        ExecuteOrderAsync<OrderMutationResponse>(request, true);

    public Task<PlaceOrderResponse> ValidateOrderAsync(PlaceOrderInput request) =>
        ExecuteOrderAsync<PlaceOrderResponse>(request, true);

    private Task<TResponse> ExecuteOrderAsync<TResponse>(OrderRequest request, bool validateOnly)
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
        return ExecuteAsync<TResponse>(query, new { input });
    }

    private Task<T> ExecuteAsync<T>(string query, object variables) => _client.ExecuteAsync<T>(query, variables);
}

public class JobCardWorkflowApi
{
    private readonly GraphQlSdkClient _client;

    public JobCardWorkflowApi(GraphQlSdkClient client) => _client = client;

    public Task<WorkflowMutationResponse> ApproveAsync(string jobCardNumber, string proofId, int? optionNumber = null) =>
        ExecuteAsync("""
        mutation ApproveJobCard($input: ApproveJobCardInput!) {
          approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = new { jobCardNumber, proofId, optionNumber } });

    public Task<WorkflowMutationResponse> UpdateBrandingAsync(UpdateJobCardBrandingRequest request) =>
        ExecuteAsync("""
        mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
          updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = request });

    public Task<WorkflowMutationResponse> RequestChangeAsync(RequestJobCardChangeRequest request) =>
        ExecuteAsync("""
        mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
          requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new { input = request });

    private Task<WorkflowMutationResponse> ExecuteAsync(string query, object variables) =>
        _client.ExecuteAsync<WorkflowMutationResponse>(query, variables);
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