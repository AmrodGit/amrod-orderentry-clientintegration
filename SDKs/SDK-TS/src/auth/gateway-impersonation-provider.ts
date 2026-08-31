export class GatewayImpersonationProvider {
  constructor(
    private contactId: string,
    private customerCode: string
  ) {}

  async getImpersonationHeader(): Promise<string> {
    return Buffer.from(
      `${this.contactId};${this.customerCode}`
    ).toString("base64");
  }
}
