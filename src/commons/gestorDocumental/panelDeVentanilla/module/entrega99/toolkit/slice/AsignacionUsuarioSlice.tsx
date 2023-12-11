/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { control_error, control_success } from '../../../../../../../helpers';

interface Anexo {
  id: string;
  nombre_archivo: string;
  // other properties...
}
const initialState: {
  anexosCreados: Anexo[];
  currentAnexo: any;
  currentSolicitudAlUsuario: any;
  metadatos: any;
  viewMode: boolean;
} = {
  anexosCreados: [],
  currentAnexo: null,
  currentSolicitudAlUsuario: null,
  metadatos: null,
  viewMode: false,
};

export const AsignacionUsuarioSlice = createSlice({
  name: 'AsignacionUsuarioSlice',
  initialState,
  reducers: {
    addAnexo: (state, action: PayloadAction<Omit<Anexo, 'id'>>) => {
      const existingAnexo = state.anexosCreados.find(
        (anexo) =>
          anexo.nombre_archivo.toLowerCase() ===
          action.payload.nombre_archivo.toLowerCase()
      );
      if (existingAnexo) {
        control_error(
          'Ya hay un nombre de archivo igual, no es posible agregarlo'
        );
        return;
      } else {
        state.anexosCreados.push({ ...action.payload, id: uuidv4() });
        control_success('Se ha creado el anexo');
      }
    },
    deleteAnexo: (state, action: PayloadAction<string>) => {
      state.anexosCreados = state.anexosCreados.filter(
        (anexo) => anexo.id !== action.payload
      );
      control_success('Se ha eliminado el anexo');
    },
    editAnexo: (state, action: PayloadAction<Anexo>) => {
      const index = state.anexosCreados.findIndex(
        (anexo) => anexo.id === action.payload.id
      );
      if (index !== -1) {
        state.anexosCreados[index] = action.payload;
      }
    },

    setCurrentAnexo: (state: any, action: any) => {
      state.currentAnexo = action.payload;
    },

    setMetadatos: (state: any, action: any) => {
      state.metadatos = action.payload;
    },

    setViewMode: (state: any, action: any) => {
      state.viewMode = action.payload;
    },

    resetItems: (state) => {
      state.anexosCreados = [];
      state.currentAnexo = null;
      state.currentSolicitudAlUsuario = null;
      state.metadatos = null;
      state.viewMode = false;
    },
  },
});

export const {
  addAnexo,
  deleteAnexo,
  editAnexo,
  setCurrentAnexo,
  setMetadatos,
  setViewMode,
  resetItems,
} = AsignacionUsuarioSlice.actions;
