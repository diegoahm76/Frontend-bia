import { api } from "../../../../api/axios";
import { handleApiError } from "../../../../utils/functions/errorManage";
import { control_warning } from "../../../almacen/configuracion/store/thunks/BodegaThunks";

/* eslint-disable @typescript-eslint/naming-convention */
export const getSeriesByIdUnidad = async (idUnidad:number): Promise<any> => {
  try{

    const url = `gestor/reporte_indices_archivos_carpetas/catalogos/get/${idUnidad}/`
    const {data} = await api.get(url);


    if(!Array.isArray(data?.data) || !data?.succes) {
      control_warning('Ha ocurrido un error al cargar los datos y/o no se han encontrado datos, por favor intente de nuevo o contacte al administrador del sistema.');
      return [];
    }

    return data?.data?.map((item: any) => ({
      value: item.id_cat_serie_und,
      label: `${item.cod_serie_doc} - ${item.nombre_serie_doc} / ${item.cod_subserie_doc ?? 'N/A'} - ${item?.nombre_subserie_doc ?? 'N/A'}`,
    }));

  }
  catch (error) {
    handleApiError(error);
  }
  finally {}
}