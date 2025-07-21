namespace Amrod.OrderEntry.Models;

/// <summary>
/// Represents a session for uploading artwork, including the artwork's identifier, upload URI, and associated headers.
/// </summary>
/// <param name="ArtworkId">The unique identifier for the artwork being uploaded. This value cannot be null or empty.</param>
/// <param name="UploadUri">The URI to which the artwork should be uploaded. This value must be a valid, non-null URI.</param>
/// <param name="Headers">A collection of headers to include with the upload request. This value cannot be null but may be an empty list.</param>
public sealed record ArtworkSession(string ArtworkId, Uri UploadUri, List<ArtworkSessionHeader> Headers);
