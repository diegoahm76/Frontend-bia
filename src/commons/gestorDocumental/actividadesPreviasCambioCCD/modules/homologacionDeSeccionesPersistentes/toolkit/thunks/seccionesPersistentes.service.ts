/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

const HOMOLOGACION_UNIDADES_URL = (idCcdNuevo: number) =>
  `gestor/ccd/get-homologacion-ccd/${idCcdNuevo}`;
const ERROR_MESSAGE = 'Ha ocurrido un error al obtener los datos';

export const fnGetHomologacionUnidades = async (
  idCcdNuevo: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  reset_states: () => void
): Promise<any> => {
  try {
    setLoading(true);
    const url = HOMOLOGACION_UNIDADES_URL(idCcdNuevo);
    const { data } = await api.get(url);

    if (data?.success) {
      control_success(data?.detail);
      //  console.log('')(data.data);

      //* la validacion debe hacerse si tanto unidades conincidentes como unidades persistentes estan vacias, caso contrario la validación no se debe hacer ya que genera traumatismo en el desaarrollo y uso del módulo
      /* if (data.data?.coincidencias?.length === 0) {
        await Swal.fire({
          icon: 'warning',
          title: '¡ATENCIÓN!',
          text: 'No hay unidades coincidentes en este CCD, seleccione un CCD diferente para continuar',
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        reset_states();
        return;
      }*/

      return data?.data;
    }

    control_error(ERROR_MESSAGE);
    return {
      coincidencias: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail || ERROR_MESSAGE);
    return {
      coincidencias: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } finally {
    setLoading(false);
  }
};
export const fnGetUnidadesPersistentes = async (
  idCcdNuevo: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/ccd/persistencia-unidades-ccd/get/${idCcdNuevo}`;
    const { data } = await api.get(url);
    //  console.log('')(data);

    if (data.success) {
      control_success(data.detail);
      return data?.data;
    }

    control_error('Error al obtener las unidades persistentes');
    return {
      unidades_persistentes: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail || ERROR_MESSAGE);
    return {
      unidades_persistentes: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } finally {
    setLoading(false);
  }
};
