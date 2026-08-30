using System.Text.Json.Serialization;

namespace Amrod.SDK.Models;

public class PageInfo
{
    public bool HasNextPage { get; set; }
    public bool HasPreviousPage { get; set; }
    public string? StartCursor { get; set; }
    public string? EndCursor { get; set; }
}

public class CreditNote
{
    public string Id { get; set; } = "";
    public string CreditNoteNumber { get; set; } = "";
    public string CreditNoteDate { get; set; } = "";
    public decimal TotalExcl { get; set; }
    public decimal Tax { get; set; }
    public string? AssetUri { get; set; }
    public int InternalId { get; set; }
    public List<CreditNoteDetail> CreditNoteDetails { get; set; } = [];
}

public class CreditNoteDetail
{
    public string Sku { get; set; } = "";
    public int Quantity { get; set; }
}

public class JobCard
{
    public string Id { get; set; } = "";
    public string JobCardNumber { get; set; } = "";
    public string Status { get; set; } = "";
    public string Created { get; set; } = "";
    public bool IsActive { get; set; }
    public string LastModifiedDate { get; set; } = "";
    public JobCardSalesOrder? SalesOrder { get; set; }
    public JobCardBrandingDetail? JobCardBrandingDetail { get; set; }
    public JobCardDate? JobCardDate { get; set; }
    public List<JobCardAsset> JobCardAssets { get; set; } = [];
    public List<JobCardProof> JobCardProofs { get; set; } = [];
    public List<JobCardDetail> JobCardDetail { get; set; } = [];
}

public class JobCardSalesOrder
{
    public string SalesOrderNumber { get; set; } = "";
    public string CustomerReference { get; set; } = "";
    public string Status { get; set; } = "";
}

public class JobCardBrandingDetail
{
    public string BrandingCode { get; set; } = "";
    public string BrandingPosition { get; set; } = "";
    public string? BrandingPlacement { get; set; }
    public string? Logo { get; set; }
    public string? Colors { get; set; }
    public decimal? BrandingSizeWidth { get; set; }
    public decimal? BrandingSizeHeight { get; set; }
    public string? FoilColor { get; set; }
    public string? SiliconeColor { get; set; }
    public string? VinylColor { get; set; }
}

public class JobCardDate
{
    public string? ActionDate { get; set; }
    public string? DueDate { get; set; }
    public int? LeadTime { get; set; }
}

public class JobCardAsset
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string Type { get; set; } = "";
    public string Url { get; set; } = "";
    public string? AssetId { get; set; }
}

public class JobCardProof
{
    public string Id { get; set; } = "";
    public string Url { get; set; } = "";
    public int Version { get; set; }
    public int NumberOfOptions { get; set; }
    public List<JobCardProofOption> JobCardProofOptions { get; set; } = [];
}

public class JobCardProofOption
{
    public int Number { get; set; }
    public bool IsRecommended { get; set; }
    public string PageRange { get; set; } = "";
}

public class JobCardDetail
{
    public string Sku { get; set; } = "";
    public int Quantity { get; set; }
}

public sealed class PlaceOrderVariables
{
    public PlaceOrderInput Input { get; set; } = new();
}

public class PlaceOrderInput
{
    public string OrderNumber { get; set; } = "";
    public OrderOptions Options { get; set; } = new();
    public OrderCollection Collection { get; set; } = new();
    public OrderContactDetail Contact { get; set; } = new();
    public List<OrderGroup> Details { get; set; } = [];
}

