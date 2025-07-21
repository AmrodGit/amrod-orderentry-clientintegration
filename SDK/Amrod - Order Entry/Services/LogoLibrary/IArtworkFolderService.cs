namespace Amrod.OrderEntry.Services.LogoLibrary;

public interface IArtworkFolderService
{
	Task<(string FolderId, string FolderPath)> CreateArtworkFolderAsync(
		string folderName,
		string? parentFolderId = null,
		CancellationToken cancellationToken = default
	);

	Task DeleteArtworkFolderAsync(string folderId, CancellationToken cancellationToken = default);

	Task RenameArtworkFolderAsync(string folderId, string newFolderName, CancellationToken cancellationToken = default);

	Task MoveArtworkFolderAsync(
		string folderId,
		string? newParentFolderId = null,
		CancellationToken cancellationToken = default
	);
}
