import { type SetStateAction, type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  get_mold_organigrams,
  get_organigrams,
  current_organigram,
  get_levels,
  get_unitys
} from '../slices/organigramSlice';
// Interfaces
import type {
  DataCambioOrganigramaActual,
  IObjCreateOrganigram
} from '../../interfaces/organigrama';
import { api } from '../../../../../api/axios';

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

// Obtener Organigrama
export const get_mold_organigrams_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/unidades/get-jerarquia/${id}/`
      );
      dispatch(get_mold_organigrams(data.data));
      return data;
    } catch (error: any) {
      // console.log('get_mold_organigrams_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener todos los organigramas
export const get_organigrams_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('transversal/organigrama/get/');
      dispatch(get_organigrams(data.Organigramas));
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener todos los organigramas terminado
export const get_finished_organigrams_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('transversal/organigrama/get-terminados/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Organigrama
export const add_organigrams_service: any = (
  organigrama: any,
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // console.log(organigrama);
      const { data } = await api.post(
        'transversal/organigrama/create/',
        organigrama
      );
      // console.log(data);
      dispatch(get_organigrams_service());
      dispatch(current_organigram(data.detail));
      control_success('El organigrama se agrego correctamente');
      set_position_tab_organigrama('2');
      return data;
    } catch (error: any) {
      // console.log('add_organigrams_service');
      control_error(error.response.data.detail);
      // console.log(error.response.data);
      set_position_tab_organigrama('1');
      return error as AxiosError;
    }
  };
};

// Editar Organigrama
export const edit_organigrams_service: any = (
  organigrama: IObjCreateOrganigram,
  id: string
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // console.log(api.defaults);
      const { data } = await api.patch(
        `transversal/organigrama/update/${id}/`,
        organigrama
      );
      dispatch(get_organigrams_service());

      //! el campo debe limpiarse luego de la actualización
      control_success('El organigrama se editó correctamente');
      return data;
    } catch (error: any) {
      // console.log('edit_organigrams_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Finalizar Organigrama

export const to_finalize_organigram_service: any = (
  id: string,
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await api.put(
        `transversal/organigrama/finalizar/${id}/`
      );
      // console.log(response.data);
      dispatch(get_organigrams_service());
      void Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Atención',
        text: response.data.detail
      });
      set_position_tab_organigrama('1');
      return response.data;
    } catch (error: any) {
      // console.log('to_finalize_organigram_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Reanudar organigrama
export const to_resume_organigram_service: any = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `transversal/organigrama/reanudar-organigrama/${id}/`
      );
     // console.log(data);
      dispatch(get_organigrams_service());
      void Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Atención',
        text: data.detail
      });
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Niveles
// Obtener Niveles
export const get_levels_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/niveles/get-by-organigrama/${id}/`
      );
      dispatch(get_levels(data.data));
      return data;
    } catch (error: any) {
      // console.log('get_levels_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar Niveles
export const update_levels_service: any = (
  id: string | number,
  newLevels: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `transversal/organigrama/niveles/update/${id}/`,
        newLevels
      );
      dispatch(get_levels_service(id));
      control_success('Proceso Exitoso');
      return data;
    } catch (error: any) {
      // console.log('update_levels_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Unidades
// Obtener Unidades
export const get_unitys_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/unidades/get-by-organigrama/${id}/`
      );

      // console.log(data.data);

      dispatch(get_unitys(data.data));
      return data;
    } catch (error: any) {
     // console.log('get_unitys_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar Unidades
export const update_unitys_service: any = (
  id: string | number,
  new_unitys: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `transversal/organigrama/unidades/update/${id}/`,
        new_unitys
      );
      dispatch(get_unitys_service(id));
      control_success('Proceso Exitoso');
      return data;
    } catch (error: any) {
      // console.log('update_unitys_service fail');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! Trae info de usuario para delegarle un organigrama posteriormente
export const get_nuevo_user_organigrama: any = (
  tipo_documento: string,
  numero_documento: number
) => {
  return async () => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/get-nuevo-user-organigrama/${tipo_documento}/${numero_documento}/`
      );
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! Trae info de usuario para delegarle un organigrama posteriormente
export const get_busqueda_avanzada_user_organigrama: any = (
  primer_nombre: string,
  primer_apellido: string
) => {
  return async () => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/get-nuevo-user-organigrama-filters/?primer_nombre=${primer_nombre}&primer_apellido=${primer_apellido}`
      );
      // console.log(data);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! Delega un organigrama ya seleccionado
export const delegar_organigrama_persona: any = (
  id_persona: number,
  organigrama: string
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `transversal/organigrama/delegate-organigrama-persona/?id_persona=${id_persona}&id_organigrama=${organigrama}`
      );
      control_success('Delegacion de organigrama exitosa');
      return data;
    } catch (error: any) {
     // console.log('delegate_organigram_user');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const cambio_organigrama_actual: any = (
  data_cambio: DataCambioOrganigramaActual
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'transversal/organigrama/change-actual-organigrama/',
        data_cambio
      );
      control_success('Proceso exitoso');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_organigrama_actual: any = () => {
  return async () => {
    try {
      const { data } = await api.get(
        'transversal/organigrama/get-organigrama-actual/'
      );
      //! console.log(data)
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_organigramas_posibles: any = () => {
  return async () => {
    try {
      const { data } = await api.get(
        'transversal/organigrama/get-organigramas-posibles/'
      );
     //  console.log(data);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
