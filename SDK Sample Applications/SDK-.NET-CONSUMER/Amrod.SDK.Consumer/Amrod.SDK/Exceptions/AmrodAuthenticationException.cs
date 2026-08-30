namespace Amrod.SDK.Exceptions;

/// <summary>Thrown when acquiring or applying credentials for a gateway request fails.</summary>
public class AmrodAuthenticationException : Exception
{
    public AmrodAuthenticationException(string message, Exception? innerException = null)
        : base(message, innerException)
    {
    }
}
