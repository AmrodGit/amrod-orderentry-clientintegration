interface AuthProvider {
    getAccessToken(): Promise<string>;
}

interface ImpersonationProvider {
    getImpersonationHeader(): Promise<string | null>;
}

interface Logger {
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
}
/** Default logger used when no logger is supplied; discards all messages. */
declare const noopLogger: Logger;
/** Convenience logger that writes to the console; useful for samples and local debugging. */
declare const consoleLogger: Logger;

interface SdkOptions {
    endpoint: string;
    authProvider?: AuthProvider;
    impersonationProvider?: ImpersonationProvider;
    /** Optional logger used for diagnostic logging of gateway requests. Defaults to no-op logging when omitted. */
    logger?: Logger;
}
declare class GraphQlSdkClient {
    private options;
    private readonly logger;
    constructor(options: SdkOptions);
    execute<T>(query: string, variables?: Record<string, unknown>): Promise<T>;
}

interface Customer {
    code: string;
    name: string;
}
interface CustomerContact {
    id: string;
    code: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
}
interface ImpersonationScope {
    code: string;
    name: string;
    customerContacts: CustomerContact[];
}
interface Viewer {
    identity: string;
    identityType: string;
    customer: Customer;
    customerContact: CustomerContact;
    impersonationScope: ImpersonationScope[];
}

declare class ViewerApi {
    private client;
    constructor(client: GraphQlSdkClient);
    getViewer(): Promise<Viewer>;
}

interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
}
interface ApiError {
    __typename: string;
    code?: string;
    message: string;
    errorDetail?: string;
    parameterName?: string;
    errorType?: string;
    items?: string[];
    requestReference?: string;
}
interface MutationResult {
    result: boolean;
}

interface JobCardSalesOrder {
    salesOrderNumber: string;
    customerReference: string;
    status: string;
}
interface JobCardBrandingDetail {
    brandingCode: string;
    brandingPosition: string;
    brandingPlacement?: string;
    logo?: string;
    colors?: string;
    brandingSizeWidth?: number;
    brandingSizeHeight?: number;
    foilColor?: string;
    siliconeColor?: string;
    vinylColor?: string;
}
interface JobCardDate {
    actionDate?: string;
    dueDate?: string;
    leadTime?: number;
}
interface JobCardAsset {
    id: string;
    name: string;
    type: string;
    url: string;
    assetId?: string;
}
interface JobCardProofOption {
    number: number;
    isRecommended: boolean;
    pageRange: string;
}
interface JobCardProof {
    id: string;
    url: string;
    version: number;
    numberOfOptions: number;
    jobCardProofOptions: JobCardProofOption[];
}
interface JobCardDetail {
    sku: string;
    quantity: number;
}
interface JobCard {
    id: string;
    jobCardNumber: string;
    status: string;
    created: string;
    isActive: boolean;
    lastModifiedDate?: string;
    salesOrder?: JobCardSalesOrder;
    jobCardBrandingDetail?: JobCardBrandingDetail;
    jobCardDate?: JobCardDate;
    jobCardAssets?: JobCardAsset[];
    jobCardProofs?: JobCardProof[];
    jobCardDetail?: JobCardDetail[];
}
interface JobCardEdge {
    cursor: string;
    node: JobCard;
}
interface JobCardsConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: JobCardEdge[];
    nodes: JobCard[];
}

interface SalesOrderCustomer {
    id: string;
    name: string;
    code: string;
}
interface SalesOrderContact {
    fullName: string;
    emailAddress: string;
    telephoneNumber: string;
}
interface SalesOrderDetail {
    rowNumber: number;
    sku: string;
    quantity: number;
    unitPriceExcl: number;
    lineTotalExcl: number;
}
interface SalesOrder {
    id: string;
    salesOrderNumber: string;
    customerReference: string;
    orderDate: string;
    status: string;
    totalExcl: number;
    tax: number;
    balanceOutstanding: number;
    isPaid: boolean;
    isActive: boolean;
    lastModifiedDate?: string;
    customer: SalesOrderCustomer;
    contact: SalesOrderContact;
    salesOrderDetails: SalesOrderDetail[];
    jobCards?: JobCard[];
}
interface SalesOrderEdge {
    cursor: string;
    node: SalesOrder;
}
interface SalesOrdersConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: SalesOrderEdge[];
    nodes: SalesOrder[];
}

declare class SalesOrdersApi {
    private client;
    constructor(client: GraphQlSdkClient);
    getByNumber(salesOrderNumber: string): Promise<SalesOrder | null>;
    getById(id: string): Promise<SalesOrder | null>;
    list(first?: number, after?: string, before?: string): Promise<SalesOrdersConnection>;
    getWithJobCards(salesOrderNumber: string): Promise<SalesOrder | null>;
    private executeConnection;
}

