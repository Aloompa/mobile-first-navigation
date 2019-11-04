module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/scripts/preprocessor.js'
  },
  collectCoverage: false,
  testMatch: ['**/__tests__/*.(ts|tsx|js)']
};
