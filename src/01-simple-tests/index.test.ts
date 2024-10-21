// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 11, action: Action.Add })).toBe(20);
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Subtract })).toBe(8);
    expect(simpleCalculator({ a: 13, b: 3, action: Action.Subtract })).toBe(10);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 13, b: 2, action: Action.Multiply })).toBe(26);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 14, b: 7, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'drop' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: 'err', action: Action.Add })).toBeNull();
  });
});
