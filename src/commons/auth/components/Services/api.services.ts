import { control_error } from '../../../../helpers';
import { consultar_datos_persona } from '../../../seguridad/request/Request';

export const get_datos_representante_legal = async (
  id_persona: number,
  set_state: any
): Promise<void> => {
  try {
    const response = await consultar_datos_persona(id_persona);
    set_state(response);
  } catch (err) {
    control_error(err);
  }
};
