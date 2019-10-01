const path = require('path');

process.env.NODE_PATH += path.delimiter + path.join(__dirname, 'node_modules');

module.exports = {
  roots: ['src', 'util'],

  testEnvironment: 'jsdom',

  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],

  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/scripts/preprocessor.js'
  },
  testMatch: ['**/__tests__/*.(ts|tsx|js)']
};
