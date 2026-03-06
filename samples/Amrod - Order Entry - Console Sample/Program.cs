using Amrod.OrderEntry;
using Amrod.OrderEntry.Models;
using Amrod.OrderEntry.Services.LogoLibrary;
using Microsoft.Extensions.DependencyInjection;

var serviceCollection = new ServiceCollection();

serviceCollection.AddAmrodDataGateway(options =>
{
    options.GatewayUri = new Uri("https://moyo-dgw.dev.amrod.co.za/graphql");
});

IServiceProvider services = serviceCollection.BuildServiceProvider();

using var scope = services.CreateScope();
var artworkService = scope.ServiceProvider.GetRequiredService<IArtworkService>();

artworkService.SetImpersonation("007144", Guid.Parse("271CD933-716C-EB11-A812-000D3A463FBB"));

var dt = DateTime.Now;

PagedResult<ArtworkDetail> artworks = await artworkService
    .GetArtworksAsync(artworkTypes: [ArtworkType.Template], pageSize: 50)
    .ConfigureAwait(false);
int ixArtworkCount = artworks.Result.Count;
Console.WriteLine(
    $"Fetched {artworks.Result.Count} Results: Total: {ixArtworkCount}, In {(DateTime.Now - dt).TotalSeconds} seconds"
);

while (artworks.HasNextPage == true)
{
    var dti = DateTime.Now;
    artworks = await artworkService.GetNextPageAsync(artworks.State).ConfigureAwait(false);
    ixArtworkCount += artworks.Result.Count;
    Console.WriteLine(
        $"Fetched {artworks.Result.Count} Results: Total: {ixArtworkCount}, In {(DateTime.Now - dti).TotalSeconds} seconds"
    );
}
;

Console.WriteLine(
    $"Fetched {ixArtworkCount} Results IN {(DateTime.Now - dt).TotalSeconds} seconds."
);

Console.ReadLine();
