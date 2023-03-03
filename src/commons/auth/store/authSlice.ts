import { createSlice } from '@reduxjs/toolkit';
// import clienteAxios from '../../../api/axios';
import { type IUserInfo } from '../interfaces/authModels';


const initial_state: IUserInfo = {
  userinfo: {
    email: '',
    id_usuario: 0,
    nombre_usuario: '',
    tokens: {
      access: '',
      refresh: '',
    },
  },
  user_sesion: '',
  permisos: [],
  representante_legal: [],
  reintentos: false,
  status: 'not-authenticated',
  error_message: ''
};


export const auth_slice = createSlice({
  name: 'counter',
  initialState: initial_state,
  reducers: {
    login: (state, { payload }) => {
      state.userinfo = payload.userinfo
      state.user_sesion = payload.user_sesion
      state.permisos = payload.permisos
      state.representante_legal = payload.representante_legal
      state.reintentos = false
      state.status = 'authenticated'
    },
    logout: (state, { payload }) => {
      state.user_sesion = ''
      state.userinfo = initial_state.userinfo
      state.permisos = []
      state.representante_legal = []
      state.reintentos =false
      state.status = 'not-authenticated'
      state.error_message = payload.error_message
      console.log(state)
    },
    checking_credentials: (state) => {
      state.status = 'checking'
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const { login, logout, checking_credentials } = auth_slice.actions;

