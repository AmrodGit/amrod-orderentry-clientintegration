using Amrod.SDK.Models;

namespace Amrod.SDK.Apis;

public class ViewerApi
{
    private readonly GraphQlSdkClient _client;

    public ViewerApi(GraphQlSdkClient client)
    {
        _client = client;
    }

    public async Task<Viewer> GetViewerAsync()
    {
        const string query = """
        query {
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
        """;

        var response =
            await _client.ExecuteAsync<
                ViewerResponse>(query);

        return response.Viewer;
    }

    private class ViewerResponse
    {
        public Viewer Viewer { get; set; } = null!;
    }
}
