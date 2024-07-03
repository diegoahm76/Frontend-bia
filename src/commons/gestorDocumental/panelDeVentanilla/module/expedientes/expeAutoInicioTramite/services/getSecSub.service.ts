import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getSecSubAsiGrupo = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: any
) => {
  try {
    setLoading(true);
    const url = 'gestor/panel_ventanilla/asignar-tramites/seccion-subseccion/get/';
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
      control_success('Unidades organizacionales cargadas');
      return dataToReturn;
    }

    void Swal.fire({
      icon: 'warning',
      title: 'NO SE PUEDE USAR ESTE MÓDULO',
      text: 'El organigrama actual no tiene unidades organizacionales activas',
      showCloseButton: false,
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: 'Volver a panel de ventanilla',
      confirmButtonColor: '#042F4A',
      allowEscapeKey: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate('/app/gestor_documental/panel_ventanilla/');
      }
    });

    return [];
  } catch (error: any) {
    control_error(error?.response?.data?.detail ?? 'Error desconocido')
    return [];
  } finally {
    setLoading(false);
  }
};
