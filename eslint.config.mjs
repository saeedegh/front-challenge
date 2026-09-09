import nx from "@nx/eslint-plugin";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/public/mockServiceWorker.js"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: { parser: tseslint.parser },
    plugins: { "@nx": nx },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            { sourceTag: "type:domain", onlyDependOnLibsWithTags: ["type:domain"] },
            {
              sourceTag: "type:data-access",
              onlyDependOnLibsWithTags: ["type:data-access", "type:domain"],
            },
            { sourceTag: "type:ui", onlyDependOnLibsWithTags: ["type:ui"] },
            {
              sourceTag: "type:feature",
              onlyDependOnLibsWithTags: [
                "type:feature",
                "type:data-access",
                "type:domain",
                "type:ui",
              ],
            },
            {
              sourceTag: "type:app-shell",
              onlyDependOnLibsWithTags: [
                "type:app-shell",
                "type:feature",
                "type:data-access",
                "type:domain",
                "type:ui",
              ],
            },
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: [
                "type:app-shell",
                "type:feature",
                "type:data-access",
                "type:domain",
                "type:ui",
              ],
            },
            {
              sourceTag: "scope:admin",
              onlyDependOnLibsWithTags: ["scope:admin", "scope:users", "scope:shared"],
            },
            {
              sourceTag: "scope:profile",
              onlyDependOnLibsWithTags: ["scope:profile", "scope:users", "scope:shared"],
            },
            { sourceTag: "scope:users", onlyDependOnLibsWithTags: ["scope:users", "scope:shared"] },
            {
              sourceTag: "scope:shared",
              onlyDependOnLibsWithTags: ["scope:shared", "scope:users"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/**/*.{ts,tsx}", "libs/**/*.{ts,tsx}"],
    ignores: ["libs/shared/http-client/src/lib/http-client.ts"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "درخواست‌های HTTP باید از @saas/shared/http-client عبور کنند.",
        },
      ],
    },
  },
];
