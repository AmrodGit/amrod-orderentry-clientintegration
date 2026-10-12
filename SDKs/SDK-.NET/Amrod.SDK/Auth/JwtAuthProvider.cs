namespace Amrod.SDK.Auth;

public class JwtAuthProvider : IAuthProvider
{
    private readonly string _token;

    public JwtAuthProvider(string token)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(token);

        _token = token;
    }

    public Task<string?> GetAccessTokenAsync(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return Task.FromResult<string?>(_token);
    }
}
