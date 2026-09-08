const path = require("path");
const { composePlugins, withNx } = require("@nx/next");

module.exports = composePlugins(withNx)({
  nx: { svgr: false },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@saas/auth": path.resolve(__dirname, "../../libs/auth/src/index.ts"),
      "@saas/ui": path.resolve(__dirname, "../../libs/ui/src/index.ts"),
      "@saas/api-client": path.resolve(__dirname, "../../libs/api-client/src/index.ts"),
      "@saas/user-feature": path.resolve(__dirname, "../../libs/user-feature/src/index.ts"),
    };
    return config;
  },
});
