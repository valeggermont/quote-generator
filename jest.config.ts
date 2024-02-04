import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    'models',
    'app.ts',
    'index.ts'
  ],
  coverageThreshold: {
    global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
    }
  }
}

export default config