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
import { IBusquedaBancoProyecto } from '../../BancoProyecto/components/Components/BusquedaAvanzada/types';
import { IBusquedaConceptoPOAI } from '../../ConceptoPOAI/components/Components/BusquedaAvanzada/types';

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

// Busqueda avanzada banco proyecto por objeto_contrato, nombre_proyecto, nombre_actividad, nombre_indicador y nombre_meta

export const search_banco_proyecto = async ({
  nombre_proyecto,
  nombre_actividad,
  nombre_indicador,
  nombre_meta,
  objeto_contrato,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaBancoProyecto[]>>> => {
  const url = `seguimiento-planes/consultar-banco-proyectos-avanzado/?nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}&nombre_indicador=${String(nombre_indicador ?? '')}&nombre_meta=${String(
    nombre_meta ?? ''
  )}&objeto_contrato=${String(objeto_contrato ?? '')}`;
  return await api.get<ResponseServer<IBusquedaBancoProyecto[]>>(url);
};

// IBusquedaConceptoPOAI
// busqueda avanzada de conceptos POAI por concepto, nombre y nombre indicador

export const search_concepto_poai = async ({
  concepto,
  nombre,
  nombre_indicador,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaConceptoPOAI[]>>> => {
  const url = `seguimiento-planes/consultar-conceptos-poai-avanzado/?concepto=${String(
    concepto ?? ''
  )}&nombre=${String(nombre ?? '')}&nombre_indicador=${String(
    nombre_indicador ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaConceptoPOAI[]>>(url);
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
