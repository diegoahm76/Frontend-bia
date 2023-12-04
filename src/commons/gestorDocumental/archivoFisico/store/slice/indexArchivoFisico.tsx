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

const initial_state: IArchivoFisico = {
  depositos: [],
  estantes: [],
  bandejas: [],
  cajas: [],
  carpetas: [],
  arbol_deposito:initial_state_arbol,
  depositos_tabla:[],
};

export const archivo_fisico_slice = createSlice({
  name: 'archivo_fisico',
  initialState: initial_state,
  reducers: {
    set_depositos_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjDepositos[]>
    ) => {
      state.depositos = action.payload;
    },
    set_estantes_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjEstantes[]>
    ) => {
      state.estantes = action.payload;
    },
    set_bandejas_avanzadas: (
      state: IArchivoFisico,
      action: PayloadAction<IObjBandejas[]>
    ) => {
      state.bandejas = action.payload;
    },
    set_cajas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcajas[]>
      ) => {
        state.cajas = action.payload;
      },
      set_carpetas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcarpetas[]>
      ) => {
        state.carpetas= action.payload;
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
  set_listado_depositos

} = archivo_fisico_slice.actions;
