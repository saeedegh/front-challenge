# SaaS Platform — Senior Frontend Architecture Challenge

This archive contains an Nx monorepo with `apps/admin` and `apps/profile`, shared authentication, MUI UI, React Query API access, MSW mocks, and user feature modules.

## Run

```bash
npm install
npx msw init apps/admin/public --save
npx msw init apps/profile/public --save
npm run dev:admin
npm run dev:profile
```

Demo credentials: `admin@saas.io / admin123`, `user@saas.io / user123`.

## Architecture

The `apps` directories are composition roots: they own Next.js routing, metadata, and product-specific navigation. Business behavior lives in tagged Nx libraries:

- `libs/users/domain`: framework-free user models.
- `libs/users/data-access`: user API calls, query keys, and React Query hooks.
- `libs/admin/users/feature`: the complete admin user-management feature.
- `libs/admin/dashboard/*`: dashboard data access and UI.
- `apps/profile/src/features`: features owned and used only by the profile app.
- `libs/ui`: presentational, product-agnostic UI and layout components.
- `libs/auth`: authentication flows, route protection, and authenticated layout composition.
- `libs/shared/app-runtime`: shared application providers.
- `libs/shared/http-client`: the single Fetch-based HTTP transport and normalized API errors.
- `libs/shared/mock-api`: development-only MSW handlers and Persian fixtures.

Dependencies flow from apps to features, from features to data access and domain, and from data access to domain. `npm run lint` enforces these boundaries from Nx project tags.

All server-state operations use React Query hooks. API modules call the shared HTTP client as their transport; screens and providers never call `fetch` directly. Query loading, errors, retries, cancellation, and cache invalidation therefore follow one policy across both apps.

Mocks start automatically in development. Set `NEXT_PUBLIC_ENABLE_MOCKS=true` to explicitly enable them in another environment. Production uses real `/api` endpoints unless this flag is set.

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run build:admin
npm run build:profile
```
