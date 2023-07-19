/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  get_data_tipologias_documentales,
  get_catalogo_trd_action
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

      data.data.length === 0
        ? control_error('No se encontró data relacionada')
        : control_success(data.detail);
      return data.data;
    } catch (error: AxiosError | any) {
      // console.log(error);
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
      // console.log(error.response.data, 'error');
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
      // console.log(error);
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
      const url = `gestor/trd/formatos/get-by-params/?nombre=${
        name ?? ''
      }&cod-tipo-medio=${cod_tipo_medio ?? ''}`;
      const { data } = await api.get(url);
      /* console.log(
        '🚀 ~ file: TRDResourcesThunks.ts ~ line 159 ~ return ~ data',
        data
      ); */
      control_success(
        data.detail || 'proceso exitoso, se encontró la siguiente data'
      );
      dispatch(get_data_format_documental_type(data.data));
      return data.data;
    } catch (error: any) {
      control_error(
        `${error.response.data.detail} que coincida` ||
          'Ha ocurrido un error, no se han encontrado data'
      );
      return error as AxiosError;
    }
  };
};

// ? create a format (type and name) (fisic or electronic)------------------------------>
export const create_formato_by_tipo_medio_service = (bodyPost: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('gestor/trd/formatos/create/', bodyPost);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? edit a format (type and name, active or inactive) (fisic or electronic)------------------------------>

export const edit_formato_by_tipo_medio_service = ({
  nombre,
  id_formato_tipo_medio,
  cod_tipo_medio_doc,
  activo
}: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // console.log(id_formato_tipo_medio, 'id_formato_tipo_medio');
      // console.log(nombre, 'nombre');
      const url = `gestor/trd/formatos/update/${id_formato_tipo_medio}/`;
      const { data } = await api.put(url, {
        nombre,
        cod_tipo_medio_doc,
        activo
      });
      control_success(data.detail);
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? delete a format (id_format)------------------------------>

export const delete_formato_by_tipo_medio_service = (id_format: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/trd/formatos/delete/${id_format}/`
      );
      control_success(data.detail || 'Formato eliminado correctamente');
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(
        error.response.data.detail ||
          'Error, no se ha podido eliminar el formato'
      );
      return error as AxiosError;
    }
  };
};

// ! ------------------------------->  SERVICIOS TIPOLOGIAS DOCUMENTALES <--------------------------------------

// ? get documentary typologies by name -------------------------------------->

export const get_tipologias_documentales_by_name = (name?: string): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const url = `gestor/trd/buscar/tipologia/documental/?nombre=${
        name ?? ''
      }`;
      const { data } = await api.get(url);

      data.data.length > 0
        ? control_success(
            data.detail || 'proceso exitoso, se encontró la siguiente data'
          )
        : control_error('No se encontró data relacionada');

      dispatch(get_data_tipologias_documentales(data.data));
      return data.data;
    } catch (error: any) {
      control_error(
        `${error.response.data.detail} que coincida` ||
          'Ha ocurrido un error, no se han encontrado data'
      );
      return error as AxiosError;
    }
  };
};

// ? get documentary typologies by code (E,H,F) -------------------------------------->

export const get_formatos_documentales_by_code = (code?: string): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError | any> => {
    try {
      if (!code) {
        return;
      }

      const url = `gestor/trd/formatos/get-by-cod/${code ?? ''}`;
      const { data } = await api.get(url);

      data.data.length > 0
        ? control_success(
            data.detail || 'proceso exitoso, se encontró la siguiente data'
          )
        : control_error('No se encontró data relacionada');

      dispatch(get_data_format_documental_type(data.data));
      return data.data;
    } catch (error: any) {
      control_error('Ha ocurrido un error, no se han encontrado data');

      return error as AxiosError;
    }
  };
};

// ? get formatos documentales by id documentary type -------------------------------------->
export const get_formatos_documentales_by_id_tipologia = (
  id_tipologia_documental: number
): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError | any> => {
    try {
      if (!id_tipologia_documental) {
        return;
      }

      const url = `gestor/trd/tipologias/get-formatos/${id_tipologia_documental}`;
      const { data } = await api.get(url);

      data.data.length > 0
        ? control_success(
            data.detail || 'proceso exitoso, se encontró la siguiente data'
          )
        : control_error('No se encontró data relacionada');
      console.log(data.data, 'data.data');
      return data.data;
    } catch (error: any) {
      control_error('Ha ocurrido un error, no se han encontrado data');

      return error as AxiosError;
    }
  };
};

// ? create documentary typologies (name, cod_tipo_medio_doc, formats) -------------------------------------->

export const create_tipologia_documental_service = (bodyPost: any): any => {
  return async (dispatch: Dispatch<any>) => {
    if (
      !bodyPost.nombre ||
      !bodyPost.cod_tipo_medio_doc ||
      !bodyPost.formatos
    ) {
      control_error('Todos los campos son obligatorios');
      return;
    }

    try {
      const { data } = await api.post(
        'gestor/trd/crear/tipologia/documental/',
        bodyPost
      );
      control_success(data.detail);
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? update documentary typologies (name, cod_tipo_medio_doc, formats) -------------------------------------->
export const update_tipologia_documental_service = (bodyPost: any): any => {
  return async (dispatch: Dispatch<any>) => {
    if (
      !bodyPost.nombre ||
      !bodyPost.cod_tipo_medio_doc ||
      !bodyPost.formatos
    ) {
      control_error('Todos los campos son obligatorios');
      return;
    }
    try {
      const { data } = await api.put(
        `gestor/trd/update/tipologia/documental/${bodyPost.id_tipologia_documental}/`,
        {
          nombre: bodyPost.nombre,
          cod_tipo_medio_doc: bodyPost.cod_tipo_medio_doc,
          formatos: bodyPost.formatos,
          activo: bodyPost.activo
        }
      );
      control_success(data.detail);
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? delete documentary typologies (id) -------------------------------------->
export const delete_tipologia_documental_service = (id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/trd/eliminar/tipologia/documental/${id}/`
      );
      control_success(data.detail);
      return data;
    } catch (error: any) {
      // console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! ---------- At this point I start the develop of: catalogo TRD (administrate TRD) ----------->

export const get_catalogo_trd = (id_trd: number): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.get(
        `gestor/trd/catalogo-trd/get-list/${id_trd}/`
      );
      /* console.log(
        '🚀 ~ file: TRDResourcesThunks.ts ~ line 139 ~ return ~ new_data',
        data
      ); */
      dispatch(get_catalogo_trd_action(data.data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// ! finish and resume TRD ------------------------------>

// ? finish TRD
export const finish_trd_service = (id_trd: number, setFlag: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (!id_trd) return control_error('No se ha podido realizar la acción');
      const url = `gestor/trd/finish/${id_trd}/`;
      const { data } = await api.put(url);
      control_success(data.detail);
      setFlag(true);
      return data.data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// ? resume TRD
export const resume_trd_service = (id_trd: number, setFlag: any): any => {
  return async (dispatch: Dispatch<any>) => {
    
    try {
      if (!id_trd) return control_error('No se ha podido realizar la acción');
      const url = `gestor/trd/reanudar/trd/${id_trd}/`;
      const { data } = await api.put(url);
      control_success(data.detail);
      setFlag(false);
      return data.data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
