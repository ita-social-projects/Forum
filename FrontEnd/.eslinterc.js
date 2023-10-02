module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'functional',
    'import',
    'no-null',
    'rxjs',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // General
    'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-uses-react': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    // Functional
    'functional/prefer-readonly-type': [
      'error',
      {
        allowLocalMutation: true,
        allowMutableReturnType: true,
        ignoreClass: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        pathGroups: [
          {
            pattern: '{react,react-dom/**}',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    camelcase: ['error', { properties: 'never', allow: ['_UNSTABLE'] }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-null/no-null': 2,
    curly: ['error', 'multi-line', 'consistent'],
    'nonblock-statement-body-position': ['error', 'beside'],
  },
};
