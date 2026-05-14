# Release Notes

## Version [1.0.0] - March 6, 2026

### Overview

This release introduces comprehensive documentation for job card branding position change operations, clarifying the strict rules and constraints that must be followed when modifying branding positions. This documentation ensures users understand the nuances of position changes and avoid common errors that can result in pricing complications and validation failures.

### 📚 Documentation Additions

#### New Document: Changing Job Card Branding Positions

**File**: `docs/order-entry/jobcard-branding-position-changes.md`

A comprehensive guide explaining the rules, constraints, and best practices for changing job card branding positions. This document addresses a critical gap in understanding when position changes are allowed and what restrictions apply.

**Key Content**:

- **Two Core Rules**:
  - Target position must be unoccupied
  - Branding method must match exactly (no cross-method changes)

- **Detailed Explanation of Branding Methods**:
  - Distinction between similar methods (e.g., SA vs. SC screen print)
  - Why exact method codes matter for pricing and manufacturing
  - Method compatibility table

- **Comprehensive Examples**:
  - Valid position changes (same method, empty position)
  - Invalid position changes (occupied position, method mismatch)
  - Complex multi-position scenarios
  - GraphQL examples with valid and invalid operations

- **Decision Tree**:
  - Step-by-step guide to determine if a position change is allowed
  - Status-aware operation selection (updateJobCardBrandingInfo vs. requestChangeJobCard)

- **Error Handling**:
  - ConflictException scenarios and solutions
  - Position occupied errors
  - Method mismatch errors
  - Invalid position errors

- **Best Practices**:
  - Pre-change verification steps
  - Common scenarios and solutions
  - Audit trail recommendations
  - Testing guidance

### 📖 Documentation Updates

#### Updated: Order Entry README

**File**: `docs/order-entry/README.md`

- Added new "Changing Job Card Branding Positions" entry to Order Management section
- Added task entry in Common Tasks table: "Change branding position on a job card"
- Cross-references between existing job card operations and new position change documentation

#### Updated: Request Change Job Card Bruno Sample

**File**: `samples/bruno/Order Entry/Job Cards/request-change-jobcard.bru`

- Added reference to position change documentation in Important Notes section
- Clarified that position changes are subject to constraints covered in the new guide
- Enhanced use case context with reference to position change rules

#### Updated: Update Job Card Branding Documentation

**File**: `docs/order-entry/update-jobcard-branding.md`

- Added "Changing Job Card Branding Positions" to Related Operations section
- Cross-reference enables users to navigate between initial branding setup and position change operations
- Enhanced navigation between status-appropriate operations

### 🎯 Key Features

#### Comprehensive Rule Documentation

The new guide provides clear, unambiguous rules for position changes:

```
Rule 1: Target position cannot already be occupied
Rule 2: Branding method must be identical to current method
```

Example of Rule 2:
- ✅ SA position A → SA position C (same method, allowed)
- ❌ SA position A → SC position B (different methods, not allowed)
- ❌ DP-A position A → DP-B position C (different methods, not allowed)

#### Method Compatibility Reference

Complete reference table showing:
- Method codes and their categories
- Pricing implications
- When methods can and cannot be changed
- Manufacturing complexity differences

#### Example-Driven Learning

Four detailed examples demonstrating:
1. Valid single-position change with GraphQL
2. Invalid change due to occupied position
3. Invalid change due to method mismatch
4. Valid complex multi-position scenario with GraphQL

#### Practical Error Handling

Detailed guidance for handling common errors:
- Position already in use
- Branding method migration failures
- Invalid position codes
- Debugging and recovery steps

### 🔍 When to Use This Documentation

**Use this guide if you need to**:
- Change a job card's branding position after initial setup
- Understand why a position change request failed
- Verify if a position change is allowed before submission
- Understand pricing implications of different branding methods
- Debug ConflictException errors related to positions or methods

**Related guides**:
- [Update Job Card Branding](./docs/order-entry/update-jobcard-branding.md) - For initial branding setup on AWAITING_INFO job cards
- [Request Job Card Change](./docs/order-entry/request-change-jobcard.md) - For change request mutations during approval workflow
- [Dashboard - Job Cards](./docs/order-entry/dashboard-jobcards.md) - For querying current job card branding state

### 📊 Documentation Structure

The new documentation follows established patterns:

