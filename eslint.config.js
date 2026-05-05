import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import vitest from '@vitest/eslint-plugin'

export default defineConfig([
  globalIgnores(['build']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.config.js', '**/*.config.ts'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Config for TS and TS test files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { vitest },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals
      }
    },
    rules: {
      ...vitest.configs.recommended.rules
    },
  },
  {
    files: ['vite.config.js', 'webpack.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
])
