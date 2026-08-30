namespace Amrod.SDK.Exceptions;

/// <summary>Thrown when the Amrod GraphQL gateway returns a transport-level or GraphQL error response.</summary>
public class AmrodApiException : Exception
{
    public int? StatusCode { get; }

    public IReadOnlyList<string> GraphQlErrors { get; }

    public AmrodApiException(string message, int? statusCode = null, IReadOnlyList<string>? graphQlErrors = null, Exception? innerException = null)
        : base(message, innerException)
    {
        StatusCode = statusCode;
        GraphQlErrors = graphQlErrors ?? [];
    }
}
