import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../../helpers";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const get_restricciones_series_documentales = async (
  id_cat_serie_und: number,
  setLoadingRestricciones: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<any> => {
  try {
    setLoadingRestricciones(true);
    const url = `gestor/permisos/restricciones/get/?id_serie_documental=${id_cat_serie_und}`;
    const { data } = await api.get(url);
    if (data?.success) {
      control_success('Se encontraron restricciones');
      console.log(data?.data);
      return data?.data;
    } else {
      control_warning('Hubo un error al obtener las restricciones');
      // return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail || 'Hubo un error al obtener las restricciones');
    console.log(error);
  } finally {
    setLoadingRestricciones(false);
  }
}