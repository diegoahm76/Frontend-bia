/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { handleApiError } from '../../../../utils/functions/errorManage';
import { ApexOptions } from 'apexcharts';
import { api } from '../../../../api/axios';
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';
import { control_success } from '../../../../helpers';

export const fetchChartData = async (
  setChartData: React.Dispatch<
    React.SetStateAction<any>
  >,
  urlApi: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsReportReady: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!setChartData || !urlApi || !setLoading) {
    control_warning('Los parámetros no son válidos');
  }

  try {
    setLoading(true);
    const { data } = await api.get(urlApi);
    console.log('soy la data de la API', data)

    if (!Array?.isArray(data?.data?.series) || !Array.isArray(data?.data?.categories)) {
      control_warning('Los datos no son válidos');
      return [];
    }

    data?.series?.forEach((item: any) => {
      if (!item.name || !Array.isArray(item.data)) {
        control_warning('Los recibidos no son válidos, por favor revisar la estructura de los datos e intente de nuevo');
      }
    });


    if(!data?.data?.series?.length || !data?.data?.categories?.length || !data?.success) {
      setIsReportReady(false);
      control_warning('Ha ocurrido un error al cargar los datos (posiblemente no hay datos para cargar), por favor intente de nuevo o contacte al administrador del sistema.');
      return setChartData((prevState: any) => ({
        ...prevState ?? {},
        series: [],
        options: {
          ...prevState.options ?? {},
          xaxis: {
            ...prevState.options.xaxis ?? {},
            categories: [],
          },
        },
      }));

    }

    setIsReportReady(true);
    setChartData((prevState: any) => ({
      ...prevState ?? {},
      series: data?.data?.series ?? [],
      options: {
        ...prevState.options ?? {},
        xaxis: {
          ...prevState.options.xaxis ?? {},
          categories: data?.data?.categories ?? [],
        },
      },
    }));
    control_success('Indicador gerencial cargado correctamente');
  } catch (error) {
    handleApiError(error);
  } finally {
    setLoading(false);
  }
};
