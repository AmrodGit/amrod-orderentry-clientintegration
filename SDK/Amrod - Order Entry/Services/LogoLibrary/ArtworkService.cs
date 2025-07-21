using Amrod.OrderEntry.Models;
using Amrod.OrderEntry.Providers;
using Microsoft.Extensions.Options;
using StrawberryShake;

namespace Amrod.OrderEntry.Services.LogoLibrary;

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
		string? parentFolderId = null,
		CancellationToken cancellationToken = default
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
		EnsureNoErrors(result!.Data?.CreateArtwork.Errors);

		return result!.Data!.CreateArtwork!.ArtworkSession!.ToModel();
	}

	/// <inheritdoc/>
	public async Task CommitArtworkSessionAsync(
		string artworkId,
		IReadOnlyList<string>? tagIds,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.CommitArtwork.ExecuteAsync(
				new CommitArtworkInput { Id = artworkId, TagIds = tagIds },
				cancellationToken: cancellationToken
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.CommitArtwork.Errors);
	}

	/// <inheritdoc/>
	public async Task UpdateArtworkAsync(
		string artworkId,
		string? artworkName = null,
		string? artworkDescription = null,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.UpdateArtwork.ExecuteAsync(
				new UpdateArtworkInput
				{
					Id = artworkId,
					Description = artworkDescription,
					Name = artworkName,
				},
				cancellationToken: cancellationToken
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.UpdateArtwork.Errors);
	}

	/// <inheritdoc/>
	public async Task TagArtworkAsync(
		string artworkId,
		IReadOnlyList<string>? tagIds,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.TagArtwork.ExecuteAsync(
				new TagArtworkInput { ArtworkId = artworkId, TagIds = tagIds ?? [] },
				cancellationToken: cancellationToken
			)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.TagArtwork.Errors);
	}

	/// <inheritdoc/>
	public async Task DeleteArtworkAsync(string artworkId, CancellationToken cancellationToken = default)
	{
		var result = await amrodDataGatewayGraph
			.DeleteArtwork.ExecuteAsync(new DeleteArtworkInput { Id = artworkId }, cancellationToken: cancellationToken)
			.ConfigureAwait(false);

		result.EnsureNoErrors();
		EnsureNoErrors(result!.Data?.DeleteArtwork.Errors);
	}

	/// <inheritdoc/>
	public async Task<PagedResult<ArtworkDetail>> GetArtworksAsync(
		string? description = null,
		IReadOnlyList<string>? extensions = null,
		string? name = null,
		IReadOnlyList<ArtworkQueryStatus>? artworkStatuses = null,
		IReadOnlyList<ArtworkType>? artworkTypes = null,
		IReadOnlyList<string>? tagIds = null,
		IReadOnlyList<string>? artworkIds = null,
		string? endCursor = null,
		string? startCursor = null,
		int pageSize = 20,
		CancellationToken cancellationToken = default
	)
	{
		var result = await amrodDataGatewayGraph
			.QueryArtwork.ExecuteAsync(
				description,
				extensions,
				name,
				artworkStatuses,
				tagIds,
				artworkTypes,
				artworkIds,
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
			EndCursor = result!.Data!.ArtworkQuery!.PageInfo!.EndCursor,
			StartCursor = result!.Data!.ArtworkQuery!.PageInfo!.StartCursor,
			HasNextPage = result!.Data!.ArtworkQuery!.PageInfo!.HasNextPage,
			HasPreviousPage = result!.Data!.ArtworkQuery!.PageInfo!.HasPreviousPage,
			Result = result!.Data!.ArtworkQuery!.Nodes is not null
				? result!.Data!.ArtworkQuery!.Nodes.Select(artwork => artwork.ToModel()).ToList().AsReadOnly()
				: [],
		};

		pagedResult.State = new ArtworkPageState(
			description,
			extensions,
			name,
			artworkStatuses,
			artworkTypes,
			tagIds,
			artworkIds,
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
			(pageState as ArtworkPageState)
			?? throw new ArgumentException("Invalid page state provided.", nameof(pageState));

		return !state.HasNextPage
			? throw new InvalidOperationException("There are no more pages to retrieve.")
			: await GetArtworksAsync(
					state.Description,
					state.Extensions,
					state.Name,
					state.ArtworkStatuses,
					state.ArtworkTypes,
					state.TagIds,
					state.ArtworkIds,
					endCursor: state.EndCursor,
					startCursor: null,
					state.PageSize,
					cancellationToken: cancellationToken
				)
				.ConfigureAwait(false);
	}

	/// <inheritdoc/>
	public async Task<PagedResult<ArtworkDetail>> GetPreviousPageAsync(
		object pageState,
		CancellationToken cancellationToken = default
	)
	{
		var state =
			(pageState as ArtworkPageState)
			?? throw new ArgumentException("Invalid page state provided.", nameof(pageState));

		return !state.HasPreviousPage
			? throw new InvalidOperationException("There are no more pages to retrieve.")
			: await GetArtworksAsync(
					state.Description,
					state.Extensions,
					state.Name,
					state.ArtworkStatuses,
					state.ArtworkTypes,
					state.TagIds,
					state.ArtworkIds,
					endCursor: null,
					startCursor: state.StartCursor,
					state.PageSize,
					cancellationToken: cancellationToken
				)
				.ConfigureAwait(false);
	}
}
