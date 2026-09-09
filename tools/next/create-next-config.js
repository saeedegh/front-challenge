const path = require("path");
const { composePlugins, withNx } = require("@nx/next");
const aliases = require("../module-aliases");

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
