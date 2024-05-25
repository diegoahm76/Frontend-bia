/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type Dispatch } from 'react';
import { api } from '../../../../../api/axios';
import { type AxiosError, type AxiosResponse } from 'axios';
import { toast, type ToastContent } from 'react-toastify';
// Reducers
// Interfaces
import { get_ccd_current, get_ccds } from '../slices/ccdSlice';
import { get_series_service } from './seriesThunks';
// import { get_subseries_service } from './subseriesThunks';
import { type DataCambioCCDActual } from '../../interfaces/ccd';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (message: ToastContent) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

//! Obtener los CCDS terminados
export const get_finished_ccd_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/ccd/get-terminados/', {
        params: {
          limit: 1500,
          offset: 0,
        },
      });
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Cuadro de Clasificación Documental
export const get_classification_ccds_service = (
  activateLoadingButtonBusquedaCCD: () => void,
  desactivateLoadingButtonBusquedaCCD: () => void,
  name: string,
  version: string,
  id_ccd?: any
): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      activateLoadingButtonBusquedaCCD();
      // //  console.log('')('hello');
      const { data } = await api.get(
        `gestor/ccd/get-busqueda/?nombre=${name}&version=${version}`
      );
      if (data.data.length === 0) {
        control_error(`No se encontró el CCD ${name} - ${version}`);
      } else {
        dispatch(get_ccds(data.data));
        dispatch(
          get_ccd_current(
            id_ccd === undefined
              ? data.data[0]
              : data.data.find((ccd: any) => ccd.id_ccd === id_ccd)
          )
        );
        get_series_service(id_ccd)(dispatch);
        control_success('Se ha encontrado la siguiente información de CCD');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      desactivateLoadingButtonBusquedaCCD();
    }
  };
};

// Reanudar Cuadro de Clasificación Documental
export const to_resume_ccds_service: any = (
  set_flag_btn_finish: (arg0: boolean) => void,
  ccd_current: any
) => {
  return async (dispatch: Dispatch<any>, getState: any): Promise<any> => {
    // const { ccd_current } = getState().CCD;
    //  console.log('')(ccd_current, 'ccd_current');
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(`gestor/ccd/resume/${id_ccd}/`);
      control_success(data.detail);
      set_flag_btn_finish(false);
      // return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! Finalizar Cuadro de Clasificación Documental
export const to_finished_ccds_service: any = (
  set_flag_btn_finish: (arg0: boolean) => void,
  ccd_current: any,
  assignments_ccd: any
) => {
  return async (): Promise</* AxiosResponse | AxiosError */ any> => {
    try {
      //  console.log('')(assignments_ccd, 'assignments_ccd');
      if (assignments_ccd.length === 0) {
        control_error(
          'No se puede finalizar el CCD porque no tiene asignaciones'
        );
        return;
      }

      if (
        ccd_current.id_ccd === undefined ||
        ccd_current.id_ccd === 0 ||
        ccd_current.id_ccd === null
      ) {
        // Mostrar una alerta antes de continuar
        throw new Error('La propiedad "id_ccd" de ccd_current es falsa.');
      }

      const id_ccd: number = ccd_current.id_ccd;
      // //  console.log('')(id_ccd, 'id_ccd');
      const { data } = await api.put(`gestor/ccd/finish/${id_ccd}/`);
      //! revisar luego estas funciones porque pueden ocasionar un error al inicio del renderizado
      // ? revisar la manera en la que está recibiendo los parametros
      control_warning(
        'No olvides limpiar los campos antes de salir del módulo'
      );
      control_success(data.detail);
      set_flag_btn_finish(true);
      return data;
    } catch (error: any) {
      // //  console.log('')(error);
      control_error(error.response.data.detail);
      // return error as AxiosError;
    }
  };
};

// Crear Cuadro de Clasificación Documental (CCD)
export const create_ccds_service: any = (
  ccd: any,
  set_save_ccd: (arg0: boolean) => void,
  openModalBusquedaCreacionCCD: any,
  activateLoadingButton: any,
  desactivateLoadingButton: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      activateLoadingButton();
      const { data } = await api.post('gestor/ccd/create/', ccd);
      // //  console.log('')('🚀 ~ file: ccds.ts ~ line 139 ~ return ~ data', data);
      dispatch(get_ccd_current(data.data));
      control_success(data.detail);
      // //  console.log('')(data.detail, 'success');
      set_save_ccd(true);
      openModalBusquedaCreacionCCD();
      return data;
    } catch (error: any) {
      // //  console.log('')(error.response.data, 'error');
      control_error(error.response.data.detail ?? 'ha ocurrido un error');
      return error as AxiosError;
    } finally {
      desactivateLoadingButton();
    }
  };
};
// Update Cuadro de Clasificación Documental
export const update_ccds_service: any = (
  formData: any,
  data_create_ccd: any,
  activateLoadingButton: any,
  deactivateLoadingButton: any
) => {
  return async (dispatch: Dispatch<any>, getState: any): Promise<any> => {
    // //  console.log('')(data_create_ccd, 'ccd_current')
    // //  console.log('')(formData, 'formData')
    // const { ccd_current } = getState().ccd;
    try {
      activateLoadingButton();
      const id_ccd: number = data_create_ccd.id_ccd;
      const { data } = await api.patch(
        `gestor/ccd/update/${id_ccd}/`,
        formData
      );
      // //  console.log('')('🚀 ~ file: ccds.ts ~ line 164 ~ return ~ data', data);
      // //  console.log('')(data_create_ccd, 'data_create_ccd')
      dispatch(get_ccd_current(data.data));
      control_success(data.detail);
      // closeModalBusquedaCreacionCCD();
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail ?? 'Ha ocurrido un error');
      return error as AxiosError;
    } finally {
      deactivateLoadingButton();
    }
  };
};

//  Obtener CCDS's terminados por Organigrama
export const get_ccds_finished_x_organigrama: any = (
  id_organigrama: string | number
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/activar/get-ccd-terminados-by-org/${id_organigrama}/`
      );
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_ccds_posibles: any = (id_organigrama: string) => {
  return async () => {
    try {
      // const old_url = 'gestor/activar/get-ccd-posibles/?id_organigrama=${id_organigrama}';
      const new_url = `gestor/ccd/activacion/get-ccd-posibles/?id_organigrama=${id_organigrama}`;

      const { data } = await api.get(new_url);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const cambio_ccd_actual: any = (data_cambio: DataCambioCCDActual) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const new_url = `gestor/ccd/activacion/activar-ccd/`;
      // const old_url = 'gestor/activar/instrumentos-archivisticos/';
      const { data } = await api.put(new_url, data_cambio);
      control_success('El cambio del CCD fue exitoso');
      return data;
    } catch (error: any) {
      showAlert('Atención!!', error.response.data.detail, 'warning');
      // control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
