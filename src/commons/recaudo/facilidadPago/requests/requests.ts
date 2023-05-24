import { api } from '../../../../api/axios';
import { type RespuestaFacilidadPago } from '../interfaces/interfaces';

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

// Listar Obligaciones de Usuario Externo desde Pag. Usuario Interno
export const get_obligaciones_deudores = async (identificacion: string): Promise<any> => {
  return await api.get(`recaudo/pagos/consulta-deudores-obligaciones/${identificacion}/`)
}

// Listar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_fac_pago_ingresadas = async (): Promise<any> => {
  const data = await api.get(`recaudo/pagos/listado-facilidades-pagos/`)
  return data.data
}

// Listar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_fac_pago_asignadas = async (): Promise<any> => {
  return await api.get(`recaudo/pagos/listado-facilidades-funcionarios/`)
}

// Ver la información de la facilidad de pago desde Pag. Usuario Interno
export const get_fac_pago_solicitud = async (): Promise<any> => {
  const data = await api.get(`recaudo/pagos/consulta-facilidades-pagos/1/`)
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

// Dar respuesta a la facilidad de pago desde Pag. Usuario Interno
export const post_respuesta_fac_pago = async (respuesta: RespuestaFacilidadPago): Promise<any> => {
  const data = await api.post(`recaudo/pagos/respuesta-funcionario/`, respuesta)
  return data
}
