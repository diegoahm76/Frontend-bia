/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

export const busquedaAvanzadaPersona = async ({
  setLoading,
  tipo_documento,
  numero_documento,
  primer_nombre,
  primer_apellido,
  razon_social,
  nombre_comercial,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tipo_documento?: string;
  numero_documento?: string;
  primer_nombre?: string;
  primer_apellido?: string;
  razon_social?: string;
  nombre_comercial?: string;
}): Promise<any> => {
  setLoading(true);
  try {
    const { data } = await api.get(
      `personas/get-personas-filters/?tipo_documento=${
        tipo_documento ?? ''
      }&numero_documento=${numero_documento ?? ''}&primer_nombre=${
        primer_nombre ?? ''
      }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
        razon_social ?? ''
      }&nombre_comercial=${nombre_comercial ?? ''}`
    );

    data.data.length === 0 &&
      showAlert(
        'Opps!',
        'No se encontraron resultados para la búsqueda realizada',
        'warning'
      );

    return data?.data || [];
  } catch (error) {
    showAlert(
      'Opps!',
      'Ocurrió un error al buscar la persona, intente de nuevo porfavor',
      'error'
    );
    throw error;
  } finally {
    setLoading(false);
  }
};
