
import { type Persona } from '../../../../interfaces/globalModels';

export interface IBodegaGet {
  bodegas: IBodega[];
  bodega_seleccionada: IBodega;
  id_responsable_bodega: Persona;
}
export interface IBodega {
  id_bodega: number | null;
  nombre_completo_responsable?: string | null;
  nombre: string | null;
  cod_municipio: string;
  direccion: string;
  activo: boolean;
  item_ya_usado: boolean;
  id_responsable: number | null;
  es_principal: boolean | null;
}


