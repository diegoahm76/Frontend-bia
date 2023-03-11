import axios from "axios";
// import { type IUserInfo } from "../commons/auth/interfaces/authModels";

export const api = axios.create({
 // baseURL: process.env.REACT_APP_BACKEND_URL,
   baseURL: 'https://backend-bia-beta-production.up.railway.app/api/',
});

api.interceptors.request.use(
  async (request) => {
    try {
      // const { userinfo: { tokens } } = JSON.parse(localStorage.getItem('userInfo') ?? '') as IUserInfo;
      // if (tokens.access != null) {
        request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4NTYzNzczLCJpYXQiOjE2NzgzOTA5NzMsImp0aSI6IjIwZjg4Njk3MGJjZTRjY2Y5YTJkNzgwOGUyZGZlNzhkIiwidXNlcl9pZCI6MX0.ChQP1d_TFSjmm1OdJ4divb-vTIj4YBsUQXQi2Iai-BU`; 
      // }
    } catch (e) { }

    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

