import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config} */
export default {
  files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    js: jsPlugin,
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    'no-unused-vars': ['warn'],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
    'no-undef': 'error',
  },
  ignores: ['node_modules', 'dist'],
};
