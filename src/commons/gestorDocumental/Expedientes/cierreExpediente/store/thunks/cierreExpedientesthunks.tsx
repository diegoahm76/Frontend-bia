/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
import { api } from '../../../../../../api/axios';
import {
  set_archivos_por_expediente,
  set_expedientes,
  set_informacion_reapertura,
  set_serie_subserie,
  set_tipologias,
  set_trd,
} from '../slice/indexCierreExpedientes';
// Slices

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

// lista de trd

export const get_trd = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/trd/get-list/'
      );

      
        dispatch(set_trd(data));
        console.log('Datos de TRD seteados:', data);
        return data;
      }
     
     catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

export const get_tipologias = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/expedientes-archivos/expedientes/listar-tipologias/'
      );

      if (data.success === true) {
        dispatch(set_tipologias(data.data));
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

// buscar expediente

export const get_busqueda_avanzada_expediente = (
  titulo_expediente: string | null,
  nombre_trd_origen: string | number | null,
  fecha_apertura_expediente: string | number | null,
  codigos_uni_serie_subserie: string | null,
  id_serie_origen: string | null,
  id_subserie_origen: string | null,
  codigo_exp_consec_por_agno: string | null,
  fecha_inicio_expediente: string | null,
  fecha_fin_expediente: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/buscar-expediente-abierto/?trd_nombre=${
          nombre_trd_origen ?? ''
        }&fecha_apertura_expediente=${
          fecha_apertura_expediente ?? ''
        }&titulo_expediente=${
          titulo_expediente ?? ''
        }&codigos_uni_serie_subserie=${
          codigos_uni_serie_subserie ?? ''
        }&id_serie_origen=${id_serie_origen ?? ''}&id_subserie_origen=${
          id_subserie_origen ?? ''
        }&codigo_exp_consec_por_agno=${
            codigo_exp_consec_por_agno ?? ''
          }&fecha_inicio_expediente=${
            fecha_inicio_expediente ?? ''
          }&fecha_fin_expediente=${
            fecha_fin_expediente ?? ''
          }`
      );

      if (data.success === true) {
        dispatch(set_expedientes(data.data));
      } else {
        dispatch(set_expedientes([]));
      }
      //  console.log('')(data)
      return data;
    } catch (error: any) {
      if(error.response.data.success === false){
        dispatch(set_expedientes([]));
      }
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

export const crear_archivo_soporte: any = (archivo: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'gestor/expedientes-archivos/expedientes/agregar-archivo-soporte/',
        archivo
      );
      //  dispatch(get_nurseries_service());
      control_success('El archivo se agrego correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// listar archivo de soporte por expediente

export const get_archivos_id_expediente = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/listar-archivos-soporte/${
          id ?? ''
        }/`
      );

      if (data.success === true) {
        dispatch(set_archivos_por_expediente(data.data));
        control_success(data.detail);
      }
      //  console.log('')(data)
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

// editar archivo soporte
export const update_file = (id: number, archivo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/expedientes-archivos/expedientes/editar-archivos-soporte/${
          id ?? ''
        }/`,
        archivo
      );

      if (data.success === true) {
        //  dispatch(set_archivos_por_expediente(data.data));
        control_success(data.detail);
      }
      //  console.log('')(data)
      return data;
    } catch (error: any) {
      control_error(error.respuesta.data.detail);

      return error as AxiosError;
    }
  };
};

export const cerrar_expediente: any = (cierre: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'gestor/expedientes-archivos/expedientes/cierre-expediente/',
        cierre
      );
      //  dispatch(get_nurseries_service());
      control_success('Cierre de expediente realizado con éxito');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

///

// buscar expediente cerrado

export const get_busqueda_avanzada_expediente_cerrado = (
  titulo_expediente: string | null,
  nombre_tdr_origen: string | number | null,
  fecha_apertura_expediente: string | number | null,
  codigos_uni_serie_subserie: string | null,
  id_serie_origen: string | null,
  id_subserie_origen: string | null,
  fecha_inicio_expediente: string | number | null,
  fecha_fin_expediente: string | number | null,
  codigo_exp_consec_por_agno: string | null,

): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/buscar-expediente-cerrado/?trd_nombre=${
          nombre_tdr_origen ?? ''
        }&fecha_apertura_expediente=${
          fecha_apertura_expediente ?? ''
        }&titulo_expediente=${
          titulo_expediente ?? ''
        }&codigos_uni_serie_subserie=${
          codigos_uni_serie_subserie ?? ''
        }&id_serie_origen=${id_serie_origen ?? ''}&id_subserie_origen=${
          id_subserie_origen ?? ''
        }&fecha_inicio_expediente=${
          fecha_inicio_expediente ?? ''
        }&fecha_fin_expediente=${
          fecha_fin_expediente ?? ''
        }&codigo_exp_consec_por_agno=${
          codigo_exp_consec_por_agno ?? ''
        }`
      );

      if (data.success === true) {
        dispatch(set_expedientes(data.data));
      } else {
        dispatch(set_expedientes([]));
      }
      //  console.log('')(data)
      return data;
    }  catch (error: any) {
      if(error.response.data.success === false){
        dispatch(set_expedientes([]));
      }
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

// informacion
export const get_informacion_reapertura = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/info-expediente-cerrado/${
          id ?? ''
        }/`
      );

      if (data.success === true) {
        dispatch(set_informacion_reapertura(data.data));
      }
      //  console.log('')(data)
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

export const reapertura_expediente: any = (reapertura: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'gestor/expedientes-archivos/expedientes/reapertura-expediente/',
        reapertura
      );
      //  dispatch(get_nurseries_service());
      control_success('Reapertura de expediente realizado con éxito');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// eliminar
export const delete_file = (
  id: number,
  id_expediente_documental: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/expedientes-archivos/expedientes/eliminar-archivo-soporte/${id}/`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
        dispatch(get_archivos_id_expediente(id_expediente_documental));
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


export const serie_trd = (
  id: number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/ccd/catalogo/serie-subserie/get-by-id-ccd/${id}/`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        control_success(data.detail);
        dispatch(set_serie_subserie(data.data));
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