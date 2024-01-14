import { createSlice } from '@reduxjs/toolkit';
// import clienteAxios from '../../../api/axios';
import { type IUserInfo } from '../interfaces/authModels';

const initial_state: IUserInfo | any = {
  userinfo: {
    email: '',
    nombre_de_usuario: '',
    tokens: {
      refresh: '',
      access: '',
    },
    is_superuser: false,
    id_usuario: 0,
    tipo_usuario: '',
    id_persona: 0,
    tipo_persona: '',
    nombre_unidad_organizacional: '',
  },
  user_sesion: '',
  permisos: [],
  representante_legal: [],
  apoderados: [],
  status: 'not-authenticated',
  error_message: '',
  open_dialog: false,
  dialog_representante: false,
  entorno: 'C',
  is_blocked: false,
  representacion_legal: 'MP',

/*  const [is_loading, set_is_loading] = useState(true);
  const [permisos, set_permisos] = useState<any[]>([]);*/

  is_loading: false,
  // permissions: [],
};

export const auth_slice = createSlice({
  name: 'counter',
  initialState: initial_state,
  reducers: {
    login: (state, { payload }) => {
      state.userinfo = payload.userinfo;
      state.user_sesion = payload.user_sesion;
      state.permisos = payload.permisos;
      state.representante_legal = payload.representante_legal;
      state.apoderados = payload.apoderados;
      state.representacion_legal = {
        cod_relacion_con_el_titular: 'MP',
      };
    },
    logout: (state, { payload }) => {
      state.user_sesion = '';
      state.userinfo = initial_state.userinfo;
      state.permisos = [];
      state.representante_legal = [];
      state.status = 'not-authenticated';
      state.error_message = payload.error_message ?? '';
      state.dialog_representante = false;
      state.open_dialog = false;
      state.is_blocked = payload.is_blocked === true;
      state.representacion_legal = null;
    },
    checking_credentials: (state) => {
      state.status = 'checking';
      state.error_message = '';
      state.is_blocked = false;
    },
    open_dialog_entorno: (state) => {
      state.open_dialog = true;
    },
    close_dialog_entorno: (state) => {
      state.open_dialog = false;
      state.user_sesion = '';
      state.userinfo = initial_state.userinfo;
      state.permisos = [];
      state.representante_legal = [];
      state.status = 'not-authenticated';
      state.error_message = '';
    },
    open_dialog_representado: (state) => {
      state.dialog_representante = true;
    },
    close_dialog_representado: (state) => {
      state.dialog_representante = false;
      state.user_sesion = '';
      state.userinfo = initial_state.userinfo;
      state.permisos = [];
      state.representante_legal = [];
      state.status = 'not-authenticated';
      state.error_message = '';
    },
    close_dialog_representado_app: (state) => {
      state.dialog_representante = false;
    },
    change_entorno: (state, { payload }) => {
      state.entorno = payload;
    },
    set_permissions: (state, { payload }) => {
      state.permisos = payload;
    },
    set_authenticated: (state) => {
      state.status = 'authenticated';
    },
    setRepresentacionLegal: (state, { payload }) => {
      state.representacion_legal = payload;
    },


    set_is_loading: (state, { payload }) => {
      state.is_loading = payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  login,
  logout,
  checking_credentials,
  open_dialog_entorno,
  close_dialog_entorno,
  change_entorno,
  set_permissions,
  set_authenticated,
  open_dialog_representado,
  close_dialog_representado,
  close_dialog_representado_app,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  setRepresentacionLegal,
  set_is_loading,
} = auth_slice.actions;
