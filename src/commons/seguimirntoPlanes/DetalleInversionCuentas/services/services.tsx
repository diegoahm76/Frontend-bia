import { AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import type { ISector } from '../../configuraciones/interfaces/interfaces';
import type {
  IDetalleCuentas,
  ISubprogramas,
  IProgramas,
  IProyectos,
  IRubro,
} from '../../types/types';
import { ResponseServer } from '../../../../interfaces/globalModels';
import { IBusquedaDetalleInversion } from '../components/Components/BusquedaAvanzada/types';

// ! detalle de inversion cuentas
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_detalle_inversion = async (): Promise<IDetalleCuentas[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-detalle-inversion-cuentas/`
  );
  return response.data.data;
};

export const get_sector = async (): Promise<ISector[]> => {
  const response = await api.get(`seguimiento-planes/consultar-sectores/`);
  return response.data.data;
};

export const get_subprogramas = async (): Promise<ISubprogramas[]> => {
  const response = await api.get(`seguimiento/planes/consultar-subprogramas/`);
  return response.data.data;
};

export const get_programas = async (): Promise<IProgramas[]> => {
  const response = await api.get(`seguimiento/planes/consultar-programas/`);
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

export const get_rubros = async (): Promise<IRubro[]> => {
  const response = await api.get(`seguimiento/planes/consultar-rubros/`);
  return response.data.data;
};

// busqueda avanzada detalle inversion

export const search_detalle_inversion = async ({
  nombre_programa,
  cuenta,
  nombre_proyecto,
  nombre_producto,
  nombre_actividad,
  nombre_indicador,
}: any): Promise<
  AxiosResponse<ResponseServer<IBusquedaDetalleInversion[]>>
> => {
  const url = `seguimiento-planes/consultar-detalle-inversion-cuentas-avanzado/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&cuenta=${String(cuenta ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_producto=${String(nombre_producto ?? '')}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}&nombre_indicador=${String(nombre_indicador ?? '')}`;
  return await api.get<ResponseServer<IBusquedaDetalleInversion[]>>(url);
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_detalle_inversion = async (
  data: IDetalleCuentas
): Promise<IDetalleCuentas> => {
  const response = await api.post(
    `seguimiento-planes/crear-detalle-inversion-cuentas/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_detalle_inversion = async (
  id_detalle: number,
  data: IDetalleCuentas
): Promise<IDetalleCuentas> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-detalle-inversion-cuentas/${id_detalle}/`,
    data
  );
  return response.data;
};
