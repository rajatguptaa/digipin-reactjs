module.exports = {
  ignores: ['dist', 'node_modules', 'example/node_modules'],
  files: ['src/**/*.ts', 'src/**/*.tsx'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  },
  rules: {
    // Add or adjust rules as needed
  },
}; 