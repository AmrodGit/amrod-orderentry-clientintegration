#pragma warning disable IDE0130 // Namespace does not match folder structure


using Amrod.OrderEntry.Providers;
using Amrod.OrderEntry.Services.LogoLibrary;

namespace Microsoft.Extensions.DependencyInjection;

#pragma warning restore IDE0130 // Namespace does not match folder structure

public static partial class AmrodDataGatewayServiceExtensions
{
	private static readonly SemaphoreSlim _semaphore = new(1, 1);

	/// <summary>
	/// Adds Moyo Asset Storage services to the specified <see cref="IServiceCollection"/>.
	/// </summary>
	public static IServiceCollection AddAmrodDataGateway(
		this IServiceCollection services,
		Action<OrderEntryOptions> options,
		CancellationToken cancellationToken = default
	)
	{
		// Ensure the semaphore is acquired to prevent concurrent initialization
		_semaphore.WaitAsync(cancellationToken).ConfigureAwait(false);

		try
		{
			Guard.Against.Null(services);
			Guard.Against.Null(options);

			var orderEntryOptions = new OrderEntryOptions();
			options.Invoke(orderEntryOptions);

			// Add logging if not already registered
			services.AddLogging();
			services.AddOptions<OrderEntryOptions>();
			services.Configure(options);

			services.AddScoped<GatewayImpersonationProvider>();
			services.AddScoped<GatewayCustomHttpMessageHandler>();
			services.AddScoped<IArtworkService, ArtworkService>();

			services
				.AddAmrodDataGatewayGraphQlClient()
				.ConfigureHttpClient(
					(sp, HttpClient) =>
					{
						HttpClient.BaseAddress = orderEntryOptions.GatewayUri;
					}
				);

			services.AddHttpClient();

			return services;
		}
		finally
		{
			// Release the semaphore to allow other threads to proceed
			_semaphore.Release();
		}
	}
}
