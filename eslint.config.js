import globals from "globals"
import pluginJs from "@eslint/js"
import pluginImport from "eslint-plugin-import"
import pluginNode from "eslint-plugin-node"
import pluginPromise from "eslint-plugin-promise"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    extends: [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:node/recommended",
      "plugin:promise/recommended",
    ],
    plugins: ["import", "node", "promise"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "import/order": ["error", { "newlines-between": "always" }],
      "node/no-unsupported-features/es-syntax": [
        "error",
        { ignores: ["modules"] },
      ],
    },
  },
  pluginJs.configs.recommended,
]
