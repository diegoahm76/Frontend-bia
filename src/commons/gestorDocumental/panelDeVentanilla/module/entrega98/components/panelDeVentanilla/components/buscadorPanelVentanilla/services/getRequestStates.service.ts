import { api } from '../../../../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const getRequestStates = async () => {
  try {
    const url = `gestor/panel_ventanilla/estados_solicitudes/get/`;
    const response = await api.get(url);
    console.log(response);
  } catch (err) {
    console.log(err);
  } finally {
    //* se debe pensar si se debe poner un loader en ele elemento para que en caso de que la carga vaya lenta no haya desespero del user
  }
};
