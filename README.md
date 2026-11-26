# React SPA Starter

React 19 + TypeScript single-page app on Vite, with:

- **Routing:** [TanStack Router](https://tanstack.com/router), file-based and fully typed
- **Server state:** [TanStack Query](https://tanstack.com/query), prefetched in route loaders
- **API mocking:** [MSW](https://mswjs.io), the same handlers in dev, unit tests and e2e
- **Styling:** [styled-components](https://styled-components.com) with a typed theme
- **Config:** per-mode `.env` files, validated at startup with Zod
- **Tests:** Vitest + Testing Library (unit/integration), Playwright (e2e)
- **Quality:** ESLint 10 with [`@lwojcik/eslint-config`](https://www.npmjs.com/package/@lwojcik/eslint-config), Prettier and lefthook git hooks

## Getting started

```bash
npm install                       # also installs the git hooks
npx playwright install chromium   # once, for e2e
npm run dev                       # http://localhost:8080, API mocked by MSW
```

## Scripts

| Script                  | What it does                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run dev`           | Dev server with HMR, MSW and devtools                                                           |
| `npm run build`         | Generate routes, type-check, build to `dist/`                                                   |
| `npm run preview`       | Serve the production build                                                                      |
| `npm run routes`        | Regenerate `src/routeTree.gen.ts` (dev/build do this for you)                                   |
| `npm run typecheck`     | TypeScript only                                                                                 |
| `npm run lint`          | ESLint; `lint:fix` to autofix                                                                   |
| `npm run format`        | Prettier (write); `format:check` to verify                                                      |
| `npm test`              | Unit tests once; `test:watch` for watch mode                                                    |
| `npm run test:coverage` | Unit tests with V8 coverage report                                                              |
| `npm run test:e2e`      | Playwright against a production build in `e2e` mode; `test:e2e:headed` to watch it in a browser |
| `npm run check`         | typecheck + lint + format check + unit tests                                                    |

## Layout

```
src/
  main.tsx               entry: starts MSW (if enabled), creates router + query client
  App.tsx                providers: Query, Theme, global styles, Router
  router.tsx             router factory + type registration
  routeTree.gen.ts       GENERATED from src/routes — don't edit
  routes/                one file per route (__root.tsx is the layout)
  api/                   fetch client + Zod schemas + queryOptions per resource
  components/            reusable UI (Button, Counter)
  config/environment.ts  validated environment variables
  lib/queryClient.ts     QueryClient defaults
  mocks/                 MSW handlers, fixture data, browser worker, Node server
  styles/                theme, GlobalStyle, DefaultTheme typing
  test/                  Vitest setup + render helpers
e2e/                     Playwright specs
lefthook.yml             git hooks
```

## How things fit together

### Routing

Add a file under `src/routes/` and the Vite plugin regenerates the route tree. `users.tsx` → `/users`, `users.$id.tsx` → `/users/:id`, `_auth.tsx` → pathless layout. Files and folders starting with `-` are ignored, so put route-only helpers in `-components/`. Links and params are type-checked: `<Link to="/userz">` won't compile.

### Data loading

Each resource gets a `queryOptions` factory (see `src/api/users.ts`). The route's `loader` calls `queryClient.ensureQueryData(...)` so fetching starts on navigation (or link hover). The component then reads it with `useSuspenseQuery(...)`, so there's no loading state inside the component. Responses are validated with Zod in `apiGet`.

### Environment variables

| File                              | Committed | Loaded when                          |
| --------------------------------- | --------- | ------------------------------------ |
| `.env.development`                | yes       | `npm run dev`                        |
| `.env.test`                       | yes       | `npm test`                           |
| `.env.e2e`                        | yes       | `vite build --mode e2e` (Playwright) |
| `.env.example`                    | yes       | never (template)                     |
| `.env`, `.env.production`         | **no**    | always / `npm run build`             |
| `.env.local`, `.env.[mode].local` | **no**    | always / that mode                   |

Only the four public, secret-free files above are tracked; `.gitignore` ignores every other `.env*` file and a pre-commit hook rejects any that are staged. Production values come from the host/CI environment (`VITE_APP_TITLE`, `VITE_API_BASE_URL`), or from an ignored `.env.production` for local builds.

To add a variable, declare it in `src/vite-env.d.ts`, add it to the schema in `src/config/environment.ts` and to `.env.example`, then use `environment.yourThing`. Only `VITE_*` variables reach the browser, and **everything in them is public**. Keep secrets out.

### API mocking

`src/mocks/handlers.ts` is the single source of mock responses:

- **dev / e2e:** a Service Worker (`public/mockServiceWorker.js`) intercepts requests when `VITE_ENABLE_MOCKS=true`. The production build leaves MSW out entirely.
- **unit tests:** `msw/node` runs for every test. Unhandled requests fail the test. Override a single test with `server.use(http.get(api('/users'), () => HttpResponse.json(null, { status: 500 })))`.

When you bump `msw`, run `npx msw init public` to refresh the worker file.

### Styling

Components use `styled-components` with the theme in `src/styles/theme.ts`; `props.theme` is fully typed. Spacing uses named tokens (`theme.space.md`) rather than numbers, which also keeps `no-magic-numbers` happy. Use transient props (`$variant`) for styling-only props so they don't end up on the DOM.

Styles live in a separate file next to the component, named `<Component>.styled.ts` (for example `Counter.tsx` + `Counter.styled.ts`). Components import from it; a component that is only styles, like `Button`, is just a `.styled.ts` file. In `src/routes/`, `tsr.config.json` sets `routeFileIgnorePattern` so `.styled.ts` files aren't treated as routes.

### Path aliases

`@/` maps to `src/` (`tsconfig.app.json` `paths` + `resolve.alias` in `vite.config.ts`, which Vitest also uses).

### Linting

Rules come from [`@lwojcik/eslint-config`](https://www.npmjs.com/package/@lwojcik/eslint-config) (base + React + TanStack Query), set up in `eslint.config.js`. It's strict and opinionated: **no comments at all**, no `let` or loops, no mutation, at most 2 parameters per function, no magic numbers and 80-column lines. Prettier is set to the same 80 columns, so the two don't fight. Run `npm run lint:fix` first; it sorts imports and fixes spacing. The agent-oriented rule guide is at `node_modules/@lwojcik/eslint-config/llms.txt`.

The one project-level override turns off `pii/no-email` for `src/mocks/**`, because the mock users have fake `example.com` addresses.

Its versions are pinned exactly, as the config recommends, so a plugin's major bump only arrives when you choose to update.

TypeScript is pinned to **6.0** because `typescript-eslint` (needed for type-aware linting) doesn't support TypeScript 7 yet. Switch back once it does.

### Git hooks (lefthook)

- **pre-commit:** ESLint (zero warnings) and Prettier on staged files (Prettier fixes are re-staged).
- **pre-push:** typecheck and unit tests.

Skip a hook once with `git commit --no-verify`. The hooks are installed by `npm install` via the `prepare` script.

## Tests

- Unit tests sit next to the code as `*.test.tsx`. Use `renderWithTheme(<Component />)` for a single component, or `await renderRoute('/path')` for the whole app with a fresh router and cache.
- E2E specs live in `e2e/*.spec.ts` and run against the real production bundle, built in `e2e` mode so the API is mocked.
