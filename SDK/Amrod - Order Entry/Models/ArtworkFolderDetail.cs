namespace Amrod.OrderEntry.Models;

public class ArtworkFolderDetail : SharedDetailBase
{
	public string FolderId { get; set; } = null!; // Unique identifier for the artwork folder
	public string Name { get; set; } = null!; // Name of the artwork folder
	public OwnerDetail Owner { get; set; } = null!; // Owner of the artwork folder

	public string Path { get; set; } = null!; // Path to the artwork folder

	public IReadOnlyList<ArtworkFolderDetail> SubFolders { get; set; } = []; // List of subfolders within this folder
}
