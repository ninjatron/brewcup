import { get, post, put, destroy, authHeader } from '../util/axios';

const TeaService = {
  getAll: () => get('/teas'),
  getSample: (limit) => get(`/teas/sample/${limit}`),
  single: (id) => get(`/tea/${id}`),
  create: (form) => {
    const authToken = authHeader();
    console.log(form)
    const Header = {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      "Authorization": authToken,
    };
    return post('/tea', form, { headers: Header });
  },
  update: (id, body) => put(`/tea/${id}`, body),
  remove: (id) => destroy(`/tea/${id}`),
};

export default TeaService;