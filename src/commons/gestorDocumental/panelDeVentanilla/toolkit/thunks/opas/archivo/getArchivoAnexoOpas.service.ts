/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";

export const getArchivoAnexoOpa = async (
  id_anexo: any,
): Promise<any> => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Archivo obtenido con éxito')
    return data?.data;
  } catch (err: any) {
    control_error('No hay archivos para este anexo');
  }
};
