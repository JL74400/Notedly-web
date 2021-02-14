module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'eslint-plugin-cypress'],
  rules: {
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    'no-console': 'off', // We use console.log for demonstrative purposes
    'no-unused-vars': 'error', // At times we have unused variables across chapters/sections
    'no-unreachable': 2,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-fragments': ['error', 'element'],
    'react/prop-types': [0],
    'react/jsx-one-expression-per-line': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
  },
};
