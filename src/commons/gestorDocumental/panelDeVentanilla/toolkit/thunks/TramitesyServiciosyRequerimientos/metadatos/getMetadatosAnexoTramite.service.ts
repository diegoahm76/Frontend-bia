/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";

export const getMetadatosArchivoTramite = async (
  id_anexo: number,
): Promise<any> => {
  if (typeof id_anexo !== 'number') {
    console.error('id_anexo debe ser un número');
    return;
  }

  try {
    const url = `gestor/panel_ventanilla/opas/anexo-documento/meta-data/get/${id_anexo}/`;
    const { data } = await api.get(url);

    if (!data) {
      control_error('No se recibieron datos');
      return;
    }

    control_success('Metadatos del archivo obtenidos con éxito');
    return data.data;
  } catch (err: any) {
    control_error('No hay metadata para este archivo');
  }
};