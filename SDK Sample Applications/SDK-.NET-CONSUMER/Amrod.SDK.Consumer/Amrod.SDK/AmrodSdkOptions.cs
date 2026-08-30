using Amrod.SDK.Auth;

namespace Amrod.SDK;

public class AmrodSdkOptions
{
    public required string Endpoint { get; set; }

    public IAuthProvider? AuthProvider { get; set; }

    public IImpersonationProvider? ImpersonationProvider { get; set; }
}
