import { createSlice } from '@reduxjs/toolkit';
import { type IUserInfo } from '../../../interfaces/authModels';

const initial_state: IUserInfo = {
  userinfo: {
    email: 'cris',
    id_usuario: 0,
    nombre_usuario: '',
    tokens: {
      access: '',
      refresh: '',
    },
  },
  userSesion: '',
  permisos: [],
  representante_legal: [],
  reintentos: false,
};

export const template_slice = createSlice({
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

export const { login, logout, checking_credentials } = template_slice.actions;
