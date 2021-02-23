import { get, post, put, destroy } from '../util/axios';

const TeaService = {
  getAll: () => get('/teas'),
  getSample: () => get('/teas/sample'),
  single: (id) => get(`/tea/${id}`),
  create: (body) => post('/tea', body),
  update: (id, body) => put(`/tea/${id}`, body),
  remove: (id) => destroy(`/tea/${id}`),
};

export default TeaService;