import axios from "axios";
const apiRootPath = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: apiRootPath,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data.message) {
      alert(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
