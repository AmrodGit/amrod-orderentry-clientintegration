namespace Amrod.SDK;

public class PlaceOrderRequest : Models.PlaceOrderInput
{
    public string SalesOrderNumber
    {
        get => OrderNumber;
        set => OrderNumber = value;
    }
}