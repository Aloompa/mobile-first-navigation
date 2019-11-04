module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '__tests__/.*\\.(ts|tsx)$',
  collectCoverage: false,
  projects: ['<rootDir>/packages/*/src']
};
