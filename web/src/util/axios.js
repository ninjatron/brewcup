import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

const authHeader = () => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  if (token) {
    return 'Bearer ' + token;
  } else {
    return "";
  }
};

const { get, post, put, delete: destroy } = api;
export { get, post, put, destroy, authHeader };