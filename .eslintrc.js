module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
