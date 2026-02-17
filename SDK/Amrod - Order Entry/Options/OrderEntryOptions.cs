namespace Amrod.OrderEntry.Options;

public sealed record OrderEntryOptions
{
	public Uri? GatewayUri { get; set; }
	public bool ThrowExceptionOnGatewayError { get; set; } = true;
}
