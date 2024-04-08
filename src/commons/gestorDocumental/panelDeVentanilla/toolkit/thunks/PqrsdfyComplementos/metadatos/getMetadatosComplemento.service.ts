/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

export const getMetadatoComplemento = async (
  id_anexo: number,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    //gestor/panel_ventanilla/pqrsdf/anexo-documento/meta-data/get/4/
    handleOpenInfoMetadatos!(true);
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/meta-data/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Metadatos del archivo obtenidos con éxito');
    //  console.log('')(data?.data);
    return data?.data;
  } catch (err) {
    handleOpenInfoMetadatos!(false);
    control_error('No hay metadata para este archivo');
  }
};
