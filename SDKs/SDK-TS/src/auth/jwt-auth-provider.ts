import { AuthProvider } from "./auth-provider";

export class JwtAuthProvider implements AuthProvider {
  constructor(private token: string) {
    if (!token?.trim()) {
      throw new Error("token is required.");
    }
  }

  async getAccessToken(): Promise<string> {
    return this.token;
  }
}
