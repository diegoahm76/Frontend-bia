/* eslint-disable @typescript-eslint/naming-convention */
export const miEstilo = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};
export interface ConteoEncuesta {
    success: boolean;
    detail: string;
    data: {
      total: number;
      preguntas: {
        id_pregunta_encuesta: number;
        redaccion_pregunta: string;
        ordenamiento: number;
        opciones: {
          id_opcion_rta: number;
          opcion_rta: string;
          ordenamiento: number;
          total: number;
        }[];
      }[];
    };
  };
  export interface Encuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    item_ya_usado: boolean;
  };
  export interface Propstorta {
    selectedEncuestaId: any;
};
export interface ReporteRegion {
  success: boolean;
  detail: string;
  data: {
    registros: {
      nombre: string;
      total: number;
    }[];
    total: number;
  };
};
export interface ReporteRangoEdad {
  success: boolean;
  detail: string;
  data: {
    registros: {
      nombre: string;
      total: number;
    }[];
    total: number;
  };
};