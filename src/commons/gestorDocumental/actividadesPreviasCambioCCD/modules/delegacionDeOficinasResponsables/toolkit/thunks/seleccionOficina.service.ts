import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
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

    // ? parseo de la response 1 de la url de oficinas de la unidad actual
    const { data: { data = {} } = {} } = response1;
    const {
      id_unidad_organizacional,
      codigo,
      nombre,
      oficinas: oficinasUnidadActual,
    } = data;

    // ? parseo de la response 2 de la url de oficinas de la unidad nueva
    const { data: { data: data2 = {} } = {} } = response2;
    const {
      id_unidad_organizacional: id_unidad_organizacional2,
      codigo: codigo2,
      nombre: nombre2,
      oficinas: oficinasUnidadNueva,
    } = data2;


    if (data?.oficinas?.length > 0) {
      const newData = {
        //* oficinas de la unidad actual
        oficinasActuales: oficinasUnidadActual || [],
        //* ofiiicnas de la unidad nueva resp
        oficinasNuevas: oficinasUnidadNueva || [],

        //* unidad nueva
        unidadActual: [
          {
            actual: true,
            id_unidad_organizacional,
            codigo,
            nombre,
          },
        ],
        //* unidad Nueva
        unidadNueva: [
          {
            actual: true,
            id_unidad_organizacional: id_unidad_organizacional2,
            codigo: codigo2,
            nombre: nombre2,
          },
        ],
      };

      console.log('newData', newData);
      /*control_success(
        'Se obtuvieron las oficinas de la unidad organizacional actual'
      );

      console.log('se trae la data de las oficinas del nuevo ccd');
      console.log(response2.data);*/

      return newData;
    }

    /*  await Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: 'No se encontraron oficinas disponibles en la unidad organizacional actual, no podrás delegar oficinas, por favor selecciona otra unidad organizacional',
    });*/

    // return [[], response2.data];
  } catch (error) {
    console.log(error);
    control_error('Ha ocurrido un error al obtener las oficinas');
    return [];
  } finally {
    setLoading?.(false);
  }
};
