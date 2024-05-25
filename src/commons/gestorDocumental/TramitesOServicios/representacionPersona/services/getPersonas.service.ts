/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../api/axios";
import { control_success } from "../../../../../helpers";
import { handleApiError } from "../../../../../utils/functions/errorManage";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";

interface Params {
  tipo_documento?: string;
  numero_documento?: string;
  primer_nombre?: string;
  primer_apellido?: string;
  razon_social?: string;
  nombre_comercial?: string;
}

export const getPersonasService = async (
  params: Params,
  handleOpenModalNuevoNumero2: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const {
    tipo_documento = '',
    numero_documento = '',
    primer_nombre = '',
    primer_apellido = '',
    razon_social = '',
    nombre_comercial = '',
  } = params;

  try {
    handleOpenModalNuevoNumero2(true);

    const queryParams = new URLSearchParams({
      tipo_documento,
      numero_documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    });

    const url = `/personas/get-personas-filters/?${queryParams.toString()}`;
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
    handleOpenModalNuevoNumero2(false);
  }
};