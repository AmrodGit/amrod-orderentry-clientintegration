# Bruno Samples Requirements

## Tools

### Bruno
- Version: 2.*
- Application URL: https://usebruno.com
- Documentation: https://docs.usebruno.com/

## Samples Folder Structure

The samples should be organized in a clear and consistent folder structure to facilitate easy navigation and understanding. The structure should reflect the functional areas of the GraphQL API and the specific use cases being demonstrated. In addition, an asset API sample should be included to demonstrate how to use the asset API for retrieving assets.
The recommended structure is as follows:

- samples/bruno/
- Each funtional area should be organized in a main folder with subfolders for each specific use case.
- Functional areas include:
  - Assets
  - Logo Library
  - Order Intake
- Following the Functional area, the subfolders should be named according to the specific entity, such as:
  - assets/jobcards
  - assets/salesorders
  - assets/artworks
  - logo-library/artworks
  - logo-library/folders
  - logo-library/sharing
  - logo-library/tags
- Following the subfolder, the file name should be descriptive of the specific use case, such as:
 - create-artwork
 - update-artwork
 - etc.

## Sample Content
Each sample should include the following content:
- A clear and concise description of the use case being demonstrated.
- The GraphQL query or mutation being used, along with any necessary variables.
- An explanation of the expected response and how to interpret it.
- For the asset API sample, include a demonstration of how to retrieve assets using the asset API, along with an explanation of the expected response and how to interpret it.

## Folder Naming Conventions and Casing
- Use title case for folder names (e.g., "Assets", "Logo Library", "Order Intake").
- Use kebab-case for file names (e.g., "create-artwork.bruno", "update-artwork.bruno").

## Sample Naming Conventions and Casing
- Use descriptive names for samples that clearly indicate the use case being demonstrated (e.g., "Create Artwork", "Update Artwork").
- Use title case for sample names (e.g., "Create Artwork", "Update Artwork").

## Sample Environments

Environments per testable environments should be configured and all variables should be set up to allow for easy testing of the samples in the appropriate environment. This includes setting up the necessary authentication tokens, API endpoints, and any other required configuration settings.

### Environments
- Local: http://localhost:5000/
- Dev: https://moyo-dgw.dev.amrod.co.za/
- QA: https://moyo-dgw.qa.amrod.co.za/
- UAT: https://moyo-dgw.uat.amrod.co.za/

### Sample Variables
- ROOT_URL: The base URL for the API endpoint being tested (e.g., http://localhost:5000/).
- CUSTOMER_CODE: The customer code to be used in the sample (e.g., "AMR0001").
- CONTACT_ID: The contact ID to be used in the sample.

## References
- GraphQL API Schema: /graphql/schema.graphql
- Assets API specification: swagger/v1/swagger.json

## Functional Areas

### Logo Library

A set of GraphQL queries and mutations that demonstrate how to interact with the logo library, including creating, updating, and retrieving artworks, folders, sharing settings, and tags.

#### Entities
- Artworks
- Folders
- Sharing
- Tags