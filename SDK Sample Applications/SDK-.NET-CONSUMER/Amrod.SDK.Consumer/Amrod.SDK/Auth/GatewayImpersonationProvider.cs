using System.Text;

namespace Amrod.SDK.Auth;

public class GatewayImpersonationProvider
    : IImpersonationProvider
{
    private readonly string _contactId;

    private readonly string _customerCode;

    public GatewayImpersonationProvider(
        Guid contactId,
        string customerCode)
        : this(contactId.ToString(), customerCode)
    {
    }

    public GatewayImpersonationProvider(
        string contactId,
        string customerCode)
    {
        _contactId = contactId;
        _customerCode = customerCode;
    }

    public Task<string?> GetHeaderValueAsync()
    {
        var raw =
            $"{_contactId};{_customerCode}";

        var encoded =
            Convert.ToBase64String(
                Encoding.UTF8.GetBytes(raw));

        return Task.FromResult<string?>(
            encoded);
    }
}
