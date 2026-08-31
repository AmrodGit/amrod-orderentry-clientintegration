import { GraphQlSdkClient, SdkOptions } from "./client";
import { ViewerApi } from "./apis/viewer-api";
import { SalesOrdersApi } from "./apis/sales-orders-api";
import { CreditNotesApi } from "./apis/credit-notes-api";
import { JobCardsApi } from "./apis/job-cards-api";
import { OrderEntryApi } from "./apis/order-entry-api";
import { JobCardWorkflowApi } from "./apis/job-card-workflow-api";

export class AmrodSdk {
  public viewer: ViewerApi;
  public salesOrders: SalesOrdersApi;
  public creditNotes: CreditNotesApi;
  public jobCards: JobCardsApi;
  public orders: OrderEntryApi;
  public jobCardWorkflow: JobCardWorkflowApi;

  constructor(options: SdkOptions) {
    const client = new GraphQlSdkClient(options);

    this.viewer = new ViewerApi(client);
    this.salesOrders = new SalesOrdersApi(client);
    this.creditNotes = new CreditNotesApi(client);
    this.jobCards = new JobCardsApi(client);
    this.orders = new OrderEntryApi(client);
    this.jobCardWorkflow = new JobCardWorkflowApi(client);
  }
}

export * from "./client";
export * from "./errors";
export * from "./logger";
export * from "./auth/auth-provider";
export * from "./auth/impersonation-provider";
export * from "./auth/jwt-auth-provider";
export * from "./auth/gateway-impersonation-provider";
export * from "./auth/oath-client-credentials-provider";
export * from "./models/viewer";
export * from "./models/sales-order";
export * from "./models/job-card";
export * from "./models/credit-note";
export * from "./models/common";
export * from "./models/order";
