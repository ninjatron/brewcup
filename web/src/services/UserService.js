import { get, post, put, destroy, authHeader } from '../util/axios';

const UserService = {
  getAll: () => get('/users'),
  single: (id) => get(`/user/${id}`),
  create: (body) => post('/user', body),
  update: (body) => {
    return put(`/user/${body._id}`, body, { headers: { "Authorization": authHeader() }});
  },
  remove: (id) => destroy(`/user/${id}`),
  updateAvatar: (id, form) => {
    const authToken = authHeader();
    const Header = {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      "Authorization": authToken,
    };
    return put(`/user/${id}/avatar`, form, { headers: Header });    
  }
};

export default UserService;