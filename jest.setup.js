// Global test configuration
jest.setTimeout(10000);

// Mock console methods to reduce test output noise
global.console = {
  ...console,
  // Uncomment the following lines to silence console output during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};