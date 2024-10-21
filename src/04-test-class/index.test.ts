// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(5);

    expect(acc.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = getBankAccount(5);
    expect(() => balance.withdraw(6)).toThrowError(InsufficientFundsError);
    expect(() => balance.withdraw(6)).toThrowError(
      'Insufficient funds: cannot withdraw more than 5',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const first = getBankAccount(10);
    const second = getBankAccount(20);
    expect(() => first.transfer(15, second)).toThrowError(
      InsufficientFundsError,
    );
    expect(() => first.transfer(15, second)).toThrowError(
      'Insufficient funds: cannot withdraw more than 10',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const first = getBankAccount(10);
    expect(() => first.transfer(10, first)).toThrowError(TransferFailedError);
    expect(() => first.transfer(10, first)).toThrowError('Transfer failed');
  });

  test('should deposit money', () => {
    const balance = getBankAccount(5);

    balance.deposit(6);
    expect(balance.getBalance()).toBe(11);
  });

  test('should withdraw money', () => {
    const balance = getBankAccount(5);

    balance.withdraw(2);
    expect(balance.getBalance()).toBe(3);
  });

  test('should transfer money', () => {
    const first = getBankAccount(10);
    const second = getBankAccount(10);
    first.transfer(5, second);
    expect(first.getBalance()).toBe(5);
    expect(second.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const first = getBankAccount(10);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(5).mockReturnValueOnce(1);
    const balance = await first.fetchBalance();

    expect(balance).toBe(5);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const first = getBankAccount(10);

    jest.spyOn(first, 'fetchBalance').mockResolvedValueOnce(5);

    await first.synchronizeBalance();

    expect(first.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const first = getBankAccount(10);
    jest.spyOn(first, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(first.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
