/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { type AxiosError, type AxiosResponse } from 'axios';
import { api } from "../../../../../../api/axios";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks";
import { setUserSeriesAndSubseries } from "../slice/CatalogoSeriesYSubseriesSlice";
import { type Dispatch } from 'react';

export const getCatalogoSeriesYSubseries = (id_ccd: string): any => {

  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    console.log('🚀 file: seriesThunks.ts ~ line 78 ~ return ~ data');
    try {
      const { data } = await api.get(
        `gestor/ccd/catalogo/serie-subserie/get-by-id-ccd/${id_ccd}/`
      );
      console.log('🚀 file: seriesThunks.ts ~ get_series_service', data);
      dispatch(setUserSeriesAndSubseries(data.data));
      //  ? control_success(data.detail);
      return data;
    } catch (error: any) {
      // ? await notification_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
}
