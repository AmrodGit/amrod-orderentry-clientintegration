using System.Net;
using Riok.Mapperly.Abstractions;

namespace Amrod.OrderEntry.Models.Mappers;

[Mapper]
internal static partial class ArtworkTagDetailMapper
{
	[MapProperty(nameof(IGetArtowrkTags_ArtworkTags.Id), nameof(ArtworkTagDetail.TagId))]
	[MapperIgnoreTarget(nameof(ArtworkTagDetail.CanMove))]
	[MapperIgnoreTarget(nameof(ArtworkTagDetail.CanShare))]
	[MapValue(nameof(ArtworkTagDetail.CanDelete), Use = nameof(TrueValue))]
	public static partial ArtworkTagDetail ToModel(this IGetArtowrkTags_ArtworkTags artworkTag);

	private static bool TrueValue() => true;
}
