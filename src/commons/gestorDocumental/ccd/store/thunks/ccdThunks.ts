import { type Dispatch } from 'react';
import { api } from '../../../../../api/axios';
import { type AxiosError, type AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { toast, type ToastContent } from 'react-toastify';
// Reducers
// Interfaces
import { get_ccd_current, get_ccds } from '../slices/ccdSlice';
import { get_series_service } from './seriesThunks';
import { get_subseries_service } from './subseriesThunks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const notification_error = async (
  message = 'Algo pasó, intente de nuevo',
  text = ''
) =>
  await Swal.mixin({
    position: 'center',
    icon: 'error',
    title: message,
    text,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar'
  }).fire();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// Obtener los CCDS terminados
export const get_finished_ccd_service = () => {
  return async (): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.get('gestor/ccd/get-terminados/');
      // dispatch(getMoldOrganigrams(data.data));
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Cuadro de Clasificación Documental
export const get_classification_ccds_service: any = () => {
  console.log('get_classification_ccds_service');
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.get('gestor/ccd/get-list');
      console.log(data.data);
      dispatch(get_ccds(data.data));
      return data;
    } catch (error: any) {
      console.log(error, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Reanudar Cuadro de Clasificación Documental
export const to_resume_ccds_service: any = (
  set_flag_btn_finish: (arg0: boolean) => void
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().CCD;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(`gestor/ccd/resume/${id_ccd}/`);
      dispatch(get_classification_ccds_service());
      set_flag_btn_finish(false);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Finalizar Cuadro de Clasificación Documental
export const to_finished_ccds_service: any = (
  set_flag_btn_finish: (arg0: boolean) => void
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().ccd;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(
        `gestor/ccd/finish/${id_ccd}/?confirm=false`
      );
      dispatch(get_classification_ccds_service());
      control_success(data.detail);
      set_flag_btn_finish(true);
      return data;
    } catch (error: any) {
      if (error.response.data.delete === true) {
        const message_detail: string = error.response.data.detail;
        const message: string = error.response.data.data
          .map((item: any) => item)
          .join(', ');

        void Swal.fire({
          title: '¿Está seguro de finalizar el CCD?',
          text: `${message_detail}, Estas son las faltanes: ${message}. Las podemos eliminar del sistema`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, finalizar!'
        }).then((result) => {
          if (result.isConfirmed) {
            const id_ccd: number = ccd_current.id_ccd;
            api
              .put(`gestor/ccd/finish/${id_ccd}/?confirm=true`)
              .then((response) => {
                control_success(response.data.detail);
                dispatch(get_classification_ccds_service());
                dispatch(get_series_service());
                dispatch(get_subseries_service());
                set_flag_btn_finish(true);
              })
              .catch((error) => {
                control_error(error.response.data.detail);
              });
          }
        });
      } else {
        const message: string = error.response.data.data
          .map((item: any) => item)
          .join(', ');
        void notification_error(
          error.response.data.detail,
          `Estas son las faltanes: ${message}`
        );
      }
      return error as AxiosError;
    }
  };
};

// Crear Cuadro de Clasificación Documental (CCD)
export const create_ccds_service: any = (
  ccd: any,
  set_save_ccd: (arg0: boolean) => void
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('gestor/ccd/create/', ccd);
      dispatch(get_ccd_current(data.data));
      control_success(data.detail);
      console.log(data.detail, 'success');
      set_save_ccd(true);
      return data;
    } catch (error: any) {
      console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Update Cuadro de Clasificación Documental
export const update_ccds_service: any = (ccd: {
  nombre: any;
  version: any;
}) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().ccd;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.patch(`gestor/ccd/update/${id_ccd}/`, ccd);
      dispatch(
        get_ccd_current({
          ...ccd_current,
          nombre: ccd.nombre,
          version: ccd.version
        })
      );
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
