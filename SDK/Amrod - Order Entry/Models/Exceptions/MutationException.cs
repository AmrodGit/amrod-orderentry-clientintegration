namespace Amrod.OrderEntry.Models.Exceptions;

public class MutationException(string type, string message, long code) : Exception(message)
{
	public long ErrorCode { get; init; } = code;

	public string ErrorType { get; init; } = type;
}
