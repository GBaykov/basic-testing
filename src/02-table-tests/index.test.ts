import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 9,
    b: 11,
    action: Action.Add,
    expected: 20,
    // type: 'nullcheck'
  },
  {
    name: 'should subtract two numbers',
    a: 10,
    b: 2,
    action: Action.Subtract,
    expected: 8,
    // type: 'nullcheck'
  },
  {
    name: 'should multiply two numbers',
    a: 13,
    b: 2,
    action: Action.Multiply,
    expected: 26,
    // type: 'nullcheck'
  },
  {
    name: 'should divide two numbers',
    a: 14,
    b: 7,
    action: Action.Divide,
    expected: 2,
    // type: 'nullcheck'
  },
  {
    name: 'should exponentiate two numbers',
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
    // type: 'nullcheck'
  },
  {
    name: 'should return null for invalid action',
    a: 2,
    b: 3,
    action: 'drop',
    expected: null,
    type: 'nullcheck',
  },
  {
    name: 'should return null for invalid arguments',
    a: 2,
    b: 'err',
    action: Action.Add,
    expected: null,
    type: 'nullcheck',
  },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ name, a, b, action, expected, type }) => {
    it(name, () => {
      if (type === 'nullcheck') {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      } else {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      }
    });
  });
});
