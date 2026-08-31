import { GraphQlSdkClient, SdkOptions } from "./client";
import { ViewerApi } from "./apis/viewer-api";
import { SalesOrdersApi } from "./apis/sales-orders-api";

export class AmrodSdk {
  public viewer: ViewerApi;
  public salesOrders: SalesOrdersApi;

  constructor(options: SdkOptions) {
    const client = new GraphQlSdkClient(options);

    this.viewer = new ViewerApi(client);
    this.salesOrders = new SalesOrdersApi(client);
  }
}

export * from "./models/viewer";
export * from "./models/sales-order";
