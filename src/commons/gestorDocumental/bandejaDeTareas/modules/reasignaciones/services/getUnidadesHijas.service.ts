import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getUnidadesHijasById = async (
  idUnidadOrganizacional: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: any,
) => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/unidad-organizacional/hijas/get/${idUnidadOrganizacional}/`;
    const { data } = await api.get(url);
    console.log(data);

if (data?.data?.length > 0) {
      const dataToReturn = data.data.map(
        (unidad: {
          nombre: string;
          id_unidad_organizacional: number;
          codigo: string;
          agrupacion_documental: string | null;
        }) => {
          return {
            unidad,
            label: `${unidad?.codigo} - ${unidad?.nombre} - ${unidad?.agrupacion_documental ?? 'Sin agrupación documental'} `,
            value: unidad?.id_unidad_organizacional,
          };
        }
      );
      control_success('Se han cargado las unidades organizacionales correctamente');
      return dataToReturn;
    }

  await Swal.fire({
      icon: 'warning',
      title: 'NO SE PUEDE USAR ESTE MÓDULO',
      text: 'No hay unidades disponibles para realizar la reasignación de la tarea.',
      showCloseButton: false,
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: 'Volver a panel de ventanilla',
      confirmButtonColor: '#042F4A',
      allowEscapeKey: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate('/app/gestor_documental/bandeja_tareas/');
      }
    });

    return [];
  } catch (error: any) {
    control_error(error?.response?.data?.detail ?? 'Ha ocurrido un error, por favor intenta de nuevo')
    return [];
  } finally {
    setLoading(false);
  }
};
