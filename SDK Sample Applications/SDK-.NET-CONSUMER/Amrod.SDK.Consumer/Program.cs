using Amrod.SDK;
using Amrod.SDK.Auth;
using Amrod.SDK.Models;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

var authProvider =
    new OAuthClientCredentialsProvider(
        new HttpClient(),
        configuration["Amrod:TokenUrl"]!,
        configuration["Amrod:ClientId"]!,
        configuration["Amrod:Username"]!,
        configuration["Amrod:Secret"]!);

var sdk = new AmrodSdk(
    new AmrodSdkOptions
    {
        Endpoint = configuration["Amrod:GraphQlUrl"]!,
        AuthProvider = authProvider
    });

var token = await authProvider.GetAccessTokenAsync();

Console.WriteLine($"Token received: {!string.IsNullOrEmpty(token)}");
Console.WriteLine(token?[..Math.Min(50, token.Length)]);

if (string.IsNullOrEmpty(token))
{
    Console.WriteLine("ERROR: No token received from OAuth provider");
    return;
}

Console.WriteLine("Loading viewer...");

var viewer = await sdk.Viewer.GetViewerAsync();

Console.WriteLine($"Identity     : {viewer.Identity}");
Console.WriteLine($"Identity Type: {viewer.IdentityType}");

if (viewer.Customer != null)
{
    Console.WriteLine($"Customer     : {viewer.Customer.Code} - {viewer.Customer.Name}");
}

Console.WriteLine();
Console.WriteLine("Impersonation Scope:");

if (viewer.ImpersonationScope.Count == 0)
{
    Console.WriteLine("  (No impersonation scope available)");
}
else
{
    foreach (var scope in viewer.ImpersonationScope)
    {
        Console.WriteLine($"  Customer: {scope.Code} - {scope.Name}");

        foreach (var contact in scope.CustomerContacts)
        {
            Console.WriteLine(
                $"    Contact: {contact.Id} | {contact.Code} | {contact.EmailAddress}");
        }
    }
}

if (viewer.ImpersonationScope.Count > 0)
{
    var firstScope = viewer.ImpersonationScope.First();
    var firstContact = firstScope.CustomerContacts.First();

    var sdkWithImpersonation =
        new AmrodSdk(
            new AmrodSdkOptions
            {
                Endpoint = configuration["Amrod:GraphQlUrl"]!,

                AuthProvider =
                    new OAuthClientCredentialsProvider(
                        new HttpClient(),
                        configuration["Amrod:TokenUrl"]!,
                        configuration["Amrod:ClientId"]!,
                        configuration["Amrod:Username"]!,
                        configuration["Amrod:Secret"]!),

                ImpersonationProvider =
                    new GatewayImpersonationProvider(
                        firstContact.Id,
                        firstScope.Code)
            });

    Console.WriteLine();
    Console.WriteLine("Loading sales order...");

    var salesOrder =
        await sdkWithImpersonation
            .SalesOrders
            .GetByNumberAsync("SO06273610");

    if (salesOrder == null)
    {
        Console.WriteLine("Sales order not found");

        // Place a new order since the sales order was not found
        var orderResponse = await sdkWithImpersonation.Orders.PlaceOrderAsync(
            new PlaceOrderRequest
            {
                SalesOrderNumber = "CUSTOMER-ORDER-0001",
                Options = new OrderOptions
                {
                    OrderType = "STANDARD",
                    ValidateOnly = false,
                    ApplyInclusiveBranding = false
                },
                Collection = new OrderCollection
                {
                    CollectionType = "COLLECTION_HEAD_OFFICE"
                },
                Contact = new OrderContactDetail
                {
                    Notifications = new OrderContactNotificationDetail
                    {
                        Order = new OrderContact
                        {
                            FirstName = "Jane",
                            LastName = "Customer",
                            Email = "jane.customer@example.com",
                            ContactNumber = "+27110000000"
                        }
                    }
                },
                Details =
                [
                    new OrderGroup
                    {
                        Id = "GROUP-1",
                        Items =
                        [
                            new OrderLine
                            {
                                Sku = "SKU-001",
                                Quantity = 10,
                                Price = 25.00m
                            }
                        ]
                    }
                ]
            });

        foreach (var error in orderResponse.Errors)
        {
            Console.WriteLine($"Order error: {error.Message}");
        }

        foreach (var order in orderResponse.PlaceOrderPayloadType?.Orders ?? [])
        {
            Console.WriteLine($"Created sales order: {order.SalesOrderNumber}");
            Console.WriteLine($"Order number       : {order.OrderNumber}");
            Console.WriteLine($"Total excl         : {order.TotalExcl}");
        }
    }
    else
    {
        Console.WriteLine($"Order Number : {salesOrder.SalesOrderNumber}");
        Console.WriteLine($"Status       : {salesOrder.Status}");
        Console.WriteLine($"Customer Ref : {salesOrder.CustomerReference}");
        Console.WriteLine($"Total Excl   : {salesOrder.TotalExcl}");
    }
}
