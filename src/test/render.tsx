import { createMemoryHistory } from '@tanstack/react-router';
import { render, type RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { App } from '@/App';
import { createQueryClient } from '@/lib/query-client';
import { createAppRouter } from '@/router';
import { theme } from '@/styles/theme';

const ThemeWrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: ThemeWrapper, ...options }),
  };
}

export async function renderRoute(path: string) {
  const queryClient = createQueryClient({ retry: false });
  const router = createAppRouter({
    queryClient,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  const user = userEvent.setup();

  render(<App router={router} queryClient={queryClient} />);

  await screen.findByRole('main');

  return { user, router, queryClient };
}
