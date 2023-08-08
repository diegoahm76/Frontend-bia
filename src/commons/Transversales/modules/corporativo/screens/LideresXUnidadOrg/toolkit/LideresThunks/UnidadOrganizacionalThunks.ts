/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';

export const getPersonaByTipoDocumentoAndNumeroDocumento = async (
  tipoDocumento: string,
  numeroDocumento: string
): Promise<any> => {
  try {
    const url = `transversal/lideres/get-lider-by-documento/?numero_documento=${
      numeroDocumento ?? ''
    }&tipo_documento=${tipoDocumento ?? ''}`;
    const response = await api.get(url);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  }
};

// ! --------  POST Y PUT ASIGNACIONES DE LIDERES POR UNIDAD ORGANZIZACIONAL --------

// ? crear asignacion de lider a unidad organizacional
export const createLiderUnidadOrganizacional = async (
  dataPost: any,
  setLoadingButton: any,
  cleanElementComponent: any
): Promise<any> => {
  try {
    setLoadingButton(true);
    const url = `transversal/lideres/crear-asignacion/`;
    const { data } = await api.post(url, dataPost);
    control_success(data.detail);
    return data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  } finally {
    setLoadingButton(false);
    cleanElementComponent();
  }
};

// ? actualizar asignacion de lider a unidad organizacional
export const updateLiderUnidadOrganizacional = async (
  dataPost: any,
  setLoadingButton: any,
  cleanElementComponent: any
): Promise<any> => {
  try {
    setLoadingButton(true);
    const url = `transversal/lideres/actualizar-asignacion/${dataPost.id_lider_unidad_org}/`;
    const { data } = await api.put(url, dataPost);
    control_success(data.detail);
    return data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  } finally {
    setLoadingButton(false);
    cleanElementComponent();
  }
};

// ? get asginaciones de lideres by id organigrama
export const getAsignacionesLideresByIdOrganigrama = async (
  idOrganigrama: string
): Promise<any> => {
  try {
    const url = `transversal/lideres/get-list/${idOrganigrama}/`;
    const { data } = await api.get(url);
    return data.data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  }
};

// ? get asginaciones de lideres by filter
export const getAsignacionesLideresByFilter = async (
  nombre_organigrama: string,
  version_organigrama: string,
  codigo_unidad_org: string,
  nombre_unidad_org: string,
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  segundo_nombre: string,
  primer_apellido: string,
  segundo_apellido: string
): Promise<any> => {
  try {
    const url = `transversal/lideres/get-list-filter/?nombre_organigrama=${
      nombre_organigrama ?? ''
    }&version_organigrama=${version_organigrama ?? ''}&codigo_unidad_org=${
      codigo_unidad_org ?? ''
    }&nombre_unidad_org=${nombre_unidad_org ?? ''}&tipo_documento=${
      tipo_documento ?? ''
    }&numero_documento=${numero_documento ?? ''}&primer_nombre=${
      primer_nombre ?? ''
    }&segundo_nombre=${segundo_nombre ?? ''}&primer_apellido=${
      primer_apellido ?? ''
    }&segundo_apellido=${segundo_apellido ?? ''}

      `;
    const { data } = await api.get(url);
    control_success(data.detail);
    return data.data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  }
};
