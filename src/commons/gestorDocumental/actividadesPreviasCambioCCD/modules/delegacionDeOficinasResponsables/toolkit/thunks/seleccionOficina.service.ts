/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import { parseResponse } from '../../func/parseResponse';

export const getOficinas = async ({
  idUnidadOrganizacionalActual,
  idCcdNuevo,
  idUnidadNueva,
  setLoading,
}: {
  idUnidadOrganizacionalActual: number;
  idCcdNuevo: number;
  idUnidadNueva: number;
  setLoading?: (loading: boolean) => void;
}): Promise<any> => {
  setLoading?.(true);
  try {
    const url1 = `gestor/ccd/get-oficinas-unidad-actual/get/${idUnidadOrganizacionalActual}`;
    const url2 = `gestor/ccd/get-oficinas-unidad-nueva/get/?id_ccd_nuevo=${idCcdNuevo}&id_unidad_nueva=${idUnidadNueva}`;

    const [response1, response2] = await Promise.all([
      api.get(url1),
      api.get(url2),
    ]);

    const data1 = parseResponse(response1, 'oficinasActuales', 'unidadActual') as any;
    const data2 = parseResponse(response2, 'oficinasNuevas', 'unidadNueva') as any;

    console.log('data1', data1);
    console.log('data2', data2);

    if (data1.oficinasActuales.length > 0 && data2.oficinasNuevas.length > 0) {
      const newData = {
        ...data1,
        ...data2,
      };

      console.log('newData', newData);

      control_success(
        'Se obtuvieron las oficinas de la unidad organizacional actual'
      );
      return newData;
    }

    await Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: 'No se encontraron oficinas disponibles en la unidad organizacional actual, no podrás delegar oficinas, por favor selecciona otra unidad organizacional',
    });

    return [];
  } catch (error) {
    control_error('Ha ocurrido un error al obtener las oficinas');
    throw error;
  } finally {
    setLoading?.(false);
  }
};
