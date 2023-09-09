//! interaccion con los ccds
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

//! obtener los ccds que coincidan con el criterio de busqueda
export const get_busqueda_ccds_psd = async (
  nombre: string,
  version: number | string,
  setLoadingButtonPSD: any
): Promise<any> => {
  try {
    setLoadingButtonPSD(true);
    const url = `gestor/permisos/busqueda-ccd/get/?nombre=${
      nombre ?? ''
    }&version=${version ?? ''}`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success(`Se encontró la siguiente información`);
      return data?.data;
    } else {
      control_warning('No se encontraron ccds');
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    console.log(error);
  } finally {
    setLoadingButtonPSD(false);
  }
};

//! ----- seleccionar la unidad organizacional relacionada al ccd - organigrama
export const get_unidad_organizacional_ccd_psd = async (
  id_organigrama: number,
  setLoadingButtonPSD: any,
  nombre?: string
): Promise<any> => {
  try {
    setLoadingButtonPSD(true);
    const url = `gestor/permisos/unidades-ccd/get/${id_organigrama}/?nombre=${nombre ?? ''}`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      // control_success(`Se encontró la siguiente información`);
      console.log(data?.data);
      return data?.data;
    } else {
      // control_warning('No se encontraron unidades organizacionales');
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    console.log(error);
  } finally {
    setLoadingButtonPSD(false);
  }
};
