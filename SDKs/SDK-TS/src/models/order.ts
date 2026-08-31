import { ApiError, MutationResult } from "./common";

export type OrderType = "STANDARD" | "DELIVERY" | "LOGO24";

export type OrderCollectionType =
  | "COLLECTION_HEAD_OFFICE"
  | "BRANCH_DELIVERY_COLLECTION"
  | "COURIER";

export type OrderBrandingLogoPositionType =
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "TOP_CENTER"
  | "MIDDLE_LEFT"
  | "MIDDLE_CENTER"
  | "MIDDLE_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT";

export type OrderBrandingLogoSizeType = "WIDTH" | "HEIGHT";

export type OrderBrandingColorType = "NONE" | "HEX" | "PANTONE" | "MARATHON";

export type JobCardChangeRequestType =
  | "CUSTOMER_REQUEST"
  | "INSTRUCTION_NOT_FOLLOWED";

export interface OrderOptions {
  validateOnly: boolean;
  orderType: OrderType;
  applyInclusiveBranding?: boolean;
}

export interface OrderCollection {
  collectionType: OrderCollectionType;
  branchCode?: string;
}

export interface OrderContact {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
}

export interface OrderContactNotificationDetail {
  order: OrderContact;
  branding?: OrderContact;
}

export interface OrderContactDetail {
  notifications: OrderContactNotificationDetail;
}

export interface BrandingColorInput {
  code: string;
  type: OrderBrandingColorType;
}

export interface BrandingMetadataInput {
  key: string;
  value?: string;
}

export interface BrandingDetail {
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

export interface OrderLine {
  sku: string;
  quantity: number;
  price?: number;
}

export interface OrderGroup {
  id: string;
  items: OrderLine[];
  branding?: BrandingDetail[];
}

export interface PlaceOrderInput {
  orderNumber: string;
  options: OrderOptions;
  collection: OrderCollection;
  contact: OrderContactDetail;
  details: OrderGroup[];
}

/** Convenience alias matching the .NET SDK's PlaceOrderRequest; `salesOrderNumber` maps to GraphQL's `orderNumber`. */
export type PlaceOrderRequest = Omit<PlaceOrderInput, "orderNumber"> & {
  salesOrderNumber: string;
};

export function toPlaceOrderInput(request: PlaceOrderRequest): PlaceOrderInput {
  const { salesOrderNumber, ...rest } = request;
  return { orderNumber: salesOrderNumber, ...rest };
}

export interface OrderLineResult {
  name: string;
  quantity: number;
  sku: string;
  unitPrice: number;
}

export interface OrderBrandingResult {
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

export interface OrderGroupResult {
  id: string;
  items: OrderLineResult[];
  branding: OrderBrandingResult[];
}

export interface OrderItem {
  leadTimeInDays?: number;
  leadTimeInHours?: number;
  orderDate: string;
  orderNumber: string;
  salesOrderNumber?: string;
  totalExcl: number;
  details: OrderGroupResult[];
}

export interface OrderWarning {
  code: string;
  message: string;
  warningType: string;
}

export interface OrderResult {
  orders: OrderItem[];
  warnings: OrderWarning[];
}

export interface PlaceOrderResponse {
  errors: ApiError[];
  placeOrderPayloadType?: OrderResult;
}

export interface JobCardBrandingRequest {
  jobCardNumber: string;
  brandingDetail: BrandingDetail;
}

export interface UpdateJobCardBrandingRequest {
  masterJobCardNumber: string;
  jobCards: JobCardBrandingRequest[];
}

export interface RequestJobCardChangeRequest {
  salesOrderNumber: string;
  changeRequestType: JobCardChangeRequestType;
  jobCards: JobCardBrandingRequest[];
}

export interface ApproveJobCardInput {
  jobCardNumber: string;
  proofId: string;
  optionNumber?: number;
}

export interface WorkflowMutationResponse {
  errors: ApiError[];
  resultPayloadType?: MutationResult;
}
