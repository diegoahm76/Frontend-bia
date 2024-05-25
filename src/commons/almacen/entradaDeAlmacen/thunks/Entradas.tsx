
import { api } from '../../../../api/axios';
// Types
import { type AxiosResponse, type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type anular_entrada, type crear_entrada } from '../interfaces/entradas';
import { type ResponseServer } from '../../../../interfaces/globalModels';


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

// Crear entrada
export const crear_entrada_bien: any = (dataCreate: crear_entrada, archivo: any) => {
  return async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const formData = new FormData();
      formData.append('info_entrada', JSON.stringify(dataCreate.info_entrada));
      formData.append('info_items_entrada', JSON.stringify(dataCreate.info_items_entrada))
      formData.append('archivo_soporte', JSON.stringify(archivo))

      const { data } = await api.post('almacen/bienes/entradas/create/', formData);
      control_success('La entrada se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar entrada
export const actualizar_entrada_bien: any = (id_entrada_almacen: number, form_data: crear_entrada) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/bienes/entradas/update/${id_entrada_almacen}/`, form_data);
      control_success('La entrada se actualizó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene enrtadas
export const obtener_entradas: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bienes/entradas/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene enrtada por id con items
export const obtener_entrada_items: any = (id_entrada: number) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/bienes/entradas/get-list/?id_entrada=${id_entrada}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene datos de persona por id
export const obtener_persona: any = (id_persona: number) => {
  return async () => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id_persona}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene ultimo numero de entrada (Consecutivo)
export const obtener_consecutivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bienes/entradas/get-numero_entrada/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene los tipos de entrada
export const obtener_tipos_entrada = async (): Promise<AxiosResponse<ResponseServer<any[]>>> => {
  return await api.get<ResponseServer<any[]>>('almacen/bienes/entradas/tipos-entradas/');
};

// Obtiene listado de bodegas
export const obtener_bodegas: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bodega/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene listado unidades de medida
export const obtener_unidades_medida: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/unidades-medida/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene listado unidades de medida
export const obtener_porcentajes_iva: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/porcentajes/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene todo el listado de bienes
export const obtener_bienes: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bienes/entradas/search-bienes/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const obtener_bienes_por_pagina: any = (pagina: string) => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bienes/entradas/search-bienes/?page=' + pagina);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene listado de estados
export const obtener_estados: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/estados-articulo/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Anular mantenimiento
export const anular_entradas: any = (id_entrada: number, form_data: anular_entrada) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/bienes/entradas/anular/${id_entrada}/`, form_data);
      control_success('Se anulo la entrada');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener articulo por código de bien
export const obtener_articulo_codigo: any = (codigo_bien: number) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/bienes/entradas/get-by-codigo/?codigo_bien=${codigo_bien}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes por params
export const obtener_entradas_filtros: any = (codigo_bien: number,nombre: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/bienes/entradas/search-bienes/?codigo_bien=${codigo_bien}&nombre=${nombre}`);
      return data;
    } catch (error: any) {
      control_error(error?.response.data.detail);
      return error as AxiosError;
    }
  };
};