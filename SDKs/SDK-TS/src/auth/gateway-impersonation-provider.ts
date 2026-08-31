import { ImpersonationProvider } from "./impersonation-provider";

export class GatewayImpersonationProvider implements ImpersonationProvider {
  constructor(
    private contactId: string,
    private customerCode: string
  ) {
    if (!contactId?.trim()) {
      throw new Error("contactId is required.");
    }

    if (!customerCode?.trim()) {
      throw new Error("customerCode is required.");
    }
  }

  async getImpersonationHeader(): Promise<string> {
    return Buffer.from(
      `${this.contactId};${this.customerCode}`
    ).toString("base64");
  }
}
