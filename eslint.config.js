import { createConfig } from '@lwojcik/eslint-config';
import { createReactConfig } from '@lwojcik/eslint-config/react';
import { createTanstackQueryConfig } from '@lwojcik/eslint-config/tanstack-query';

const tsconfigRootDir = import.meta.dirname;

export default [
  ...createConfig({
    tsconfigRootDir,
    importAliases: ['@'],
    ignores: [
      'src/routeTree.gen.ts',
      'public/mockServiceWorker.js',
      'playwright-report/',
      'test-results/',
    ],
  }),
  ...createReactConfig({ tsconfigRootDir }),
  ...createTanstackQueryConfig(),
  {
    files: ['src/mocks/**'],
    rules: { 'pii/no-email': 'off' },
  },
];
