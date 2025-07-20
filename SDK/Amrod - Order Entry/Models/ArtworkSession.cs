namespace Amrod.OrderEntry.Models;

public sealed record ArtworkSession(string Id, Uri UploadUri, List<ArtworkSessionHeader> Headers);
