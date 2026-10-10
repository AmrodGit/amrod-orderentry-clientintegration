namespace Amrod.SDK.Auth;

public interface IImpersonationProvider
{
    Task<string?> GetHeaderValueAsync();

    Task<string?> GetHeaderValueAsync(CancellationToken cancellationToken) => GetHeaderValueAsync();
}
