/* eslint-disable @typescript-eslint/naming-convention */

export const miEstilo = {
    p: '20px',
    mb: '20px',
    m: '10px 0 20px 0',
    borderRadius: '15px',
    position: 'relative',
    background: '#FAFAFA',
    boxShadow: '0px 3px 6px #042F4A26',
};

export const initialFormData = {
    email: "",
    telefono: "",
    cod_sexo: "",
    rango_edad: "",
    _id_persona: 0,
    id_encuesta: "",
    tipo_usuario: "R",
    nombre_completo: "",
    nro_documento_id: "",
    id_pais_para_extranjero: "",
    id_municipio_para_nacional: "",
    id_tipo_documento_usuario: "",
    ids_opciones_preguntas_encuesta: []
};

export interface AsignacionEncuestaUsuario {
    id_persona: number;
    id_encuesta: number;
    nombre_completo: string;
    nombre_encuesta: string;
    id_alerta_generada: number;
    id_asignar_encuesta: number;
}
export interface IProps {

    selectedEncuestaId: any;
    setSelectedEncuestaId: any;

}
