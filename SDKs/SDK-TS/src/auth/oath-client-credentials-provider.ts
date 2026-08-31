export class OAuthClientCredentialsProvider {
  private token?: string;
  private expiresAt?: number;

  constructor(
    private tokenUrl: string,
    private clientId: string,
    private username: string,
    private secret: string
  ) {}

  async getAccessToken(): Promise<string> {
    if (
      this.token &&
      this.expiresAt &&
      Date.now() < this.expiresAt
    ) {
      return this.token;
    }

    const clientSecret = btoa(
      `${this.username}:${this.secret}`
    );

    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: clientSecret,
        scope: "amrod.integration amrod.gateway",
      }),
    });

    const json = await response.json();

    this.token = json.access_token;
    this.expiresAt =
      Date.now() + (json.expires_in - 60) * 1000;

    return this.token;
  }
}
