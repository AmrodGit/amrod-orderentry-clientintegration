using Amrod.OrderEntry.Models;

namespace Amrod.OrderEntry.Services.LogoLibrary;

/// <summary>
/// Provides methods for managing artwork tags, including creation, updating, and deletion.
/// </summary>
/// <remarks>This service allows clients to create, update, and delete tags associated with artwork.  Tags can
/// have a name and a color, and operations are asynchronous to support non-blocking workflows.</remarks>
public interface IArtworkTagService
{
	/// <summary>
	/// Creates a new artwork tag with the specified name and color.
	/// </summary>
	/// <param name="tagName">The name of the tag to create. Cannot be null or empty.</param>
	/// <param name="tagColor">The color of the tag, specified as a string. Must be a valid color representation.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains the unique identifier of the created
	/// tag.</returns>
	Task<string> CreateArtworkTagAsync(string tagName, string tagColor, CancellationToken cancellationToken = default);

	/// <summary>
	/// Updates the properties of an artwork tag asynchronously.
	/// </summary>
	/// <remarks>Use this method to modify the properties of an existing artwork tag. Ensure that the <paramref
	/// name="tagId"/> corresponds to a valid tag in the system.</remarks>
	/// <param name="tagId">The unique identifier of the tag to update. Cannot be null or empty.</param>
	/// <param name="tagColor">The new color of the tag, specified as a string. Cannot be null or empty.</param>
	/// <param name="tagName">The new name of the tag. If null, the tag's name will remain unchanged.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task UpdateArtworkTagAsync(
		string tagId,
		string tagColor,
		string? tagName = null,
		CancellationToken cancellationToken = default
	);

	/// <summary>
	/// Deletes an artwork tag identified by the specified tag ID.
	/// </summary>
	/// <remarks>Use this method to remove tags associated with artwork. Ensure that the tag is not in use or set
	/// <paramref name="force"/> to <see langword="true"/> to override.</remarks>
	/// <param name="tagId">The unique identifier of the tag to delete. This value cannot be null or empty.</param>
	/// <param name="force">A boolean value indicating whether to force the deletion of the tag.  If <see langword="true"/>, the tag will be
	/// deleted even if it is in use; otherwise, the deletion will fail if the tag is in use.</param>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task DeleteArtworkTagAsync(string tagId, bool force = false, CancellationToken cancellationToken = default);

	/// <summary>
	/// Retrieves a list of artwork tags with their associated details.
	/// </summary>
	/// <remarks>The returned list may be empty if no artwork tags are available. This method does not return
	/// null.</remarks>
	/// <param name="cancellationToken">A token to monitor for cancellation requests. The operation will be canceled if the token is triggered.</param>
	/// <returns>A task that represents the asynchronous operation. The task result contains a read-only list of  <see
	/// cref="ArtworkTagDetail"/> objects, each representing the details of an artwork tag.</returns>
	Task<IReadOnlyList<ArtworkTagDetail>> GetArtworkTagsAsync(CancellationToken cancellationToken = default);
}
