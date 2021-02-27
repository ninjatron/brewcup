import { get, post, put, destroy, authHeader } from '../util/axios';

const TeaService = {
  getAll: () => get('/teas'),
  getSample: (limit) => get(`/teas/sample/${limit}`),
  single: (id) => get(`/tea/${id}`),
  create: (body) => {
    const authToken = authHeader();
    console.log(authToken);
    return post('/tea', body, { headers: authToken });
  },
  update: (id, body) => put(`/tea/${id}`, body),
  remove: (id) => destroy(`/tea/${id}`),
};

export default TeaService;