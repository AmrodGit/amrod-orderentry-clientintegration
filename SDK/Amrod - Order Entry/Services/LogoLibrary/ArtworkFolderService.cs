using Amrod.OrderEntry.Providers;
using Microsoft.Extensions.Options;
using StrawberryShake;

namespace Amrod.OrderEntry.Services.LogoLibrary;

internal class ArtworkFolderService(
	AmrodDataGatewayGraphQlClient amrodDataGatewayGraph,
	GatewayImpersonationProvider gatewayImpersonationProvider,
	IOptions<OrderEntryOptions> orderEntryOptions
) : BaseMutationService, IArtworkFolderService
{
	/// <inheritdoc/>
	public async Task<(string FolderId, string FolderPath)> CreateArtworkFolderAsync(
		string folderName,
		string? parentFolderId = null,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.CreateArtworkFolder.ExecuteAsync(
				new CreateArtworkFolderInput { Name = folderName, ParentId = parentFolderId },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.CreateArtworkFolder.Errors);

		var folder = result!.Data!.CreateArtworkFolder!.ArtworkFolderDetails!;

		return (folder.Id, folder.Path);
	}

	/// <inheritdoc/>
	public async Task DeleteArtworkFolderAsync(string folderId, CancellationToken cancellationToken = default)
	{
		var result = await amrodDataGatewayGraph
			.DeleteArtworkFolder.ExecuteAsync(
				new DeleteArtworkFolderInput { Id = folderId },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.DeleteArtworkFolder.Errors);
	}

	/// <inheritdoc/>
	public async Task MoveArtworkFolderAsync(
		string folderId,
		string? newParentFolderId = null,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.MoveArtworkFolder.ExecuteAsync(
				new MoveArtworkFolderInput { Id = folderId, ParentId = newParentFolderId },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.MoveArtworkFolder.Errors);
	}

	/// <inheritdoc/>
	public async Task RenameArtworkFolderAsync(
		string folderId,
		string newFolderName,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.RenameArtworkFolder.ExecuteAsync(
				new RenameArtworkFolderInput { Id = folderId, Name = newFolderName },
				cancellationToken: default
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.RenameArtworkFolder.Errors);
	}
}
