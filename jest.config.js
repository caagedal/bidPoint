// jest.config.js
export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  // Explicitly include .mjs test files
  testMatch: [
    '**/__tests__/**/*.mjs',
    '**/?(*.)+(spec|test).mjs'
  ],
  testEnvironment: 'jsdom'
};