interface CreditNoteDetail {
    sku: string;
    quantity: number;
}
interface CreditNote {
    id: string;
    creditNoteNumber: string;
    creditNoteDate: string;
    totalExcl: number;
    tax: number;
    assetUri?: string;
    internalId: number;
    creditNoteDetails: CreditNoteDetail[];
}
interface CreditNoteEdge {
    cursor: string;
    node: CreditNote;
}
interface CreditNotesConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: CreditNoteEdge[];
    nodes: CreditNote[];
}

declare class CreditNotesApi {
    private client;
    constructor(client: GraphQlSdkClient);
    getById(id: string): Promise<CreditNote | null>;
    getByNumber(creditNoteNumber: string): Promise<CreditNote | null>;
    list(first?: number, after?: string, before?: string): Promise<CreditNotesConnection>;
    getBySalesOrderNumber(salesOrderNumber: string): Promise<CreditNotesConnection>;
    getByDateRange(startDate: string, endDate: string): Promise<CreditNotesConnection>;
    private executeConnection;
}

declare class JobCardsApi {
    private client;
    constructor(client: GraphQlSdkClient);
    getById(id: string): Promise<JobCard | null>;
    getByNumber(jobCardNumber: string): Promise<JobCard | null>;
    getWithAssetsAndProofs(jobCardNumber: string): Promise<JobCard | null>;
    getBySalesOrderNumber(salesOrderNumber: string): Promise<JobCardsConnection>;
    list(first?: number, after?: string, before?: string): Promise<JobCardsConnection>;
    private getByNumberConnection;
    private executeConnection;
}

type OrderType = "STANDARD" | "DELIVERY" | "LOGO24";
type OrderCollectionType = "COLLECTION_HEAD_OFFICE" | "BRANCH_DELIVERY_COLLECTION" | "COURIER";
type OrderBrandingLogoPositionType = "TOP_LEFT" | "TOP_RIGHT" | "TOP_CENTER" | "MIDDLE_LEFT" | "MIDDLE_CENTER" | "MIDDLE_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_CENTER" | "BOTTOM_RIGHT";
type OrderBrandingLogoSizeType = "WIDTH" | "HEIGHT";
type OrderBrandingColorType = "NONE" | "HEX" | "PANTONE" | "MARATHON";
type JobCardChangeRequestType = "CUSTOMER_REQUEST" | "INSTRUCTION_NOT_FOLLOWED";
interface OrderOptions {
    validateOnly: boolean;
    orderType: OrderType;
    applyInclusiveBranding?: boolean;
}
interface OrderCollection {
    collectionType: OrderCollectionType;
    branchCode?: string;
}
interface OrderContact {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber?: string;
}
interface OrderContactNotificationDetail {
    order: OrderContact;
    branding?: OrderContact;
}
interface OrderContactDetail {
    notifications: OrderContactNotificationDetail;
}
interface BrandingColorInput {
    code: string;
    type: OrderBrandingColorType;
}
interface BrandingMetadataInput {
    key: string;
    value?: string;
}
interface BrandingDetail {
    brandingCode: string;
    position: string;
    logoPosition?: OrderBrandingLogoPositionType;
    logos?: string[];
    logoSize?: number;
    logoSizeType?: OrderBrandingLogoSizeType;
    colors?: BrandingColorInput[];
    metadata?: BrandingMetadataInput[];
    reference?: string;
    specialInstructions?: string;
}
interface OrderLine {
    sku: string;
    quantity: number;
    price?: number;
}
interface OrderGroup {
    id: string;
    items: OrderLine[];
    branding?: BrandingDetail[];
}
interface PlaceOrderInput {
    orderNumber: string;
    options: OrderOptions;
    collection: OrderCollection;
    contact: OrderContactDetail;
    details: OrderGroup[];
}
/** Convenience alias matching the .NET SDK's PlaceOrderRequest; `salesOrderNumber` maps to GraphQL's `orderNumber`. */
type PlaceOrderRequest = Omit<PlaceOrderInput, "orderNumber"> & {
    salesOrderNumber: string;
};
declare function toPlaceOrderInput(request: PlaceOrderRequest): PlaceOrderInput;
interface OrderLineResult {
    name: string;
    quantity: number;
    sku: string;
    unitPrice: number;
}
interface OrderBrandingResult {
    brandingCode: string;
    brandingPosition: string;
    brandingUnitPriceExcl: number;
    description: string;
    dyeChargeExcl?: number;
    dyeChargeName?: string;
    printQuantity: number;
    setupChargeCode?: string;
    setupChargeExcl?: number;
}
interface OrderGroupResult {
    id: string;
    items: OrderLineResult[];
    branding: OrderBrandingResult[];
}
interface OrderItem {
    leadTimeInDays?: number;
    leadTimeInHours?: number;
    orderDate: string;
    orderNumber: string;
    salesOrderNumber?: string;
    totalExcl: number;
    details: OrderGroupResult[];
}
interface OrderWarning {
    code: string;
    message: string;
    warningType: string;
}
interface OrderResult {
    orders: OrderItem[];
    warnings: OrderWarning[];
}
interface PlaceOrderResponse {
    errors: ApiError[];
    placeOrderPayloadType?: OrderResult;
}
interface JobCardBrandingRequest {
    jobCardNumber: string;
    brandingDetail: BrandingDetail;
}
interface UpdateJobCardBrandingRequest {
    masterJobCardNumber: string;
    jobCards: JobCardBrandingRequest[];
}
interface RequestJobCardChangeRequest {
    salesOrderNumber: string;
    changeRequestType: JobCardChangeRequestType;
    jobCards: JobCardBrandingRequest[];
}
interface ApproveJobCardInput {
    jobCardNumber: string;
    proofId: string;
    optionNumber?: number;
}
interface WorkflowMutationResponse {
    errors: ApiError[];
    resultPayloadType?: MutationResult;
}

