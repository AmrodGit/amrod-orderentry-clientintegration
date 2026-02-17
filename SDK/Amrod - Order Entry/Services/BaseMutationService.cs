using Amrod.OrderEntry.Models.Exceptions;

namespace Amrod.OrderEntry.Services;

internal class BaseMutationService
{
	protected void EnsureNoErrors(IReadOnlyList<object>? errors)
	{
		if (errors is null || errors.Count == 0)
		{
			return;
		}

		var result = errors[0];

		if (result is not null)
		{
			var type = result.GetType();
			var propertyCode = type.GetProperty("Code");
			var propertyName = type.GetProperty("__typename");
			var propertyMessage = type.GetProperty("Message");

			throw new MutationException(
				propertyName?.GetValue(result)?.ToString() ?? "Unknown",
				propertyMessage?.GetValue(result)?.ToString() ?? "Unknown error occurred",
				(long)(propertyCode?.GetValue(result) ?? 0)
			);
		}
	}
}
