/* eslint-disable @typescript-eslint/naming-convention */
export interface TipologiaDocumental {
  id: number;
  codigo_profesional: string;
  nivel: number;
  valor: string;
  nombre: string;
  descripcion: string;
  valorfuncionario?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
  viaticos?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
  dias?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
}

export interface ElementoPQRS {
    costo_proyecto: string;
    estado_actual_solicitud: string;
    fecha_inicio: string | null;
    fecha_radicado: string;
    fecha_registro: string;
    medio_solicitud: string;
    nombre_completo_titular: string;
    nombre_proyecto: string;
    nombre_tramite: string | null;
    pago: boolean;
    radicado: string;
    tipo_solicitud: string;
  }
  
  
export interface DatosConsulta {
    Correo: string;
    Dep_Predio: string;
    Departamento: string;
    Direccion: string;
    Dpredio: string;
    Municipio: string;
    NIdenticion: string;
    Ntelefono: string;
    TIdentificacion: string;
    Zon: string;
    Nombre: string;
    subject:string; 
    
  }
  
  export const DatosConsulta: DatosConsulta = {
    Correo: "",
    Dep_Predio: "",
    Departamento: "",
    Direccion: "",
    Dpredio: "",
    Municipio: "",
    NIdenticion: "",
    Ntelefono: "",
    TIdentificacion: "",
    Zon: "",
    Nombre: "",
    subject:""
  }

  export interface PrecioItem {
    nivel: number;
    valor: string;
    nombre: string;
    descripcion: string;
    valorfuncionario_mes?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
    viaticos?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
    dias?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
    resultado?:string;
}

// Definición del tipo para el tercer estado
export interface UsuarioInfo {
    nombres: string;
    apellidos: string;
    identificacion: string;
    telefono: string;
    email: string;
    nombreCategoria: string;
    direccion:string;
}

export interface ValoresProyectoPorcentajes {
    valorMinimo: number;
    capacidad: string;
    valor: string;
    valor_subsidio_trasporte:string
}

export const valoresInicialesProyectoPorcentaje: ValoresProyectoPorcentajes = {
    valorMinimo: 0,
    capacidad: "", 
    valor: "" ,
    valor_subsidio_trasporte:"200"
};

// Definición del tipo para el objeto de valores adicionales
export interface ValoresPos {
    id_expediente: string;
    Email: string;
    telefono_cliente: string;
}

// Definición del tipo para el estado de la liquidación
export interface LiquidacionState {
    fecha_liquidacion: string;
    vencimiento: string;
    periodo_liquidacion: number;
    valor: number;
    id_deudor: string | null;
    id_expediente: string | null;
    ciclo_liquidacion: string;
    id_solicitud_tramite: number;
    id_tipo_renta: string | null;
    num_liquidacion: string | null;
    agno: string | null;
    periodo: string | null;
    nit: string | null;
    fecha: string | null;
    valor_liq: string | null;
    valor_pagado: string | null;
    valor_prescripcion: string | null;
    anulado: string | null;
    num_resolucion: string | null;
    agno_resolucion: string | null;
    cod_origen_liq: string | null;
    observacion: string | null;
    cod_tipo_beneficio: string | null;
    fecha_contab: string | null;
    se_cobra: string | null;
    fecha_en_firme: string | null;
    nnum_origen_liq: string | null;
    archivo:any;
}

// Valores iniciales para el estado de la liquidación
export const liquidacionValoresIniciales: LiquidacionState = {
    fecha_liquidacion: "2024-04-30",
    vencimiento: "2023-05-03",
    periodo_liquidacion: 1,
    valor: 10000,
    id_deudor: null,
    id_expediente: null,
    ciclo_liquidacion: "test",
    id_solicitud_tramite: 2069,
    id_tipo_renta: null,
    num_liquidacion: null,
    agno: null,
    periodo: null,
    nit: null,
    fecha: null,
    valor_liq: null,
    valor_pagado: null,
    valor_prescripcion: null,
    anulado: null,
    num_resolucion: null,
    agno_resolucion: null,
    cod_origen_liq: null,
    observacion: null,
    cod_tipo_beneficio: null,
    fecha_contab: null,
    se_cobra: null,
    fecha_en_firme: null,
    nnum_origen_liq: null,
    archivo:null
};


