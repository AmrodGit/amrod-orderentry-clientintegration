# Changing Job Card Branding Positions

## Overview

When working with job card modifications, you may need to change the branding position from one location to another (e.g., from position A to position B). However, this operation is subject to strict rules that must be followed to ensure successful updates and avoid pricing complications.

## Key Rules for Position Changes

When changing a job card's branding position, the following rules **must** be satisfied:

### Rule 1: Target Position Must Be Unoccupied

The position you're changing **to** cannot already be in use for that job card.

**Example**:
- ❌ Cannot change from position A to position B if position B already has branding assigned
- ✅ Can change from position A to position B if position B is empty

### Rule 2: Branding Method Must Match Exactly

The branding method for the new position must be identical to the current method. **Generic method categories are not sufficient** — the exact branding method must stay the same.

**Important**: Even if two methods are in the same category (e.g., both are screen print methods), they must be the exact same method code.

**Example — Screen Print Methods**:
- ❌ Cannot change from `SA` (Screen Print) to `SC` (Screen Print) even though both are screen print
- ✅ Can change from `SA` position A to `SA` position B
- ✅ Can change from `SC` position C to `SC` position D

**Important**: Methods like `SA` and `SC` appear similar but are **different methods with different pricing**. `SC` is generally more expensive than `SA`, creating pricing complications if methods are mixed.

**Other Method Examples**:
- ❌ `DP-A` to `DP-B` — Different methods, even though both are digital print variants
- ❌ `LA` to `LB` — Different methods, even though both are label methods
- ✅ `DP-A` position A to `DP-A` position C — Same method, different position

**Key Point**: The exact method code (e.g., `SA`, `SC`, `DP-A`) determines pricing and manufacturing process. Methods cannot be interchanged within the same position change operation.

### Rule 3: Colour Count Must Remain the Same

If a branding method has a colour restriction, the number of colours **cannot be changed** when modifying the position. A 1-colour print must remain 1-colour; a 2-colour print must remain 2-colour, etc.

**Important**: Colour count changes have significant pricing implications. Each colour adds manufacturing complexity and material costs. Changing the number of colours requires a complete re-branding, not just a position change.

**Example — Colour Restrictions**:
- ❌ Cannot change from 1-colour `SA` to 2-colour `SA` (colour count increased)
- ✅ Can change 1-colour `SA` from position A to position C (same colour count)
- ✅ Can change 2-colour `SC` from position B to position D (same colour count)

**When Colour Count Matters**:
- Screen/Pad print methods — Often have colour count restrictions

**Key Point**: The colours array in the branding detail must remain identical in both count and specification when changing positions. This ensures manufacturing processes, costs, and quality standards remain consistent with the original quote.

## When Changing Positions

### Use updateJobCardBrandingInfo (AWAITING_INFO Status)

If the job card is in `AWAITING_INFO` status and you're providing initial branding with the correct position from the start, use `updateJobCardBrandingInfo`.

### Use requestChangeJobCard (Approval Workflow)

If the job card has already progressed to `AWAITING_APPROVAL`, `AWAITING_LAYOUT`, or `AWAITING_PAYMENT` status and you need to **change** the branding position, use `requestChangeJobCard`.

When requesting a position change:
1. **Verify the current position** — Query the job card to see which position currently has branding
2. **Confirm method matches** — Ensure the new position uses the exact same branding method
3. **Check colour count** — Verify the new position maintains the same number of colours as the current branding
4. **Check position availability** — Verify the target position is not in use
5. **Submit the change request** — Include the reason for the position change

## Examples

### Example 1: Valid Position Change (Same Method)

**Scenario**: Job card has `SA` (Screen Print) at position A, and you want to move it to position C.

**Check**:
- ✅ Position C is empty
- ✅ Target uses `SA` (same method)

**Result**: Change is allowed

```graphql
mutation {
  requestChangeJobCard(input: {
    changeRequestType: "CUSTOMER_REQUEST"
    salesOrderNumber: "SO-2026-001234"
    jobCards: [
      {
        jobCardNumber: "JC-2026-001234"
        brandingDetail: {
          brandingCode: "SA"        # Same method
          position: "C"             # New position
          logoPosition: TOP_CENTER
          logos: ["logo-id-1"]
          logoSize: 20.0
          logoSizeType: WIDTH
          reference: "BR-2026-0001"
        }
      }
    ]
  }) {
    errors { __typename message }
    resultPayloadType { result status }
  }
}
```

### Example 2: Invalid Position Change (Position Occupied)

**Scenario**: Job card has `LA` at position A, and you want to move it to position B, but position B already has `LB` branding.

**Check**:
- ❌ Position B is already occupied with `LB`

**Result**: Change fails — position is in use

**Solution**: Request to move to an unoccupied position (C, D, etc.) or remove the branding from position B first.

### Example 3: Invalid Position Change (Method Mismatch)

**Scenario**: Job card has `SA` (Screen Print) at position A, and you want to move it to position B with method `SC`.

**Check**:
- ✅ Position B is empty
- ❌ `SA` ≠ `SC` (different screen print methods with different pricing)

**Result**: Change fails — methods must be identical

**Solution**: Keep the method as `SA` when moving to position B, or create a separate branding entry for the new position.

### Example 4: Valid Complex Change (Multiple Positions, Same Methods)

**Scenario**: Job card has two branding entries (position A with `DP-A` and position B with `LA`), and you want to move position A's `DP-A` branding to position C.

**Check**:
- ✅ Position C is empty
- ✅ Keeping method as `DP-A` (same method)
- ✅ Position B branding (`LA`) is unaffected

**Result**: Change is allowed

