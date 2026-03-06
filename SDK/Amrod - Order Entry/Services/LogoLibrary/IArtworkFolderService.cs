using Amrod.OrderEntry.Models;

namespace Amrod.OrderEntry.Services.LogoLibrary;

/// <summary>
/// Provides methods for managing artwork folders and their contents.
/// </summary>
/// <remarks>This service allows for creating, deleting, renaming, and moving artwork folders, as well as
/// retrieving folder details and contents. It also supports paginated navigation of artwork folder contents.</remarks>
public interface IArtworkFolderService
{
	/// <summary>
	/// Creates a new artwork folder with the specified name and optional parent folder.
	/// </summary>
	/// <remarks>The folder name must be unique within the specified parent folder. If a folder with the same name
	/// already exists, the behavior is undefined.</remarks>
	/// <param name="folderName">The name of the folder to create. This value cannot be null or empty.</param>
	/// <param name="parentFolderId">The ID of the parent folder under which the new folder will be created. If null, the folder will be created at the
	/// root level.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A tuple containing the ID of the created folder and its full path.</returns>
	Task<(string FolderId, string FolderPath)> CreateArtworkFolderAsync(
		string folderName,
		string? parentFolderId = null,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Deletes the artwork folder with the specified identifier.
	/// </summary>
	/// <remarks>If the specified folder does not exist, the operation completes without throwing an exception.
	/// Ensure that the caller has the necessary permissions to delete the folder.</remarks>
	/// <param name="folderId">The unique identifier of the folder to delete. This value cannot be null or empty.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task DeleteArtworkFolderAsync(string folderId, CancellationToken cancellationToken = default);

	/// <summary>
	/// Renames an existing artwork folder to the specified new name.
	/// </summary>
	/// <remarks>Ensure that the <paramref name="folderId"/> corresponds to a valid folder and that the <paramref
	/// name="newFolderName"/> adheres to any naming constraints imposed by the system. If the operation fails, an
	/// exception may be thrown.</remarks>
	/// <param name="folderId">The unique identifier of the folder to rename. Cannot be null or empty.</param>
	/// <param name="newFolderName">The new name to assign to the folder. Cannot be null, empty, or consist only of whitespace.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task RenameArtworkFolderAsync(string folderId, string newFolderName, CancellationToken cancellationToken = default);

	/// <summary>
	/// Moves an artwork folder to a new parent folder asynchronously.
	/// </summary>
	/// <remarks>This method performs the folder move operation asynchronously. Ensure that the specified folder and
	/// parent folder exist and that the user has the necessary permissions to perform the operation.</remarks>
	/// <param name="folderId">The unique identifier of the folder to be moved. This parameter cannot be null or empty.</param>
	/// <param name="newParentFolderId">The unique identifier of the new parent folder. If null, the folder will be moved to the root level.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task MoveArtworkFolderAsync(
		string folderId,
		string? newParentFolderId = null,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Asynchronously retrieves a list of artwork folder details.
	/// </summary>
	/// <remarks>This method retrieves metadata about artwork folders, which may include information such as folder
	/// names,  paths, or other relevant details. The operation is asynchronous and can be canceled using the provided
	/// <paramref name="cancellationToken"/>.</remarks>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a read-only list of  <see
	/// cref="ArtworkFolderDetail"/> objects representing the details of the artwork folders.</returns>
	Task<IReadOnlyList<ArtworkFolderDetail>> GetArtworkFoldersAsync(CancellationToken cancellationToken = default);

	/// <summary>
	/// Retrieves the contents of an artwork folder as a paginated result.
	/// </summary>
	/// <remarks>This method retrieves artwork details from the specified folder in a paginated manner. Use the
	/// <paramref name="startCursor"/> and <paramref name="endCursor"/> parameters to navigate through the folder's
	/// contents.</remarks>
	/// <param name="folderPath">The path to the folder containing the artwork. This cannot be null or empty.</param>
	/// <param name="endCursor">An optional cursor indicating the end of the range of items to retrieve. If null, the range starts from the
	/// beginning.</param>
	/// <param name="startCursor">An optional cursor indicating the start of the range of items to retrieve. If null, the range starts from the
	/// beginning.</param>
	/// <param name="pageSize">The maximum number of items to include in a single page of results. Must be greater than 0. The default is 20.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="PagedResult{T}"/> of <see
	/// cref="ArtworkDetail"/> objects representing the contents of the folder.</returns>
	Task<PagedResult<ArtworkDetail>> GetArtworkFolderContentsAsync(
		string folderPath,
		string? endCursor = null,
		string? startCursor = null,
		int pageSize = 20,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Retrieves the next page of artwork details based on the provided page state.
	/// </summary>
	/// <remarks>The <paramref name="pageState"/> parameter must be a valid object that represents the current
	/// pagination state. Ensure that the state is correctly maintained between calls to avoid unexpected
	/// results.</remarks>
	/// <param name="pageState">An object representing the current state of pagination. This is used to determine the next page to retrieve.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None"/>.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="PagedResult{T}"/> of <see
	/// cref="ArtworkDetail"/> objects representing the next page of results.</returns>
	Task<PagedResult<ArtworkDetail>> GetNextPageAsync(object pageState, CancellationToken cancellationToken = default);

	/// <summary>
	/// Retrieves the previous or next page of artwork details based on the provided page state.
	/// </summary>
	/// <remarks>The <paramref name="pageState"/> parameter must be a valid representation of the current pagination
	/// state. If the state is invalid or incomplete, the behavior of the method is undefined.</remarks>
	/// <param name="pageState">An object representing the current state of pagination. This is used to determine the next or previous page to
	/// retrieve.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A <see cref="PagedResult{T}"/> containing a collection of <see cref="ArtworkDetail"/> objects for the requested
	/// page.</returns>
	Task<PagedResult<ArtworkDetail>> GetPreviousNextPageAsync(
		object pageState,
		CancellationToken cancellationToken = default
	);
}
