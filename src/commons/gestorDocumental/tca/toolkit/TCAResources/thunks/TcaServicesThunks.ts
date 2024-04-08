/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type AxiosResponse, type AxiosError } from 'axios';
import { type Dispatch } from 'react';
import { api } from './../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { set_current_tca_action, set_get_tcas_action } from '../slice/TcaSlice';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// ? --------------------- | GET TCAS SERVICES | --------------------- //
export const get_searched_tcas_service: any = (
  nombre: string = '',
  version: string = '',
  setLoadingButton: any
): ((dispatch: any) => Promise<AxiosResponse<any> | AxiosError>) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse<any> | AxiosError<any>> => {
    setLoadingButton(true);
    try {
      const url = `gestor/tca/get-busqueda-tca/?nombre=${nombre}&version=${version}`;
      const { data } = await api.get(url);
      dispatch(set_get_tcas_action(data.data));

      data.data.length === 0
        ? control_error('No se encontraron TCAs')
        : control_success(data.detail);
      return data.data;
    } catch (error: AxiosError | any) {
      // // //  console.log('')(error);
      control_error(error.response?.data?.detail);
      return error;
    } finally {
      setLoadingButton(false);
    }
  };
};

// ! --------------------- | CREATE AND UPDATE TCA SERVICES | --------------------- //

// ? ---------------- create TCA ----------------- //
export const create_tca_services = (
  bodyPost: any,
  setLoadingButton: any
): any => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    const { id_trd, nombre, version } = bodyPost;
    setLoadingButton(true);
    try {
      if (!nombre || !id_trd || !version) {
        control_error('Todos los campos son obligatorios');
        return;
      }

      const url = 'gestor/tca/create/';
      const { data } = await api.post(url, bodyPost);
      control_success(data.detail);
      dispatch(set_current_tca_action(data.data));
      // //  console.log('')('data', data);
      return data;
    } catch (error: AxiosError | any) {
      control_error(error.response?.data?.detail || error.message);

      return error;
    } finally {
      setLoadingButton(false);
    }
  };
};

// ? ---------------- update TCA ----------------- //
export const update_tca_services = (
  bodyPost: any,
  setLoadingButton: any
): any => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    // //  console.log('')(bodyPost);
    const { id_trd, nombre, version, id_tca } = bodyPost;
    setLoadingButton(true);

    const url = `gestor/tca/update/${id_tca}/`;
    const searchUrl = `gestor/tca/get-busqueda-tca/?nombre=${nombre}&version=${version}`;

    const errorMessage = 'Error en asignación';
    const successMessage = 'El TCA se ha actualizado correctamente';

    try {
      if (!nombre || !id_trd || !version) {
        control_error('Todos los campos son obligatorios');
        return;
      }

      const { data: updatedData } = await api.patch(url, { nombre, version });
      const { data: searchData } = await api.get(searchUrl);

      const updatedTCA = searchData.data.find(
        (tca: any) => tca.nombre === updatedData.data.nombre
      );

      if (!updatedTCA) {
        // //  console.log('')('Updated TCA', updatedData);

        control_error(errorMessage);
        return;
      }

      dispatch(set_current_tca_action(updatedTCA));

      control_success(updatedData.detail || successMessage);
      // //  console.log('')('data', updatedData);
      return updatedData;
    } catch (error: AxiosError | any) {
      control_error(error.response?.data?.detail || error.message);

      return error;
    } finally {
      setLoadingButton(false);
    }
  };
};

// ! --------------------- | CATALOGO SERVICES | --------------------- //

// ? ---- get catalogo trd service ---- //
export const get_catalogo_TRD_service = async (
  id_trd: number = 1
): Promise<any> => {
  try {
    if (!id_trd) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/trd/catalogo-trd/get-list/${id_trd}/`;
    const { data } = await api.get(url);
    /* control_success(
      'Se encontró el siguiente registro de catálogo TRD' || data.detail
    ); */

    // //  console.log('')('data TRD catalogo', data);

    return data.data;
  } catch (error: AxiosError | any) {
    control_error(error.response?.data?.detail);
    return error;
  }
};

// ? ---- get catalogo tca service ---- //
export const get_catalogo_TCA_service = async (
  id_tca: number = 1
): Promise<any> => {
  try {
    if (!id_tca) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/tca/catalogo-tca/get-clasif/${id_tca}/`;
    const { data } = await api.get(url);
    /* control_success(
      'Se encontró el siguiente registro de catálogo TCA' || data.detail
    ); */

    // //  console.log('')('data TCA catalogo', data);

    return data.data;
  } catch (error: AxiosError | any) {
    control_warning(
      'No se encontró catálogo para la TCA' || error.response?.data?.detail
    );
    return [];
  }
};

