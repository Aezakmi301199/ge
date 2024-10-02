// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsParser = require('@typescript-eslint/parser');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const prettierPlugin = require('eslint-plugin-prettier');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsPlugin = require('@typescript-eslint/eslint-plugin');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  ...compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
  ),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['methods', 'asyncMethods'] },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['class', 'if', 'while', 'switch', 'try'],
        },
        {
          blankLine: 'always',
          prev: ['class', 'if', 'while', 'switch', 'try'],
          next: '*',
        },
        { blankLine: 'always', prev: '*', next: 'return' },
        {
          blankLine: 'never',
          prev: ['var', 'let', 'const'],
          next: ['var', 'let', 'const'],
        },
        {
          blankLine: 'never',
          prev: 'import',
          next: 'import',
        },
      ],
    },
  },
  {
    ignores: ['.eslintrc.js', 'src/types/bx24/bx24.d.ts'],
  },
];