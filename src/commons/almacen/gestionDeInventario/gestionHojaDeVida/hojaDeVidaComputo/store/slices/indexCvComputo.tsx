
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Icv, type IMarca, type IComputers, type ICvcomputers, } from "../../interfaces/CvComputo";

const initial_state_current_computer = {
  id_bien: 0,
  codigo_bien: null,
  nro_elemento_bien: null,
  nombre: "",
  cod_tipo_bien: null,
  cod_tipo_activo: null,
  nivel_jerarquico: null,
  nombre_cientifico: null,
  descripcion: "",
  doc_identificador_nro: null,
  cod_metodo_valoracion: null,
  cod_tipo_depreciacion: null,
  cantidad_vida_util: null,
  valor_residual: null,
  stock_minimo: null,
  stock_maximo: null,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: null,
  id_unidad_medida: null,
  id_porcentaje_iva: null,
  id_unidad_medida_vida_util: null,
  id_bien_padre: null,
}

const initial_state_current_cv_computer = {
  antivirus: "",
  capacidad_almacenamiento: "",
  color: "",
  id_articulo: 0,
  memoria_ram: "",
  observaciones_adicionales: "",
  otras_aplicaciones: "",
  procesador: "",
  ruta_imagen_foto: "",
  sistema_operativo: "",
  suite_ofimatica: "",
  tipo_almacenamiento: "",
  tipo_de_equipo: "",
  codigo_bien: "",
  doc_identificador_nro: "",
  estado: "",
  marca: "",
  nombre: "",
  id_marca: 0,
}

const initial_state: Icv = {
  computers: [],
  current_computer: initial_state_current_computer,
  current_cv_computer: initial_state_current_cv_computer,
  marcas: [],

};

export const cv_computo_slice = createSlice({
  name: "cve",
  initialState: initial_state,
  reducers: {
    get_computers: (
      state: Icv,
      action: PayloadAction<IComputers[]>
    ) => {
      state.computers = action.payload;
    },
    current_computer: (
      state: Icv,
      action: PayloadAction<IComputers>
    ) => {
      state.current_computer = action.payload;
    },
    get_cv_computer: (
      state: Icv,
      action: PayloadAction<ICvcomputers>
    ) => {
      state.current_cv_computer = action.payload;
    },


    get_marks: (
      state: Icv,
      action: PayloadAction<IMarca[]>
    ) => {
      state.marcas = action.payload;
    },
    // get_cv_maintenance: (
    //     state: Icv, 
    //     action: PayloadAction<IcvMaintenance[]>
    //     ) => {
    //     state.cv_maintenance = action.payload;
    // },

  }
})

export const { current_computer, get_cv_computer, get_marks, get_computers } = cv_computo_slice.actions;