public class OrderOptions
{
    public bool ValidateOnly { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderType OrderType { get; set; } = OrderType.Standard;
    public bool? ApplyInclusiveBranding { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderType
{
    Standard,
    Delivery,
    Logo24
}

public class OrderCollection
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderCollectionType CollectionType { get; set; }
    public string? BranchCode { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderCollectionType
{
    CollectionHeadOffice,
    BranchDeliveryCollection,
    Courier
}

public class OrderContactDetail
{
    public OrderContactNotificationDetail Notifications { get; set; } = new();
}

public class OrderContactNotificationDetail
{
    public OrderContact Order { get; set; } = new();
    public OrderContact? Branding { get; set; }
}

public class OrderContact
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string? ContactNumber { get; set; }
}

public class OrderGroup
{
    public string Id { get; set; } = "";
    public List<OrderLine> Items { get; set; } = [];
    public List<BrandingDetail>? Branding { get; set; }
}

public class OrderLine
{
    public string Sku { get; set; } = "";
    public long Quantity { get; set; }
    public decimal? Price { get; set; }
}

public class BrandingDetail
{
    public string BrandingCode { get; set; } = "";
    public string Position { get; set; } = "";
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderBrandingLogoPositionType? LogoPosition { get; set; }
    public List<string>? Logos { get; set; }
    public decimal? LogoSize { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderBrandingLogoSizeType? LogoSizeType { get; set; }
    public List<BrandingColorInput>? Colors { get; set; }
    public List<BrandingMetadataInput>? Metadata { get; set; }
    public string? Reference { get; set; }
    public string? SpecialInstructions { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderBrandingLogoPositionType
{
    TopLeft,
    TopRight,
    TopCenter,
    MiddleLeft,
    MiddleCenter,
    MiddleRight,
    BottomLeft,
    BottomCenter,
    BottomRight
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderBrandingLogoSizeType
{
    Width,
    Height
}

public class BrandingColorInput
{
    public string Code { get; set; } = "";
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderBrandingColorType Type { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderBrandingColorType
{
    None,
    Hex,
    Pantone,
    Marathon
}

public class BrandingMetadataInput
{
    public string Key { get; set; } = "";
    public string? Value { get; set; }
}

public class OrderResult
{
    public List<OrderItem> Orders { get; set; } = [];
    public List<OrderWarning> Warnings { get; set; } = [];
}

public class OrderItem
{
    public int? LeadTimeInDays { get; set; }
    public int? LeadTimeInHours { get; set; }
    public string OrderDate { get; set; } = "";
    public string OrderNumber { get; set; } = "";
    public string? SalesOrderNumber { get; set; }
    public decimal TotalExcl { get; set; }
    public List<OrderGroupResult> Details { get; set; } = [];
}

public class OrderGroupResult
{
    public string Id { get; set; } = "";
    public List<OrderLineResult> Items { get; set; } = [];
    public List<OrderBrandingResult> Branding { get; set; } = [];
}

public class OrderLineResult
{
    public string Name { get; set; } = "";
    public int Quantity { get; set; }
    public string Sku { get; set; } = "";
    public decimal UnitPrice { get; set; }
}

public class OrderBrandingResult
{
    public string BrandingCode { get; set; } = "";
    public string BrandingPosition { get; set; } = "";
    public decimal BrandingUnitPriceExcl { get; set; }
    public string Description { get; set; } = "";
    public decimal? DyeChargeExcl { get; set; }
    public string? DyeChargeName { get; set; }
    public int PrintQuantity { get; set; }
    public string? SetupChargeCode { get; set; }
    public decimal? SetupChargeExcl { get; set; }
}

public class OrderWarning
{
    public string Code { get; set; } = "";
    public string Message { get; set; } = "";
    public string WarningType { get; set; } = "";
}

public sealed class MutationResult
{
    public bool Result { get; set; }
}

public sealed class ApiError
{
    [JsonPropertyName("__typename")]
    public string TypeName { get; set; } = "";
    public string? Code { get; set; }
    public string Message { get; set; } = "";
    public string? ErrorDetail { get; set; }
    public string? ParameterName { get; set; }
    public string? ErrorType { get; set; }
    public List<string> Items { get; set; } = [];
    public string? RequestReference { get; set; }
}

public class JobCardBrandingRequest
{
    public string JobCardNumber { get; set; } = "";
    public BrandingDetail BrandingDetail { get; set; } = new();
}

public class UpdateJobCardBrandingRequest
{
    public string MasterJobCardNumber { get; set; } = "";
    public List<JobCardBrandingRequest> JobCards { get; set; } = [];
}

public class RequestJobCardChangeRequest
{
    public string SalesOrderNumber { get; set; } = "";
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public JobCardChangeRequestType ChangeRequestType { get; set; } = JobCardChangeRequestType.CustomerRequest;
    public List<JobCardBrandingRequest> JobCards { get; set; } = [];
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum JobCardChangeRequestType
{
    CustomerRequest,
    InstructionNotFollowed
}

public sealed class ApproveJobCardVariables
{
    public ApproveJobCardInput Input { get; set; } = new();
}

public sealed class ApproveJobCardInput
{
    public string JobCardNumber { get; set; } = "";
    public string ProofId { get; set; } = "";
    public int? OptionNumber { get; set; }
}

public sealed class UpdateJobCardBrandingVariables
{
    public UpdateJobCardBrandingRequest Input { get; set; } = new();
}

public sealed class RequestJobCardChangeVariables
{
    public RequestJobCardChangeRequest Input { get; set; } = new();
}

public sealed class IdVariables
{
    public string Id { get; set; } = "";
}

public sealed class CreditNoteNumberVariables
{
    public string CreditNoteNumber { get; set; } = "";
}

public sealed class JobCardNumberVariables
{
    public string JobCardNumber { get; set; } = "";
}

public sealed class SalesOrderNumberVariables
{
    public string SalesOrderNumber { get; set; } = "";
}

public sealed class ConnectionVariables
{
    public int? First { get; set; }
    public string? After { get; set; }
    public string? Before { get; set; }
}

public sealed class CreditNoteDateRangeVariables
{
    public string StartDate { get; set; } = "";
    public string EndDate { get; set; } = "";
}