```graphql
mutation {
  requestChangeJobCard(input: {
    changeRequestType: "CUSTOMER_REQUEST"
    salesOrderNumber: "SO-2026-001234"
    jobCards: [
      {
        jobCardNumber: "JC-2026-001234"
        brandingDetail: {
          brandingCode: "DP-A"      # Keep method the same
          position: "C"             # Move to new position
          logoPosition: TOP_CENTER
          logos: ["logo-id-2"]
          logoSize: 15.0
          logoSizeType: HEIGHT
          reference: "BR-2026-0002"
        }
      }
    ]
  }) {
    errors { __typename message }
    resultPayloadType { result status }
  }
}
```

## Pricing Implications

Different branding methods have different costs due to:
- **Setup complexity** — Some methods require more setup than others
- **Manufacturing time** — Methods like `SC` (advanced screen print) take longer than `SA`
- **Material costs** — Foiling and silicone require specialized materials
- **Quality requirements** — Different methods have different quality standards

Mixing methods or changing methods can have significant pricing implications, which is why strict validation is in place.

## Error Handling

### ConflictException: Position Already in Use

**Cause**: The target position already has branding assigned.

**Solution**:
1. Query the job card to see all current branding positions
2. Select an unoccupied position (C, D, E, F, G)
3. Resubmit the change request with the available position

### ConflictException: Method Mismatch

**Cause**: You attempted to change both the position AND the branding method.

**Solution**:
1. Keep the current branding method when changing positions
2. If you need a different method, create a separate branding entry for a different position
3. Contact support if you need to change the manufacturing method

### ConflictException: Colour Count Mismatch

**Cause**: The branding detail specifies a different number of colours than the current branding.

**Solution**:
1. Query the job card to confirm the current colour count
2. Ensure the colours array in your request matches the number and specification of current colours
3. If you need to change the colour count, create a separate branding entry for a different position
4. Contact support if you need to change colour specifications for the current position

### ConflictException: Invalid Position


**Cause**: The position code is invalid. Check the branding guide/data for correct positions.

**Solution**: Check the branding guide/data for correct positions.

## Decision Tree: Can I Change This Position?

```
Do you have a job card with branding at a position you want to change?
│
├─ Is the job card in AWAITING_INFO status?
│  ├─ YES → Use updateJobCardBrandingInfo with the correct position from the start
│  │
│  └─ NO → Is it in AWAITING_APPROVAL, AWAITING_LAYOUT, or AWAITING_PAYMENT?
│     └─ YES → Proceed to next question
│
├─ Is the target position empty (no branding currently assigned)?
│  └─ NO → Cannot change. Select a different target position or remove existing branding.
│
├─ Is the branding method identical to the current method?
│  └─ NO → Cannot change. Keep the same method when changing positions.
│
├─ Is the colour count identical to the current branding?
│  └─ NO → Cannot change. Keep the same number of colours when changing positions.
│
└─ YES to all questions → Change is allowed. Submit requestChangeJobCard
```

## Best Practices

✅ **Do**:
- Verify the target position is empty before changing
- Keep the branding method identical when changing positions
- Verify the colour count remains the same as the current branding
- Query the job card details before submitting changes
- Include a clear reason for the position change in your request
- Test changes in a lower environment first
- Document the reason for position changes for audit trails

❌ **Don't**:
- Assume position availability without checking
- Try to change the branding method when changing positions
- Change the number of colours when changing positions
- Mix different screen print methods (SA, SC, SB) — they're not interchangeable
- Change positions without understanding pricing implications
- Skip error responses — they indicate validation failures
- Use generic method categories — always use exact method codes

## Common Scenarios

### Scenario 1: "Can I change from SA to SC?"
**Answer**: No. Even though both are screen print methods, `SA` and `SC` have different pricing and manufacturing processes. They cannot be interchanged in a position change.

**What to do**: If you need `SC` branding, either:
1. Use a different empty position for `SC` branding alongside the `SA` branding
2. Replace the entire branding (contact support for guidance)

### Scenario 2: "Can I change from position A to position B?"
**Answer**: Only if:
1. Position B is empty (no branding assigned)
2. The branding method stays the same (e.g., `DP-A` to `DP-A`)

If position B is occupied, select position C, D, E, F, or G instead.

### Scenario 3: "I need to change both the position and the method"
**Answer**: This requires special handling:
1. If there's an empty position, add the new method/position combination to that position
2. If all positions are occupied, you may need to request a complete re-branding (contact support)

### Scenario 4: "Can I change from 1-colour to 2-colour branding?"
**Answer**: No. Colour count cannot be changed when modifying positions. A 1-colour print must stay 1-colour; a 2-colour print must stay 2-colour.

**Why**: Each colour adds manufacturing complexity, material costs, and setup time. Colour count changes affect pricing and require a complete re-branding, not just a position change.

**What to do**: If you need different colour specifications:
1. If there's an empty position, add a separate branding entry with the new colour count
2. If all positions are occupied, contact support to request a complete re-branding with updated colour specifications
3. Always verify current colour count before submitting a position change request

## Related Operations

- **[Update Job Card Branding](./update-jobcard-branding.md)** - Provide branding when job card is in AWAITING_INFO status
- **[Request Job Card Change](./request-change-jobcard.md)** - Request modifications during approval workflow
- **[Approve Job Card](./approve-jobcard.md)** - Approve job cards for manufacturing
- **[Dashboard - Job Cards](./dashboard-jobcards.md)** - Query job card details and current branding

## Support

If you encounter errors when changing branding positions or need clarification on method compatibility:
- Review the [Error Handling](../error-handling.md) section for specific error codes
- Consult [Support](../support.md) with your job card number and current configuration
- Check job card details via Dashboard - Job Cards to verify current state
