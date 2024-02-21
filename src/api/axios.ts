/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import {
  handleRequest,
  handleRequestError,
  handleResponseError,
} from './functions/axios.functions';
import { base_urlcam } from '../commons/auth/api/auth';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BETA_URL ||
      'https://back-end-bia-beta.up.railway.app/api/'
    // : process.env.REACT_APP_PROD_URL || 'https://bia.cormacarena.gov.co/api/';
    : process.env.REACT_APP_PROD_URL || `${base_urlcam}/api/`;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use((response) => response, handleResponseError);
