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
