import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import { set_attorney, set_attorneys, set_companies, set_company, set_document_types, set_grantor, set_grantors, set_list_applicant_types, set_list_on_behalf_of, set_list_pqr_status, set_person, set_person_types, set_persons, set_pqrs } from '../slice/pqrsdfSlice';
import { api } from '../../../../../api/axios';
import { IObjListType } from '../../interfaces/pqrsdf';

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

const map_list = (list: any[]): any => {
  let list_aux: IObjListType[] = []
  list.forEach(objeto => {
    list_aux.push({ id: objeto[0], key: objeto[0], label: objeto[1] })
  });
  console.log(list_aux)
  return list_aux
};

// Obtener tipos documento
export const get_document_types_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('personas/tipos-documento/get-list/');
      dispatch(set_document_types(data));
      return data;
    } catch (error: any) {
      console.log('get_document_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener tipos persona
export const get_person_types_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('choices/tipo-persona/');

      dispatch(set_person_types(map_list(data)));
      console.log(data)
      return data;
    } catch (error: any) {
      console.log('get_person_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener lista en nombre de
export const get_list_applicant_types_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/tipo-consulta-pqrsdf/');
      dispatch(set_list_applicant_types(map_list(data)));
      console.log(data)
      return data;
    } catch (error: any) {
      console.log('get_list_applicant_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener lista en representacion de
export const get_list_on_behalf_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/tipo-representacion-pqrsdf/');
      dispatch(set_list_on_behalf_of(map_list(data)));
      console.log(data)
      return data;
    } catch (error: any) {
      console.log('get_list_on_behalf_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener lista nuevo, o existente
export const get_pqrs_status_aux_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/estado-pqrsdf/');
      dispatch(set_list_pqr_status(map_list(data)));
      console.log(data)
      return data;
    } catch (error: any) {
      console.log('get_pqrs_status_aux_service');
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
  is_person: boolean,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-filters/?tipo_documento=${type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&razon_social=${razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      console.log(data)
      if (is_person) {
        dispatch(set_persons(data.data));
      } else {
        dispatch(set_grantors(data.data));
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

// obtener persona por documento
export const get_person_document_service = (
  type: string | number,
  document: string | number,
  is_person: boolean
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-by-document/${type}/${document}/`
      );
      console.log(data)

      if ('data' in data) {
        if (data.data.length > 0) {
          if (is_person) {
            dispatch(set_person(data.data));
          } else {
            dispatch(set_grantor(data.data));
          }
          control_success('Se selecciono la persona ');
        } else {
          control_error('No se encontro la persona');
        }
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener empresas filtro
export const get_companies_service = (
  type: string | number | null,
  document: string | number | null,
  razon_social: string | null,
  comercial_name: string | null,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-empresas-filters/?tipo_persona=J&tipo_documento=${type ?? ''
        }&numero_documento=${document ?? ''}&razon_social=${razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      dispatch(set_companies(data.data));
      console.log(data)
      if (data.data.length > 0) {
        control_success('Se encontraron empresas');
      } else {
        control_error('No se encontro empresa');
      }
      return data;
    } catch (error: any) {
      console.log('get_companies_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener empresa por documento
export const get_company_document_service = (
  type: string | number,
  document: string | number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-empresa-by-document/${type}/${document}/`
      );
      console.log(data)

      if ('data' in data) {

        dispatch(set_company(data.data));

        control_success('Se selecciono la empresa ');

      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_company_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// obtener apoderados
export const get_attorneys_service = (
  id: string | number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/apoderados-personas/get-list/${id}/`
      );
      console.log(data)
      dispatch(set_attorneys(data.data));

      if ('data' in data) {
        if (data.data.length > 0) {
          control_success('Se encontraron apoderados');
        } else {
          control_error('No se encontro apoderado');
        }
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_attorneys_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener apoderados
export const get_pqrs_service = (
  id: string | number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/pqr/get_pqrsdf/${id}/`
      );
      console.log(data)
      dispatch(set_pqrs(data.data));

      if ('data' in data) {
        if (data.data.length > 0) {
          control_success('Se encontraron pqrs');
        } else {
          control_error('No se encontrarón pqrs');
        }
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_pqrs_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


