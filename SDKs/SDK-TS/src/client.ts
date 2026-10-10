import { GraphQLClient, ClientError } from "graphql-request";
import { AuthProvider } from "./auth/auth-provider";
import { ImpersonationProvider } from "./auth/impersonation-provider";
import { AmrodApiException, AmrodAuthenticationException } from "./errors";
import { Logger, noopLogger } from "./logger";

export interface SdkOptions {
  endpoint: string;
  authProvider?: AuthProvider;
  impersonationProvider?: ImpersonationProvider;
  /** Optional logger used for diagnostic logging of gateway requests. Defaults to no-op logging when omitted. */
  logger?: Logger;
}

export class GraphQlSdkClient {
  private readonly logger: Logger;

  constructor(private options: SdkOptions) {
    if (!options.endpoint?.trim()) {
      throw new Error("options.endpoint is required.");
    }

    this.logger = options.logger ?? noopLogger;
  }

  async execute<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    let token: string | undefined;

    try {
      token = await this.options.authProvider?.getAccessToken();
    } catch (err) {
      if (err instanceof AmrodAuthenticationException) {
        throw err;
      }

      this.logger.error(
        `Failed to acquire access token for endpoint ${this.options.endpoint}`,
        err
      );
      throw new AmrodAuthenticationException(
        "Failed to acquire access token.",
        { cause: err }
      );
    }

    const impersonation =
      await this.options
        .impersonationProvider
        ?.getImpersonationHeader();

    const client = new GraphQLClient(
      this.options.endpoint,
      {
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
          ...(impersonation && {
            "x-gateway-impersonate":
              impersonation,
          }),
        },
      }
    );

    this.logger.debug(`Sending GraphQL request to ${this.options.endpoint}`);

    try {
      return await client.request<T>(query, variables);
    } catch (err) {
      if (err instanceof ClientError) {
        const messages = err.response.errors?.map((e) => e.message) ?? [];

        if (messages.length > 0) {
          for (const message of messages) {
            this.logger.warn(
              `GraphQL error returned from ${this.options.endpoint}: ${message}`
            );
          }

          throw new AmrodApiException(
            `GraphQL errors: ${messages.join("; ")}`,
            err.response.status,
            messages,
            { cause: err }
          );
        }

        this.logger.error(
          `Gateway request to ${this.options.endpoint} failed with status ${err.response.status}`,
          err
        );
        throw new AmrodApiException(
          `Gateway request failed with status ${err.response.status}.`,
          err.response.status,
          [],
          { cause: err }
        );
      }

      this.logger.error(
        `Network error while calling gateway at ${this.options.endpoint}`,
        err
      );
      throw new AmrodApiException(
        "Network error while calling the gateway.",
        undefined,
        [],
        { cause: err }
      );
    }
  }
}

