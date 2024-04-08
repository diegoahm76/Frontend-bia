/* eslint-disable @typescript-eslint/naming-convention */
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
    //  console.log('')(error);
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
    const url = `gestor/permisos/unidades-ccd/get/${id_organigrama}/?nombre=${
      nombre ?? ''
    }`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success(
        `Se encontró la siguiente información de seccion / subseccion`
      );
      //  console.log('')(data?.data);
      return data?.data;
    } else {
      control_warning('No se encontraron unidades organizacionales');
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    //  console.log('')(error);
  } finally {
    setLoadingButtonPSD(false);
  }
};

// ! get series documentales relacionadas a la unidad organizacional seleccionada en el organigrama - ccd

export const get_series_documentales_unidad_organizacional_psd = async (
  id_unidad_organizacional: number,
  id_ccd: number,
  setLoadingSeriesSubseries: any
): Promise<any> => {
  try {
    setLoadingSeriesSubseries(true);
    const url = `gestor/permisos/serie-subserie-unidad-ccd/get/?id_ccd=${id_ccd}&id_unidad_organizacional=${id_unidad_organizacional}`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success('Se encontraron series/subseries documentales');
      //  console.log('')(data?.data);
      return data?.data;
    } else {
      control_warning('No se encontraron series/subseries documentales');
      //  console.log('')('no se encontraron series documentales');
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    //  console.log('')(error);
  } finally {
    setLoadingSeriesSubseries(false);
  }
};

// ? obtener permisos para Unidades organizacionales actuales de la sección responsable

export const GET_PERMISOS_UNIDADES_ORGANIZACIONALES_ACTUALES_SECCION_RESPONSABLE =
  async (id_cat_serie_und: number, setLoadingButtonPSD: any): Promise<any> => {
    try {
      setLoadingButtonPSD(true);
      const url = `gestor/permisos/unidades-permisos/get/${id_cat_serie_und}/`;
      const { data } = await api.get(url);
      if (data?.data?.length > 0) {
        control_success(data?.detail);
        //  console.log('')(data?.data);
        return data?.data;
      } else {
        control_warning(
          'No se encontraron permisos para unidades organizacionales'
        );
        return [];
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail);
    } finally {
      setLoadingButtonPSD(false);
    }
  };

// ? permisos unidades externas a la secciones responsable
export const GET_PERMISOS_UNIDADES_EXTERNAS_SECCION_RESPONSABLE = async (
  id_cat_serie_und: number,
  setLoadingButtonPSD: any
): Promise<any> => {
  try {
    setLoadingButtonPSD(true);
    const url = `gestor/permisos/unidades-externas-permisos/get/${id_cat_serie_und}/`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success(data?.detail);
      //  console.log('')(data?.data);
      return data?.data;
    } else {
      control_warning(
        'No se encontraron permisos para unidades organizacionales externas'
      );
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
  } finally {
    setLoadingButtonPSD(false);
  }
};
