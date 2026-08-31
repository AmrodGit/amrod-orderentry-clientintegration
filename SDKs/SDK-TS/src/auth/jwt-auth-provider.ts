import { AuthProvider } from "./auth-provider";

export class JwtAuthProvider implements AuthProvider {
  constructor(private token: string) {}

  async getAccessToken(): Promise<string> {
    return this.token;
  }
}
