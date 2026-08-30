using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class OrderEntryApi
{
    private readonly GraphQlSdkClient _client;

    public OrderEntryApi(GraphQlSdkClient client) => _client = client;

    public Task<PlaceOrderResponse> PlaceOrderAsync(PlaceOrderInput input) =>
      ExecuteOrderAsync(input, input.Options.ValidateOnly);

    public Task<PlaceOrderResponse> ValidateOrderAsync(PlaceOrderInput input) =>
      ExecuteOrderAsync(input, true);

    private Task<PlaceOrderResponse> ExecuteOrderAsync(PlaceOrderInput input, bool validateOnly)
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
        return ExecuteAsync<PlaceOrderResponse>(query, variables);
    }

    private Task<T> ExecuteAsync<T>(string query, object variables) => _client.ExecuteAsync<T>(query, variables);
}

public class JobCardWorkflowApi
{
    private readonly GraphQlSdkClient _client;

    public JobCardWorkflowApi(GraphQlSdkClient client) => _client = client;

    public Task<ApproveJobCardResponse> ApproveAsync(ApproveJobCardInput input) =>
        ExecuteAsync<ApproveJobCardResponse>("""
        mutation ApproveJobCard($input: ApproveJobCardInput!) {
          approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new ApproveJobCardVariables { Input = input });

    public Task<UpdateJobCardBrandingResponse> UpdateBrandingAsync(UpdateJobCardBrandingRequest input) =>
      ExecuteAsync<UpdateJobCardBrandingResponse>("""
        mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
          updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new UpdateJobCardBrandingVariables { Input = input });

    public Task<RequestJobCardChangeResponse> RequestChangeAsync(RequestJobCardChangeRequest input) =>
      ExecuteAsync<RequestJobCardChangeResponse>("""
        mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
          requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new RequestJobCardChangeVariables { Input = input });

    private Task<T> ExecuteAsync<T>(string query, object variables) =>
      _client.ExecuteAsync<T>(query, variables);
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