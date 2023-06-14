/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import dayjs from "dayjs";
import { api } from "../../../../api/axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";


export const get_data_id = async (id: number, set_data: any, url: string): Promise<any[]> => {
  const { data } = await api.get<ResponseServer<any[]>>(
    `hidrico/programas/${url}/${id}/`
  );
  set_data(data.data);
  return data.data;
};

// post 
export const post_programa = async (
  form: any,
  set_data: any,
  programas: any,
  proyectos: any,
  actividades: any,
): Promise<any> => {
  const response = await api.post(
    `hidrico/programas/programa/recurso/hidrico/create/`,
    {
      ...form,
      id_programa: form.id_programa,
      nombre: form.nombre_programa,
      fecha_inicio: dayjs(form.fecha_inicio,).format('YYYY-MM-DD'),
      fecha_fin: dayjs(form.fecha_fin,).format('YYYY-MM-DD'),
      proyectos:

        !form.nombre ? [] :
          [
            ...proyectos,
            {
              id_proyecto: form.id_proyecto,
              nombre: form.nombre,
              vigencia_inicial: dayjs(form.vigencia_inicial,).format('YYYY-MM-DD'),
              vigencia_final: dayjs(form.vigencia_final,).format('YYYY-MM-DD'),
              inversion: form.inversion,
              actividades:

                !form.descripcion ? [] :
                  [
                    ...actividades,
                    {
                      nombre: form.descripcion,
                    }
                  ]
            }
          ],
    }
  );
  // set_data([...programas, response.data]);
  return response.data;
};

export const editar_programa = async (
  id_programa: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
      `hidrico/programas/actualizar/programa/${id_programa}/`,
      datos
  );
  return response.data;
};

