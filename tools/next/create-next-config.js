const path = require("path");
const { composePlugins, withNx } = require("@nx/next");

const aliases = {
  "@saas/auth": "libs/auth/src/index.ts",
  "@saas/ui": "libs/ui/src/index.ts",
  "@saas/users/domain": "libs/users/domain/src/index.ts",
  "@saas/users/data-access": "libs/users/data-access/src/index.ts",
  "@saas/admin/users/feature-list": "libs/admin/users/feature-list/src/index.ts",
  "@saas/admin/users/feature-detail": "libs/admin/users/feature-detail/src/index.ts",
  "@saas/admin/users/feature-form": "libs/admin/users/feature-form/src/index.ts",
  "@saas/admin/dashboard/data-access": "libs/admin/dashboard/data-access/src/index.ts",
  "@saas/admin/dashboard/feature": "libs/admin/dashboard/feature/src/index.ts",
  "@saas/profile/feature-profile": "libs/profile/feature-profile/src/index.ts",
  "@saas/shared/app-runtime": "libs/shared/app-runtime/src/index.ts",
  "@saas/shared/mock-api": "libs/shared/mock-api/src/index.ts",
};

function createNextConfig() {
  return composePlugins(withNx)({
    nx: { svgr: false },
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...Object.fromEntries(
          Object.entries(aliases).map(([name, target]) => [
            name,
            path.resolve(__dirname, "../..", target),
          ]),
        ),
      };
      return config;
    },
  });
}

module.exports = { createNextConfig };
