namespace Amrod.SDK.Models;

public class SalesOrder
{
    public string Id { get; set; } = "";
    public string SalesOrderNumber { get; set; } = "";
    public string CustomerReference { get; set; } = "";
    public string OrderDate { get; set; } = "";
    public string Status { get; set; } = "";

    public decimal TotalExcl { get; set; }

    public decimal Tax { get; set; }

    public decimal BalanceOutstanding { get; set; }

    public bool IsPaid { get; set; }

    public bool IsActive { get; set; }

    public string LastModifiedDate { get; set; } = "";

    public SalesOrderCustomer Customer
    {
        get;
        set;
    } = null!;

    public SalesOrderContact Contact
    {
        get;
        set;
    } = null!;

    public List<SalesOrderDetail> SalesOrderDetails
    {
        get;
        set;
    } = [];

    public List<JobCard> JobCards { get; set; } = [];
}

public class SalesOrderCustomer
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string Code { get; set; } = "";
}

public class SalesOrderContact
{
    public string FullName { get; set; } = "";
    public string EmailAddress { get; set; } = "";
    public string TelephoneNumber { get; set; } = "";
}

public class SalesOrderDetail
{
    public int RowNumber { get; set; }

    public string Sku { get; set; } = "";

    public decimal Quantity { get; set; }

    public decimal UnitPriceExcl { get; set; }

    public decimal LineTotalExcl { get; set; }
}
