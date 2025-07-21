using Amrod.OrderEntry.Models;
using Amrod.OrderEntry.Providers;
using Microsoft.Extensions.Options;
using StrawberryShake;

namespace Amrod.OrderEntry.Services.LogoLibrary;

internal class ArtworkTagService(
	AmrodDataGatewayGraphQlClient amrodDataGatewayGraph,
	GatewayImpersonationProvider gatewayImpersonationProvider,
	IOptions<OrderEntryOptions> orderEntryOptions
) : BaseMutationService, IArtworkTagService
{
	/// <inheritdoc/>
	public async Task<string> CreateArtworkTagAsync(
		string tagName,
		string tagColor,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.CreateArtworkTag.ExecuteAsync(
				new CreateArtworkTagInput { Name = tagName, Color = tagColor },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.CreateArtworkTag.Errors);

		return result!.Data!.CreateArtworkTag!.ArtworkTag!.Id;
	}

	/// <inheritdoc/>
	public async Task DeleteArtworkTagAsync(
		string tagId,
		bool force = false,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.DeleteArtworkTag.ExecuteAsync(
				new DeleteArtworkTagInput { Id = tagId, Force = force },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.DeleteArtworkTag.Errors);
	}

	/// <inheritdoc/>
	public async Task UpdateArtworkTagAsync(
		string tagId,
		string? tagName = null,
		string? tagColor = null,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.UpdateArtworkTag.ExecuteAsync(
				new UpdateArtworkTagInput
				{
					Id = tagId,
					Name = tagName,
					Color = tagColor,
				},
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.UpdateArtworkTag.Errors);
	}

	/// <inheritdoc/>
	public async Task<IReadOnlyList<ArtworkTagDetail>> GetArtworkTagsAsync(
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.GetArtowrkTags.ExecuteAsync(cancellationToken: default)
			.ConfigureAwait(false);

		result.EnsureNoErrors();

		return result!.Data!.ArtworkTags!.Select(tag => tag.ToModel()).ToList().AsReadOnly();
	}
}
