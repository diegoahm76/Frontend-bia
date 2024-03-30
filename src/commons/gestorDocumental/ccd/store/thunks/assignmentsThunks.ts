/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { NavigateFunction } from 'react-router-dom';
import { api } from '../../../../../api/axios';
import { type AxiosError, type AxiosResponse } from 'axios';
import { toast, type ToastContent } from 'react-toastify';
// Types
// Reducers
// import { current_organigram, get_levels, get_mold_organigrams, get_organigrams, get_unitys } from "../../../organigrama/store/slices/organigramSlice";
// Interfaces
// import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../../organigrama/interfaces/organigrama';
// import { get_assignments_ccd } from '../slices/assignmentsSlice';
import { type Dispatch } from 'react';
import { get_assignments_ccd } from '../slices/assignmentsSlice';
// import { control_error } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
// import { ccd_slice } from './../slices/ccdSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/* const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-left',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  }); */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-left',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

//! Obtiene ccd tabla intermedia de asignaciones usar en TRD tambien
export const get_assignments_service = (ccd_current: any): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const promise1 = api.get(
        `transversal/organigrama/unidades/get-by-organigrama/${ccd_current.id_organigrama}/`
      );

      const promise2 = api.get(
        `gestor/ccd/catalogo/unidad/get-by-id-ccd/${ccd_current.id_ccd}/`
      );

      const [response1, response2] = await Promise.all([promise1, promise2]);

      const dataUnidadOrganigrama = response1.data;
      const data = response2.data;

      const new_data = data.data.map((item: any, index: number) => {
        const unidad = dataUnidadOrganigrama.data.find(
          (unidad: any) =>
            unidad.id_unidad_organizacional === item.id_unidad_organizacional
        );

        return {
          ...item,
          id: index + 1,
          nombreUnidad: unidad?.nombre
        };
      });

      dispatch(get_assignments_ccd(new_data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const create_or_delete_assignments_service: any = (
  new_items: any[],
  ccd_current: any,
  reset?: any,
  activateLoadingButtonGuardarRelacion?: any,
  desactivateLoadingButtonGuardarRelacion?: any
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse[] | AxiosError> => {
    try {
      activateLoadingButtonGuardarRelacion();
      const id_ccd: number = ccd_current.id_ccd;

      //  console.log('')(new_items);

      const requests = new_items.map((item: any) => {
        return {
          id_unidad_organizacional: item.id_unidad_organizacional,
          id_catalogo_serie: item.id_catalogo_serie
        };
      });

      const { data } = await api.put(
        `gestor/ccd/catalogo/unidad/update/${id_ccd}/`,
        requests
      );

      // const responses = await Promise.all(requests);

      dispatch(get_assignments_service(ccd_current));
      control_success(data.detail);

      reset({
        catalogo_asignacion: [],
        sries_asignacion: { label: '', value: 0 },
        sries: '',
        subserie_asignacion: [],
        subserie: '',
        unidades_asignacion: { label: '', value: 0 }
      });

      return data;
    } catch (error: any) {
      // //  console.log('')(error);
      dispatch(get_assignments_service(ccd_current));
      control_warning(error.response?.data?.detail);

      return error as AxiosError;
    } finally {
      desactivateLoadingButtonGuardarRelacion();
    }
  };
};
