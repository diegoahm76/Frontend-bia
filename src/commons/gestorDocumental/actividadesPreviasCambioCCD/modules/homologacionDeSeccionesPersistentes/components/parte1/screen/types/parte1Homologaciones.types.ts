interface IGetCcds {
  success: boolean;
  detail: string;
  data: SearchResultCcd[];
}

interface SearchResultCcd {
  id_ccd: number;
  nombre: string;
  version: string;
  usado: boolean;
  fecha_terminado: string;
  id_organigrama: number;
  nombre_organigrama: string;
  version_organigrama: string;
}