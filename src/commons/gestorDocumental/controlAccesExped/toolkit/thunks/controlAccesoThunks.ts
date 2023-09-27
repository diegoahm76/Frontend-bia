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


  // ? ----  PUT CONTROL DE ACCESO DE EXPEDIENTES -----
  export const putControlAccesoExpedientes = async ({
    setLoading,
    data = {},
  }: any) => {
    try {
      setLoading(true)
      const url = `gestor/ctrl-acceso/put/`;
      const { data: response } = await api.put(url, data);
      if (response?.status === 200) {
        control_success(response?.detail || 'Se actualizó el control de acceso de expedientes');
      } else {
        control_warning('Hubo un error al actualizar el control de acceso de expedientes');
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'Hubo un error al actualizar el control de acceso de expedientes');
    }finally
    {
      setLoading(false)
    }
  }


/*  {
    "id_ccd": 31,
    "cod_clasificacion_exp": "C",
    "id_cat_serie_und_org_ccd": null,
    "entidad_entera_consultar": true,
    "entidad_entera_descargar": true,
    "seccion_actual_respon_serie_doc_consultar": false,
    "seccion_actual_respon_serie_doc_descargar": false,
    "seccion_raiz_organi_actual_consultar": false,
    "seccion_raiz_organi_actual_descargar": false,
    "secciones_actuales_mismo_o_sup_nivel_respon_consulta": false,
    "secciones_actuales_mismo_o_sup_nivel_respon_descargar": false,
    "secciones_actuales_inf_nivel_respon_consultar": false,
    "secciones_actuales_inf_nivel_respon_descargar": false,
    "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar": false,
    "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar": false,
    "unds_org_sec_respon_inf_nivel_resp_exp_consultar": false,
    "unds_org_sec_respon_inf_nivel_resp_exp_descargar": false
} */