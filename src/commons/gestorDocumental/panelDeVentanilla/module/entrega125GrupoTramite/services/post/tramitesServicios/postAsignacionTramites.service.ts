/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../../helpers';

export const postAsignacionTramiteGrupo = async (
  data: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/panel_ventanilla/asignar-tramites/asignacion/create/`;
    const response = await api.post(url, data);
    control_success('Asignación realizada');
    console.log('response', response);
    return response;
  } catch (error) {
    control_error('Error al realizar la asignación, intente nuevamente.');
    return null;
  } finally {
    setLoading(false);
  }
};
