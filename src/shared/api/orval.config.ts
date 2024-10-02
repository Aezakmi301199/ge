// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('orval');

export default defineConfig({
  apiSchema: {
    input: './schema/maid-self.yaml',
    output: {
      mode: 'split',
      target: './generated-api/api.ts',
      prettier: true,
      client: 'axios-functions',
      override: {
        useNativeEnums: true,
        mutator: {
          path: './instance/api-client.ts',
          name: 'apiClientInstance',
        },
      },
    },
  },
});
