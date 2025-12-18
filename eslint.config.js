import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  // Base JS recommendations.
  js.configs.recommended,
  // Bridge legacy .eslintrc settings into flat config.
  ...compat.config({
    extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
    env: {
      browser: true
    },
    globals: {
      NodeJS: 'readonly',
      React: 'readonly',
      JSX: 'readonly',
      fetch: 'readonly',
      Request: 'readonly',
      RequestInit: 'readonly',
      AbortController: 'readonly',
      AbortSignal: 'readonly',
      Response: 'readonly',
      Headers: 'readonly'
    },
    rules: {
      'prettier/prettier': ['error']
    }
  })
];
