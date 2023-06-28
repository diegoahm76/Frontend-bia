import { api } from "../../../../api/axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import type { Seccion, SubSeccionPorSeccion } from "../interfaces/interfaces";

export const get_data_seccion = async (): Promise<Seccion[]> => {
    const { data } = await api.get<ResponseServer<Seccion[]>>(
        `hidrico/bibliotecas/get/secciones/`
    );
    return data.data;
};
export const get_data_subseccion_por_seccion = async (id_seccion: number): Promise<SubSeccionPorSeccion[]> => {
    const { data } = await api.get<ResponseServer<SubSeccionPorSeccion[]>>(
        `hidrico/bibliotecas/get/subsecciones/por/seccion/${id_seccion}/`
    );
    return data.data;
};
export const post_seccion_subscción = async (
    form: any,
    rows_resgister_subseccion: any
): Promise<any> => {

    const new_array = [
        ...rows_resgister_subseccion,

        form.nombre_subseccion === '' || form.descripcion_subseccion === ''
            ? null
            : {
                nombre: form.nombre_subseccion,
                descripcion: form.descripcion_subseccion,
                // fecha_creacion: form.fecha_creacion_subseccion,
            },
    ];

    const filtered_array = new_array.filter((item: any) => item !== null);


    const response = await api.post('hidrico/bibliotecas/secciones/create/', {
        ...form,
        id_seccion: form.id_seccion,
        nombre: form.nombre_seccion,
        descripcion: form.descripcion_seccion,
        fecha_creacion: form.fecha_creacion,
        subsecciones: filtered_array,
    });

    return response.data;
};

