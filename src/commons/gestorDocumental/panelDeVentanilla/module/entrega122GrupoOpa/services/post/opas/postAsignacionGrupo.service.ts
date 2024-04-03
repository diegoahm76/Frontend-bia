/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../../helpers';

/*{

  "id_pqrsdf":27,
  "id_persona_asignada":218,
  "id_und_org_seccion_asignada":5248
}*/
export const postAsignacionGrupoOpas = async (
  data: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    // gestor/panel_ventanilla/opas/asignacion/create/
    const url = `gestor/panel_ventanilla/opas/asignacion/create/`;
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
