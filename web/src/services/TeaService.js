import { get, post, put, destroy, authHeader } from '../util/axios';

const TeaService = {
  getAll: (pageNumber) => get(`/teas/${pageNumber}`),
  getSample: (limit) => get(`/teas/sample/${limit}`),
  getSingle: (id) => get(`/tea/${id}`),
  create: (form) => {
    const authToken = authHeader();
    const Header = {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      "Authorization": authToken,
    };
    return post('/tea', form, { headers: Header });
  },
  search: (query) => get(`/teas/search/${query}`),
  update: (id, body) => put(`/tea/${id}`, body),
  remove: (id) => destroy(`/tea/${id}`),
  toggleFavorite: (id, userId) => {
    console.log(userId)
    put(`/tea/${id}/favorite`, { userId: userId }, {  headers: { "Authorization": authHeader() } })
  }
};

export default TeaService;