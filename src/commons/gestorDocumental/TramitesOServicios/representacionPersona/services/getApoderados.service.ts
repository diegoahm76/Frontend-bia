/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../api/axios";
import { control_success } from "../../../../../helpers";
import { handleApiError } from "../../../../../utils/functions/errorManage";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const getAttorneys = async (id: string | number): Promise<any> => {
  try {
    const { data } = await api.get(`personas/apoderados-personas/get-list/${id}/`);

    if (data?.data) {
      control_success('Se han encontrado los siguientes apoderados');
      return data.data;
    }

    control_warning('No se encontraron apoderados para la persona seleccionada');
    return [];
  } catch (error: any) {
    handleApiError(error, '0 apoderados para la persona seleccionada');
    return [];
  }
};