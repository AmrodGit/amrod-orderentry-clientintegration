using Amrod.SDK;
using Amrod.SDK.Auth;
using Amrod.SDK.Exceptions;
using Amrod.SDK.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

using var loggerFactory = LoggerFactory.Create(builder =>
    builder
        .AddConfiguration(configuration.GetSection("Logging"))
        .AddConsole());

var logger = loggerFactory.CreateLogger("Amrod.SDK.Consumer");

try
{
    await RunAsync(configuration, loggerFactory, logger);
}
catch (AmrodAuthenticationException ex)
{
    logger.LogCritical(ex, "Authentication failed");
    Environment.ExitCode = 1;
}
catch (AmrodApiException ex)
{
    logger.LogCritical(
        ex,
        "Gateway request failed (status {StatusCode}): {Errors}",
        ex.StatusCode,
        string.Join("; ", ex.GraphQlErrors));
    Environment.ExitCode = 1;
}
catch (Exception ex)
{
    logger.LogCritical(ex, "Unexpected error running the sample");
    Environment.ExitCode = 1;
}

static async Task RunAsync(IConfiguration configuration, ILoggerFactory loggerFactory, ILogger logger)
{
    var graphQlUrl = configuration["Amrod:GraphQlUrl"]
        ?? throw new InvalidOperationException("Amrod:GraphQlUrl is not configured.");
    var tokenUrl = configuration["Amrod:TokenUrl"]
        ?? throw new InvalidOperationException("Amrod:TokenUrl is not configured.");
    var clientId = configuration["Amrod:ClientId"]
        ?? throw new InvalidOperationException("Amrod:ClientId is not configured.");
    var username = configuration["Amrod:Username"]
        ?? throw new InvalidOperationException("Amrod:Username is not configured.");
    var secret = configuration["Amrod:Secret"]
        ?? throw new InvalidOperationException("Amrod:Secret is not configured.");

    var authProvider =
        new OAuthClientCredentialsProvider(
            new HttpClient(),
            tokenUrl,
            clientId,
            username,
            secret,
            loggerFactory.CreateLogger<OAuthClientCredentialsProvider>());

    var sdk = new AmrodSdk(
        new AmrodSdkOptions
        {
            Endpoint = graphQlUrl,
            AuthProvider = authProvider,
            LoggerFactory = loggerFactory
        });

    var token = await authProvider.GetAccessTokenAsync();

    if (string.IsNullOrEmpty(token))
    {
        throw new AmrodAuthenticationException("No token received from the OAuth provider.");
    }

    logger.LogInformation("Token acquired successfully");

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
        return;
    }

    foreach (var scope in viewer.ImpersonationScope)
    {
        Console.WriteLine($"  Customer: {scope.Code} - {scope.Name}");

        foreach (var contact in scope.CustomerContacts)
        {
            Console.WriteLine(
                $"    Contact: {contact.Id} | {contact.Code} | {contact.EmailAddress}");
        }
    }

    var firstScope = viewer.ImpersonationScope.First();
    var firstContact = firstScope.CustomerContacts.First();

    var sdkWithImpersonation =
        new AmrodSdk(
            new AmrodSdkOptions
            {
                Endpoint = graphQlUrl,

                AuthProvider =
                    new OAuthClientCredentialsProvider(
                        new HttpClient(),
                        tokenUrl,
                        clientId,
                        username,
                        secret,
                        loggerFactory.CreateLogger<OAuthClientCredentialsProvider>()),

                ImpersonationProvider =
                    new GatewayImpersonationProvider(
                        firstContact.Id,
                        firstScope.Code),

                LoggerFactory = loggerFactory
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
            logger.LogWarning("Order error: {Message}", error.Message);
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
