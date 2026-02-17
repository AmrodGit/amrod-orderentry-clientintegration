using System.Text;
using Amrod.OrderEntry.Providers;

namespace Amrod.OrderEntry;

internal class GatewayCustomHttpMessageHandler(GatewayImpersonationProvider? gatewayImpersonationProvider)
	: DelegatingHandler
{
	protected override async Task<HttpResponseMessage> SendAsync(
		HttpRequestMessage request,
		CancellationToken cancellationToken
	)
	{
		if (gatewayImpersonationProvider is not null)
		{
			// impersonate user if needed
			if (
				!string.IsNullOrWhiteSpace(gatewayImpersonationProvider.CustomerCode)
				&& gatewayImpersonationProvider.ContactCode != Guid.Empty
			)
			{
				request.Headers.Remove("x-gateway-impersonate");

				var impersonation =
					$"{gatewayImpersonationProvider.ContactCode};{gatewayImpersonationProvider.CustomerCode}";
				request.Headers.Add(
					"x-gateway-impersonate",
					Convert.ToBase64String(UTF8Encoding.UTF8.GetBytes(impersonation))
				);
			}
		}

		return await base.SendAsync(request, cancellationToken);
	}
}
