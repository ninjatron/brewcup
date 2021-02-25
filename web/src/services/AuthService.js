import { get, post, put, destroy } from '../util/axios';

const UserService = {
  create: (body) => post('/auth/signup', body),
  login: (body) => post('/auth/login', body),
};

export default UserService;