import axios from "axios";

// eslint-disable-next-line @typescript-eslint/naming-convention
const baseURL = "https://back-end-bia-beta.up.railway.app/api/"
// const baseURL = "http://70.30.6.237/api/"
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      if (token !== null) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.log(e);
    }
    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
