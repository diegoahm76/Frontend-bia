import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";

/* eslint-disable @typescript-eslint/naming-convention */
export const getArchivoAnexoTramite = async (
  idAnexo: string,
): Promise<any> => {
  if (!idAnexo) {
    console.error('Debes seleccionar un anexo para obtener el archivo.');
    return;
  }
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/get/${idAnexo}/`;
    const { data } = await api.get(url);

    if (!data) {
      console.error('No se recibieron datos');
      return;
    }

    control_success('Archivo obtenido con éxito');
    return data.data;
  } catch (err: any) {
    control_error('No hay archivos para este anexo');
  }
};