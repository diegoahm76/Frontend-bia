/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../../api/axios";
import { showAlert } from "../../../../../../../../../../utils/showAlert/ShowAlert";
import { IRequestState } from "./request.types";

export const getRequestStatesOtros = async (): Promise<any> => {
  try {
    const url = `gestor/panel_ventanilla/otros/estados_solicitudes/get/`;
    const {
      data: { data = {} },
    } = await api.get(url);
    const x = data.map(
      ({ id_estado_solicitud: value, nombre: label }: IRequestState) => ({
        value,
        label,
      })
    );
    return x; //
  } catch (err) {
    showAlert('Opss..', 'No se pudo obtener los estados de las solicitudes, recarga el módulo porfavor', 'error');
    return [];
  }
};