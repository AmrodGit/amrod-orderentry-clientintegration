namespace Amrod.OrderEntry.Models;

public class SharedDetailBase
{
	public bool CanShare { get; set; }
	public bool CanEdit { get; set; }
	public bool CanDelete { get; set; }
	public bool CanMove { get; set; }
}
