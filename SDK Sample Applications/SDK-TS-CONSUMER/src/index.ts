import { AmrodSdk } from "@amrod/sdk-ts";
import { OAuthClientCredentialsProvider } from "@amrod/sdk-ts/src/auth/oath-client-credentials-provider";
import { GatewayImpersonationProvider } from "@amrod/sdk-ts/src/auth/gateway-impersonation-provider";

const authContext = {
  token: "<token>"
};

const sdk = new AmrodSdk({
  endpoint: "https://api-uat.amrodtech.co.za/graphql",

  authProvider:
    new OAuthClientCredentialsProvider(
      "https://auth-uat.amrod.co.za/application/o/token/",
      "37wMnLFZII16UcppTbsUpK3l7wcsymhfMbfA6SOh",
      "uat-integrator-ordermation",
      "b13d5NdoTQnk8tST17gPaTx4fiwD08fjkn7PSvk3EMfciuOWKLYyXy2bTOl5"
    ),
});

const viewer =
  await sdk.viewer.getViewer();

console.log(
  viewer.impersonationScope
);

const impersonationProvider =
  new GatewayImpersonationProvider(
    viewer.impersonationScope[0]
      .customerContacts[0].id,

    viewer.impersonationScope[0].code
  );
