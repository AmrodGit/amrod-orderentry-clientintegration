using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class OrderEntryApi
{
    private readonly GraphQlSdkClient _client;

    public OrderEntryApi(GraphQlSdkClient client) => _client = client;

    public Task<PlaceOrderResponse> PlaceOrderAsync(PlaceOrderInput input, CancellationToken cancellationToken = default) =>
      ExecuteOrderAsync(input, input.Options.ValidateOnly, cancellationToken);

    public Task<PlaceOrderResponse> ValidateOrderAsync(PlaceOrderInput input, CancellationToken cancellationToken = default) =>
      ExecuteOrderAsync(input, true, cancellationToken);

    private Task<PlaceOrderResponse> ExecuteOrderAsync(PlaceOrderInput input, bool validateOnly, CancellationToken cancellationToken)
    {
        var variables = new PlaceOrderVariables
        {
            Input = input
        };
        variables.Input.Options.ValidateOnly = validateOnly;

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
        return ExecuteAsync<PlaceOrderResponse>(query, variables, cancellationToken);
    }

    private Task<T> ExecuteAsync<T>(string query, object variables, CancellationToken cancellationToken) => _client.ExecuteAsync<T>(query, variables, cancellationToken);
}

public class JobCardWorkflowApi
{
    private readonly GraphQlSdkClient _client;

    public JobCardWorkflowApi(GraphQlSdkClient client) => _client = client;

    public Task<ApproveJobCardResponse> ApproveAsync(ApproveJobCardInput input, CancellationToken cancellationToken = default) =>
        ExecuteAsync<ApproveJobCardResponse>("""
        mutation ApproveJobCard($input: ApproveJobCardInput!) {
          approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new ApproveJobCardVariables { Input = input }, cancellationToken);

    public Task<UpdateJobCardBrandingResponse> UpdateBrandingAsync(UpdateJobCardBrandingRequest input, CancellationToken cancellationToken = default) =>
      ExecuteAsync<UpdateJobCardBrandingResponse>("""
        mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
          updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new UpdateJobCardBrandingVariables { Input = input }, cancellationToken);

    public Task<RequestJobCardChangeResponse> RequestChangeAsync(RequestJobCardChangeRequest input, CancellationToken cancellationToken = default) =>
      ExecuteAsync<RequestJobCardChangeResponse>("""
        mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
          requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new RequestJobCardChangeVariables { Input = input }, cancellationToken);

    private Task<T> ExecuteAsync<T>(string query, object variables, CancellationToken cancellationToken) =>
      _client.ExecuteAsync<T>(query, variables, cancellationToken);
}

public sealed class PlaceOrderResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public OrderResult? PlaceOrderPayloadType { get; set; }
}

public sealed class ApproveJobCardResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public MutationResult? ResultPayloadType { get; set; }
}

public sealed class UpdateJobCardBrandingResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public MutationResult? ResultPayloadType { get; set; }
}

public sealed class RequestJobCardChangeResponse
{
    public List<ApiError> Errors { get; set; } = [];
    public MutationResult? ResultPayloadType { get; set; }
}