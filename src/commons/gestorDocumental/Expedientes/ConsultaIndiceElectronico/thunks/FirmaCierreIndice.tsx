
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';


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

// Selección de Expediente
export const obtener_expedientes: any = (id_trd_origen: string,fecha_apertura_expediente: string,id_serie_origen: string,id_subserie_origen: string,palabras_clave_expediente: string,titulo_expediente: string,codigos_uni_serie_subserie: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/buscar-expedientes/?id_trd_origen=${id_trd_origen}&fecha_apertura_expediente=${fecha_apertura_expediente}&id_serie_origen=${id_serie_origen}&id_subserie_origen=${id_subserie_origen}&palabras_clave_expediente=${palabras_clave_expediente}&titulo_expediente=${titulo_expediente}&codigos_uni_serie_subserie=${codigos_uni_serie_subserie}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Información Indice por Expediente
export const obtener_indice_por_expediente: any = (id_expediente_documental: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/firma-cierre/informacion-indice/get/${id_expediente_documental}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener información de cierre de indice
export const obtener_cierre_indice: any = (id_expediente_documental: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/firma-cierre/get/${id_expediente_documental}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Enviar Código de Verificación
export const enviar_codigo_verificación: any = (id_expediente_documental: number) => {
  return async () => {
    try {
      const { data } = await api.post(`gestor/expedientes-archivos/expedientes/firma-cierre/envio-codigo/${id_expediente_documental}/`);
      control_success('Se ha realizado el envío del código de verificación.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Validar Código de Verificación
export const validar_codigo_verificación: any = (id_expediente_documental: number, codigo: string) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/firma-cierre/validacion-codigo/`,{id_indice_electronico_exp: id_expediente_documental,codigo: codigo});
      control_success('El código es válido.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Firma Cierre de Indice
export const firma_cierre_indice: any = (id_expediente_documental: number, observacion: string) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/firma-cierre/`,{id_indice_electronico_exp: id_expediente_documental,observacion: observacion});
      control_success('Se realizó la firma correcta del cierre del índice electrónico.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


