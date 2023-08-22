import { api } from '../../../../api/axios';
import { type RespuestaFacilidadPago, type RegistroFacilidadPago, type Bien } from '../interfaces/interfaces';

interface Funcionario {
  id_funcionario: number;
}

// Listar Obligaciones desde Pag. Usuario Externo
export const get_obligaciones_usuario = async (): Promise<any> => {
  const data = await api.get('recaudo/facilidades-pagos/listado-obligaciones/')
  return data
};

// Listar Deudores desde Pag. Usuario Interno
export const get_deudores = async (): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-deudores/`)
  return data.data
}

// Filtrar Deudores desde Pag. Usuario Interno
export const get_filtro_deudores = async (parametro: string, valor: string): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-deudores/?${parametro}=${valor}`)
  return data.data
}

// Listar Obligaciones de Usuario Externo desde Pag. Usuario Interno
export const get_obligaciones_deudores = async (identificacion: string): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/consulta-obligaciones-deudores/${identificacion}/`)
  return data
}

// Listar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_fac_pago_ingresadas = async (): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-administrador/list/`)
  return data.data
}

// Filtrar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_filtro_fac_pago_ingresadas = async (parametro: string, valor: string): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-administrador/list/?${parametro}=${valor}`)
  return data.data
}

// Listar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_fac_pago_asignadas = async (): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-funcionario/list/`)
  return data
}

// Filtrar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_filtro_fac_pago_asignadas = async (parametro: string, valor: string): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/listado-funcionario/list/?${parametro}=${valor}`)
  return data
}

// Ver la información de la facilidad de pago desde Pag. Usuario Interno
export const get_fac_pago_solicitud = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/get-id/${id}/`)
  return data
}

// Listar funcionarios desde Pag. Usuario Interno
export const get_funcionarios = async (): Promise<any> => {
  const data = await api.get('recaudo/facilidades-pagos/funcionarios/')
  return data
}

// Asignar la facilidad de pago a un funcionario desde Pag. Usuario Interno
export const put_asignacion_funcionario = async (id: number, id_funcionario: Funcionario): Promise<any> => {
  const data = await api.put(`recaudo/facilidades-pagos/asignar-funcionario/put/${id}/`, id_funcionario)
  return data
}

// Crear respuesta a la facilidad de pago desde Pag. Usuario Interno
export const post_respuesta_fac_pago = async (respuesta: RespuestaFacilidadPago): Promise<any> => {
  const data = await api.post(`recaudo/facilidades-pagos/respuesta-solicitud-funcionario/create/`, respuesta, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

// Ver la información personal del Deudor desde Pag. Usuario Interno
export const get_datos_deudor = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/datos-deudor/${id}/`)
  return data
}

// Ver la información de contacto del Deudor desde Pag. Usuario Interno
export const get_datos_contacto_solicitud = async (id: number): Promise<any> => {
  return await api.get(`recaudo/facilidades-pagos/datos-contacto-deudor/${id}/`)
}

// Listar Bienes del Deudor desde Pag. Usuario Interno
export const get_bienes_deudor = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/garantias/listar-bienes-deudor/${id}`)
  return data.data
}

// Crear Facilidad de Pago desde Pag. Usuario Externo
export const post_registro_fac_pago = async (registro: RegistroFacilidadPago): Promise<any> => {
  const data = await api.post(`recaudo/facilidades-pagos/create/`, registro, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

// Subir Documentos Calidad Persona desde Pag. Usuario Externo
export const post_documentos_persona = async (archivo: any = {} ): Promise<any> => {
  const data = await api.post(`recaudo/facilidades-pagos/cumplimiento-requisitos/create/`, archivo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

// Crear Bienes desde Pag. Usuario Externo
export const post_registro_bienes = async (bien: Bien): Promise<any> => {
  const data = await api.post(`recaudo/garantias/crear-bien/`, bien)
  return data
}

// Ver los tipos de bienes desde Pag. Usuario Externo
export const get_tipo_bienes = async (): Promise<any> => {
  const data = await api.get(`recaudo/facilidades-pagos/tipos-bienes/`)
  return data
}

// Ver los tipos de garantias desde Pag. Usuario Externo
export const get_roles_garantia = async (): Promise<any> => {
  const data = await api.get(`recaudo/garantias/roles-garantias/`)
  return data
}

// Validar plan de pagos desde Pag. Usuario Interno
export const get_validacion_plan_pagos = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/planes-pagos/validacion/${id}/`)
  return data
}

// Validar resolución desde Pag. Usuario Interno
export const get_validacion_resolucion = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/planes-pagos/validacion-resolucion/${id}/`)
  return data
}
