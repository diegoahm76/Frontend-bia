interface Row {
  id: number;
  nombre: string;
  version: string;
  nombre_organigrama: string;
  version_organigrama: string;
  id_ccd: number;
  mismo_organigrama: boolean;
}

export interface Params {
  row: Row;
}