import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";

/* eslint-disable @typescript-eslint/naming-convention */
export const getArchivoAnexoTramite = async (
  idAnexo: string,
  handleOpenArchivoAnexo?: React.Dispatch<React.SetStateAction<boolean>>,
  handleOpenInfoMetadatos?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  if (!idAnexo) {
    console.error('Debes seleccionar un anexo para obtener el archivo.');
    return;
  }
  try {
    handleOpenArchivoAnexo?.(true);
    handleOpenInfoMetadatos?.(false);
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/complemento/documento/digital/get/${idAnexo}/`;
    const { data } = await api.get(url);

    if (!data) {
      console.error('No se recibieron datos');
      return;
    }

    control_success('Archivo obtenido con éxito');
    return data.data;
  } catch (err: any) {
    handleOpenArchivoAnexo?.(false);
    handleOpenInfoMetadatos?.(false);
    control_error('No hay archivos para este anexo');
  }
};