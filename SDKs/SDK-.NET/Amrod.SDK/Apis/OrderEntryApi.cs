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

  private async Task<PlaceOrderResponse> ExecuteOrderAsync(PlaceOrderInput input, bool validateOnly, CancellationToken cancellationToken)
  {
    var variables = new PlaceOrderVariables
    {
      Input = new PlaceOrderInput
      {
        OrderNumber = input.OrderNumber,
        Options = new OrderOptions
        {
          ValidateOnly = validateOnly,
          OrderType = input.Options.OrderType,
          ApplyInclusiveBranding = input.Options.ApplyInclusiveBranding
        },
        Collection = input.Collection,
        Contact = input.Contact,
        Details = input.Details
      }
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
    var response = await _client.ExecuteAsync<PlaceOrderData>(query, variables, cancellationToken).ConfigureAwait(false);
    return response.PlaceOrder;
  }

  private sealed class PlaceOrderData
  {
    public PlaceOrderResponse PlaceOrder { get; set; } = null!;
  }
}

public class JobCardWorkflowApi
{
  private readonly GraphQlSdkClient _client;

  public JobCardWorkflowApi(GraphQlSdkClient client) => _client = client;

  public async Task<ApproveJobCardResponse> ApproveAsync(ApproveJobCardInput input, CancellationToken cancellationToken = default)
  {
    var response = await _client.ExecuteAsync<ApproveJobCardData>("""
        mutation ApproveJobCard($input: ApproveJobCardInput!) {
          approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new ApproveJobCardVariables { Input = input }, cancellationToken).ConfigureAwait(false);
    return response.ApproveJobCard;
  }

  public async Task<UpdateJobCardBrandingResponse> UpdateBrandingAsync(UpdateJobCardBrandingRequest input, CancellationToken cancellationToken = default)
  {
    var response = await _client.ExecuteAsync<UpdateJobCardBrandingData>("""
        mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
          updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new UpdateJobCardBrandingVariables { Input = input }, cancellationToken).ConfigureAwait(false);
    return response.UpdateJobCardBrandingInfo;
  }

  public async Task<RequestJobCardChangeResponse> RequestChangeAsync(RequestJobCardChangeRequest input, CancellationToken cancellationToken = default)
  {
    var response = await _client.ExecuteAsync<RequestJobCardChangeData>("""
        mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
          requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
        }
        """, new RequestJobCardChangeVariables { Input = input }, cancellationToken).ConfigureAwait(false);
    return response.RequestChangeJobCard;
  }

  private sealed class ApproveJobCardData
  {
    public ApproveJobCardResponse ApproveJobCard { get; set; } = null!;
  }

  private sealed class UpdateJobCardBrandingData
  {
    public UpdateJobCardBrandingResponse UpdateJobCardBrandingInfo { get; set; } = null!;
  }

  private sealed class RequestJobCardChangeData
  {
    public RequestJobCardChangeResponse RequestChangeJobCard { get; set; } = null!;
  }
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