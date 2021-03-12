import { get, post, put, destroy, authHeader } from '../util/axios';

const UserService = {
  getAll: () => get('/users'),
  single: (id) => get(`/user/${id}`),
  create: (body) => post('/user', body),
  update: (id, body) => put(`/user/${id}`, body),
  remove: (id) => destroy(`/user/${id}`),
  updateAvatar: (id, form) => {
    const authToken = authHeader();
    console.log(form);
    const Header = {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      "Authorization": authToken,
    };
    return put(`/user/${id}/avatar`, form, { headers: Header });    
  }
};

export default UserService;