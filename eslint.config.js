const globals = require('globals');
const jsPlugin = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  jsPlugin.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // 允许 import { Request, Response }
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',

      // 允许 catch (e) {}
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty': 'off',
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
