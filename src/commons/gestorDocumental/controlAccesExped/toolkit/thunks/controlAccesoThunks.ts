/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../../helpers";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const getControlAccesoExpedientes =  async ({
  setLoading,
  idCcd = '',
  codClasificacionExp = '',
  idCatSerieUnidad = '',
}: any) => {
    try {
      setLoading(true)
      const url = `gestor/ctrl-acceso/get/?id_ccd=${idCcd}&cod_clasificacion_exp=${codClasificacionExp}&id_cat_serie_und=${idCatSerieUnidad}`;
      const { data } = await api.get(url);
      if (data?.data?.length > 0) {
        control_success(
          'Se encontraron los siguientes controles de acceso a expedientes' || data?.detail
        );
        return data?.data;
      } else {
        control_warning('No se encontró control de acceso configurado');
        return [];
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail);
    }finally
    {
      setLoading(false)
    }
  }
