import { get, post, put, destroy } from '../util/axios';

const UserService = {
  getAll: () => get('/users'),
  single: (id) => get(`/user/${id}`),
  create: (body) => post('/user', body),
  update: (id, body) => put(`/user/${id}`, body),
  remove: (id) => destroy(`/user/${id}`),
};

export default UserService;