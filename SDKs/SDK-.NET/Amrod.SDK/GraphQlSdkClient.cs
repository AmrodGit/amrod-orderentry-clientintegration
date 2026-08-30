using System.Net.Http.Headers;
using Amrod.SDK.Exceptions;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.SystemTextJson;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace Amrod.SDK;

public class GraphQlSdkClient
{
    private readonly AmrodSdkOptions _options;
    private readonly ILogger<GraphQlSdkClient> _logger;

    public GraphQlSdkClient(
        AmrodSdkOptions options)
    {
        _options = options;
        _logger = options.LoggerFactory?.CreateLogger<GraphQlSdkClient>()
            ?? NullLogger<GraphQlSdkClient>.Instance;
    }

    public async Task<T> ExecuteAsync<T>(
        string query,
        object? variables = null)
    {
        using var client = new GraphQLHttpClient(
            _options.Endpoint,
            new SystemTextJsonSerializer());

        try
        {
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
        }
        catch (Exception ex) when (ex is not AmrodAuthenticationException)
        {
            _logger.LogError(ex, "Failed to acquire access token for endpoint {Endpoint}", _options.Endpoint);
            throw new AmrodAuthenticationException("Failed to acquire access token.", ex);
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

        GraphQLResponse<T> response;

        try
        {
            _logger.LogDebug("Sending GraphQL request to {Endpoint}", _options.Endpoint);

            response =
                await client.SendQueryAsync<T>(
                    new GraphQLRequest
                    {
                        Query = query,
                        Variables = variables
                    });
        }
        catch (GraphQLHttpRequestException ex)
        {
            _logger.LogError(ex, "Gateway request to {Endpoint} failed with status {StatusCode}", _options.Endpoint, (int)ex.StatusCode);
            throw new AmrodApiException($"Gateway request failed with status {(int)ex.StatusCode}.", (int)ex.StatusCode, innerException: ex);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Network error while calling gateway at {Endpoint}", _options.Endpoint);
            throw new AmrodApiException("Network error while calling the gateway.", innerException: ex);
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogError(ex, "Gateway request to {Endpoint} timed out", _options.Endpoint);
            throw new AmrodApiException("Gateway request timed out.", innerException: ex);
        }

        if (response.Errors is { Length: > 0 })
        {
            var messages = response.Errors.Select(e => e.Message).ToList();

            foreach (var message in messages)
            {
                _logger.LogWarning("GraphQL error returned from {Endpoint}: {Message}", _options.Endpoint, message);
            }

            throw new AmrodApiException($"GraphQL errors: {string.Join("; ", messages)}", graphQlErrors: messages);
        }

        return response.Data;
    }
}
