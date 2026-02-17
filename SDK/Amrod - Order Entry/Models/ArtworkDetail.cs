using System.IO;

namespace Amrod.OrderEntry.Models;

public class ArtworkDetail : SharedDetailBase
{
	public string Checksum { get; set; } = null!;
	public DateTimeOffset Created { get; set; }

	public string? Description { get; set; }
	public string Extension { get; set; } = null!;

	public string ArtworkId { get; set; } = null!;

	public string MimeType { get; set; } = null!;
	public string Name { get; set; } = null!;

	public string Path { get; set; } = null!;
	public long Size { get; set; }

	public string SizeFormatted { get; set; } = null!;
	public Uri? ThumbnailUrl { get; set; }

	public ArtworkType Type { get; set; }
	public Uri Url { get; set; } = null!;
	public OwnerDetail Owner { get; set; } = null!;

	public IReadOnlyList<(string Id, string Color, string Name)> Tags { get; set; } =
		new List<(string, string, string)>();
}
