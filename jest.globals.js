/* eslint-disable no-undef */
global.console = {
  error: jest.fn(),
  warn: jest.fn(),
  tron: {
    log: jest.fn(),
    error: jest.fn(),
  },
};
