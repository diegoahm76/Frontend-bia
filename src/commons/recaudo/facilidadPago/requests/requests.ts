import { api } from '../../../../api/axios';

// Listar Obligaciones desde Pag. Usuario Externo
export const get_obligaciones_usuario = async (): Promise<any> => {
  return await api.get('recaudo/pagos/listado-obligaciones/');
};

// Listar Deudores desde Pag. Usuario Interno
export const get_deudores = async (): Promise<any> => {
  return await api.get(`recaudo/pagos/listado-deudores/`)
}

// Listar Obligaciones de Usuario Externo desde Pag. Usuario Interno
export const get_obligaciones_deudores = async (identificacion: string): Promise<any> => {
  return await api.get(`recaudo/pagos/consulta-deudores-obligaciones/${identificacion}`)
}
