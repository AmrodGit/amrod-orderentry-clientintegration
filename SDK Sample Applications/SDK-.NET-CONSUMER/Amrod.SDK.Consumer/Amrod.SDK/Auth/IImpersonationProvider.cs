namespace Amrod.SDK.Auth;

public interface IImpersonationProvider
{
    Task<string?> GetHeaderValueAsync();
}
