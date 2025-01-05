// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // ignore output directory
  {
    ignores: ["dist"],
  },
  // recommended rules
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,

  // prettier rules
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // import sorting rules
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // allow for unused variables as long as they are marked
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
);
