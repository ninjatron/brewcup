import { get, post, put, destroy } from '../util/axios';

const TeaService = {
  getAll: () => get('/teas'),
  getSample: (limit) => get(`/teas/sample/${limit}`),
  single: (id) => get(`/tea/${id}`),
  create: (body) => post('/tea', body),
  update: (id, body) => put(`/tea/${id}`, body),
  remove: (id) => destroy(`/tea/${id}`),
};

export default TeaService;