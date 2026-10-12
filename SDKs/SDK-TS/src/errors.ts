/** Thrown when the Amrod GraphQL gateway returns a transport-level or GraphQL error response. */
export class AmrodApiException extends Error {
  public readonly statusCode?: number;
  public readonly graphQlErrors: string[];

  constructor(
    message: string,
    statusCode?: number,
    graphQlErrors: string[] = [],
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = "AmrodApiException";
    this.statusCode = statusCode;
    this.graphQlErrors = graphQlErrors;
  }
}

/** Thrown when acquiring or applying credentials for a gateway request fails. */
export class AmrodAuthenticationException extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AmrodAuthenticationException";
  }
}
