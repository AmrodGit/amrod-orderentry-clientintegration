namespace Amrod.OrderEntry;

internal static class GatewayConfigurationProvider
{
	public static OrderEntryOptions? options;

	public static Uri GatewayUri { get; } = options?.GatewayUri ?? new Uri("https://moyo-dgw.dev.amrod.co.za/graphql/");
}
