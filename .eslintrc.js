module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true,
    "es6": true,
  },
  extends: [
    'plugin:vue/essential'
  ],
  rules: {
    "no-multiple-empty-lines": [2, { "max": 2, "maxEOF": 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 'off',
    'no-new': 0, // Intrusive when using Chart.js instances.
    'no-underscore-dangle': 0, // Chart.js uses underscore dangles (_) internally.
    'import/no-unresolved': 0, // False positives regarding imports that use aliases.
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
      'ignores': ['i18n']
    }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
