using Amrod.OrderEntry.Models;

namespace Amrod.OrderEntry.Services;

public interface IArtworkService
{
	void SetImpersonation(string customerCode, Guid contactCode);

	Task<ArtworkSession> CreateArtworkAsync(
		string artworkName,
		string artworkDescription,
		string fileExtension,
		string mimeType,
		ArtworkType artworkType,
		string? parentFolderId = null
	);
}
