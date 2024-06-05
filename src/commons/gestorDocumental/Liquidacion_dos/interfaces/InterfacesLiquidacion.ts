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
  subject: string;

  MSalida: string;
  idPerson: string;
  estado_visita: string;
  Costoproyeto: string;
  radicate_bia: string;
  typeRequest: string;
  DateRadicate: string;

}

export const DatosConsulta: DatosConsulta = {
  Correo: '',
  Dep_Predio: '',
  Departamento: '',
  Direccion: '',
  Dpredio: '',
  Municipio: '',
  NIdenticion: '',
  Ntelefono: '',
  TIdentificacion: '',
  Zon: '',
  Nombre: '',
  subject: '',
  MSalida: '',
  idPerson: '',
  estado_visita: '',
  Costoproyeto: '',
  radicate_bia: '',
  typeRequest: '',
  DateRadicate: '',

};

export interface PrecioItem {
  nivel: number;
  valor: string;
  nombre: string;
  descripcion: string;
  valorfuncionario_mes?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
  viaticos?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
  dias?: string; // Haz que estas propiedades sean opcionales agregando el operador '?'
  resultado?: string;

}

// Definición del tipo para el tercer estado
export interface UsuarioInfo {
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  email: string;
  nombreCategoria: string;
  direccion: string;
}

export interface ValoresProyectoPorcentajes {
  valorMinimo: number;
  capacidad: string;
  valor: string;
  valor_subsidio_trasporte: string;
  total_valor_veiculos: string;
}

export const valoresInicialesProyectoPorcentaje: ValoresProyectoPorcentajes = {
  valorMinimo: 0,
  capacidad: '',
  valor: '',
  valor_subsidio_trasporte: '0',
  total_valor_veiculos: '',
};

// Definición del tipo para el objeto de valores adicionales
export interface ValoresPos {
  id_expediente: string;
  Email: string;
  telefono_cliente: string;
}

// Definición del tipo para el estado de la liquidación
export interface LiquidacionState {
  vencimiento: string;
  archivo: any;
  fecha_liquidacion: string;
  periodo_liquidacion: string;
  valor: string;
  estado: string;
  id_deudor: string | null;
  id_expediente: string | null;
  ciclo_liquidacion: string;
  id_solicitud_tramite: string;
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
  

  numeroDeVehiculos: number,
  cantidadDeComisiones: number,
  
}

// Valores iniciales para el estado de la liquidación
export const liquidacionValoresIniciales: LiquidacionState = {
  vencimiento: '',
  archivo: null,
  fecha_liquidacion: '',
  observacion: null,
  id_solicitud_tramite: '',
  periodo_liquidacion: '',
  valor: '',
  id_deudor: null,
  estado: '',
  id_expediente: null,
  ciclo_liquidacion: '',
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
  cod_tipo_beneficio: null,
  fecha_contab: null,
  se_cobra: null,
  fecha_en_firme: null,
  nnum_origen_liq: null,
  numeroDeVehiculos: 0,
  cantidadDeComisiones: 0,
};


export interface Respuesta {
  consecutivo: string;
  nro_consecutivo: string;
  fecha_consecutivo: string;
  radicado_nuevo: string;
  nombre_completo: string;
  numero_documento: string;
}

export interface OpcionLiquidacion {
  id: number;
  nombre: string;
  estado: number;
  version: number;
  funcion: string;
  variables: {
    [key: string]: string;
  };
  bloques: string;
}

export interface Registro {
  id: number;
  capacidad: string;
  valor: string;
  editable: boolean;
  formula: string;
}

export interface ConfiguracionBasica {
  valor: any;
  fecha_fin: any;
  variables: any;
  fecha_inicio: any;
  descripccion: any;
  nombre_variable: any;
  nombre_tipo_cobro: any;
  nombre_tipo_rentaany: any;
  id_valores_variables: any;
}

export const initialData: ElementoPQRS = {
  costo_proyecto: '',
  estado_actual_solicitud: '',
  fecha_inicio: null,
  fecha_radicado: '',
  fecha_registro: '',
  medio_solicitud: '',
  nombre_completo_titular: '',
  nombre_proyecto: '',
  nombre_tramite: null,
  pago: false,
  radicado: '',
  tipo_solicitud: '',
};

export interface ReferenciaPagoHistorico {
  id_referencia: number;
  nombre_completo: string;
  numero_documento: string;
  consecutivo: string;
  ruta_archivo: string;
  agno_referencia: number;
  nro_consecutivo: string;
  fecha_consecutivo: string;
  id_unidad: number;
  id_catalogo: number | null;
  id_persona_solicita: number;
  id_archivo: number;
}

export interface FormState{
  referencia: string;
  fechaInicio:string;
  fechaFin: string;
  idPersona: string;
}

export const intial_data: FormState = {
  referencia: '',
  fechaInicio: '',
  fechaFin: '',
  idPersona: ''
};

