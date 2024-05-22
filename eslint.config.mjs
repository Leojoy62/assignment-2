import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: ['**/node_modules/', '.dist/'],
    rules: {
      'no-unused-expressions': 'error',
      'no-undef': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
