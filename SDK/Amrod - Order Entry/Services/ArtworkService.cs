using Amrod.OrderEntry.Models;
using Amrod.OrderEntry.Providers;
using Microsoft.Extensions.Options;
using StrawberryShake;

namespace Amrod.OrderEntry.Services;

internal class ArtworkService(
	AmrodDataGatewayGraphQlClient amrodDataGatewayGraph,
	GatewayImpersonationProvider gatewayImpersonationProvider,
	IOptions<OrderEntryOptions> orderEntryOptions
) : BaseMutationService, IArtworkService
{
	/// <inheritdoc/>
	public void SetImpersonation(string customerCode, Guid contactCode)
	{
		gatewayImpersonationProvider.CustomerCode = customerCode;
		gatewayImpersonationProvider.ContactCode = contactCode;
	}

	/// <inheritdoc/>
	public async Task<ArtworkSession> CreateArtworkAsync(
		string artworkName,
		string artworkDescription,
		string fileExtension,
		string mimeType,
		ArtworkType artworkType,
		string? parentFolderId = null
	)
	{
		var result = await amrodDataGatewayGraph
			.CreateArtwork.ExecuteAsync(
				new CreateArtworkInput
				{
					Name = artworkName,
					Description = artworkDescription,
					Extension = fileExtension,
					Folder = parentFolderId,
					MimeType = mimeType,
					Type = artworkType,
				},
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		base.EnsureNoErrors(result!.Data?.CreateArtwork.Errors);

		return result!.Data!.CreateArtwork!.ArtworkSession!.ToModel();
	}
}
