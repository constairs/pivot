export const mockAxios = () => {
  jest.mock('../src/redux/user/requests.js', () => ({
    login: jest.fn(),
  }));
};
