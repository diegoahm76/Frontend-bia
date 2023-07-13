/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { type AxiosResponse, type AxiosError } from 'axios';
import {
  get_trd_current,
  get_trds,
  get_catalogo_series_subseries_unidad_organizacional,
  get_data_format_documental_type,
  // get_data_format_documental_type_current,
} from '../slice/TRDResourcesSlice';

// ? Obtener TRD's ------------------------------>
export const get_searched_trd = (
  nombre: string,
  version: string
): ((dispatch: Dispatch<any>) => Promise<AxiosResponse<any> | AxiosError>) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse<any> | AxiosError> => {
    try {
      const url = `gestor/trd/buscar/trd/nombre-version/?nombre=${nombre}&version=${version}`;
      const { data } = await api.get(url);
      /* console.log(
        '🚀 ~ file: modalBusquedaTRDThunks.ts ~ line 41 ~ return ~ data',
        data
      ); */
      dispatch(get_trds(data.data));
      control_success(data.detail);
      return data.data;
    } catch (error: AxiosError | any) {
      console.log(error);
      control_error(error.response?.data?.detail);
      // dispatch(get_assignments_service(ccd_current));

      return error;
    }
  };
};

// ? crear TRD ------------------------------>
export const create_trd_service: any = (
  /* ccd: any,
  set_save_ccd: (arg0: boolean) => void,
  openModalBusquedaCreacionCCD: any,
  activateLoadingButton: any,
  desactivateLoadingButton: any */
  bodyPost: any
) => {
  return async (dispatch: Dispatch<any>) => {
    // activateLoadingButton();
    try {
      // console.log(bodyPost, 'bodyPost');
      const { data } = await api.post('gestor/trd/create/', {
        id_ccd: bodyPost.id_ccd.item.id_ccd,
        nombre: bodyPost.nombre,
        version: bodyPost.version
      });
      dispatch(get_trd_current(data.data));
      control_success(data.detail);
      /* set_save_ccd(true);
      openModalBusquedaCreacionCCD(); */
      return data.data;
    } catch (error: any) {
      console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      // desactivateLoadingButton();
    }
  };
};

// ? Actualizar TRD ------------------------------>
export const update_trd_service = (bodyPost: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const url = `gestor/trd/update/${bodyPost.id_trd}/`;

      const { nombre, version } = bodyPost;

      const objectToSend = { nombre, version };

      const { data: updatedData } = await api.put(url, objectToSend);

      const searchUrl = `gestor/trd/buscar/trd/nombre-version/?nombre=${nombre}&version=${version}`;
      const { data: searchData } = await api.get(searchUrl);

      const updatedTrd = searchData.data.find(
        (trd: any) => trd.id_trd === bodyPost.id_trd
      );
      dispatch(get_trd_current(updatedTrd));

      control_success(updatedData.detail);
      return updatedData;
    } catch (error: any) {
      console.log(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? Obtener catalogo de series y subseries por unidad organizacional -------------------------------------->
export const getServiceSeriesSubseriesXUnidadOrganizacional = (
  ccd_current: any
): any => {
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
      /* console.log(
        '🚀 ~ file: TRDResourcesThunks.ts ~ line 139 ~ return ~ new_data',
        new_data
      ); */
      dispatch(get_catalogo_series_subseries_unidad_organizacional(new_data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// ? get formatos por tipo de medio - busqueda por nombre y codigo tipo de medio ------------------------------>
export const get_formatos_by_tipo_medio_by_format_and_name = (
  name?: string,
  cod_tipo_medio?: string
): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const url = `gestor/trd/formatos/get-by-params/?nombre=${name ?? ''}&cod-tipo-medio=${
        cod_tipo_medio ?? ''
      }`;
      const { data } = await api.get(url);
      console.log(
        '🚀 ~ file: TRDResourcesThunks.ts ~ line 159 ~ return ~ data',
        data
      );
      dispatch(get_data_format_documental_type(data.data));
      return data.data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


export const create_formato_by_tipo_medio_service = (bodyPost: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'gestor/trd/formatos/create/',
        bodyPost
      );
      control_success(data.detail);
      return data;
    } catch (error: any) {
      console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
}