declare class OrderEntryApi {
    private client;
    constructor(client: GraphQlSdkClient);
    placeOrder(request: PlaceOrderRequest): Promise<PlaceOrderResponse>;
    validateOrder(request: PlaceOrderRequest): Promise<PlaceOrderResponse>;
    private executeOrder;
}

declare class JobCardWorkflowApi {
    private client;
    constructor(client: GraphQlSdkClient);
    approve(input: ApproveJobCardInput): Promise<WorkflowMutationResponse>;
    updateBranding(input: UpdateJobCardBrandingRequest): Promise<WorkflowMutationResponse>;
    requestChange(input: RequestJobCardChangeRequest): Promise<WorkflowMutationResponse>;
}

/** Thrown when the Amrod GraphQL gateway returns a transport-level or GraphQL error response. */
declare class AmrodApiException extends Error {
    readonly statusCode?: number;
    readonly graphQlErrors: string[];
    constructor(message: string, statusCode?: number, graphQlErrors?: string[], options?: {
        cause?: unknown;
    });
}
/** Thrown when acquiring or applying credentials for a gateway request fails. */
declare class AmrodAuthenticationException extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

declare class JwtAuthProvider implements AuthProvider {
    private token;
    constructor(token: string);
    getAccessToken(): Promise<string>;
}

declare class GatewayImpersonationProvider implements ImpersonationProvider {
    private contactId;
    private customerCode;
    constructor(contactId: string, customerCode: string);
    getImpersonationHeader(): Promise<string>;
}

declare class OAuthClientCredentialsProvider implements AuthProvider {
    private tokenUrl;
    private clientId;
    private username;
    private secret;
    private token?;
    private expiresAt?;
    private readonly logger;
    constructor(tokenUrl: string, clientId: string, username: string, secret: string, logger?: Logger);
    getAccessToken(): Promise<string>;
}

declare class AmrodSdk {
    viewer: ViewerApi;
    salesOrders: SalesOrdersApi;
    creditNotes: CreditNotesApi;
    jobCards: JobCardsApi;
    orders: OrderEntryApi;
    jobCardWorkflow: JobCardWorkflowApi;
    constructor(options: SdkOptions);
}

export { AmrodApiException, AmrodAuthenticationException, AmrodSdk, type ApiError, type ApproveJobCardInput, type AuthProvider, type BrandingColorInput, type BrandingDetail, type BrandingMetadataInput, type CreditNote, type CreditNoteDetail, type CreditNoteEdge, type CreditNotesConnection, type Customer, type CustomerContact, GatewayImpersonationProvider, GraphQlSdkClient, type ImpersonationProvider, type ImpersonationScope, type JobCard, type JobCardAsset, type JobCardBrandingDetail, type JobCardBrandingRequest, type JobCardChangeRequestType, type JobCardDate, type JobCardDetail, type JobCardEdge, type JobCardProof, type JobCardProofOption, type JobCardSalesOrder, type JobCardsConnection, JwtAuthProvider, type Logger, type MutationResult, OAuthClientCredentialsProvider, type OrderBrandingColorType, type OrderBrandingLogoPositionType, type OrderBrandingLogoSizeType, type OrderBrandingResult, type OrderCollection, type OrderCollectionType, type OrderContact, type OrderContactDetail, type OrderContactNotificationDetail, type OrderGroup, type OrderGroupResult, type OrderItem, type OrderLine, type OrderLineResult, type OrderOptions, type OrderResult, type OrderType, type OrderWarning, type PageInfo, type PlaceOrderInput, type PlaceOrderRequest, type PlaceOrderResponse, type RequestJobCardChangeRequest, type SalesOrder, type SalesOrderContact, type SalesOrderCustomer, type SalesOrderDetail, type SalesOrderEdge, type SalesOrdersConnection, type SdkOptions, type UpdateJobCardBrandingRequest, type Viewer, type WorkflowMutationResponse, consoleLogger, noopLogger, toPlaceOrderInput };
