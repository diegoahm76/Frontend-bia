/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import {
  handleRequest,
  handleRequestError,
  handleResponseError,
} from './functions/axios.functions';

// eslint-disable-next-line @typescript-eslint/naming-convention

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BETA_URL || 'https://back-end-bia-beta.up.railway.app/api/'
    : process.env.REACT_APP_PROD_URL || 'https://bia.cormacarena.gov.co/api/';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use((response) => response, handleResponseError);


/*
const allowedOrigins = ['http://localhost:3000', 'http://example.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'La política de CORS para este sitio no ' +
                'permite el acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));*/