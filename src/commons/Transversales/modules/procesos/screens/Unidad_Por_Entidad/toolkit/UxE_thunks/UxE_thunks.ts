/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { api } from '../../../../../../../../api/axios';

// ! ----- consulta de tabla temporal que es usada para manejar los datos de la tabla de la pantalla -- //
export const consultarTablaTemporal = async (setLoading: any): Promise<any> => {
  // setLoading(true);
  try {
    const url = `transversal/organigrama/listado-registro-temporal/`;
    const { data } = await api.get(url);
    console.log(data);
    //* revisar ese data.data luego, ya que cuando si existen registros retorna una lista y otros valores muy útiles, pero cuando no, retorna un objeto con un mensaje
    return {
      data: data?.data,
      success: data?.success,
      detail: data?.detail
    };
  } catch (error: any) {
    // control_warning('No hay datos para mostrar');
    // setLoading(false);
    return {
      data: [],
      success: false,
      detail: error?.response?.data?.detail
    };
  } finally {
    // setLoading(false);
  }
};

// ? -- consulta del organigrama actual -- //
export const get_organigrama_acual = async (navigate: any): Promise<any> => {
  try {
    const url = `transversal/organigrama/get/`;
    const { data } = await api.get(url);
    const dataToReturn = data.Organigramas.filter((el: any) => el.actual);

    if (dataToReturn.length === 0) {
      void Swal.fire({
        icon: 'warning',
        title: 'NO HAY ORGANIGRAMA ACTUAL',
        text: 'Porfavor seleccione uno para usar ésta opción de este módulo',
        showCloseButton: false,
        allowOutsideClick: false,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText: 'Ir a seleccionar organigrama',
        confirmButtonColor: '#042F4A',

        allowEscapeKey: false
      }).then((result: any) => {
        if (result.isConfirmed) {
          console.log('ir a crear organigrama');
          navigate('/app/gestor_documental/organigrama/crear');
        } else {
          window.location.reload();
        }
      });
    }

    return dataToReturn;
  } catch (error: any) {
    console.log(error);
  }
};

export const getOrganigramasDispobibles = async (): Promise<any> => {
  try {
    const url = `transversal/organigrama/get-terminados/`;
    const { data } = await api.get(url);
    console.log(data);
    const dataToReturn = data.filter(
      (el: any) => el.fecha_terminado && !el.fecha_retiro_produccion
    );
    return dataToReturn;
  } catch (error: any) {
    console.log(error);
  }
};
