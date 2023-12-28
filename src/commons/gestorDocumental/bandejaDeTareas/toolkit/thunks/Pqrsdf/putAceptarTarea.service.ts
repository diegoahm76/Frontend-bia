import { api } from '../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const putAceptarTarea = async (idTarea: number) => {
  try {
    const url = `gestor/bandeja-tareas/tareas-asignada-aceptar/update/${idTarea}`;
    const bodyPut = {};

    console.log('putAceptarTarea', { url, bodyPut });
    // const response = await api.put(url, bodyPut);
  } catch (error) {}
};
