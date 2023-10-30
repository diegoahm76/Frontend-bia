/* eslint-disable @typescript-eslint/naming-convention */
export interface Persona {
    id_persona: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
};
export interface Encuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    item_ya_usado: boolean;
};
export interface AsignacionEncuesta {
    id_asignar_encuesta: number;
    nombre_completo: string;
    nombre_encuesta: string;
    id_encuesta: number;
    id_persona: number;
    id_alerta_generada: number;
};

export const miEstilo = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
  };