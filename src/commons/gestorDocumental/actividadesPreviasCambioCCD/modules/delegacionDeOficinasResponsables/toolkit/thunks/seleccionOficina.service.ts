import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getOficinasUnidadSeleccionada = async (
  idUnidadOrganizacionalActual: number,
  setLoading?: (loading: boolean) => void
): Promise<any> => {
  setLoading?.(true);
  try {
    const url = `gestor/ccd/get-oficinas-unidad-actual/get/${idUnidadOrganizacionalActual}`;
    const { data: { data = {} } = {} } = await api.get(url);

    const { id_unidad_organizacional, codigo, nombre, ...rest } = data;

    if (data?.oficinas?.length > 0) {
      const newData = {
        ...rest,
        unidadActual: [
          {
            actual: true,
            id_unidad_organizacional,
            codigo,
            nombre,
          },
        ],
      };

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
    console.log(error);
    control_error('Ha ocurrido un error al obtener las oficinas');
    return [];
  } finally {
    setLoading?.(false);
  }
};
// ? aún se debe revisar de manera detallada este servicio ya que se deben realizar las respectivas validaciones
/*export const getOficinasDeNuevoCcd = async () => {
  try{
    const url = ''
    const { data: { data = {} } = {} } = await api.get(url)
    console.log(response)
  }
  catch(error){
    console.log(error)
  }
  finally{
    //* se debe poner el respectivo loading, pero se debe avisar en caso de que no haya oficinas disponibles en el nuevo ccd ya que no tendría sentido usar el servicios respectivo
  }
}*/
