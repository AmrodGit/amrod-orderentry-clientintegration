namespace Amrod.SDK.Auth;

public interface IAuthProvider
{
    Task<string?> GetAccessTokenAsync();

    Task<string?> GetAccessTokenAsync(CancellationToken cancellationToken) => GetAccessTokenAsync();
}
