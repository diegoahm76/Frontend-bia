import { api } from '../../../../api/axios';

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
  return await api.get(`recaudo/pagos/consulta-deudores-obligaciones/${identificacion}`)
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
  const data = await api.get(`https://backend-bia-beta-production.up.railway.app/api/recaudo/pagos/consulta-facilidades-pagos/1/`)
  return data
}
