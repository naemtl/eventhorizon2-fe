import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    extends: ['plugin:react/jsx-runtime'],
  },
];


// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     ignores: ['**/___netlify-bootstrap.mjs', '**/___netlify-telemetry.mjs'],
//     languageOptions: {
//       globals: globals.browser,
//       parserOptions: {
//         project: ['./tsconfig.node.json', './tsconfig.app.json'],
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//     plugins: {
//       react: pluginReact,
//       '@typescript-eslint': tseslint,
//       '@eslint/js': pluginJs,
//     },
//     rules: {
//       ...pluginJs.configs.recommended.rules,
//       ...tseslint.configs.recommendedTypeChecked.rules,
//       ...pluginReact.configs.recommended.rules,
//       "react/jsx-fragment": "off",
//       "@typescript-eslint/explicit-function-return-type": "off"
//     },
//     settings: { react: { version: '18.3' } },
//   },
// ];