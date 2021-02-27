import { get, post, put, destroy } from '../util/axios';

const AuthService = {
  create: (body) => post('/auth/signup', body),
  login: (body) => put('/auth/login', body),
  logout: () => localStorage.removeItem("currentUser"),
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
};

export default AuthService;