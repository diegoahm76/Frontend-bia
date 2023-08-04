import { api } from '../../../../api/axios';
import { type Filtro } from '../../facilidadPago/interfaces/interfaces';

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

// Ver Reporte General por Edades
export const get_cartera_edades = async (): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-cartera-edades/`)
  return data.data
}

// Filtrar Reporte General por Edades
export const get_filtro_cartera_edades = async (filtro: Filtro): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-cartera-edades/?${filtro.parametro}=${filtro.valor}`)
  return data.data
}

// Ver Reporte Facilidad de Pago General
export const get_facilidad_general = async (): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-facilidades-pagos/`)
  return data
}

// Ver Reporte Facilidad de Pago Detallada
export const get_facilidad_detallada = async (): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-facilidades-pagos-detalle/`)
  return data.data
}

// Filtro Reporte Facilidad de Pago Detallada
export const get_filtro_facilidad_general = async (filtro: Filtro): Promise<any> => {
  const data = await api.get(`recaudo/reportes/reporte-facilidades-pagos-detalle/?${filtro.parametro}=${filtro.valor}`)
  return data.data
}
