import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  set_file_categories,
  set_file_origin,
  set_file_origins,
  set_file_typologies,
  set_file_typology,
  set_person,
  set_persons,
} from '../slice/centralDigitalizacionSlice';
import { api } from '../../../../../api/axios';
import { IObjListType } from '../../interfaces/central_digitalizacion';

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

const map_list = (
  list: any[],
  is_choice: boolean,
  id?: number | string,
  key?: number | string,
  label?: number | string
): any => {
  console.log(list);
  let list_aux: IObjListType[] = [];
  if (is_choice) {
    list.forEach((objeto) => {
      list_aux.push({ id: objeto[0], key: objeto[0], label: objeto[1] });
    });
  } else {
    list.forEach((objeto) => {
      list_aux.push({
        id: objeto[id ?? ''],
        key: objeto[key ?? ''],
        label: objeto[label ?? ''],
      });
    });
  }
  return list_aux;
};

// Obtener categorias de archivo
export const get_file_categories_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/tipo-archivo/');
      dispatch(set_file_categories(map_list(data, true)));
      console.log(data);
      return data;
    } catch (error: any) {
      console.log('get_file_categories_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener origenes de archivo
export const get_file_origin_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/origen-archivo/');
      console.log(data);
      dispatch(set_file_origins(map_list(data, true)));
      return data;
    } catch (error: any) {
      console.log('get_file_origin_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener tipologias de archivo
export const get_file_typology_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/expedientes-archivos/expedientes/listar-tipologias/'
      );
      console.log(data);

      dispatch(
        set_file_typologies(
          map_list(
            data.data,
            false,
            'id_tipologia_documental',
            'id_tipologia_documental',
            'nombre'
          )
        )
      );
      return data;
    } catch (error: any) {
      console.log('get_file_typology_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener personas filtro
export const get_persons_service = (
  type: string | number | null,
  document: string | number | null,
  primer_nombre: string | null,
  primer_apellido: string | null,
  razon_social: string | null,
  comercial_name: string | null,
  is_person: boolean
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-filters/?tipo_documento=${
          type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${
          primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
          razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      console.log(data);
      if (is_person) {
        dispatch(set_persons(data.data));
      }
      if (data.data.length > 0) {
        control_success('Se encontraron personas');
      } else {
        control_error('No se encontro persona');
      }
      return data;
    } catch (error: any) {
      console.log('get_persons_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
