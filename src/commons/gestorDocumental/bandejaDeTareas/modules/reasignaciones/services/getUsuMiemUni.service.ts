import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const getUsuariosMiembrosDeUnidad = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  idUnidadOrg: number
) => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/unidad-organizacional/personas/get/${idUnidadOrg}/`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      const dataToReturn = data.data.map(
        (unidad: {
          nombre_completo: string;
          id_persona: number;
          cargo: string;
        }) => {
          return {
            unidad,
            label: `${unidad?.nombre_completo ?? 'NN'} - ${unidad?.cargo ?? 'Sin cargo'}`,
            value: unidad?.id_persona,
          };
        }
      );
      control_success('Unidades para asignar cargadas');
      return dataToReturn;
    }
   control_warning('No hay usuarios para asignar que pertenezcan a la unidad seleccionada');
    return [];
  } catch (error: any) {
    control_error(error?.response?.data?.detail ?? 'Ha ocurrido un error desconocido, por favor intente nuevamente');
    return [];
  } finally {
    setLoading(false);
  }
};
