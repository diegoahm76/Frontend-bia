/* eslint-disable @typescript-eslint/naming-convention */
// ! get series documentales relacionadas a la unidad organizacional seleccionada en el organigrama - ccd

import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../../helpers";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";
import { getSeriesSubseriesInterface } from "./types/thunks";

export const getSeriesSubseries = async (
  {
    idUnidadOrganizacional,
    idCcd,
    setLoadingSeriesSubseries
  }: getSeriesSubseriesInterface
): Promise<any> => {
  try {
    setLoadingSeriesSubseries(true);
    const url = `gestor/permisos/serie-subserie-unidad-ccd/get/?id_ccd=${idCcd}&id_unidad_organizacional=${idUnidadOrganizacional}`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success('Se encontraron las siguientes series/subseries documentales');
      //  console.log('')(data?.data);
      return data?.data;
    } else {
      control_warning('No se encontraron series/subseries documentales');
      //  console.log('')('no se encontraron series documentales');
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    //  console.log('')(error);
  } finally {
    setLoadingSeriesSubseries(false);
  }
};