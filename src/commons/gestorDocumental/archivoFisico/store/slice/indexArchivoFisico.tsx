import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  IArchivoFisico,
  IObjarbol,
  IObjBandejas,
  IObjcajas,
  IObjcarpetas,
  IObjDepositos,
  IObjEstantes,
} from '../../interface/archivoFisico';

const initial_state_arbol: IObjarbol = {
  deposito: {
    id_deposito: null,
    nombre_deposito: null,
    identificacion_deposito: null,
    orden_deposito :null,
    Informacion_Mostrar: null,
  },
  estantes: null
}
export const initial_state_deposito: IObjDepositos =  {
  id_deposito: null,
  nombre_deposito: null,
  identificacion_por_entidad: null,
  orden_ubicacion_por_entidad: null,
  direccion_deposito: null,
  activo: null,
  cod_municipio_nal: null,
  cod_pais_exterior: null,
  id_sucursal_entidad: null,
  estante: null,
}

export const initial_state_estante: IObjEstantes  =  {
  id_estante_deposito:null, 
  identificacion_por_deposito: null,
  orden_ubicacion_por_deposito:null, 
  id_deposito:null, 
  deposito_identificacion: null,
  deposito_nombre: null,
}

export const initial_state_bandeja: IObjBandejas  =  {
  id_bandeja_estante:null,
  identificacion_estante:null,
  deposito_archivo:null,
  identificacion_por_estante:null,
  orden_ubicacion_por_estante:null,
  id_estante_deposito:null,
  identificacion_deposito:null,
  nombre_deposito:null,
}

export const initial_state_caja: IObjcajas  =  {
  id_caja_bandeja: null,
  identificacion_por_bandeja:null,
  orden_ubicacion_por_bandeja: null,
  id_bandeja_estante: null,
  identificacion_bandeja:null,
  id_estante: null,
  identificacion_estante:null,
  id_deposito: null,
  identificacion_deposito:null,
  nombre_deposito:null,
}


export const initial_state_carpetas: IObjcarpetas  =  {
  id_carpeta_caja: null,
  identificacion_por_caja: null,
  orden_ubicacion_por_caja: null,
  id_prestamo_expediente: null,
  id_caja_bandeja: null,
  id_expediente: null,
  numero_expediente: null,
  identificacion_caja: null,
  id_bandeja: null,
  identificacion_bandeja: null,
  id_estante: null,
  identificacion_estante: null,
  id_deposito: null,
  identificacion_deposito: null,
  nombre_deposito: null,
}

const initial_state: IArchivoFisico = {
  depositos: [],
  estantes: [],
  bandejas: [],
  cajas: [],
  carpetas: [],
  arbol_deposito:initial_state_arbol,
  depositos_tabla:[],
  deposito:initial_state_deposito,
  estante: initial_state_estante,
  bandeja: initial_state_bandeja,
  caja: initial_state_caja,
  carpeta: initial_state_carpetas,

};

export const archivo_fisico_slice = createSlice({
  name: 'archivo_fisico',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_depositos_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjDepositos[]>
    ) => {
      state.depositos = action.payload;
    },
    set_deposito_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjDepositos>
    ) => {
      state.deposito = action.payload;
    },
    set_estantes_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjEstantes[]>
    ) => {
      state.estantes = action.payload;
    },
    set_estante_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjEstantes>
    ) => {
      state.estante = action.payload;
    },
    set_bandejas_avanzadas: (
      state: IArchivoFisico,
      action: PayloadAction<IObjBandejas[]>
    ) => {
      state.bandejas = action.payload;
    },
    set_bandeja_avanzadas: (
      state: IArchivoFisico,
      action: PayloadAction<IObjBandejas>
    ) => {
      state.bandeja = action.payload;
    },
    set_cajas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcajas[]>
      ) => {
        state.cajas = action.payload;
      },
      set_caja_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcajas>
      ) => {
        state.caja = action.payload;
      },
      set_carpetas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcarpetas[]>
      ) => {
        state.carpetas= action.payload;
      },
      set_carpeta_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcarpetas>
      ) => {
        state.carpeta= action.payload;
      },
      set_deposito_arbol: (
        state: IArchivoFisico,
        action: PayloadAction<IObjarbol>
      ) => {
        state.arbol_deposito= action.payload;
      },
      set_listado_depositos: (
        state: IArchivoFisico,
        action: PayloadAction<IObjDepositos[]>
      ) => {
        state.depositos_tabla= action.payload;
      },
  },
});
export const {
  set_depositos_avanzada,
  set_estantes_avanzada,
  set_bandejas_avanzadas,
  set_cajas_avanzadas,
  set_carpetas_avanzadas,
  set_deposito_arbol,
  set_listado_depositos, 
  reset_state,
  set_deposito_avanzada,
  set_carpeta_avanzadas,
  set_caja_avanzadas,
  set_bandeja_avanzadas,
  set_estante_avanzada

} = archivo_fisico_slice.actions;
