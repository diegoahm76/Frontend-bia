import { api } from '../../../../../api/axios';
import { type Filtro } from '../../interfaces/interfaces';

// Ver Reporte General Cartera
export const get_cartera_general = async (): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-general-cartera/2023-11-20/`)
  return data.data
}

// Ver Reporte Detallado Cartera
export const get_cartera_detallada = async (): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-general-detallado/`)
  return data.data
}

// Filtro Reporte Detallado Cartera
export const get_filtro_cartera_detallada = async (filtro: Filtro): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-general-detallado/?${filtro.parametro}=${filtro.valor}`)
  return data.data
}
