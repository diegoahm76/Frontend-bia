import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://back-end-bia-beta.up.railway.app/api/'
});

api.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem('token');
      if (token !== null) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}

    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
