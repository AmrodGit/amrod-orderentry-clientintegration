using System.Xml.Linq;
using Amrod.OrderEntry.Models;
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

	/// <inheritdoc/>
	public async Task<IReadOnlyList<ArtworkFolderDetail>> GetArtworkFoldersAsync(
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.GetArtworkFolders.ExecuteAsync(cancellationToken: cancellationToken)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		return result!.Data!.ArtworkFolders.Select(folder => folder.ToModel()).ToList().AsReadOnly();
	}

	/// <inheritdoc/>
	public async Task<PagedResult<ArtworkDetail>> GetArtworkFolderContentsAsync(
		string folderPath,
		string? endCursor = null,
		string? startCursor = null,
		int pageSize = 20,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.GetArtworkFolderContents.ExecuteAsync(
				folderPath,
				startCursor is null ? pageSize : null,
				endCursor is null && startCursor is not null ? pageSize : null,
				startCursor,
				startCursor is null ? endCursor : null,
				cancellationToken
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();

		var pagedResult = new PagedResult<ArtworkDetail>
		{
			EndCursor = result!.Data!.ArtworkFolderContents!.PageInfo!.EndCursor,
			StartCursor = result!.Data!.ArtworkFolderContents!.PageInfo!.StartCursor,
			HasNextPage = result!.Data!.ArtworkFolderContents!.PageInfo!.HasNextPage,
			HasPreviousPage = result!.Data!.ArtworkFolderContents!.PageInfo!.HasPreviousPage,
			Result = result!.Data!.ArtworkFolderContents!.Nodes is not null
				? result!.Data!.ArtworkFolderContents!.Nodes.Select(artwork => artwork.ToModel()).ToList().AsReadOnly()
				: [],
		};

		pagedResult.State = new ArtworkFolderContentsPageState(
			folderPath,
			pagedResult.EndCursor,
			pagedResult.StartCursor,
			pagedResult.HasNextPage,
			pagedResult.HasPreviousPage,
			pageSize
		);

		return pagedResult;
	}

	/// <inheritdoc/>
	public async Task<PagedResult<ArtworkDetail>> GetNextPageAsync(
		object pageState,
		CancellationToken cancellationToken = default
	)
	{
		var state =
			(pageState as ArtworkFolderContentsPageState)
			?? throw new ArgumentException("Invalid page state provided.", nameof(pageState));

		return !state.HasNextPage
			? throw new InvalidOperationException("There are no more pages to retrieve.")
			: await GetArtworkFolderContentsAsync(
					state.FolderPath,
					endCursor: state.EndCursor,
					startCursor: null,
					state.PageSize,
					cancellationToken: cancellationToken
				)
				.ConfigureAwait(false);
	}

	/// <inheritdoc/>
	public async Task<PagedResult<ArtworkDetail>> GetPreviousNextPageAsync(
		object pageState,
		CancellationToken cancellationToken = default
	)
	{
		var state =
			(pageState as ArtworkFolderContentsPageState)
			?? throw new ArgumentException("Invalid page state provided.", nameof(pageState));

		return !state.HasNextPage
			? throw new InvalidOperationException("There are no more pages to retrieve.")
			: await GetArtworkFolderContentsAsync(
					state.FolderPath,
					endCursor: null,
					startCursor: state.StartCursor,
					state.PageSize,
					cancellationToken: cancellationToken
				)
				.ConfigureAwait(false);
	}
}
