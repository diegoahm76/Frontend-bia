export interface IHistoricoTraslados {
  modalHistoricoTraslados: boolean;
  setModalHistoricoTraslados: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface DataHistorico {
  consecutivo: number;
  persona_cambio: string;
  fecha_cambio: string;
  tipo_cambio: string;
  justificacion: string;
}