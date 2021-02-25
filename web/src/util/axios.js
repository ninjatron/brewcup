import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

api.interceptors.request.use((config) => {
  console.log("Config:", config, "\nToken:", currentUser);
  return ({
    ...config,
    headers: {
      'Authorization': `Bearer ${currentUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
},
  error => Promise.reject(error),
);

api.interceptors.response.use((response) =>
  response,
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

const { get, post, put, delete: destroy } = api;
export { get, post, put, destroy };