import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => ({
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './__test__/**/*.ts',
  ],
  coverageReporters: ['lcov'],
  detectOpenHandles: true,
  forceExit: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    'jest-extended'
  ],
  verbose: true,
})
