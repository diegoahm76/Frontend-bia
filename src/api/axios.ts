import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: 'https://backend-bia-beta-production.up.railway.app/api/'
});