- **Overview** - High-level context and importance
- **Key Rules** - Non-negotiable constraints
- **Operational Guidance** - When to use which operation
- **Examples** - Real-world scenarios with GraphQL
- **Error Handling** - Common failures and solutions
- **Best Practices** - Do's and Don'ts
- **Common Scenarios** - FAQ-style Q&A
- **Related Operations** - Cross-references to complementary guides

### 🛠️ Implementation Details

#### Status-Aware Operations

| Job Card Status | Operation | Purpose |
|-----------------|-----------|---------|
| AWAITING_INFO | updateJobCardBrandingInfo | Provide initial branding |
| AWAITING_APPROVAL, AWAITING_LAYOUT, AWAITING_PAYMENT | requestChangeJobCard | Request position or branding changes |

### 🎓 Learning Resources

The documentation includes:
- **Decision Tree** - Flow chart to determine if changes are allowed
- **Examples** - 4 detailed scenarios with GraphQL mutations
- **Error Scenarios** - 3 common error cases with solutions
- **FAQ Section** - 4 common scenarios and their answers
- **Best Practices** - 10+ actionable best practices

### ✅ Quality Assurance

This release includes:
- ✅ Comprehensive documentation with multiple examples
- ✅ Cross-references between related operations
- ✅ Error handling guidance with real error messages
- ✅ GraphQL examples for valid and invalid scenarios
- ✅ Decision flowcharts for quick reference
- ✅ Branding method compatibility reference table
- ✅ Bruno sample documentation updates for consistency

### 🔗 Cross-References

The new documentation is integrated with existing guides:

**Linked from**:
- `/docs/order-entry/README.md` - Order Management section
- `/samples/bruno/Order Entry/Job Cards/request-change-jobcard.bru` - Important Notes

**Links to**:
- `/docs/order-entry/update-jobcard-branding.md` - Related Operations
- `/docs/order-entry/request-change-jobcard.md` - Related Operations
- `/docs/order-entry/approve-jobcard.md` - Related Operations
- `/docs/order-entry/dashboard-jobcards.md` - Related Operations

### 📝 Migration Guide

No breaking changes. This is a documentation-only release.

Existing operations work as before:
- `updateJobCardBrandingInfo` - Unchanged behavior
- `requestChangeJobCard` - Unchanged behavior
- All GraphQL mutations operate identically

This release adds **clarity and constraints documentation**, not new functionality.

### 🚀 Getting Started

1. **Review the new guide**: [Changing Job Card Branding Positions](./docs/order-entry/jobcard-branding-position-changes.md)
2. **Check the decision tree** - Determine if your use case is allowed
3. **Refer to examples** - See GraphQL mutations for your scenario
4. **Handle errors** - Use error handling section if validation fails

### 📞 Support

For questions about:
- **Position change constraints** - See [Changing Job Card Branding Positions](./docs/order-entry/jobcard-branding-position-changes.md)
- **Branding operations** - See [Update Job Card Branding](./docs/order-entry/update-jobcard-branding.md) or [Request Job Card Change](./docs/order-entry/request-change-jobcard.md)
- **Error codes** - See [Error Handling](./docs/error-handling.md)
- **API authentication** - See [Authentication](./docs/authentication.md)

### 📋 Changelog

#### Added
- New comprehensive guide: `docs/order-entry/jobcard-branding-position-changes.md`
- Position change rules documentation
- Method compatibility reference table
- Decision tree for position change validation
- Real-world examples with GraphQL mutations
- Extended error handling scenarios
- Common scenarios FAQ section

#### Updated
- `docs/order-entry/README.md` - Added position change documentation reference
- `samples/bruno/Order Entry/Job Cards/request-change-jobcard.bru` - Added position change constraints note
- `docs/order-entry/update-jobcard-branding.md` - Added cross-reference to position change guide

#### Fixed
- N/A

#### Deprecated
- None

### 🎉 Summary

This release provides a critical missing piece in the Order Entry documentation: clear guidance on the rules, constraints, and best practices for changing job card branding positions. With comprehensive examples, error handling guidance, and a decision tree, users can now confidently determine whether their position change is allowed and understand why certain changes are restricted.

The documentation is tightly integrated with existing guides, ensuring users can navigate between related operations and understand the full job card lifecycle from initial creation through approval and potential modifications.

---

**Released**: March 6, 2026  
**Documentation Version**: 1.0  
**API Version**: Compatible with current Order Entry GraphQL schema
