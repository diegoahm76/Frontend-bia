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
export const delete_seccion_id = async (id: number,): Promise<any> => {
    return await api.delete(`hidrico/bibliotecas/secciones/delete/${id}/`);
};

export const post_seccion_subscción = async (
    form: any,
    rows_resgister_subseccion: any
): Promise<any> => {

    const new_array = [
        ...rows_resgister_subseccion,

        form.nombre_subseccion === '' || form.descripcion_subseccion === ''
            ? null :
            {
                nombre: form.nombre_subseccion,
                descripcion: form.descripcion_subseccion,
            },
    ];

    const filtered_array = new_array.filter((item: any) => item !== null);


    const response = await api.post('hidrico/bibliotecas/secciones-subsecciones/create/', {
        ...form,
        id_seccion: form.id_seccion,
        nombre: form.nombre_seccion,
        descripcion: form.descripcion_seccion,
        fecha_creacion: form.fecha_creacion,
        subsecciones: rows_resgister_subseccion.length === 0 ? [] : filtered_array,
    });

    return response.data;
};
export const put_seccion_subscción = async (
    form: any,
    rows_subseccion: any,
    rows_elimina: any,
    id_seccion: number,
): Promise<any> => {

    const new_array = [
        ...rows_subseccion,

        form.nombre_subseccion === '' || form.descripcion_subseccion === ''
            ? null
            : {
                id_subseccion: form.id_subseccion,
                nombre: form.nombre_subseccion,
                descripcion: form.descripcion_subseccion,
            },
    ];

    const filtered_array = new_array.filter((item: any) => item !== null);


    const response = await api.put(`hidrico/bibliotecas/secciones/update/${id_seccion}/`, {
        ...form,
        id_seccion: form.id_seccion,
        nombre: form.nombre_seccion,
        descripcion: form.descripcion_seccion,
        fecha_creacion: form.fecha_creacion,
        subsecciones_eliminar: rows_elimina,
        subsecciones: filtered_array,
    });

    return response.data;
};

export const put_seccion_sección = async (
    form: any,
    id_seccion: number,
): Promise<any> => {
    const response = await api.put(`hidrico/bibliotecas/secciones/update/${id_seccion}/`, {
        ...form,
        nombre: form.nombre_seccion,
        descripcion: form.descripcion_seccion,
        subsecciones: []
    });

    return response.data;
};

