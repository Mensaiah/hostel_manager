module.exports = {
  env: {
    es6: true
  },
  extends: ['airbnb', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    // "no-var": "off",
    // "no-unused-vars": "warn",
    // "func-names": "off",
    'no-console': 'warn'
    // "no-underscore-dangle": "off",
    // "strict": "off",
    // "prefer-template": "off",
    // "vars-on-top": "off",
    // "no-use-before-define": "off",
    // "consistent-return": "off",
    // "no-restricted-globals": "off",
    // "no-undef": "warn"
  }
};
