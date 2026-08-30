using System.Net.Http.Headers;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.SystemTextJson;

namespace Amrod.SDK;

public class GraphQlSdkClient
{
    private readonly AmrodSdkOptions _options;

    public GraphQlSdkClient(
        AmrodSdkOptions options)
    {
        _options = options;
    }

    public async Task<T> ExecuteAsync<T>(
        string query,
        object? variables = null)
    {
        var client = new GraphQLHttpClient(
            _options.Endpoint,
            new SystemTextJsonSerializer());

        if (_options.AuthProvider is not null)
        {
            var token = await _options.AuthProvider.GetAccessTokenAsync();
            if (!string.IsNullOrWhiteSpace(token))
            {
                client.HttpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue(
                        "Bearer",
                        token);
            }
        }

        if (_options.ImpersonationProvider is not null)
        {
            var impersonation = await _options.ImpersonationProvider.GetHeaderValueAsync();
            if (!string.IsNullOrWhiteSpace(impersonation))
            {
                client.HttpClient
                    .DefaultRequestHeaders
                    .Add(
                        "x-gateway-impersonate",
                        impersonation);
            }
        }

        var response =
            await client.SendQueryAsync<T>(
                new GraphQLRequest
                {
                    Query = query,
                    Variables = variables
                });

        if (response.Errors is { Length: > 0 })
        {
            var messages = string.Join("; ", response.Errors.Select(e => e.Message));
            throw new InvalidOperationException($"GraphQL errors: {messages}");
        }

        return response.Data;
    }
}
