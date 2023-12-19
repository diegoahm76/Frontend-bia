/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../api/axios';
import { control_success } from '../../../../../helpers';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';

// gestor/expedientes-archivos/expedientes/indice-electronico/1/
export const getIndiceElectronicoByExp = async (idExpediente: number) => {
  try {
    const url = `gestor/expedientes-archivos/expedientes/indice-electronico/${idExpediente}/`;
    const { data } = await api.get(url);

    const dataToReturn = [
      data?.data.indice_electronico_exp,
      ...data?.data.documentos,
    ];


    if (dataToReturn.length > 0) {
      control_success('Índice electrónico cargado correctamente');
      return {
        data: dataToReturn,
        dataIndice: [data?.data?.indice_electronico_exp],
      };
    }

    control_success('No se encontraron datos');
    return [];
  } catch (error) {
    showAlert('Opps..', 'No se pudo cargar el índice eletrónico', 'error');
    return [];
  } finally {
    // return [];
  }
};
