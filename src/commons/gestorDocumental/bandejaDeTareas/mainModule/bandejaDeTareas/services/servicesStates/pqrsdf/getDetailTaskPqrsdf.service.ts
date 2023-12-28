import { api } from '../../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const getDetailTaskPqrsdf = async (idPqrsdf: number): Promise<any> => {
  try {
    const url = `gestor/bandeja-tareas/pqrsdf/detalle/get-by-id/${idPqrsdf}/`;
    const { data } = await api.get(url);
    console.log(data);
  } catch (err) {
  } finally {
  }
};
