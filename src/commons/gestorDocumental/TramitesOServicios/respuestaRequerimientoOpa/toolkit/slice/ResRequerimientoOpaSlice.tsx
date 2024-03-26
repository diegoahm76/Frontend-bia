/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';


interface Anexo {
  asunto: string;
  descripcion_de_la_solicitud: string;
  id: string;
  nombre_archivo: string;
  // other properties...
  descripcion?: string | null;
  cod_categoria_archivo?: string | null;
  tiene_replica_fisica?: boolean | null;
  cod_origen_archivo?: string | null;
  id_tipologia_doc?: number | null;
  tipologia_no_creada_TRD?: string | null;
  palabras_clave_doc?: string | null;

}
const initialState: {
  anexosCreados: Anexo[];
  currentAnexo: any;
  currentSolicitudAlUsuario: any;
  metadatos: any;
  viewMode: boolean;

  //* primera parte de la creación de la respuesta de una OPA
  currentPersonaRespuestaUsuario: any;

} = {
  anexosCreados: [],
  currentAnexo: null,
  currentSolicitudAlUsuario: null,
  metadatos: null,
  viewMode: false,
  currentPersonaRespuestaUsuario: null,
};

export const ResRequerimientoOpaSlice = createSlice({
  name: 'ResRequerimientoOpaSlice',
  initialState,
  reducers: {
    addAnexo: (state, action: PayloadAction<Omit<Anexo, 'id'>>) => {
      const existingAnexo = state.anexosCreados.find((anexo) => {
        // Si 'nombre_archivo' está vacío, no realiza la comparación y devuelve 'false'
        if (!anexo.nombre_archivo) return false;

        // Si 'nombre_archivo' no está vacío, realiza la comparación
        return (
          anexo.nombre_archivo.toLowerCase() ===
          action.payload.nombre_archivo.toLowerCase()
        );
      });
      if (existingAnexo) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Un archivo con ese nombre ya existe, por favor cambie el nombre del archivo para poder agregar el anexo',
          confirmButtonText: 'Entendido',
        });
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
        const isDuplicateName = state.anexosCreados.some(
          (anexo, i) => i !== index && anexo.nombre_archivo === action.payload.nombre_archivo
        );
        if (!isDuplicateName) {
          state.anexosCreados[index] = action.payload;
          state.currentAnexo = null;
          control_success('Se ha editado el anexo');
        } else {
          state.currentAnexo = null;
          control_warning('No se ha podido editar el anexo, el nombre del archivo no puede repetirse');
        }
      }
    },

    setCurrentAnexo: (state: any, action: any) => {
      state.currentAnexo = action.payload;
    },

    setMetadatos: (state: any, action: any) => {
      state.metadatos = action.payload;
    },

    setViewMode: (state: any, action: { payload: boolean }) => {
      state.viewMode = action.payload as boolean;
    },


    //* para actualización de la primera parte de la respuesta al requerimiento de la OPA
    setCurrentPersonaRespuestaUsuario: (state: any, action: any) => {
      state.currentPersonaRespuestaUsuario = action.payload;
    },


    resetItems: (state) => {
      state.anexosCreados = [];
      state.currentAnexo = null;
      state.currentSolicitudAlUsuario = null;
      state.metadatos = null;
      state.viewMode = false;
    },

    resetFormPartOne: (state) => {
      state.currentPersonaRespuestaUsuario = null;
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

  //* primera parte de la creación de la respuesta de una OPA
  setCurrentPersonaRespuestaUsuario,
  resetFormPartOne,

} = ResRequerimientoOpaSlice.actions;
