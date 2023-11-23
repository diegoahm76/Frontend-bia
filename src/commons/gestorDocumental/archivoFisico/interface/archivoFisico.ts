export interface IArchivoFisico {
  depositos: IObjDepositos[];
  estantes: IObjEstantes[];
  bandejas:IObjBandejas[];
  cajas: IObjcajas[];
  carpetas: IObjcarpetas[];

}


// busqueda avanzada
export interface IObjDepositos {
  id_deposito?: number | null;
  nombre_deposito?: string | null;
  identificacion_por_entidad?: string | null;
  orden_ubicacion_por_entidad?: number | null;
  direccion_deposito?: string | null;
  activo?: boolean;
  cod_municipio_nal?: number | null;
  cod_pais_exterior?: string | null;
  id_sucursal_entidad?: number | null;
}
export interface IObjEstantes {
  id_estante_deposito?: number | null;
  identificacion_por_deposito?: string | null;
  orden_ubicacion_por_deposito?: number | null;
  id_deposito?: number | null;
  deposito_identificacion?: string | null;
  deposito_nombre?: string | null;
}

export interface IObjBandejas  {
  id_bandeja_estante?: number | null;
  identificacion_estante?: string | null;
  deposito_archivo?: string | null;
  identificacion_por_estante?: string | null;
  orden_ubicacion_por_estante?: number | null;
  id_estante_deposito?: number | null;
  identificacion_deposito?: string | null;
  nombre_deposito?: string | null;
}

export interface IObjcajas {
  id_caja_bandeja?: number | null;
  identificacion_por_bandeja?: string | null;
  orden_ubicacion_por_bandeja?: number | null;
  id_bandeja_estante?: number | null;
  identificacion_bandeja?: string | null;
  id_estante?: number | null;
  identificacion_estante?: string | null;
  id_deposito?: number | null;
  identificacion_deposito?: string | null;
  nombre_deposito?: string | null;
}
export interface IObjcarpetas{
  id_carpeta_caja?: number | null;
  identificacion_por_caja?: string | null;
  orden_ubicacion_por_caja?: number | null;
  id_prestamo_expediente?: number | null;
  id_caja_bandeja?: number | null;
  id_expediente?: number | null;
  numero_expediente?: string | null;
  identificacion_caja?: string | null;
  id_bandeja?: number | null;
  identificacion_bandeja?: string | null;
  id_estante?: number | null;
  identificacion_estante?: string | null;
  id_deposito?: number | null;
  identificacion_deposito?: string | null;
  nombre_deposito?: string | null;
}



