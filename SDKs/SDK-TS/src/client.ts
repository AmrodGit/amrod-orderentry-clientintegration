import { GraphQLClient } from "graphql-request";
import { AuthProvider } from "./auth/auth-provider";
import { ImpersonationProvider } from "./auth/impersonation-provider";

export interface SdkOptions {
  endpoint: string;
  authProvider?: AuthProvider;
  impersonationProvider?: ImpersonationProvider;
}

export class GraphQlSdkClient {
  constructor(private options: SdkOptions) {}

  async execute<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const token =
      await this.options.authProvider?.getAccessToken();

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

    return client.request<T>(
      query,
      variables
    );
  }
}
