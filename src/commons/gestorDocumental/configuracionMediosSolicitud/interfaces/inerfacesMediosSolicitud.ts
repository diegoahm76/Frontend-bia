export interface MedioSolicitud {
    id_medio_solicitud: number;
    nombre: any;
    aplica_para_pqrsdf: boolean;
    aplica_para_tramites: boolean;
    aplica_para_otros: boolean;
    activo: boolean;
  }
  export interface MedioSolicitud_context {
    id_medio_solicitud: number;
    nombre: string;
    aplica_para_pqrsdf: boolean;
    aplica_para_tramites: boolean;
    aplica_para_otros: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    registro_precargado: boolean;
  }