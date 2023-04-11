
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Icv, type IMarca, type IVehicles, type IcvVehicles } from "../../interfaces/CvVehiculo";

const initial_state_current_vehicle = {
  id_bien: 0,
  codigo_bien: null,
  nro_elemento_bien: null,
  nombre: "",
  cod_tipo_bien: null,
  cod_tipo_activo: null,
  nivel_jerarquico: null,
  nombre_cientifico: null,
  descripcion: "",
  doc_identificador_nro: "",
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

const initial_state_current_cv_vehicle = {
   
    id_hoja_de_vida: 0,
    codigo_bien: "",
    nombre: "",
    doc_identificador_nro: "",
    id_marca: 0,
    marca: "",
    cod_tipo_vehiculo: "",
    tiene_platon: false,
    capacidad_pasajeros: 0,
    color: "",
    linea: "",
    tipo_combustible: "",
    es_arrendado: false,
    ultimo_kilometraje: 0,
    fecha_ultimo_kilometraje: 0,
    fecha_adquisicion: 0,
    fecha_vigencia_garantia: 0,
    numero_motor: "",
    numero_chasis: "",
    cilindraje: 0,
    transmision: "",
    dimension_llantas: 0,
    capacidad_extintor: 0,
    tarjeta_operacion: "",
    observaciones_adicionales: "",
    es_agendable: false,
    en_circulacion: false,
    fecha_circulacion: 0,
    ruta_imagen_foto: "",
    id_articulo: 0,
    id_vehiculo_arrendado: null,
    id_proveedor: null,
    estado: "",
    tipo_vehiculo: "",
    
    
 
 }

 const initial_state: Icv = {
    vehicles: [],
    current_vehicle: initial_state_current_vehicle,
    current_cv_vehicle: initial_state_current_cv_vehicle,
    marcas: [],

};

export const cve_vehicle_slice = createSlice({
    name: "cve",
    initialState: initial_state,
    reducers: {
        get_vehicles: (
            state: Icv, 
            action: PayloadAction<IVehicles[]>
            ) => {
            state.vehicles = action.payload;
        },
        current_vehicle: (
            state: Icv, 
            action: PayloadAction<IVehicles>
            ) => {
            state.current_vehicle = action.payload;
        },
        get_cv_vehicle: (
            state: Icv, 
            action: PayloadAction<IcvVehicles>
            ) => {
            state.current_cv_vehicle = action.payload;
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


export const {  current_vehicle, get_cv_vehicle, get_marks, get_vehicles } = cve_vehicle_slice.actions;