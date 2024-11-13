const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    extraFileExtensions: [".vue"],
  },
  plugins: [
    "@typescript-eslint",
    "vue",
    "promise",
    "vuejs-accessibility",
    "import",
    "jsdoc",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "plugin:promise/recommended",
    "plugin:import/recommended",
    "plugin:vuejs-accessibility/recommended",
    "plugin:jsdoc/recommended",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "src")],
      },
    },
  },
  rules: {
    // Vue-specific rules
    "vue/component-api-style": ["warn", ["composition"]],
    "vue/no-v-for-template-key": "error",

    // Accessibility rules
    "vuejs-accessibility/alt-text": "warn",
    "vuejs-accessibility/aria-role": "warn",
    "vuejs-accessibility/click-events-have-key-events": "warn",

    // TypeScript-specific rules
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        allow: ["arrowFunctions", "functions", "methods"],
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        ignore: [-1, 0, 1],
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreArrayIndexes: true,
      },
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-check": false,
      },
    ],

    // General best practices
    "require-await": "warn",
    "promise/always-return": "warn",
    "no-throw-literal": "warn",
    "import/order": ["warn", { groups: ["builtin", "external", "internal"] }],
    "import/no-duplicates": "error",
    "max-lines-per-function": ["warn", { max: 50 }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true },
    ],
    "no-global-assign": "error",
    "no-import-assign": "error",
    "no-magic-numbers": [
      "warn",
      {
        ignore: [0, 1],
        ignoreArrayIndexes: true,
      },
    ],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: { multiline: true, minProperties: 1 },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { multiline: true, minProperties: 2 },
        ExportDeclaration: { multiline: true, minProperties: 2 },
      },
    ],
    "array-bracket-newline": ["error", { multiline: true, minItems: 2 }],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "import/no-cycle": "warn",

    // JSDoc rules
    "require-jsdoc": "warn",

    // Restrict imports
    "no-restricted-imports": ["error", { patterns: ["../*"] }],
    "import/no-named-default": "warn",
  },
  ignorePatterns: ["eslint.config.js", ".eslintrc.js"],
};
