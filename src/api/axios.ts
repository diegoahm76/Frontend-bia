import axios from "axios";
import { type IUserInfo } from "../interfaces/authModels";

export const api = axios.create({
 // baseURL: process.env.REACT_APP_BACKEND_URL,
   baseURL: 'https://backend-bia-beta-production.up.railway.app/api/',
});

api.interceptors.request.use(
  async (request) => {
    try {
      const { userinfo: { tokens } } = JSON.parse(localStorage.getItem('userInfo') ?? '') as IUserInfo;
      if (tokens.access != null) {
        request.headers.Authorization = `Bearer ${tokens.access}`;
      }
    } catch (e) { }

    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