// ? --------- CREATE ITEM FROM CATALOGO TRD SERVICE TO CATALOGO TCA --------- //

export const create_item_catalogo_tca_service: any = async (
  bodyPost: any,
  setLoadingButton: any,

  mixed_tipologias: any
): Promise<any> => {
  const { id_tca, id_cat_serie_und_ccd_trd, cod_clas_expediente } = bodyPost;
  setLoadingButton(true);
  try {
    if (!id_tca) {
      control_error('Todos los campos son obligatorios');
      return;
    }

    // //  console.log('')('bodyPost', bodyPost);

    const postData: any = {
      id_cat_serie_und_ccd_trd,
      cod_clas_expediente
    };
    if (mixed_tipologias?.length > 0) {
      postData.tipologias_reservadas = mixed_tipologias.filter(
        (el: any) => el.reservada
      );
    }

    const url = `gestor/tca/catalogo-tca/clasificar/${id_tca}/`;
    const { data } = await api.post(url, postData);
    control_success(data.detail);
    // //  console.log('')('data TCA catalogo', data);
    return data;
  } catch (error: AxiosError | any) {
    control_error(
      error.response?.data?.detail || 'Error al clasificar el expediente'
    );
    return error;
  } finally {
    setLoadingButton(false);
  }
};

// ? --------- UPDATE ITEM FROM CATALOGO TCA SERVICE --------- //

export const update_item_catalogo_tca_service = async (
  formData: any,
  id_cat_serie_unidad_org_ccd_trd_tca: any,
  setLoadingButton: any
): Promise<any> => {
  setLoadingButton(true);
  try {
    if (!id_cat_serie_unidad_org_ccd_trd_tca) {
      control_error('Todos los campos son obligatorios');
      return;
    }
    // //  console.log('')('bodyPost', formData);
    const url = `gestor/tca/catalogo-tca/update-clasif/${id_cat_serie_unidad_org_ccd_trd_tca}/`;
    const { data } = await api.put(url, formData);
    control_success(data.detail);
    // //  console.log('')('data TCA catalogo', data);
    return data;
  } catch (error: AxiosError | any) {
    control_error(
      error.response?.data?.detail || 'Error al actualizar el expediente'
    );
    return error;
  } finally {
    setLoadingButton(false);
  }
};

// ? --------- DELETE ITEM FROM CATALOGO TCA SERVICE --------- //

export const delete_item_catalogo_tca_service = async (
  id_clasif_ser_sub_unidad_tca: number = 1
): Promise<AxiosResponse | AxiosError | any> => {
  try {
    if (!id_clasif_ser_sub_unidad_tca) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/tca/catalogo-tca/delete-clasif/${id_clasif_ser_sub_unidad_tca}/`;
    const { data } = await api.delete(url);
    control_success(data.detail);

    // //  console.log('')('data TCA catalogo', data);

    return data.data;
  } catch (error: AxiosError | any) {
    control_error(
      error.response?.data?.detail || 'No se encontró catálogo para la TCA'
    );
    return error;
  }
};

// ! --------- | FINISH AND RESUME TCA SERVICES | --------- ! //
// ? finish TCA and resume TCA
export const finish_tca_service = async (
  id_tca: number = 21,
  setFlag: any
): Promise<any> => {
  try {
    if (!id_tca) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/tca/finish/${id_tca}/`;
    const { data } = await api.put(url);
    control_warning('No olvides limpiar los campos antes de salir del módulo');
    control_success(data.detail);
    // //  console.log('')('TCA finalizado');
    setFlag(true);
    // return data;
  } catch (error: AxiosError | any) {
    control_error(error.response?.data?.detail);
    return error;
  }
};

export const resume_tca_service = async (
  id_tca: number = 21,
  setFlag: any
): Promise<any> => {
  try {
    if (!id_tca) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/tca/resume/${id_tca}/`;
    const { data } = await api.put(url);
    control_success(data.detail);
    // //  console.log('')('TCA reanudado');
    setFlag(false);
    // return data;
  } catch (error: AxiosError | any) {
    control_error(error.response?.data?.detail);
    return error;
  }
};

// ! interacción de servicios relacionados a la entrega 52

export const get_tipologias_relacion = async (
  id_catserie_unidadorg: number = 1,
  setLoadTipologias: any
): Promise<any> => {
  try {
    setLoadTipologias(true);
    if (!id_catserie_unidadorg) {
      control_error('No se ha podido realizar la acción');
      return;
    }
    const url = `gestor/trd/catalogo-trd/get-tipologias/${id_catserie_unidadorg}/`;
    const { data } = await api.get(url);
    return data.data;
  } catch (error: AxiosError | any) {
    control_error(error.response?.data?.detail);
    return error;
  } finally {
    setLoadTipologias(false);
  }
};
