
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

// Lista Tipo Documento
export const obtener_tipo_documento: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`listas/tipo-documento/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Buscar personas por filtros
export const obtener_personas: any = (tipo_documento: string,numero_documento: string,primer_nombre: string,segundo_nombre: string,primer_apellido: string,segundo_apellido: string,id_unidad_organizacional_actual: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/personas/get-by-filters/?tipo_documento=${tipo_documento??''}&numero_documento=${numero_documento??''}&primer_nombre=${primer_nombre ?? ''}&segundo_nombre=${segundo_nombre ?? ''}&primer_apellido=${primer_apellido ?? ''}&segundo_apellido=${segundo_apellido ?? ''}&id_unidad_organizacional_actual=${id_unidad_organizacional_actual ?? ''}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      // return error as AxiosError;
    }
  };
};

// Obtiene persona por tipo y numero de documento
export const obtener_persona_cc_nro: any = (tipo_documento: string, nro_documento: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/personas/get-by-documento/?tipo_documento=${tipo_documento}&numero_documento=${nro_documento}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      // return error as AxiosError;
    }
  };
};

// Obtener concesiones de expedientes realizados
export const obtener_concesiones_realizados: any = (id_expediente: number, propios: boolean) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/expedientes/get/${id_expediente}/?propios=${propios}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener accesos dados de expedientes
export const ver_expedientes: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/expedientes/user/get/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar acceso a expedientes
export const actualizar_acceso_expediente: any = (id_expediente: number,accesos: any, accesos_otros: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/concesion-acceso/expedientes/update/${id_expediente}/`,{concesiones_propias: accesos, concesiones_otros: accesos_otros});
      control_success('El acceso a expedientes fue realizado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Documentos

// Actualizar acceso a documentos
export const actualizar_acceso_documento: any = (id_documento: number,accesos: any, accesos_otros: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/concesion-acceso/documentos/update/${id_documento}/`,{concesiones_propias: accesos, concesiones_otros: accesos_otros});
      control_success('El acceso a documento fue realizado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener concesiones de documentos realizados
export const obtener_concesiones_realizados_doc: any = (id_documento: number, propios: boolean) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/documentos/get/${id_documento}/?propios=${propios}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener accesos dados de documentos
export const ver_documentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/documentos/user/get/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


