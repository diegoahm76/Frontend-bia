/* eslint-disable @typescript-eslint/naming-convention */
export interface Persona {
    id_persona: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;

}

export interface DataTabla {
    "Id_PQRSDF": number;
    "Tipo de Solicitud": string;
    "Tipo de PQRSDF": string;
    "tipo_pqrsdf_descripcion": string;
    "Titular": string;
    "Asunto": string;
    "Radicado": string;
    "Fecha de Radicado": string | null;
    "Persona Que Radicó": string | null;
    "Tiempo Para Respuesta": string | null;
    "Id_estado": number;
    "Estado": string;
    "Ubicacion en la corporacion": string;
    "Documento": string;
    "URL_Documento": string | null;
    "Archivo": {
        "id_archivo_digital": number;
        "nombre_de_Guardado": string;
        "formato": string;
        "tamagno_kb": number;
        "ruta_archivo": string;
        "fecha_creacion_doc": string;
        "es_Doc_elec_archivo": boolean;
    };
}


export const initialData: DataTabla[] = [{
    "Id_PQRSDF": 0,
    "Tipo de Solicitud": "",
    "Tipo de PQRSDF": "",
    "tipo_pqrsdf_descripcion": "",
    "Titular": "",
    "Asunto": "",
    "Radicado": "",
    "Fecha de Radicado": null,
    "Persona Que Radicó": null,
    "Tiempo Para Respuesta": null,
    "Id_estado": 0,
    "Estado": "",
    "Ubicacion en la corporacion": "",
    "Documento": "",
    "URL_Documento": null,
    "Archivo": {
        "id_archivo_digital": 0,
        "nombre_de_Guardado": "",
        "formato": "",
        "tamagno_kb": 0,
        "ruta_archivo": "",
        "fecha_creacion_doc": "",
        "es_Doc_elec_archivo": false,
    },
}];


export const initial_form = {
    tipoPqrsdf: "",
    nombreTitular: "",
    Radicado: "",
    fecha_desde: "",
    fecha_hasta: "",
    estado_solicitud: "",

}