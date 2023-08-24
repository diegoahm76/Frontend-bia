import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IDeposito,
  IMode,
  IObjDeposito,
  IObjSucursales,
} from '../../interfaces/deposito';

export const initial_state_deposito: IObjDeposito = {
  nombre_deposito: null,
  identificacion_por_entidad: null,
  direccion_deposito: null,
  cod_municipio_nal: null,
  cod_pais_exterior: '',
  id_sucursal_entidad: null,
  activo: false,
  orden_ubicacion_por_entidad: null,
  nombre_sucursal: null,
  municipio: null
}

export const mode_estantes: IMode = {
  ver: false,
  crear: false,
  editar: false,
};

export const initial_state: IDeposito = {
  deposito: [],
  current_deposito: initial_state_deposito,
  sucursales: [],
  mode_estante: mode_estantes
};

export const deposito_slice = createSlice({
  name: 'deposito',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,

    set_sucursales: (
      state: IDeposito,
      action: PayloadAction<IObjSucursales[]>
    ) => {
      state.sucursales = action.payload;
    },

    set_depositos: (
      state: IDeposito,
      action: PayloadAction<IObjDeposito[]>
    ) => {
      state.deposito = action.payload;
    },
    set_current_deposito: (
      state: IDeposito,
      action: PayloadAction<IObjDeposito>
    ) => {
      state.current_deposito = action.payload;
    },
    set_current_mode_estantes: (
      state: IDeposito,
      action: PayloadAction<IMode>
    ) => {
      state.mode_estante = action.payload;
    },
  },
});

export const {
  set_depositos,
  set_current_deposito,
  set_sucursales,
  set_current_mode_estantes,
} = deposito_slice.actions;
