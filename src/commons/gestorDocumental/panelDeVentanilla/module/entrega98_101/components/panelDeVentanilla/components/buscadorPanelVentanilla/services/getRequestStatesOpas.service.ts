/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../../api/axios";
import { IRequestState } from "./request.types";

export const getRequestStatesOpas = async (): Promise<any> => {
  try {
    const url = `gestor/panel_ventanilla/opas/estados_solicitudes/get/`;
    const {
      data: { data = {} },
    } = await api.get(url);
    const x = data.map(
      ({ id_estado_solicitud: value, nombre: label }: IRequestState) => ({
        value,
        label,
      })
    );
    //  console.log('')(x);
    return x; //
  } catch (err) {
    //  console.log('')(err);
  }
};