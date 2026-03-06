using System.Net;
using Riok.Mapperly.Abstractions;

namespace Amrod.OrderEntry.Models.Mappers;

[Mapper]
internal static partial class ArtworkSessionMapper
{
	[MapProperty(nameof(ICreateArtwork_CreateArtwork_ArtworkSession.Id), nameof(ArtworkSession.ArtworkId))]
	public static partial ArtworkSession ToModel(this ICreateArtwork_CreateArtwork_ArtworkSession artworkSession);
}
