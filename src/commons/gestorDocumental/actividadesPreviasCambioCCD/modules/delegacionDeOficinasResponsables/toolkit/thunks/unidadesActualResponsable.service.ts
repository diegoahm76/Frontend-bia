import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getUnidadesResponsablesActual = async ({
  idCcdSeleccionado,
}: // setLoading,
{
  idCcdSeleccionado: number;
  // setLoading: (loading: boolean) => void;
}) => {
  //* no olvidar añadirel respectivo loading
  try {
    const url = `gestor/ccd/get-unidades-actual-responsable-ccd/get/${idCcdSeleccionado}/`;
    const { data } = await api.get(url);

    if (!data?.success)
      throw new Error(
        'Ha ocurrido un error al obtener las unidades responsables, se proceder a reiniciar el módulo'
      );

    if (data?.data?.length === 0) {
      control_error(
        'No se encontraron unidades responsables para el CCD seleccionado'
      );
      return [];
    }

    control_success(
      'Se encontraron unidades responsables para el CCD seleccionado'
    );
    return data?.data;
  } catch (err: any) {
    control_error(err.message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    return [];
  } finally {
    //* debe ir el loading
  }
};
