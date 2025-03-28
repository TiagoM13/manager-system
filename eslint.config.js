import js from '@eslint/js';
import importOrder from 'eslint-plugin-import';
import importHelpers from 'eslint-plugin-import-helpers';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'build'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-helpers': importHelpers,
      import: importOrder,
      prettier: prettierPlugin,
    },
    rules: {
      'no-param-reassign': 'off',
      'no-bitwise': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unknown-property': [2, { ignore: ['class', 'for'] }],
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'no-use-before-define': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'react/jsx-curly-newline': 'off',
      'no-useless-computed-key': 'off',
      'react/jsx-wrap-multilines': 'off',
      'no-underscore-dangle': 'off',
      'react/no-array-index-key': 'off',
      'no-async-promise-executor': 'off',
      'no-nested-ternary': 'off',
      'no-unsafe-optional-chaining': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      camelcase: 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'react/require-default-props': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@phosphor-icons/',
            '/^@/',
            ['parent', 'sibling', 'index'],
            '/\\.\\/styles/',
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
    settings: { react: { version: 'detect' } },
  },
);
