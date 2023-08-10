
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Icv, IMarca, IVehicles, IcvVehicles, IObjMantenimiento } from "../../interfaces/CvVehiculo";

const initial_state_current_vehicle = {
    id_bien: null,
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

    id_hoja_de_vida: null,
    codigo_bien: "",
    nombre: "",
    doc_identificador_nro: "",
    id_marca: null,
    marca: "",
    cod_tipo_vehiculo: "",
    tiene_platon: false,
    capacidad_pasajeros: null,
    color: "",
    linea: "",
    tipo_combustible: "",
    es_arrendado: false,
    ultimo_kilometraje: null,
    fecha_ultimo_kilometraje: new Date().toString(),
    fecha_adquisicion: new Date().toString(),
    fecha_vigencia_garantia: new Date().toString(),
    numero_motor: "",
    numero_chasis: "",
    cilindraje: null,
    transmision: "",
    dimension_llantas: null,
    capacidad_extintor: null,
    tarjeta_operacion: "",
    observaciones_adicionales: "",
    es_agendable: false,
    en_circulacion: false,
    fecha_circulacion: new Date().toString(),
    ruta_imagen_foto: "",
    id_articulo: null,
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
    cv_vehicle: [],
    maintenance_vehicle: []

};

export const cve_vehicle_slice = createSlice({
    name: "cve",
    initialState: initial_state,
    reducers: {
        set_maintenance_vehicle: (
            state: Icv,
            action: PayloadAction<IObjMantenimiento[]>
        ) => {
            state.maintenance_vehicle = action.payload;
        },
        set_vehicles: (
            state: Icv,
            action: PayloadAction<IVehicles[]>
        ) => {
            state.vehicles = action.payload;
        },
        set_current_vehicles: (
            state: Icv,
            action: PayloadAction<IVehicles>
        ) => {
            state.current_vehicle = action.payload;
        },
        set_cv_vehicle: (
            state: Icv,
            action: PayloadAction<IcvVehicles[]>
        ) => {
            state.cv_vehicle = action.payload;
        },

        set_current_cv_vehicle: (
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


    }
})


export const { set_maintenance_vehicle, set_current_cv_vehicle, set_current_vehicles, set_cv_vehicle, get_marks, set_vehicles } = cve_vehicle_slice.actions;