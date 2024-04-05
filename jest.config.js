const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = Object.assign(tsjPreset, {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  setupFiles: ['./jest.globals.js'],
  automock: false,
  clearMocks: true,
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@react-native|react-native|@react-navigation|react-native-reanimated|react-native-linear-gradient|axios)/)',
  ],
  transform: {},
  moduleDirectories: ['node_modules', 'src', 'assets'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!./coverage/**',
    '!<rootDir>/*',
    '!**/__snapshots__/**',
    '!**/*.d.ts/**',
    '!**/assets/**',
    '!**/navigation/**',
    '!**/slices/**',
    '!**/AppContainer.tsx',
    '!**/store.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 0,
      statements: 20,
    },
  },
});
