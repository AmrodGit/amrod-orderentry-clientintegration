# Branding Metadata

Branding metadata is used to extend branding specifications without modifying the core schema. Different branding methods require additional configuration data passed through metadata key-value pairs. This section details the metadata requirements for each branding method.

## Foiling (Foil Printing)

Foiling is a premium branding method that applies metallic or colored foil to products, creating a high-end finish.

**Required Metadata**:
- **Key**: `FoilColor`
- **Value**: One of the available foil color options (see below)
- Also requires a **DYE charge** for the die/tool used in foiling

**Available Foil Colors**:
| Color Name | Description |
|------------|-------------|
| Clear | Clear foil overlay |
| Matt Gold | Matte gold finish |
| Matt Silver | Matte silver finish |
| Shiny Gold | Bright metallic gold |
| Shiny Silver | Bright metallic silver |
| White | White foil |
| Green Pantone 335 C | Pantone green |
| Orange Pantone 159 C | Pantone orange |
| Red Pantone 7427 C | Pantone red |
| Reflex Blue | Reflex blue foil |
| Cyan | Cyan foil |
| Shiny Black | Glossy black foil |
| Copper Pantone 2315 C | Pantone copper |
| Light Blue Pantone 5405 C | Pantone light blue |
| Yellow | Yellow foil |
| Rose Pattern | Rose patterned foil |
| Shiny White | Glossy white foil |
| Rose Gold Pantone 876 C | Pantone rose gold |
| Black | Standard black foil |
| Gold | Standard gold foil |
| Blue | Standard blue foil |
| Silver | Standard silver foil |

**Example - Foiling Branding**:
```graphql
branding: [
  {
    brandingCode: "FO"
    position: "A"
    logoPosition: TOP_CENTER
    logos: ["logo-id-123"]
    logoSize: 15.0
    logoSizeType: WIDTH
    reference: "BR-20260219-FOIL"
    metadata: [
      {
        key: "FoilColor"
        value: "Shiny Gold"
      },
      {
        key: "DYEName"
        value: "DIE-2"
      }
    ]
  }
]
```

## Debossing

Debossing creates a recessed impression in the product surface, producing an elegant embossed effect.

**Required Metadata**:
- **Key**: `DYEName`
- **Value**: The die/tool charge code (see DYE charges section below)

**Example - Debossing Branding**:
```graphql
branding: [
  {
    brandingCode: "EMB"
    position: "B"
    logoPosition: MIDDLE_CENTER
    logos: ["logo-id-456"]
    logoSize: 20.0
    logoSizeType: HEIGHT
    reference: "BR-20260219-DEBOSS"
    metadata: [
      {
        key: "DYEName"
        value: "DIE-1"
      }
    ]
  }
]
```

## Silicone Branding

Silicone branding applies colored rubber/silicone overlays to products, commonly used on promotional items and wearables.

**Required Metadata**:
- **Key**: `SiliconeColor`
- **Value**: One of the available silicone color options (see below)
- **Key**: `DYEName`
- **Value**: **MUST BE `DIE-1`** (Only DIE-1 can be used for silicone branding due to size constraints)

**Available Silicone Colors**:
| Color Name | Pantone Reference | Description |
|------------|----------|-------------|
| None | N/A | No color (placeholder) |
| White | - | White silicone |
| Black | Pantone Black | Standard black |
| Grey | Pantone Cool Grey 8c | Cool grey shade |
| Red | Pantone 1805c | Pantone red |
| Blue | Pantone 2195c | Pantone blue |
| Green | Pantone 560c | Pantone green |
| Yellow | Pantone 1225c | Pantone yellow |
| Purple | Pantone 7671c | Pantone purple |
| Pink | Pantone 237c | Pantone pink |
| Light Blue | Pantone 7452c | Pantone light blue |
| Bright Yellow | Pantone 100c | Bright Pantone yellow |
| Light Green | Pantone 339c | Pantone light green |
| Gold | Pantone 871c | Pantone gold |
| Silver | Pantone 877c | Pantone silver |
| Dark Pink | Pantone 7424c | Pantone dark pink |
| Navy | Pantone 282c | Pantone navy blue |

