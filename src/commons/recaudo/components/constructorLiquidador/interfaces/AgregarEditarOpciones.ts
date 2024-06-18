
export interface Rows {
  id: number;
  nombre:   string | undefined ;
  variable: any;
}
export interface TipoCobro {
  id_tipo_cobro: number;
  nombre_tipo_cobro: string;
  tipo_renta_asociado: any;
}
export interface TipoRenta {
  id_tipo_renta: number;
  nombre_tipo_renta: string;
  tipo_cobro_asociado: any;
  tipo_renta_asociado: any;
}
export interface ConfiguracionBasica {
  id_variables: any;
  nombre: any;
  tipo_cobro: any;
  tipo_renta: any;
  variable:any;
}
export interface Variable {
  id_valores_variables: number;
  variables: string;
  nombre_variable: string;
  tipo_cobro: number;
  tipo_renta: number;
  valor: any;
  id_tipo_renta:string;
  id_tipo_cobro:string;
}
