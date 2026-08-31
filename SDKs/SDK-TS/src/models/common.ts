export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export interface ApiError {
  __typename: string;
  code?: string;
  message: string;
  errorDetail?: string;
  parameterName?: string;
  errorType?: string;
  items?: string[];
  requestReference?: string;
}

export interface MutationResult {
  result: boolean;
}
