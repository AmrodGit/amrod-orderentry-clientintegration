namespace Amrod.SDK.Models;

public class Customer
{
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
}

public class CustomerContact
{
    public string Id { get; set; } = "";
    public string Code { get; set; } = "";
    public string EmailAddress { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}

public class ImpersonationScope
{
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";

    public List<CustomerContact> CustomerContacts
    {
        get;
        set;
    } = [];
}

public class Viewer
{
    public string Identity { get; set; } = "";

    public string IdentityType { get; set; } = "";

    public Customer Customer { get; set; } = null!;

    public CustomerContact CustomerContact
    {
        get;
        set;
    } = null!;

    public List<ImpersonationScope> ImpersonationScope
    {
        get;
        set;
    } = [];
}
