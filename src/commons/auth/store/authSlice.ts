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
  tab: '1',
  status: 'not-authenticated'
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
    logout: (state) => {
      state = {...initial_state }
      state.status = 'not-authenticated'
    },
    checking_credentials: (state) => {
      state.status = 'checking'
    },
    change_tab: (state, {payload}) => {
      state.tab = payload
    }
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const { login, logout, checking_credentials, change_tab } = auth_slice.actions;

