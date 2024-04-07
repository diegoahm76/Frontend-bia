/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { type AxiosError, type AxiosResponse } from 'axios';
import { api } from '../../../../../../api/axios';
import { setUserSeriesAndSubseries } from '../slice/CatalogoSeriesYSubseriesSlice';
import { type Dispatch } from 'react';
import {
  control_success,
  control_error,
} from '../../../store/thunks/ccdThunks';

export const getCatalogoSeriesYSubseries = (id_ccd: string): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    // //  console.log('')('🚀 file: seriesThunks.ts ~ line 78 ~ return ~ data');
    try {
      const { data } = await api.get(
        `gestor/ccd/catalogo/serie-subserie/get-by-id-ccd/${id_ccd}/`
      );
      // //  console.log('')('🚀 file: seriesThunks.ts ~ get_series_service', data);
      // //  console.log('')('🚀 file: seriesThunks.ts ~ get_series_service', data);
      dispatch(setUserSeriesAndSubseries(data.data));
      //  ? control_success(data.detail);
      return data;
    } catch (error: any) {
      // control_error(error.response.data.detail || 'Ha ocurrido un error');
      return error as AxiosError;
    }
  };
};

export const delete_independiente_serie_service: any = (
  id_catalogo_serie: any,
  ccd_current: any
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      /* //  console.log('')(
        '🚀 ~ file: seriesThunks.ts ~ return series independientes borradas',
        id_catalogo_serie
      ); */
      const { data } = await api.delete(
        `gestor/ccd/catalogo/serie-subserie/delete/${id_catalogo_serie}`
        // `gestor/ccd/catalogo/serie-subserie/delete/${id_serie_doc}/`
      );
     /* //  console.log('')(
        '🚀 ~ file: seriesThunks.ts ~ return series independientes borradas',
        data
      ); */
      dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
      control_success(data.detail);
      /* //  console.log('')(
        '🚀 ~ file: seriesThunks.ts ~ return series independientes borradas',
        data
      ); */

      // dispatch(setUserSeriesAndSubseries(data.data));

      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
