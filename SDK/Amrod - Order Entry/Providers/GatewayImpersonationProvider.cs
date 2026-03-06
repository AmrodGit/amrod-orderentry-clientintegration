namespace Amrod.OrderEntry.Providers;

public class GatewayImpersonationProvider
{
	public GatewayImpersonationProvider() { }

	public string CustomerCode { get; set; } = string.Empty;
	public Guid ContactCode { get; set; } = Guid.Empty;
}
