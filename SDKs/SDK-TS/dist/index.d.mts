interface AuthProvider {
    getAccessToken(): Promise<string>;
}

interface ImpersonationProvider {
    getImpersonationHeader(): Promise<string | null>;
}

interface SdkOptions {
    endpoint: string;
    authProvider?: AuthProvider;
    impersonationProvider?: ImpersonationProvider;
}
declare class GraphQlSdkClient {
    private options;
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
    customer: SalesOrderCustomer;
    contact: SalesOrderContact;
    salesOrderDetails: SalesOrderDetail[];
}
interface SalesOrderConnection {
    totalCount: number;
    nodes: SalesOrder[];
}

declare class SalesOrdersApi {
    private client;
    constructor(client: GraphQlSdkClient);
    getByNumber(salesOrderNumber: string): Promise<SalesOrder | null>;
}

declare class AmrodSdk {
    viewer: ViewerApi;
    salesOrders: SalesOrdersApi;
    constructor(options: SdkOptions);
}

export { AmrodSdk, type Customer, type CustomerContact, type ImpersonationScope, type SalesOrder, type SalesOrderConnection, type SalesOrderContact, type SalesOrderCustomer, type SalesOrderDetail, type Viewer };
