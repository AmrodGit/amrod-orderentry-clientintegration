# Documentation Guide for Agents

## File Structure and Organization
The documentation for agents should be organized in a clear and logical manner to facilitate easy navigation and understanding. The recommended file structure is as follows:
- docs/
  - .agents/ {This folder contains all documentation related to agents, including guides, API references, and best practices.}
      - documentation-guide.md {This file serves as the main guide for understanding and using the agents, including an overview of their capabilities, how to use them, and best practices.}
  - {functional-area}/ {Each functional area of the agent's capabilities should have its own folder, such as "logo-library", "order-entry", etc.}
    - {entity-documents}.md {Within each functional area, there should be markdown files dedicated to specific entities or features, such as "manage-artwork.md", "manage-folders.md", etc.}
  - {error-handling.md} {A dedicated file for error handling best practices and common error scenarios.}
  - {authentication.md} {A dedicated file for authentication best practices and common authentication scenarios.}
  - {support.md} {A dedicated file for support resources and contact information.} 
  - readme.md - {A high-level overview of the documentation and how to navigate it. This file should also include links to the main sections of the documentation.}

  ## Functional Areas
    Each functional area should have its own folder within the /docs directory, with markdown files dedicated to specific entities or features. For example, the "logo-library" functional area may include files such as "manage-artwork.md", "manage-folders.md", etc. Each of these files should provide detailed information on how to use the specific features or entities related to that functional area.

    - logo-library
        A folder dedicated to documentation related to the Logo Library agent, including guides on managing artworks, folders, sharing, and tags.
    - order-entry
        A folder dedicated to documentation related to the Order Entry agent, including guides on managing sales orders, job cards, customers and dashboard information.
    - assets
        A folder dedicated to documentation related to the Asset API, including guides on retrieving assets and understanding asset metadata.

    ## Entities

    ### Logo Library

    A set of GraphQL mutations and queries for managing artworks, folders, sharing, and tags within the Logo Library. This includes creating, updating, and deleting artworks, as well as organizing them into folders and managing sharing permissions.

    #### Artworks

    Artworks are the core entity within the Logo Library, representing individual logo files that can be uploaded, organized, and shared. The documentation should cover the entire lifecycle of an artwork, from creation to deletion, including best practices for managing artwork metadata and file uploads.

    ##### Metations

    - createArtwork
    - commitArtwork
    - updateArtwork
    - deleteArtwork
    - tagArtwork
    - moveArtworkToFolder

    ##### Queries

    - artworkQuery

    #### Folders

    Folders are used to organize artworks within the Logo Library. The documentation should cover how to create, update, move, and delete folders, as well as best practices for organizing artworks using folders.

    ##### Mutations

    - createArtworkFolder
    - updateArtworkFolder
    - deleteArtworkFolder
    - moveArtworkFolder
    - renameArtworkFolder

    ##### Queries

    - artworkFolderContents
    - artworkFolders

    #### Sharing

    Sharing settings allow users to share artworks and folders with other users or make them globally accessible. The documentation should cover how to manage sharing settings for both artworks and folders, including best practices for controlling access and permissions.

    ##### Mutations

    - enableGlobalSharing
    - disableGlobalSharing
    - shareArtwork
    - shareFolder
    - revokeSharedArtwork
    - revokeSharedFolder
    - revokeAllShares

    #### Tags

    Tags are used to categorize and organize artworks within the Logo Library. The documentation should cover how to create, update, and delete tags, as well as best practices for using tags to manage and search for artworks.

    ##### Mutations

    - createArtworkTag
    - deleteArtworkTag
    - updateArtworkTag

    ##### Queries

    - artworkTags

    ### Order Entry

    The Order Entry functional area includes a set of GraphQL mutations and queries for managing sales orders, job cards, customers, and dashboard information. This includes placing sales orders, requesting job card changes, updating job card branding information, and retrieving dashboard data for sales orders, job cards, credit notes, and customer contacts.

    #### Place SalesOrder

    Placing a sales order involves creating a new sales order in the system with the necessary details such as customer information, order items, and delivery details. The documentation should cover the required fields for placing a sales order, as well as best practices for ensuring successful order placement. This function has an option to validate the order without actually placing it, which can be useful for testing and error handling.

    ##### Mutations

    - placeOrder

    #### Request JobCard Change

    Requesting a job card change allows users to request modifications to an existing job card, such as changes to the job card details or associated assets. The documentation should cover the process for requesting a job card change, including the required information and best practices for ensuring successful change requests.

    ##### Mutations

    - requestChangeJobCard

    #### Update JobCard Branding Information

    Updating job card branding information allows users to modify the branding details associated with a job card, such as the logo or brand colors. The documentation should cover the process for updating job card branding information, including the required fields and best practices for ensuring successful updates.

    ##### Mutations

    - updateJobCardBrandingInfo

    #### Dashboard

    The dashboard provides an overview of sales orders, job cards, credit notes, and customer contacts. The documentation should cover how to retrieve dashboard data using GraphQL queries, as well as best practices for interpreting and utilizing the dashboard information.

    ##### SalesOrders

    The sales orders section provides an overview of all sales orders in the system. The documentation should cover how to retrieve sales order data using GraphQL queries, as well as best practices for interpreting and utilizing the sales order information.

    ###### Queries

    - salesOrders
    - salesOrder

    ##### JobCards

    The job cards section provides an overview of all job cards in the system. The documentation should cover how to retrieve job card data using GraphQL queries, as well as best practices for interpreting and utilizing the job card information.

    ###### Queries

    - jobCards
    - jobCard
    - jobCardAssets

    ##### CreditNotes

    The credit notes section provides an overview of all credit notes in the system. The documentation should cover how to retrieve credit note data using GraphQL queries, as well as best practices for interpreting and utilizing the credit note information.

    ###### Queries

    - creditNotes
    - creditNote

    ##### Contacts

    The contacts section provides an overview of all customer contacts in the system. The documentation should cover how to retrieve customer contact data using GraphQL queries, as well as best practices for interpreting and utilizing the customer contact information.

    ###### Queries

    - customerContacts
    - customerContact

## Content Guidelines
- Each markdown file should include a clear and concise description of the topic being covered, along with step-by-step instructions, examples, and best practices where applicable.
- Use headings and subheadings to organize the content and make it easy to navigate.

## Environments
- Local: http://localhost:5000/
- Dev: https://moyo-dgw.dev.amrod.co.za/
- QA: https://moyo-dgw.qa.amrod.co.za/
- UAT: https://moyo-dgw.uat.amrod.co.za/

#### References
- GraphQL API Schema: /graphql/schema.graphql
- Assets API specification: swagger/v1/swagger.json

## Folder Naming Conventions and Casing
- Use title case for folder names (e.g., "Assets", "Logo Library", "Order Intake").
- Use kebab-case for file names (e.g., "create-artwork.md", "update-artwork.md").

## Sample Data for use in examples

### Product Skus

BAG-612-BU, BAS-3000-G-Y, BAS-3000-G-BK, BAS-3000-G-WH, BAS-3000-G-Y, BAS-3000-P-BK, BAS-3000-P-WH, BAS-3000-P-Y, BAS-3000-R-BK, BAS-3000-R-WH, BAS-3000-R-Y, BAS-3000-W-BK, BAS-3000-W-WH, BAS-3000-W-Y, BAG-612-BU, PEN-701-BU, PEN-701-GN, PEN-701-RD, PEN-701-BK, PEN-701-WH, PEN-701-YL, PEN-702-BU, PEN-702-GN, PEN-702-RD, PEN-702-BK, PEN-702-WH, PEN-702-YL, GF-AM-1000-BU-0

### Branding Codes

DP-A,DP-B,LA,LB,LC,LG,PA,PB,PC,SA-M,SA,SB,SC,SP,SUB-A,SUB-B,SUB-C,SUB-D,SUB-E,CMT-BNM

### Branding Positions
A, B, C, D, E, F, G

### Collection Types

COLLECTION_HEAD_OFFICE, BRANCH_DELIVERY (When using branding delivery always include a branch code)

### Branch Codes

JHB, DBN, CPT, PLA, BFN

### Contacts

firstname: John, lastname: Doe, email: john.doe@example.com

### Product Quantities

Always use an even number between 10 and 500