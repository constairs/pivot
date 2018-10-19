export const mockAxios = () => {
  jest.mock('../src/redux/user/requests.js', () => ({
    login: jest.fn(),
  }));
  jest.mock('../src/redux/classes/requests.js', () => ({
    createClass: jest.fn(),
  }));
};
