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
 * axios instance url is different from the download files url (production and beta)
 */
// ? auth variables for the app (production and beta)
const DEFAULT_AUTH_URL_PROD: string = 'https://bia.cormacarena.gov.co/#';
const DEFAULT_AUTH_URL_BETA: string= 'http://localhost:3000/#';

// ? default urls for the app - api connection & download files (beta)
const DEFAULT_BETA_URL: string =
  'https://back-end-bia-beta.up.railway.app/api/';
const DEFAULT_BETA_DOWNLOAD_FILES_URL: string =
  'https://back-end-bia-beta.up.railway.app';

// ? default urls for the app - api connection & download files (production)
const DEFAULT_PROD_URL: string = 'https://bia.cormacarena.gov.co/api/';
const DEFAULT_PROD_DOWNLOAD_FILES_URL =
  'https://bia.cormacarena.gov.co';

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

export {
  // ? auth variables for the app (production and beta)
  DEFAULT_AUTH_URL_BETA,
  DEFAULT_AUTH_URL_PROD,

  // ? default urls for the app - api connection & download files (beta)
  DEFAULT_BETA_URL,
  DEFAULT_BETA_DOWNLOAD_FILES_URL,

  // ? default urls for the app - api connection & download files (production)
  DEFAULT_PROD_URL,
  DEFAULT_PROD_DOWNLOAD_FILES_URL,
};

