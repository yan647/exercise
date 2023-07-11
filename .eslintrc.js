module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-plusplus': 'warn',
    'import/extensions': 'warn',
    'import/no-unresolved': 'warn',
    'max-len': ['error', { comments: 110, code: 90 }],
    'no-use-before-define': 'warn',
  },
};
