/* eslint-disable @typescript-eslint/naming-convention */
import axios, { type AxiosResponse } from 'axios';
import {
  handleRequest,
  handleRequestError,
  handleResponseError,
} from './functions/axios.functions';

/**
 * The base URL for making API requests.
 *
 * If the environment is set to development, it uses the beta URL or the default beta URL.
 * If the environment is set to production, it uses the production URL or the default production URL.
 */
const DEFAULT_BETA_URL: string =
  'https://back-end-bia-beta.up.railway.app/api/';
const DEFAULT_PROD_URL: string = 'https://bia.cormacarena.gov.co/api/';

export const baseURL: string =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BETA_URL || DEFAULT_BETA_URL
    : process.env.REACT_APP_PROD_URL || DEFAULT_PROD_URL;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleResponseError
);
