import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IDeposito,
  IdEstanteDeposito,
  IMode,
  IObEstante,
  IObjBandeja,
  IObjDeposito,
  IObjSucursales,
} from '../../interfaces/deposito';
import type { GetEstantes, InfoDepositos } from '../../Estantes/types/types';

export const initial_state_deposito: IObjDeposito = {
  nombre_deposito: null,
  identificacion_por_entidad: null,
  direccion_deposito: null,
  cod_municipio_nal: null,
  cod_pais_exterior: '',
  id_sucursal_entidad: null,
  id_deposito: null,
  activo: false,
  orden_ubicacion_por_entidad: null,
  nombre_sucursal: null,
  municipio: null,
};

export const initial_state_bandeja: IObjBandeja = {
  id_estante_deposito: null,
  identificacion_por_estante: null,
  orden_ubicacion_por_estante: null,
  id_bandeja_estante: null

}
export const mode_estantes: IMode = {
  ver: false,
  crear: false,
  editar: false,
};

export const estantes_slice: GetEstantes = {
  id_estante_deposito: null,
  orden_ubicacion_por_deposito: null,
  identificacion_por_deposito: '',
};
export const info_deposito_slice: InfoDepositos = {
  id_deposito: null,
  orden_ubicacion_por_entidad: null,
  nombre_deposito: '',
  identificacion_por_entidad: '',
  nombre_sucursal: '',
};

export const id_depo_est: IdEstanteDeposito = {
  id_deposito: null,
  id_estante_deposito: null,
  nombre_deposito: '',
  identificacion_por_deposito: '',
};

export const initial_state: IDeposito = {
  deposito: [],
  current_deposito: initial_state_deposito,
  sucursales: [],
  mode_estante: mode_estantes,
  bandejas: [],
  current_bandeja: initial_state_bandeja,
  data_estantes: estantes_slice,
  data_depositos: info_deposito_slice,
  deposito_estante: id_depo_est,
  estantes: [],
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
    set_bandejas: (
      state: IDeposito,
      action: PayloadAction<IObjBandeja[]>
    ) => {
      state.bandejas = action.payload;
    },
    set_current_bandeja: (
      state: IDeposito,
      action: PayloadAction<IObjBandeja>
    ) => {
      state.current_bandeja = action.payload;
    },
    set_current_estantes: (
      state: IDeposito,
      action: PayloadAction<GetEstantes>
    ) => {
      state.data_estantes = action.payload;
    },
    set_current_info_deposito: (
      state: IDeposito,
      action: PayloadAction<InfoDepositos>
    ) => {
      state.data_depositos = action.payload;
    },
    set_current_id_depo_est: (
      state: IDeposito,
      action: PayloadAction<any>
    ) => {
      state.deposito_estante = action.payload;
    },
    set_estantes: (
      state: IDeposito,
      action: PayloadAction<IObEstante[]>
    ) => {
      state.estantes = action.payload;
    },
  }
});


export const {
  set_depositos,
  set_current_deposito,
  set_sucursales,
  set_current_mode_estantes,
  set_current_bandeja,
  set_bandejas,
  set_current_estantes,
  set_current_info_deposito,
  set_current_id_depo_est,
  set_estantes,
} = deposito_slice.actions;
