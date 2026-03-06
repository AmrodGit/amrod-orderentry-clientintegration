namespace Amrod.OrderEntry.Models;

/// <summary>
/// Represents a paginated result set, including the data items and metadata about the pagination state.
/// </summary>
/// <remarks>This class is typically used to encapsulate the results of a paginated query, providing both the data
/// items and information about the pagination state, such as cursors and whether additional pages are
/// available.</remarks>
/// <typeparam name="T">The type of the items contained in the result set.</typeparam>
public class PagedResult<T>
{
	/// <summary>
	/// Gets or sets the collection of results.
	/// </summary>
	public IReadOnlyList<T> Result { get; set; } = new List<T>();

	/// <summary>
	/// Gets or sets the state information associated with the object.
	/// </summary>
	public object State { get; set; } = new object(); // Placeholder for any state information, if needed

	/// <summary>
	/// Gets or sets the end cursor for paginated results.
	/// </summary>
	public string? EndCursor { get; set; }

	/// <summary>
	/// Gets or sets the starting cursor for paginated data retrieval.
	/// </summary>
	public string? StartCursor { get; set; }

	/// <summary>
	/// Gets or sets a value indicating whether there is a next page available in the paginated data set.
	/// </summary>
	public bool HasNextPage { get; set; }

	/// <summary>
	/// Gets or sets a value indicating whether there is a previous page available in the current pagination context.
	/// </summary>
	public bool HasPreviousPage { get; set; }
}
