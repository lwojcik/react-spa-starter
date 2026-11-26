import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { environment } from '@/config/environment';

import { Header, Main, Nav, NavLink, Title } from './__root.styled';

export interface RouterContext {
  queryClient: QueryClient;
}

const Devtools =
  import.meta.env.DEV && import.meta.env.MODE !== 'test'
    ? lazy(() => import('@/components/Devtools'))
    : () => null;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <>
      <Header>
        <Title>{environment.appTitle}</Title>
        <Nav aria-label="Main">
          <NavLink to="/" activeOptions={{ exact: true }}>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Suspense>
        <Devtools />
      </Suspense>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </>
  );
}
