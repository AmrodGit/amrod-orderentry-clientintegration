namespace Amrod.OrderEntry.Models;

public class ArtworkTagDetail : SharedDetailBase
{
	public string TagId { get; set; } = null!;
	public string Name { get; set; } = null!;
	public string Color { get; set; } = null!;
	public OwnerDetail Owner { get; set; } = null!;
}
