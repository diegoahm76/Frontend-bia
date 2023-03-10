import axios from "axios";
// import { type IUserInfo } from "../commons/auth/interfaces/authModels";s

export const api = axios.create({
 // baseURL: process.env.REACT_APP_BACKEND_URL,
   baseURL: 'https://backend-bia-beta-production.up.railway.app/api/',
});
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4NjQ5OTE0LCJpYXQiOjE2Nzg0NzcxMTQsImp0aSI6IjM3ZmNlYTk0ODE5ODQ5NmRhYzA1ZDUzMDhhZjUzOTY5IiwidXNlcl9pZCI6MX0.hqxC9U9L7aWUnCs_yHDhQoZgJBxW9eVVrECR65qgpG0'
api.interceptors.request.use(
  async (request) => {
    try {
      // const { userinfo: { tokens } } = JSON.parse(localStorage.getItem('userInfo') ?? '') as IUserInfo;
      // if (tokens.access != null) {
        
      // }
      request.headers.Authorization = `Bearer ${token}`;
    } catch (e) { }

    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

