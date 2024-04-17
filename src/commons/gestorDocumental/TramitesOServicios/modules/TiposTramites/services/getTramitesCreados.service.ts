import { api } from "../../../../../../api/axios";
import { control_success } from "../../../../../../helpers";
import { handleApiError } from "../../../../../../utils/functions/errorManage";
import { control_warning } from "../../../../../almacen/configuracion/store/thunks/BodegaThunks";

/* eslint-disable @typescript-eslint/naming-convention */
export const getTramitesCreados = async (
  nombre = '',
  tiene_pago: any,
  cod_tipo_permiso_ambiental = '',
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const url = `tramites/tipos/filter/get/?nombre=${nombre}&tiene_pago=${tiene_pago}&cod_tipo_permiso_ambiental=${cod_tipo_permiso_ambiental}`;
    const { data } = await api.get(url);
    console.log(data);
    
    if(data?.data?.length === 0) {
      control_warning(data?.detail);
      return [];
    }
    control_success(data?.detail);
    return data?.data;

  } catch (err) {
    handleApiError(err)
  } finally {
    setLoading(false);
  }
};
