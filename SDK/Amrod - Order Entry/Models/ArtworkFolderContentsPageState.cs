namespace Amrod.OrderEntry.Models;

internal sealed record ArtworkFolderContentsPageState(
	string FolderPath,
	string? EndCursor = null,
	string? StartCursor = null,
	bool HasNextPage = false,
	bool HasPreviousPage = false,
	int PageSize = 20
);
