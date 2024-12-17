import axios from './service';

const controller = {
  get: (path) => axios.get(path).then((data) => data),
};

const controllerPut = {
  put: (data) => axios.put(`http://217.24.162.58:8081/api/v1/user_put/`, data).then((data) => data),
};
const controllerPost = {
  post: (data, path) => axios.post(`/${path}`, data).then((data) => data),
};
export { controller, controllerPut, controllerPost };