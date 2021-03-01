import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && user.token) {
    return 'Bearer ' + user.token;
  } else {
    return "";
  }
};

const { get, post, put, delete: destroy } = api;
export { get, post, put, destroy, authHeader };