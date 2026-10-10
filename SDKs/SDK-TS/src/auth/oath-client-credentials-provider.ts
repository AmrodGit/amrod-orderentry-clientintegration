import { AuthProvider } from "./auth-provider";
import { AmrodAuthenticationException } from "../errors";
import { Logger, noopLogger } from "../logger";

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export class OAuthClientCredentialsProvider implements AuthProvider {
  private token?: string;
  private expiresAt?: number;
  private readonly logger: Logger;

  constructor(
    private tokenUrl: string,
    private clientId: string,
    private username: string,
    private secret: string,
    logger?: Logger
  ) {
    if (!tokenUrl?.trim()) {
      throw new Error("tokenUrl is required.");
    }

    if (!clientId?.trim()) {
      throw new Error("clientId is required.");
    }

    if (!username?.trim()) {
      throw new Error("username is required.");
    }

    if (!secret?.trim()) {
      throw new Error("secret is required.");
    }

    this.logger = logger ?? noopLogger;
  }

  async getAccessToken(): Promise<string> {
    if (
      this.token &&
      this.expiresAt &&
      Date.now() < this.expiresAt
    ) {
      return this.token;
    }

    const clientSecret = Buffer.from(
      `${this.username}:${this.secret}`
    ).toString("base64");

    this.logger.debug(`Requesting OAuth token from ${this.tokenUrl}`);

    let response: Response;

    try {
      response = await fetch(this.tokenUrl, {
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
    } catch (err) {
      this.logger.error(`OAuth token request to ${this.tokenUrl} failed`, err);
      throw new AmrodAuthenticationException(
        "Failed to reach the OAuth token endpoint.",
        { cause: err }
      );
    }

    this.logger.debug(`OAuth token response status: ${response.status}`);

    if (!response.ok) {
      this.logger.error(
        `OAuth token request failed with status ${response.status}`
      );
      throw new AmrodAuthenticationException(
        `OAuth token request failed (${response.status}).`
      );
    }

    let json: TokenResponse;

    try {
      json = await response.json();
    } catch (err) {
      this.logger.error("Failed to deserialize OAuth token response", err);
      throw new AmrodAuthenticationException(
        "Failed to deserialize the OAuth token response.",
        { cause: err }
      );
    }

    if (!json?.access_token) {
      this.logger.error("OAuth token response did not contain an access token");
      throw new AmrodAuthenticationException(
        "OAuth token response did not contain an access token."
      );
    }

    this.token = json.access_token;
    this.expiresAt =
      Date.now() + (json.expires_in - 60) * 1000;

    this.logger.info(
      `OAuth token acquired, expires in ${json.expires_in} seconds`
    );

    return this.token;
  }
}

