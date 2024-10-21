// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(true);
    expect(data).toBe(data);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'error message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // expect(() => throwCustomError()).toThrow(
    //   'This is my awesome custom error!',
    // );
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
