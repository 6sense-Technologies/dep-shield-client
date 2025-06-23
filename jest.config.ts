import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  testMatch: ['<rootDir>/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/components/loader$': '<rootDir>/__mocks__/Loader.tsx',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react)',
  ],
};

export default createJestConfig(customJestConfig);