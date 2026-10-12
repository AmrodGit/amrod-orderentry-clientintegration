import { GraphQlSdkClient } from "../client";
import { Viewer } from "../models/viewer";

export class ViewerApi {
  constructor(private client: GraphQlSdkClient) {}

  async getViewer(): Promise<Viewer> {
    const query = `
      query Viewer {
        viewer {
          identity
          identityType
          customer {
            code
            name
          }
          customerContact {
            id
            code
            emailAddress
            firstName
            lastName
          }
          impersonationScope {
            code
            name
            customerContacts {
              id
              code
              emailAddress
              firstName
              lastName
            }
          }
        }
      }
    `;

    const response = await this.client.execute<{
      viewer: Viewer;
    }>(query);

    return response.viewer;
  }
}
