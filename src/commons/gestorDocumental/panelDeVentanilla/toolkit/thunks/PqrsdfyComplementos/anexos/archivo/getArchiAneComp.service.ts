import { api } from '../../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getArchivoAnexoComplemento = async (
  id_anexo: any,
  handleOpenArchivoAnexo?: React.Dispatch<React.SetStateAction<boolean>>,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    // gestor/panel_ventanilla/complemento-pqrsdf/anexo-documento/get/4/

    handleOpenArchivoAnexo?.(true);
    handleOpenInfoMetadatos?.(false);
    const url = `gestor/panel_ventanilla/complemento-pqrsdf/anexo-documento/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Archivo obtenido con éxito');
    //  console.log('')(data.data);
    return data?.data;
  } catch (err: any) {
    handleOpenArchivoAnexo?.(false);
    handleOpenInfoMetadatos?.(false);
    control_error('No existen archivos para este anexo');
  }
};
