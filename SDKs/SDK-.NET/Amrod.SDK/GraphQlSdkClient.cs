using System.Net.Http.Headers;
using Amrod.SDK.Exceptions;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.SystemTextJson;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace Amrod.SDK;

public class GraphQlSdkClient : IDisposable
{
    private readonly AmrodSdkOptions _options;
    private readonly ILogger<GraphQlSdkClient> _logger;
    private readonly GraphQLHttpClient _client;

    public GraphQlSdkClient(
        AmrodSdkOptions options)
    {
        _options = options;
        _client = new GraphQLHttpClient(
            _options.Endpoint,
            new SystemTextJsonSerializer());
        _logger = options.LoggerFactory?.CreateLogger<GraphQlSdkClient>()
            ?? NullLogger<GraphQlSdkClient>.Instance;
    }

    public async Task<T> ExecuteAsync<T>(
        string query,
        object? variables = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            if (_options.AuthProvider is not null)
            {
                var token = await _options.AuthProvider.GetAccessTokenAsync(cancellationToken).ConfigureAwait(false);
                _client.HttpClient.DefaultRequestHeaders.Authorization =
                    string.IsNullOrWhiteSpace(token)
                        ? null
                        : new AuthenticationHeaderValue("Bearer", token);
            }
        }
        catch (AmrodAuthenticationException)
        {
            throw;
        }
        catch (OperationCanceledException ex)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                throw;
            }

            _logger.LogError(ex, "Failed to acquire access token for endpoint {Endpoint}", _options.Endpoint);
            throw new AmrodAuthenticationException("Failed to acquire access token.", ex);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to acquire access token for endpoint {Endpoint}", _options.Endpoint);
            throw new AmrodAuthenticationException("Failed to acquire access token.", ex);
        }

        if (_options.ImpersonationProvider is not null)
        {
            string? impersonation;
            try
            {
                impersonation = await _options.ImpersonationProvider.GetHeaderValueAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (AmrodAuthenticationException)
            {
                throw;
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to acquire impersonation header for endpoint {Endpoint}", _options.Endpoint);
                throw new AmrodAuthenticationException("Failed to acquire impersonation header.", ex);
            }

            _client.HttpClient.DefaultRequestHeaders.Remove("x-gateway-impersonate");
            if (!string.IsNullOrWhiteSpace(impersonation))
            {
                _client.HttpClient
                    .DefaultRequestHeaders
                    .TryAddWithoutValidation(
                        "x-gateway-impersonate",
                        impersonation);
            }
        }
        else
        {
            _client.HttpClient.DefaultRequestHeaders.Remove("x-gateway-impersonate");
        }

        GraphQLResponse<T> response;

        try
        {
            _logger.LogDebug("Sending GraphQL request to {Endpoint}", _options.Endpoint);

            response =
                await _client.SendQueryAsync<T>(
                    new GraphQLRequest
                    {
                        Query = query,
                        Variables = variables
                    },
                    cancellationToken).ConfigureAwait(false);
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
            if (cancellationToken.IsCancellationRequested)
            {
                throw;
            }

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

    public void Dispose() => _client.Dispose();
}
