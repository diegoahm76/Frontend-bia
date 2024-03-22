/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { handleApiError } from '../../../../../../../utils/functions/errorManage';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const getPersonasService = async (params: any) => {
  // personas/get-personas-filters/?tipo_documento=CC&numero_documento=&primer_nombre=&primer_apellido=&razon_social=&nombre_comercial=
  try {
    const queryParams = new URLSearchParams({
      tipo_documento: params?.tipo_documento ?? '',
      numero_documento: params?.numero_documento ?? '',
      primer_nombre: params?.primer_nombre ?? '',
      primer_apellido: params?.primer_apellido ?? '',
      razon_social: params?.razon_social ?? '',
      nombre_comercial: params?.nombre_comercial ?? '',
    });

    console.log('queryParams', queryParams.toString());

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
  }
};