**Important**: Silicone branding has size limitations. Only DIE-1 (1200mm² max) can be used. Larger designs must use alternative branding methods.

**Example - Silicone Branding**:
```graphql
branding: [
  {
    brandingCode: "SI"
    position: "A"
    logoPosition: TOP_LEFT
    logos: ["logo-id-789"]
    logoSize: 10.0
    logoSizeType: WIDTH
    reference: "BR-20260219-SIL"
    metadata: [
      {
        key: "SiliconeColor"
        value: "Pantone Red"
      },
      {
        key: "DYEName"
        value: "DIE-1"
      }
    ]
  }
]
```

## Vinyl Branding

Vinyl branding applies adhesive vinyl decals to products, offering vibrant colors and durability.

**Required Metadata**:
- **Key**: `VinylColor`
- **Value**: One of the available vinyl color options (see below)

**Available Vinyl Colors**:
| Color Name | Description |
|------------|-------------|
| None | No color (placeholder) |
| Clear | Transparent vinyl |
| Matt Gold | Matte gold vinyl |
| Matt Silver | Matte silver vinyl |
| Shiny Gold | Glossy gold vinyl |
| Shiny Silver | Glossy silver vinyl |
| White | White vinyl |
| Green Pantone 335 C | Pantone green vinyl |
| Orange Pantone 159 C | Pantone orange vinyl |
| Red Pantone 7427 C | Pantone red vinyl |
| Reflex Blue | Reflex blue vinyl |
| Cyan | Cyan vinyl |
| Shiny Black | Glossy black vinyl |
| Copper Pantone 2315 C | Pantone copper vinyl |
| Light Blue Pantone 5405 C | Pantone light blue vinyl |
| Yellow | Yellow vinyl |
| Rose Gold | Rose gold vinyl |
| Rose Pattern | Rose patterned vinyl |
| Shiny White | Glossy white vinyl |
| Rose Gold Pantone 876 C | Pantone rose gold vinyl |

**Example - Vinyl Branding**:
```graphql
branding: [
  {
    brandingCode: "VIN"
    position: "C"
    logoPosition: BOTTOM_RIGHT
    logos: ["logo-id-321"]
    logoSize: 25.0
    logoSizeType: HEIGHT
    reference: "BR-20260219-VINYL"
    metadata: [
      {
        key: "VinylColor"
        value: "Shiny Gold"
      }
    ]
  }
]
```

## DYE Charge Codes

When branding methods require a DYE (die/tool), specify the appropriate charge code based on the design size:

| DYE Code | Size Range | Description |
|----------|------------|-------------|
| DIE-1 | Up to 1200mm² | Die Charge - 1200mm² Max (recommended for small logos, standard silicone branding) |
| DIE-2 | 1201-6000mm² | Die Charge - 1201mm² to 6000mm² (medium designs) |
| DIE-3 | 6001-25000mm² | Die Charge - 6001mm² to 25000mm² (large designs) |

**Selection Guide**:
- **DIE-1**: Small logos, silicone branding, or designs under 1200mm²
- **DIE-2**: Medium-sized logos and designs between 1200-6000mm²
- **DIE-3**: Large logos, full-product coverage, designs over 6000mm²
- **Silicone branding**: Always use DIE-1 due to material constraints

## Metadata Best Practices

### ✅ Do:
- Verify the required metadata for your chosen branding code before submission
- Match DYE size to your actual design dimensions
- Use exact color names from the available color lists
- Test metadata configuration in validate-only mode first
- Document your metadata choices for production consistency

### ❌ Don't:
- Forget to include required metadata - it will cause validation errors
- Use arbitrary color names not in the approved lists
- Apply DIE-2 or DIE-3 to silicone branding (only DIE-1 allowed)
- Submit metadata for branding methods that don't require it
- Assume color names are case-insensitive - use exact names as provided

## Related Operations

- [Place Sales Order](./place-sales-order.md) - Core order placement with branding
- [Update Job Card Branding Info](./update-jobcard-branding.md) - Provide branding for WAITING_INFO job cards
- [Request Job Card Change](./request-change-jobcard.md) - Request branding changes during approval workflow
