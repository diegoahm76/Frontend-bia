/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { api } from './../../api/axios';

export const default_headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const get_adapter_axios = async (
  endpoint: any,
  headers = {}
): Promise<any> => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        ...default_headers,
        ...headers
      }
    });
    return response;
    //! mirar si debe ser response.data.data;
  } catch (error) {
    //  console.log('')(error);
  }
};

export const post_axios_adapter = async ({
  data,
  endpoint,
  headers = {}
}: any): Promise<any> => {
  // const access_token = get_item('token');
  const response = await axios.post(endpoint, data, {
    headers: {
      ...default_headers,
      ...headers
    }
  });
  return response.data;
};

export const put_axios_adapter = async ({
  data,
  endpoint,
  headers = {}
}: any): Promise<any> => {
  // const access_token = await get_item('token');
  const response = await api.put(endpoint, data, {
    headers: {
      ...default_headers,
      ...headers,
    }
  });
  return response.data;
};

export const remove_axios_adapter = async ({
  endpoint,
  headers = {}
}: any): Promise<any> => {
  // const access_token = get_item('token');
  const response = await api.delete(endpoint, {
    headers: {
      ...default_headers,
      ...headers,
    }
  });
  return response.data;
};
