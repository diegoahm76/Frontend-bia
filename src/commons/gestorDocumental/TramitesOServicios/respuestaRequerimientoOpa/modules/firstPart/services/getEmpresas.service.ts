/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../../../api/axios";
import { control_success } from "../../../../../../../helpers";
import { handleApiError } from "../../../../../../../utils/functions/errorManage";
import { control_warning } from "../../../../../../almacen/configuracion/store/thunks/BodegaThunks";

interface Params {
  numero_documento?: string;
  razon_social?: string;
  nombre_comercial?: string;
}

export const getPersonasJuridicaService = async (
  params: Params,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const {
    numero_documento = '',
    razon_social = '',
    nombre_comercial = '',
  } = params;

  try {
    setLoading(true);

    const queryParams = new URLSearchParams({
      tipo_persona: 'J',
      numero_documento,
      razon_social,
      nombre_comercial,
    });

    const url = `personas/get-empresas-filters/?${queryParams.toString()}`;
    const { data } = await api.get(url);

    if (data?.data) {
      control_success(data?.detail || 'Personas encontradas');
      return data.data;
    }

    control_warning(
      'No se encontraron personas que coincidan con los filtros seleccionados.'
    );
    return [];
  } catch (error) {
    handleApiError(error);
  } finally {
    setLoading(false);
  }
};