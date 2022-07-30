/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html', 'text'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/tools',
    'src/services',
    'src/middlewares',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
  globalSetup: "<rootDir>/tests/globalSetup.ts",
  globalTeardown: "<rootDir>/tests/globalTeardown.ts",
  setupFilesAfterEnv: [
    "<rootDir>/tests/setupFile.ts"
  ]
};
