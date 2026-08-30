using Amrod.SDK.Auth;
using Microsoft.Extensions.Logging;

namespace Amrod.SDK;

public class AmrodSdkOptions
{
    public required string Endpoint { get; set; }

    public IAuthProvider? AuthProvider { get; set; }

    public IImpersonationProvider? ImpersonationProvider { get; set; }

    /// <summary>Optional logger factory used for diagnostic logging of gateway requests. Defaults to no-op logging when omitted.</summary>
    public ILoggerFactory? LoggerFactory { get; set; }
}
