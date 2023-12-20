import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getInfoDenuncia = async (
  idBusqueda: string,
  handleGeneralLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/denuncias/get/${idBusqueda}`;
    const { data } = await api.get(url);
    control_success('Se encontraron los siguientes registros de la denuncia');
    return data?.data[0];
  } catch (error: any) {
    handleGeneralLoading(false);
    showAlert(
      'Opss...',
      error?.response?.data?.detail ||
        'Ha ocurrido un error al obtener la información de la denuncia',
      'error'
    );
  }
};
