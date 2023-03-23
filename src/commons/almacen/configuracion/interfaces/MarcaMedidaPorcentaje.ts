export interface IMarcaGet {
  marca: IMarcas[];
  marca_seleccionada: IMarcas;
}

export interface IList {
  value: string | number;
  label: string | number;
}

export interface IMarcas {
  id_marca: number | null;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IPorcentajeGet {
  porcentaje: IPorcentajes[];
  porcentaje_seleccionado: IPorcentajes;
}

export interface IPorcentajes {
  id_porcentaje_iva: number | null;
  porcentaje: number;
  observacion: string;
  registro_precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
export interface IMedidasGet {
  medida: IMedidas[];
  medida_seleccionada: IMedidas;
}

export interface IMedidas {
  id_unidad_medida: number | null;
  nombre: string;
  abreviatura: string;
  id_magnitud: number | null;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
