import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const getSubGrupoAsiGrupo = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  idUnidadOrg: number
) => {
  try {
    setLoading(true);
    //gestor/panel_ventanilla/asginar-opas/seccion-subseccion-grupos/5809/
    const url = `gestor/panel_ventanilla/asginar-opas/seccion-subseccion-grupos/${idUnidadOrg}/`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      const dataToReturn = data.data.map(
        (unidad: {
          nombre_unidad: string;
          id_unidad_organizacional: number;
        }) => {
          return {
            label: unidad?.nombre_unidad,
            value: unidad?.id_unidad_organizacional,
          };
        }
      );
      //  console.log('')(dataToReturn);
      control_success('Unidades para asignar cargadas');
      return dataToReturn;
    }
    control_warning('No hay datos para mostrar');
    return [];
  } catch (error: any) {
    //  console.log('')(error);
    control_error(error?.response?.data?.detail ?? 'Error desconocido');
    return [];
  } finally {
    setLoading(false);
  }
};
