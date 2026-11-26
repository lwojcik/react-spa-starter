import { type DefaultOptions, QueryClient } from '@tanstack/react-query';

export function createQueryClient(overrides: DefaultOptions['queries'] = {}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        ...overrides,
      },
    },
  });
}
