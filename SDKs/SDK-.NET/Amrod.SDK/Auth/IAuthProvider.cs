namespace Amrod.SDK.Auth;

public interface IAuthProvider
{
    Task<string?> GetAccessTokenAsync(CancellationToken cancellationToken = default);
}
