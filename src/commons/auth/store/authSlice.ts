import { createSlice } from '@reduxjs/toolkit';
// import clienteAxios from '../../../api/axios';
import { type IUserInfo } from '../interfaces/authModels';


const initial_state: IUserInfo = {
  user_info: {
    email: '',
    id_usuario: 0,
    nombre_de_usuario: '',
    tokens: {
      access: '',
      refresh: '',
    },
  },
  user_sesion: '',
  permisos: [],
  representante_legal: [],
  reintentos: false,
};


export const auth_slice = createSlice({
  name: 'counter',
  initialState: initial_state,
  reducers: {
    login: (state, action) => {
      console.log('login');
    },
    logout: (state, payload) => {
      console.log('logout');
    },
    checking_credentials: (state) => {
      console.log('checking');
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const { login, logout, checking_credentials } = auth_slice.actions;

