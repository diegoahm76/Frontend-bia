import { api } from '../../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../../helpers';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getArchivoAnexoPqrsdf = async (
  id_anexo: any,
  handleOpenArchivoAnexo?: React.Dispatch<React.SetStateAction<boolean>>,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    // 9
    handleOpenArchivoAnexo?.(true);
    handleOpenInfoMetadatos?.(false);
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Archivo obtenido con éxito')
    //  console.log('')(data?.data);
    return data?.data;
  } catch (err: any) {
    handleOpenArchivoAnexo?.(false);
    handleOpenInfoMetadatos?.(false);
    control_error('No hay archivos para este anexo');
  }
};

export const getArchivoAnexoComplementoOpa = async (
  id_anexo: any,
  handleOpenArchivoAnexo?: React.Dispatch<React.SetStateAction<boolean>>,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    // 9
    handleOpenArchivoAnexo?.(true);
    handleOpenInfoMetadatos?.(false);
    const url = `gestor/panel_ventanilla/anexo-documento/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Archivo obtenido con éxito')
    //  console.log('')(data?.data);
    return data?.data;
  } catch (err: any) {
    handleOpenArchivoAnexo?.(false);
    handleOpenInfoMetadatos?.(false);
    control_error('No hay archivos para este anexo');
  }
};

export const getAnexosComplementoOpa = async (id_respuesta_requerimiento: any) => {
  try {
    const url = `gestor/panel_ventanilla/opas/respuesta/anexo/get/${id_respuesta_requerimiento}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos del complemento de OPA correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para el complemento de OPA.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para el complemento de OPA.',
      'error'
    );
    return [];
  }
};
