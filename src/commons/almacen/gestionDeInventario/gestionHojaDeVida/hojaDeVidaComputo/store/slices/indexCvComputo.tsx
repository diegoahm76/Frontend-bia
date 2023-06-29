
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Icv, type IMarca, type IComputers, type ICvcomputers, } from "../../interfaces/CvComputo";

const initial_state_current_computer = {
  id_bien: null,
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
  id_articulo: 0,
  id_porcentaje_iva: null,
  id_unidad_medida_vida_util: null,
  id_bien_padre: null,
  cod_tipo_elemento_vivero: 0,
  es_semilla_vivero: false,
  estado: "",
  marca: "",
  nombre_padre: "",
  porcentaje_iva: 0,
  unidad_medida: "",
  unidad_medida_vida_util: "",
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
  id_hoja_de_vida: null,
}

const initial_state: Icv = {
  computers: [],
  current_computer: initial_state_current_computer,
  current_cv_computer: initial_state_current_cv_computer,
  marcas: [],
  cv_computer: []

};

export const cv_computo_slice = createSlice({
  name: "cv",
  initialState: initial_state,
  reducers: {
    set_computers: (
      state: Icv,
      action: PayloadAction<IComputers[]>
    ) => {
      state.computers = action.payload;
    },
    set_current_computer: (
      state: Icv,
      action: PayloadAction<IComputers>
    ) => {
      state.current_computer = action.payload;
    },
    set_cv_computer: (
      state: Icv,
      action: PayloadAction<ICvcomputers[]>
    ) => {
      state.cv_computer = action.payload;
    },
    set_current_cv_computer: (
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
  }
})

export const { set_current_computer, set_cv_computer, get_marks, set_computers, set_current_cv_computer } = cv_computo_slice.actions;

