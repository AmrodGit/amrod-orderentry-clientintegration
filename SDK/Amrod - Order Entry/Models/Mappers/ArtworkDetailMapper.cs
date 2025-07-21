using System.Net;
using Riok.Mapperly.Abstractions;

namespace Amrod.OrderEntry.Models.Mappers;

[Mapper]
internal static partial class ArtworkDetailMapper
{
	[MapProperty(nameof(IQueryArtwork_ArtworkQuery_Nodes.Id), nameof(ArtworkDetail.ArtworkId))]
	[MapperIgnoreSource(nameof(IQueryArtwork_ArtworkQuery_Nodes.InternalId))]
	public static partial ArtworkDetail ToModel(this IQueryArtwork_ArtworkQuery_Nodes artwork);
}
