import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { api } from '@/mocks/handlers';
import { server } from '@/mocks/node';
import { renderRoute } from '@/test/render';

describe('App routing', () => {
  it('renders the home page with the app title from env', async () => {
    await renderRoute('/');
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByText('React SPA Starter')).toBeInTheDocument();
  });

  it('navigates to users and shows data from the (mocked) API', async () => {
    const { user } = await renderRoute('/');

    await user.click(screen.getByRole('link', { name: 'Users' }));

    expect(
      await screen.findByRole('heading', { name: 'Users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('shows an error when the API fails', async () => {
    server.use(
      http.get(api('/users'), () => HttpResponse.json(null, { status: 500 })),
    );

    await renderRoute('/users');

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'failed with 500',
    );
  });

  it('shows a not-found page for unknown routes', async () => {
    await renderRoute('/does-not-exist');
    expect(
      await screen.findByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();
  });
});
