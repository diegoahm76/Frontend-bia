import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IDeposito,
  IdEstanteDeposito,
  IMode,
  IObEstante,
  IObjBandeja,
  IObjCaja,
  IObjCarpeta,
  IObjDeposito,
  IObjRotuloCarpeta,
  IObjSucursales,
} from '../../interfaces/deposito';
import type { GetEstantes, InfoDepositos } from '../../Estantes/types/types';
import type { IBuscarCaja } from '../../Cajas/types/types';

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
  id_bandeja_estante: null,
};
export const initial_state_carpeta: IObjCarpeta = {
  orden_ubicacion_por_bandeja: null,
  identificacion_por_bandeja: null,
  id_carpeta_caja: null,
  id_caja_bandeja: null,
  id_bandeja_estante: null,
  identificacion_bandeja: null,
};

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

export const cajas: IBuscarCaja = {
  identificacion_deposito: null,
  id_deposito: null,
  identificacion_estante: '',
  id_estante: null,
  identificacion_bandeja: '',
  id_bandeja: null,
  identificacion_caja: '',
  id_caja: null,
  orden_caja: null,
  nombre_deposito: '',
};

export const initial_state_rotulo:IObjRotuloCarpeta ={
  id_carpeta_caja:null,
  identificacion_por_caja:null,
  id_caja_bandeja:null,
  identificacion_caja:null,
  id_serie_origen:null,
  nombre_serie_origen:null,
  id_subserie_origen:null,
  nombre_subserie_origen:null,
  titulo_expediente:null,
  codigo_exp_und_serie_subserie:null,
  codigo_exp_Agno:null,
  codigo_exp_consec_por_agno: null,
  numero_expediente:null,
  fecha_folio_inicial:null,
}


export const initial_state: IDeposito = {
  deposito: [],
  current_deposito: initial_state_deposito,
  sucursales: [],
  mode_estante: mode_estantes,
  bandejas: [],
  current_bandeja: initial_state_bandeja,
  carpetas: [],
  data_estantes: estantes_slice,
  data_depositos: info_deposito_slice,
  deposito_estante: id_depo_est,
  estantes: [],
  cajas_lista: [],
  cajas,
  rotulo_carpeta:initial_state_rotulo,

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
    set_bandejas: (state: IDeposito, action: PayloadAction<IObjBandeja[]>) => {
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
    set_current_id_depo_est: (state: IDeposito, action: PayloadAction<any>) => {
      state.deposito_estante = action.payload;
    },
    set_estantes: (state: IDeposito, action: PayloadAction<IObEstante[]>) => {
      state.estantes = action.payload;
    },
    set_cajas: (state: IDeposito, action: PayloadAction<IObjCaja[]>) => {
      state.cajas_lista = action.payload;
    },
    set_current_cajas: (state: IDeposito, action: PayloadAction<IBuscarCaja>) => {
      state.cajas = action.payload;
    },
    set_carpetas: (state: IDeposito, action: PayloadAction<IObjCarpeta[]>) => {
      state.carpetas = action.payload;
    },
    set_rotulo_crpetas: (state: IDeposito, action: PayloadAction<IObjRotuloCarpeta>) => {
      state.rotulo_carpeta = action.payload;
    },
  },
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
  set_current_cajas,
  set_carpetas,
  set_cajas,
  set_rotulo_crpetas,

} = deposito_slice.actions;
