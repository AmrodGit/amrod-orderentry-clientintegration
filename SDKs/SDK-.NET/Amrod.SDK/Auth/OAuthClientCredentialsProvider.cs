using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Amrod.SDK.Auth;

public class OAuthClientCredentialsProvider
    : IAuthProvider
{
    private readonly HttpClient _httpClient;

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
        string secret)
    {
        _httpClient = httpClient;

        _tokenUrl = tokenUrl;
        _clientId = clientId;
        _username = username;
        _secret = secret;
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

        Console.WriteLine($"[OAuth] Requesting token from: {_tokenUrl}");

        var response =
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

        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"[OAuth] Response Status: {response.StatusCode}");

        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException(
                $"OAuth token request failed ({response.StatusCode}): {responseContent}");
        }

        var token =
            JsonSerializer.Deserialize<TokenResponse>(
                responseContent,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (token == null)
        {
            throw new InvalidOperationException(
                $"Failed to deserialize token response: {responseContent}");
        }

        _token = token.AccessToken;

        _expiresAt =
            DateTime.UtcNow.AddSeconds(
                token.ExpiresIn - 60);

        Console.WriteLine($"[OAuth] Token acquired, expires in {token.ExpiresIn} seconds");

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
