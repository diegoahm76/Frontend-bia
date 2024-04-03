import { api } from '../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const validacionInicialDataPendientePorPersistir = async (
  idCcdNuevo: number
) => {
  try {
    const url = `gestor/ccd/get-validacion-delegacion-ccd/get/${idCcdNuevo}/`;
    const response = await api.get(url);
    return response?.data;
  } catch (error) {
    //  console.log('')(error);
  }
};
