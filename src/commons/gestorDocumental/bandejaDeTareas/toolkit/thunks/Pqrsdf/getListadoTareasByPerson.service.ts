import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getListadoTareasByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    //* tambien recibirá otros filtros para la búsqueda pero ya se hará en el backend y la url se modificará
    const url = `gestor/bandeja-tareas/tareas-asignadas/get-by-persona/${idPersona}/`;
    const { data } = await api.get(url);

    if (data && data?.data?.length) {
      control_success(`${data?.detail} de tareas asignadas`);
      return data.data;
    }

    showAlert(
      'Opps...',
      'No se encontraron tareas asignadas para este usuario',
      'warning'
    );

    return [];
  } catch (error) {
    showAlert(
      'Opps...',
      'Ha ocurrido un error al buscar las tareas y/o no hay tareas asignadas a este usuario',
      'error'
    );
    return [];
  } finally {
    setLoading(false);
  }
};
