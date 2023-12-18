/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import { type AxiosError } from 'axios';
import { api } from '../../../../../api/axios';
import {
  set_bandejas_avanzadas,
  set_cajas_avanzadas,
  set_carpetas_avanzadas,
  set_deposito_arbol,
  set_depositos_avanzada,
  set_estantes_avanzada,
  set_listado_depositos,
} from '../slice/indexArchivoFisico';

export const control_error = (
  message: ToastContent = 'Algo pasó, intente de nuevo'
) =>
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

export const avanzada_deposito = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/depositos-archivos/archivoFisico/busqueda-avanzada-deposito/?tipo_elemento=Depósito de Archivo'
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_depositos_avanzada(data.data));
        dispatch(set_listado_depositos(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const tabla_arbol_deposito = (id:number | string |null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/depositos-archivos/archivoFisico/informacion-arbol/${id ?? ''}` 
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_deposito_arbol({deposito: data.deposito, estantes:data.estantes}));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const avanzada_estante = (
  //   identificacion_estante: string | null,
  deposito_archivo: number | null
  //   &identificacion_estante=${ identificacion_estante ?? '' }
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/depositos-archivos/archivoFisico/busqueda-avanzada-estante/?tipo_elemento=Estante&deposito_archivo=${
          deposito_archivo ?? ''
        }`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_estantes_avanzada(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const avanzada_bandeja = (
  identificacion_estante: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/depositos-archivos/archivoFisico/busqueda-avanzada-bandeja/?tipo_elemento=Bandeja&identificacion_estante=${
          identificacion_estante ?? ''
        }`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_bandejas_avanzadas(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const avanzada_caja = (
  id: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/editar-archivos-soporte/${id ?? ''}/`)
      ;
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_cajas_avanzadas(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const avanzada_carpeta = (
  identificacion_caja: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/depositos-archivos/archivoFisico/busqueda-avanzada-carpeta/?tipo_elemento=Carpeta&identificacion_caja=${
          identificacion_caja ?? ''
        }`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        dispatch(set_carpetas_avanzadas(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
