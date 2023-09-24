/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../../helpers";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const getControlAccesoExpedientes =  async ({
  idCcd = '',
  idUnidadOrganizacional = '',
  idSerieSubserie = '',
}) => {
    try {
      const url = `gestor/ctrl-acceso/get/?id_ccd=${idCcd}&cod_clasificacion_exp=&id_cat_serie_und=${idSerieSubserie}`;
      const { data } = await api.get(url);
      if (data?.data?.length > 0) {
        control_success(
          'Se encontraron los siguientes controles de acceso a expedientes' || data?.detail
        );
        return data?.data;
      } else {
        control_warning('No se encontraron expedientes');
        return [];
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail);
    }
  }
