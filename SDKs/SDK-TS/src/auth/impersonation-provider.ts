export interface ImpersonationProvider {
  getImpersonationHeader(): Promise<string | null>;
}
