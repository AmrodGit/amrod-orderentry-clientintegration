import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../SDK-.NET/Amrod.SDK/schema.graphql",
  documents: "../SDK-.NET/Amrod.SDK/graphql/**/*.graphql",
  generates: {
    "src/generated/schema-types.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: true,
        enumsAsTypes: true,
        immutableTypes: true,
        namingConvention: "keep",
      },
    },
  },
};

export default config;
