// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const MOCKED_RELATIVE_PATH = '/users';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: mockedGet });
    await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);
    expect(mockedGet).toHaveBeenCalledWith(MOCKED_RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const data = { name: 'Admin' };
    const get = jest.fn().mockResolvedValue({ data });
    axios.create = jest.fn().mockReturnValue({ get });
    const result = await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);
    expect(result).toEqual(data);
  });
});
