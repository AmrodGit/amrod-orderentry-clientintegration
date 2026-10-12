import { PageInfo } from "./common";

export interface CreditNoteDetail {
  sku: string;
  quantity: number;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  creditNoteDate: string;
  totalExcl: number;
  tax: number;
  assetUri?: string;
  internalId: number;
  creditNoteDetails: CreditNoteDetail[];
}

export interface CreditNoteEdge {
  cursor: string;
  node: CreditNote;
}

export interface CreditNotesConnection {
  totalCount: number;
  pageInfo: PageInfo;
  edges: CreditNoteEdge[];
  nodes: CreditNote[];
}
