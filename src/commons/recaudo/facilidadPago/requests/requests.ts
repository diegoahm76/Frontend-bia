import { api } from '../../../../api/axios';
import { type RespuestaFacilidadPago, type RegistroFacilidadPago } from '../interfaces/interfaces';

interface Funcionario {
  id_funcionario: number;
}

// Listar Obligaciones desde Pag. Usuario Externo
export const get_obligaciones_usuario = async (): Promise<any> => {
  return await api.get('recaudo/pagos/listado-obligaciones/');
};

// Listar Deudores desde Pag. Usuario Interno
export const get_deudores = async (): Promise<any> => {
  const data = await api.get(`recaudo/pagos/listado-deudores/`)
  return data.data
}

// Filtrar Deudores desde Pag. Usuario Interno
export const get_filtro_deudores = async (parametro: string, valor: string): Promise<any> => {
  const data = await api.get(`recaudo/pagos/listado-deudores/?${parametro}=${valor}`)
  return data.data
}

// Listar Obligaciones de Usuario Externo desde Pag. Usuario Interno
export const get_obligaciones_deudores = async (identificacion: string): Promise<any> => {
  return await api.get(`recaudo/pagos/consulta-deudores-obligaciones/${identificacion}/`)
}

// Listar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_fac_pago_ingresadas = async (): Promise<any> => {
  const data = await api.get(`recaudo/pagos/listado-facilidades-pagos/`)
  return data.data
}

// Filtrar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_filtro_fac_pago_ingresadas = async (parametro: string, valor: string): Promise<any> => {
  const data = await api.get(`recaudo/pagos/listado-facilidades-pagos/?${parametro}=${valor}`)
  return data.data
}

// Listar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_fac_pago_asignadas = async (): Promise<any> => {
  return await api.get(`recaudo/pagos/listado-facilidades-funcionarios/`)
}

// Filtrar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_filtro_fac_pago_asignadas = async (parametro: string, valor: string): Promise<any> => {
  return await api.get(`recaudo/pagos/listado-facilidades-funcionarios/?${parametro}=${valor}`)
}

// Ver la información de la facilidad de pago desde Pag. Usuario Interno
export const get_fac_pago_solicitud = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/pagos/consulta-facilidades-pagos/${id}/`)
  return data
}

// Listar funcionarios desde Pag. Usuario Interno
export const get_funcionarios = async (): Promise<any> => {
  const data = await api.get('recaudo/pagos/funcionarios/')
  return data.data
}

// Asignar la facilidad de pago a un funcionario desde Pag. Usuario Interno
export const put_asignacion_funcionario = async (id: number, id_funcionario: Funcionario): Promise<any> => {
  const data = await api.put(`recaudo/pagos/asignar-facilidad-pago/${id}/`, id_funcionario)
  return data
}

// Crear respuesta a la facilidad de pago desde Pag. Usuario Interno
export const post_respuesta_fac_pago = async (respuesta: RespuestaFacilidadPago): Promise<any> => {
  const data = await api.post(`recaudo/pagos/respuesta-funcionario/`, respuesta)
  return data
}

// Ver la información personal del Deudor desde Pag. Usuario Interno
export const get_datos_deudor = async (id: number): Promise<any> => {
  return await api.get(`recaudo/pagos/facilidades-pagos-deudor/${id}/`)
}

// Ver la información de contacto del Deudor desde Pag. Usuario Interno
export const get_datos_contacto_solicitud = async (id: number): Promise<any> => {
  return await api.get(`recaudo/pagos/datos-contacto-deudor/${id}/`)
}

// Listar Bienes del Deudor desde Pag. Usuario Interno
export const get_bienes_deudor = async (id: number): Promise<any> => {
  const data = await api.get(`recaudo/garantias/listar-bienes-deudor/${id}`)
  return data.data
}

// Crear Facilidad de Pago desde Pag. Usuario Externo
export const post_registro_fac_pago = async (registro: RegistroFacilidadPago): Promise<any> => {
  const data = await api.post(`recaudo/pagos/crear-facilidad-pago/`, registro)
  return data
}

// Subir Documentos Calidad Persona desde Pag. Usuario Externo
export const post_documentos_persona = async (archivo: any = {} ): Promise<any> => {
  const data = await api.post(`recaudo/pagos/cumplimiento-requisitos/`, archivo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

