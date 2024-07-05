// Define the initial form values type
export interface FormInitialValues {
    id_codigo_contable: string;
    id_etapa: string;
    id_tipo_atributo: string;
    id_rango_edad: string;
    subEtapas: string;
    nombre: string;
    valor: string;
    tipoTexto: string;
    agregar_documento:boolean;
}

// Create the context with default values
export const form_initial: FormInitialValues = {
    id_codigo_contable: '',
    id_etapa: '',
    id_tipo_atributo: '',
    id_rango_edad: '',
    subEtapas: '',
    nombre: '',
    valor: '',
    tipoTexto: '',
    agregar_documento:false
};