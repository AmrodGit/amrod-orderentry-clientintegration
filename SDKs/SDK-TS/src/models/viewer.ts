export interface Customer {
  code: string;
  name: string;
}

export interface CustomerContact {
  id: string;
  code: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
}

export interface ImpersonationScope {
  code: string;
  name: string;
  customerContacts: CustomerContact[];
}

export interface Viewer {
  identity: string;
  identityType: string;
  customer: Customer;
  customerContact: CustomerContact;
  impersonationScope: ImpersonationScope[];
}
