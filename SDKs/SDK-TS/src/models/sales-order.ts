export interface SalesOrderCustomer {
  id: string;
  name: string;
  code: string;
}

export interface SalesOrderContact {
  fullName: string;
  emailAddress: string;
  telephoneNumber: string;
}

export interface SalesOrderDetail {
  rowNumber: number;
  sku: string;
  quantity: number;
  unitPriceExcl: number;
  lineTotalExcl: number;
}

export interface SalesOrder {
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

export interface SalesOrderConnection {
  totalCount: number;
  nodes: SalesOrder[];
}
