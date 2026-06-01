const globals = require('globals');

function createSharedEslintConfig({
  browser = false,
  node = false,
  ignores = [],
} = {}) {
  const selectedGlobals = {
    ...(browser ? globals.browser : {}),
    ...(node ? globals.node : {}),
    ...globals.es2024,
  };

  return [
    {
      ignores,
    },
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: selectedGlobals,
      },
      rules: {
        'no-debugger': 'error',
        'no-constant-binary-expression': 'error',
        'no-unreachable': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
  ];
}

module.exports = {
  createSharedEslintConfig,
};
