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
import { type DataCambioCCDActual } from '../../interfaces/ccd';


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
const control_error = (message: ToastContent) =>
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
export const get_finished_ccd_service = ():any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/ccd/get-terminados/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Cuadro de Clasificación Documental
export const get_classification_ccds_service = (name: string, version: string): any => {
  console.log('get_classification_ccds_service');

  return async (dispatch: Dispatch<any>): Promise<AxiosResponse | AxiosError> => {
    try {
      console.log('hello');
      const { data } = await api.get(`gestor/ccd/get-busqueda/?nombre=${name}&version=${version}`);
      console.log('helllooo');
      if (name === '' || version === '') {
        await notification_error('Debe ingresar el nombre y la versión del CCD');
      } else if (data.data.length === 0) {
        await notification_error(`No se encontró el CCD ${name} - ${version}`);
      } else {
        console.log(data.data);
        dispatch(get_ccds(data.data));
        get_series_service(data.data[0].id_ccd)(dispatch);
      }
      
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//* Revisar esta función - nel
/*

export const get_classification_ccds_service: any = (name: string, version: string) => {
  //! se debe
  console.log('get_classification_ccds_service');
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      console.log('hellllllllloooooooooooooo')
      const { data } = await api.get(
        // `gestor/ccd/get-busqueda/?nombre=CCD1.1&version=1.1`
        `gestor/ccd/get-busqueda/?nombre=${name}&version=${version}`
        // `gestor/ccd/get-ccd/?nombre=${name}&version=${version}`
      );
      if(name === '' || version === '') {
        await notification_error(`Debe ingresar el nombre y la versión del CCD`);
        return data;
      }

      if (data.data.length === 0) {
        await notification_error(`No se encontró el CCD ${name} - ${version}`);
        return data;
      }

      console.log(data.data);
      // set_consulta_ccd_is_active(true);
      dispatch(get_ccds(data.data));
      get_series_service(data.data[0].id_ccd)(dispatch);
      return data;
    } catch (error: any) {
      // console.log(error, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

"
*/

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
      //! revisar luego estas funciones porque pueden ocasionar un error al inicio del renderizado
      dispatch(get_classification_ccds_service(
        ccd_current.nombre,
        ccd_current.version
      ));
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
        //! revisar luego estas funciones porque pueden ocasionar un error al inicio del renderizado
      // ? revisar la manera en la que está recibiendo los parametros
      dispatch(get_classification_ccds_service(
        ccd_current.nombre,
        ccd_current.version
      ));
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
                //! revisar luego estas funciones porque pueden ocasionar un error al inicio del renderizado
      // ? revisar la manera en la que está recibiendo los parametros
                dispatch(get_classification_ccds_service(
                  ccd_current.nombre,
                  ccd_current.version
                ));
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
      console.log(
        '🚀 ~ file: ccds.ts ~ line 139 ~ return ~ data',
        data
      );
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

//  Obtener CCDS's terminados por Organigrama
export const get_ccds_finished_x_organigrama: any = (id_organigrama: string | number) => {
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
    try{
      const { data } = await api.get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        /* gestor/activar/get-ccd-posibles/?id_organigrama=1 */

        `gestor/activar/get-ccd-posibles/?id_organigrama=${id_organigrama}`
      );
      return data;
    }catch(error:any){
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
}

export const cambio_ccd_actual:any = (data_cambio:DataCambioCCDActual) => {
  return async (dispatch: Dispatch<any>) => {
      try {
          const { data } = await api.put('gestor/activar/instrumentos-archivisticos/', data_cambio);          
          control_success("Proceso exitoso");
          return data;
      } catch (error: any) {
          control_error(error.response.data.detail);
          return error as AxiosError;
      }
  };
};