export interface ICierreExpedientes {
  current_cierre_Expediente: IObjCierreExpediente;
  trd: IObjTRD[];
  tipologias: IObTipologia[];
}

export interface IObjCierreExpediente {
  fecha_actual?: string | null;
  titulo_expediente?: string | null;
}

export interface IObjTRD {
  id_trd_origen?: number | null;
  nombre_tdr_origen?: string | null;
  actual_tdr_origen?: boolean;
  fecha_retiro_produccion_tdr_origen?: string | null;
  estado_actual?: string | null;
}

export interface IObTipologia {
  id_tipologia_documental?: number | null;
  nombre?: string | null;
}
