/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../../../helpers";

export const getMetadatosOtro = async (
  id_anexo: number,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    handleOpenInfoMetadatos?.(true);
    const url = `gestor/bandeja-tareas/otros/anexo/metadatos/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Metadatos del archivo obtenidos con éxito');
    return data?.data;
  } catch (err: any) {
    handleOpenInfoMetadatos?.(false);
    control_error('No hay metadata para este archivo');
  }
};
