/* eslint-disable @typescript-eslint/naming-convention */
export interface RadicadoData {
    id_radicado: number;
    nombre_modulo: string;
    nombre_tipo_radicado: string;
    nombre_completo_radica: string;
    radicado: string;
    cod_tipo_radicado: string;
    prefijo_radicado: string;
    agno_radicado: number;
    nro_radicado: string;
    fecha_radicado: string;
    id_modulo_que_radica: number;
    id_persona_radica: number;
    id_radicado_asociado: number | null;
  }
  
 export  const ejemploData: RadicadoData[] = [
    {
      id_radicado: 0,
      nombre_modulo: '',
      nombre_tipo_radicado: '',
      nombre_completo_radica: '',
      radicado: '',
      cod_tipo_radicado: '',
      prefijo_radicado: '',
      agno_radicado: 0,
      nro_radicado: '',
      fecha_radicado: '',
      id_modulo_que_radica: 0,
      id_persona_radica: 0,
      id_radicado_asociado: null,
    },
  ];
  
export const initial_data={
    fecha_desde: '',
    fecha_hasta: '',
    prefijo: '',
    año: '',
    tipo_radicado: '',
    modulo: '',

  }