module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'spaced-comment': 'off',
    'no-restricted-globals': [
      'error',
      { name: 'all', message: 'Use individual global names allowed.' }
    ]
  }
};
