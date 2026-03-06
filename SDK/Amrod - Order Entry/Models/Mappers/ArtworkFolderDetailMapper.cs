using System.Net;
using Riok.Mapperly.Abstractions;

namespace Amrod.OrderEntry.Models.Mappers;

[Mapper]
internal static partial class ArtworkFolderDetailMapper
{
	[MapProperty(nameof(IGetArtworkFolders_ArtworkFolders.Id), nameof(ArtworkFolderDetail.FolderId))]
	[MapProperty(nameof(IGetArtworkFolders_ArtworkFolders.ChildFolders), nameof(ArtworkFolderDetail.SubFolders))]
	public static partial ArtworkFolderDetail ToModel(this IGetArtworkFolders_ArtworkFolders artworkFolder);

	[MapProperty(nameof(IGetArtworkFolders_ArtworkFolders_ChildFolders.Id), nameof(ArtworkFolderDetail.FolderId))]
	public static partial ArtworkFolderDetail ToModel(
		this IGetArtworkFolders_ArtworkFolders_ChildFolders artworkFolder
	);
}
