import { Dispatch, SetStateAction } from "react";

/* eslint-disable @typescript-eslint/naming-convention */
export interface IEncuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    fecha_creacion: string;
}
export interface IProps {
    is_modal_active: boolean;
    setSelectedEncuestaId: any;
    handleClear: any;
    setShowContent: any;
    
}
export interface Pregunta {
    opciones_rta: Array<{ opcion_rta: string }>;
}
export interface BucacarEncuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    fecha_creacion: string;
}
export interface BuscarProps {
    is_modal_active: boolean;
    setSelectedEncuestaId: any;
    handleClear: any;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}
export const miEstilo = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};
export const initialFormData = {
    nombre_encuesta: "",
    descripcion: "",
    activo: "",
    preguntas: [
        { redaccion_pregunta: "", opciones_rta: [] }
    ]
};
export interface OpcionRta {
    id_opcion_rta?: number;  // el ID puede ser opcional (undefined) para nuevos elementos.
    opcion_rta: string;
  };