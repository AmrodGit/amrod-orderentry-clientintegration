import { PageInfo } from "./common";

export interface JobCardSalesOrder {
  salesOrderNumber: string;
  customerReference: string;
  status: string;
}

export interface JobCardBrandingDetail {
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

export interface JobCardDate {
  actionDate?: string;
  dueDate?: string;
  leadTime?: number;
}

export interface JobCardAsset {
  id: string;
  name: string;
  type: string;
  url: string;
  assetId?: string;
}

export interface JobCardProofOption {
  number: number;
  isRecommended: boolean;
  pageRange: string;
}

export interface JobCardProof {
  id: string;
  url: string;
  version: number;
  numberOfOptions: number;
  jobCardProofOptions: JobCardProofOption[];
}

export interface JobCardDetail {
  sku: string;
  quantity: number;
}

export interface JobCard {
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

export interface JobCardEdge {
  cursor: string;
  node: JobCard;
}

export interface JobCardsConnection {
  totalCount: number;
  pageInfo: PageInfo;
  edges: JobCardEdge[];
  nodes: JobCard[];
}
