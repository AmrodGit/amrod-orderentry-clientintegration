namespace Amrod.OrderEntry.Models;

internal sealed record ArtworkPageState(
	string? Description = null,
	IReadOnlyList<string>? Extensions = null,
	string? Name = null,
	IReadOnlyList<ArtworkQueryStatus>? ArtworkStatuses = null,
	IReadOnlyList<ArtworkType>? ArtworkTypes = null,
	IReadOnlyList<string>? TagIds = null,
	IReadOnlyList<string>? ArtworkIds = null,
	string? EndCursor = null,
	string? StartCursor = null,
	bool HasNextPage = false,
	bool HasPreviousPage = false,
	int PageSize = 20
);
