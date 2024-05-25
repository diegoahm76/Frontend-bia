/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SetStateAction, type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  get_mold_organigrams,
  get_organigrams,
  current_organigram,
  get_levels,
  get_unitys,
} from '../slices/organigramSlice';
// Interfaces
import type {
  DataCambioOrganigramaActual,
  IObjCreateOrganigram,
} from '../../interfaces/organigrama';
import { api } from '../../../../../api/axios';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';

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
    theme: 'light',
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
    theme: 'light',
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
      // //  console.log('')('get_mold_organigrams_service');
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
      return [];
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
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>,
  handle_close_crear_organigrama: () => void,
  setLoadingButton: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setLoadingButton(true);
      // //  console.log('')(organigrama);
      const { data } = await api.post(
        'transversal/organigrama/create/',
        organigrama
      );
      // //  console.log('')(data);
      dispatch(get_organigrams_service());
      dispatch(current_organigram(data.detail));
      control_success('El organigrama se agregó correctamente');
      set_position_tab_organigrama('2');
      handle_close_crear_organigrama();
      return data;
    } catch (error: any) {
      // //  console.log('')('add_organigrams_service');
      control_error(error.response.data.detail || 'Error al crear organigrama');
      // //  console.log('')(error.response.data);
      set_position_tab_organigrama('1');
      return error as AxiosError;
    } finally {
      setLoadingButton(false);
    }
  };
};

// Editar Organigrama
export const edit_organigrams_service: any = (
  organigrama: IObjCreateOrganigram,
  id: string,
  setLoadingEdicionOrgan: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setLoadingEdicionOrgan(true);
      // //  console.log('')(api.defaults);
      const { data } = await api.patch(
        `transversal/organigrama/update/${id}/`,
        organigrama
      );
      const res = await api.get('transversal/organigrama/get/');
      const org_data = await res?.data?.Organigramas.find(
        (organigrama: any) => organigrama.id_organigrama === Number(id)
      );
      //  console.log('')(org_data);
      dispatch(get_organigrams_service());
      dispatch(current_organigram(org_data));

      //! el campo debe limpiarse luego de la actualización
      control_success('El organigrama se editó correctamente');
      return data;
    } catch (error: any) {
      // //  console.log('')('edit_organigrams_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      setLoadingEdicionOrgan(false);
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
      // //  console.log('')(response.data);
      dispatch(get_organigrams_service());
      void Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Atención',
        text: response.data.detail,
      });
      set_position_tab_organigrama('1');
      return response.data;
    } catch (error: any) {
      // //  console.log('')('to_finalize_organigram_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Reanudar organigrama
export const to_resume_organigram_service: any = (
  id: string,
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>,
  clean_unitys: () => void
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `transversal/organigrama/reanudar-organigrama/${id}/`
      );

      const res = await api.get('transversal/organigrama/get/');
      const org_data = await res?.data?.Organigramas.find(
        (organigrama: any) => organigrama.id_organigrama === Number(id)
      );
      //  console.log('')(org_data);
      // dispatch(get_organigrams_service());
      dispatch(current_organigram(org_data));
      set_position_tab_organigrama('2');
      clean_unitys();
      void Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Atención',
        text: data.detail,
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
      // //  console.log('')('get_levels_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar Niveles
export const update_levels_service: any = (
  id: string | number,
  newLevels: any,
  setloadingLevels: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setloadingLevels(true);
      const { data } = await api.put(
        `transversal/organigrama/niveles/update/${id}/`,
        newLevels
      );
      dispatch(get_levels_service(id));
      control_success('Proceso Exitoso');
      return data;
    } catch (error: any) {
      // //  console.log('')('update_levels_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      setloadingLevels(false);
    }
  };
};

// Unidades
// Obtener Unidades
export const get_unitys_service: any = (
  id: string | number,
  setDataloading?: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setDataloading?.(true);
      const { data } = await api.get(
        `transversal/organigrama/unidades/get-by-organigrama/${id}/`
      );

      // //  console.log('')(data.data);

      dispatch(get_unitys(data.data));
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      setDataloading?.(false);
    }
  };
};

// Actualizar Unidades
export const update_unitys_service: any = (
  id: string | number,
  new_unitys: any,
  clean_unitys: any,
  setloadingLevels: Dispatch<SetStateAction<boolean>>,
  setDataloading: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setloadingLevels(true);
      const { data } = await api.put(
        `transversal/organigrama/unidades/update/${id}/`,
        new_unitys
      );
      dispatch(get_unitys_service(id, setDataloading));
      control_success('Proceso Exitoso');
      clean_unitys();
      return data;
    } catch (error: any) {
      // //  console.log('')('update_unitys_service fail');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      clean_unitys();
      setloadingLevels(false);
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

      if (tipo_documento === '' || numero_documento === 0) {
        control_warning('Debe ingresar un tipo y número de documento');
        return data;
      }

      control_success('Usuario encontrado');
      return data;
    } catch (error: any) {
      // control_error(error.response.data.detail);
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
      // //  console.log('')(data);
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
      // //  console.log('')('delegate_organigram_user');
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
      const new_url = `transversal/organigrama/activacion/activar-organigrama/`;
      // const old_url = 'transversal/organigrama/change-actual-organigrama/'
      const { data } = await api.put(new_url, data_cambio);
      control_success('Proceso exitoso');

      showAlert(
        'Atención!!',
        'El organigrama actual ha sido cambiado',
        'success'
      ).then(() => {
        showAlert(
          'Atención!!',
          '1.Recuerda asignar los líderes a las unidades del nuevo organigrama, 2.Recuerde trasladar las personas del organigrama anterior al actual, (si ya realizó el proceso omite el mensaje)',
          'info'
        );
      });
      dispatch(get_organigrams_service());
      return data;
    } catch (error: any) {
      console.log(error?.response?.data);
      showAlert('Atención!!', error.response.data.detail, 'warning');
      // control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_organigrama_actual: any = () => {
  return async () => {
    try {
      // const old_url = 'transversal/organigrama/get-organigrama-actual/';
      const new_url = `transversal/organigrama/activacion/get-organigrama-actual/`;
      const { data } = await api.get(new_url);

      console.log(data);

      if (data?.success) {
        control_success(data.detail);
      }

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
      // const old_url = 'transversal/organigrama/get-organigramas-posibles/'
      const new_url =
        'transversal/organigrama/activacion/get-organigramas-posibles/';
      const { data } = await api.get(new_url);
      //  //  console.log('')(data);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
