using Amrod.OrderEntry.Models;

namespace Amrod.OrderEntry.Services.LogoLibrary;

/// <summary>
/// Provides methods for managing artwork, including creation, updates, tagging, and deletion.
/// </summary>
/// <remarks>This service is designed to handle operations related to artwork management, such as creating new
/// artwork sessions,  updating artwork metadata, tagging artwork, and deleting artwork. It also supports impersonation
/// for customer-specific operations.</remarks>
public interface IArtworkService
{
	void SetImpersonation(string customerCode, Guid contactCode);

	/// <summary>
	/// Asynchronously creates a new artwork and returns the associated session for further operations.
	/// </summary>
	/// <remarks>Use this method to create a new artwork and retrieve a session for managing it. Ensure that the
	/// provided parameters meet the required constraints to avoid exceptions. The returned <see cref="ArtworkSession"/>
	/// can be used to perform additional operations on the created artwork.</remarks>
	/// <param name="artworkName">The name of the artwork to be created. Must not be null or empty.</param>
	/// <param name="artworkDescription">A description of the artwork. Can be null or empty.</param>
	/// <param name="fileExtension">The file extension of the artwork (e.g., ".png", ".jpg"). Must not be null or empty.</param>
	/// <param name="mimeType">The MIME type of the artwork (e.g., "image/png", "image/jpeg"). Must not be null or empty.</param>
	/// <param name="artworkType">The type of the artwork, specifying its category or purpose.</param>
	/// <param name="parentFolderId">The optional ID of the parent folder where the artwork will be created. If null, the artwork will be created in the
	/// default location.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains an <see cref="ArtworkSession"/> object
	/// that provides access to the created artwork and its associated metadata.</returns>
	Task<ArtworkSession> CreateArtworkAsync(
		string artworkName,
		string artworkDescription,
		string fileExtension,
		string mimeType,
		ArtworkType artworkType,
		string? parentFolderId = null,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Commits the current artwork session by associating the specified tags with the artwork.
	/// </summary>
	/// <remarks>This method finalizes the artwork session by persisting the association between the artwork and the
	/// specified tags. If <paramref name="tagIds"/> is null, the artwork will remain untagged.</remarks>
	/// <param name="artworkId">The unique identifier of the artwork to which the tags will be associated.  This parameter cannot be null or empty.</param>
	/// <param name="tagIds">A read-only list of tag identifiers to associate with the artwork.  If null, no tags will be associated.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation. The task completes when the session is successfully committed.</returns>
	Task CommitArtworkSessionAsync(
		string artworkId,
		IReadOnlyList<string>? tagIds,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Updates the details of an existing artwork asynchronously.
	/// </summary>
	/// <remarks>This method allows partial updates to the artwork. If only certain fields need to be updated,  pass
	/// null for the fields that should remain unchanged. Ensure that the <paramref name="artworkId"/>  corresponds to an
	/// existing artwork.</remarks>
	/// <param name="artworkId">The unique identifier of the artwork to update. This parameter cannot be null or empty.</param>
	/// <param name="artworkName">The new name of the artwork. If null, the artwork's name will remain unchanged.</param>
	/// <param name="artworkDescription">The new description of the artwork. If null, the artwork's description will remain unchanged.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task UpdateArtworkAsync(
		string artworkId,
		string? artworkName = null,
		string? artworkDescription = null,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Associates a collection of tags with the specified artwork asynchronously.
	/// </summary>
	/// <remarks>This method updates the tags associated with the specified artwork.  If <paramref name="tagIds"/>
	/// is null, all tags will be removed from the artwork.</remarks>
	/// <param name="artworkId">The unique identifier of the artwork to which the tags will be applied.  This parameter cannot be null or empty.</param>
	/// <param name="tagIds">A read-only list of tag identifiers to associate with the artwork.  If null, any existing tags associated with the
	/// artwork will be removed.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task TagArtworkAsync(
		string artworkId,
		IReadOnlyList<string>? tagIds,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Deletes the artwork with the specified identifier asynchronously.
	/// </summary>
	/// <remarks>Use this method to remove an artwork from the system. Ensure that the specified artwork ID exists
	/// and that the operation is permitted before calling this method.</remarks>
	/// <param name="artworkId">The unique identifier of the artwork to delete. This value cannot be <see langword="null"/> or empty.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task DeleteArtworkAsync(string artworkId, CancellationToken cancellationToken = default);

	Task<PagedResult<ArtworkDetail>> GetArtworksAsync(
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
	);

	/// <summary>
	/// Retrieves the next page of artwork details based on the provided page state.
	/// </summary>
	/// <remarks>The <paramref name="pageState"/> parameter must be a valid state object returned from a previous
	/// paged query. If the state is invalid or represents the end of the pagination, the result may be empty.</remarks>
	/// <param name="pageState">An object representing the current state of pagination. This is used to determine the next page of results.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="PagedResult{T}"/> of <see
	/// cref="ArtworkDetail"/> objects representing the next page of artwork details.</returns>
	Task<PagedResult<ArtworkDetail>> GetNextPageAsync(object pageState, CancellationToken cancellationToken = default);

	/// <summary>
	/// Retrieves the previous page of artwork details based on the provided page state.
	/// </summary>
	/// <remarks>Use this method to navigate to the previous page of artwork details in a paginated collection.
	/// Ensure that the <paramref name="pageState"/> is valid and corresponds to the current pagination context.</remarks>
	/// <param name="pageState">An object representing the current state of pagination. This is used to determine the previous page of results.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="PagedResult{T}"/> of <see
	/// cref="ArtworkDetail"/> representing the previous page of artwork details.</returns>
	Task<PagedResult<ArtworkDetail>> GetPreviousPageAsync(
		object pageState,
		CancellationToken cancellationToken = default
	);
}
