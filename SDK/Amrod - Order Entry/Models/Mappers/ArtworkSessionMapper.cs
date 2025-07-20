using Riok.Mapperly.Abstractions;

namespace Amrod.OrderEntry.Models.Mappers;

[Mapper]
internal static partial class ArtworkSessionMapper
{
	public static partial ArtworkSession ToModel(this ICreateArtwork_CreateArtwork_ArtworkSession artworkSession);
}
