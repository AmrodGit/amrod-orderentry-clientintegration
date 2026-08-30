using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amrod.SDK.Exceptions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace Amrod.SDK.Auth;

public class OAuthClientCredentialsProvider
    : IAuthProvider
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<OAuthClientCredentialsProvider> _logger;

    private readonly string _tokenUrl;
    private readonly string _clientId;
    private readonly string _username;
    private readonly string _secret;

    private string? _token;
    private DateTime _expiresAt;

    public OAuthClientCredentialsProvider(
        HttpClient httpClient,
        string tokenUrl,
        string clientId,
        string username,
        string secret,
        ILogger<OAuthClientCredentialsProvider>? logger = null)
    {
        ArgumentNullException.ThrowIfNull(httpClient);
        ArgumentException.ThrowIfNullOrWhiteSpace(tokenUrl);
        ArgumentException.ThrowIfNullOrWhiteSpace(clientId);
        ArgumentException.ThrowIfNullOrWhiteSpace(username);
        ArgumentException.ThrowIfNullOrWhiteSpace(secret);

        _httpClient = httpClient;

        _tokenUrl = tokenUrl;
        _clientId = clientId;
        _username = username;
        _secret = secret;

        _logger = logger ?? NullLogger<OAuthClientCredentialsProvider>.Instance;
    }

    public async Task<string?> GetAccessTokenAsync()
    {
        if (!string.IsNullOrWhiteSpace(_token)
            && DateTime.UtcNow < _expiresAt)
        {
            return _token;
        }

        var clientSecret =
            Convert.ToBase64String(
                Encoding.UTF8.GetBytes(
                    $"{_username}:{_secret}"));

        _logger.LogDebug("Requesting OAuth token from {TokenUrl}", _tokenUrl);

        HttpResponseMessage response;

        try
        {
            response =
                await _httpClient.PostAsync(
                    _tokenUrl,
                    new FormUrlEncodedContent(
                        new Dictionary<string, string>
                        {
                            ["grant_type"] =
                                "client_credentials",

                            ["client_id"] =
                                _clientId,

                            ["client_secret"] =
                                clientSecret,

                            ["scope"] =
                                "amrod.integration amrod.gateway"
                        }));
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
        {
            _logger.LogError(ex, "OAuth token request to {TokenUrl} failed", _tokenUrl);
            throw new AmrodAuthenticationException("Failed to reach the OAuth token endpoint.", ex);
        }

        var responseContent = await response.Content.ReadAsStringAsync();

        _logger.LogDebug("OAuth token response status: {StatusCode}", response.StatusCode);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("OAuth token request failed with status {StatusCode}", response.StatusCode);
            throw new AmrodAuthenticationException(
                $"OAuth token request failed ({response.StatusCode}).");
        }

        TokenResponse? token;

        try
        {
            token =
                JsonSerializer.Deserialize<TokenResponse>(
                    responseContent,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to deserialize OAuth token response");
            throw new AmrodAuthenticationException("Failed to deserialize the OAuth token response.", ex);
        }

        if (token is null || string.IsNullOrWhiteSpace(token.AccessToken))
        {
            _logger.LogError("OAuth token response did not contain an access token");
            throw new AmrodAuthenticationException("OAuth token response did not contain an access token.");
        }

        _token = token.AccessToken;

        _expiresAt =
            DateTime.UtcNow.AddSeconds(
                token.ExpiresIn - 60);

        _logger.LogInformation("OAuth token acquired, expires in {ExpiresIn} seconds", token.ExpiresIn);

        return _token;
    }

    private sealed class TokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = "";

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }
}
