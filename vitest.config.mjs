import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import aliases from "./tools/module-aliases.js";

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: Object.fromEntries(
      Object.entries(aliases).map(([name, target]) => [name, path.resolve(workspaceRoot, target)]),
    ),
  },
  test: {
    environment: "node",
  },
});
