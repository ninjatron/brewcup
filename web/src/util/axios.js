import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

api.interceptors.request.use((config) => {
  return ({
    ...config,
    headers: {
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