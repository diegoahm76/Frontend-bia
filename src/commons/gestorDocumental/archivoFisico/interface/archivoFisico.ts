export interface IArchivoFisico {
  depositos: IObjDepositos[];
  estantes: IObjEstantes[];
  bandejas: IObjBandejas[];
  cajas: IObjcajas[];
  carpetas: IObjcarpetas[];
 arbol_deposito: IObjarbol;
 depositos_tabla: IObjDepositos[];
 deposito:IObjDepositos,
 estante:IObjEstantes,
 bandeja: IObjBandejas,
 caja:IObjcajas,
 carpeta:IObjcarpetas;
 expediente: IObjExpediente;

}

// busqueda avanzada
export interface IObjDepositos {
  id_deposito?: number |  null;
  nombre_deposito?: string | null;
  identificacion_por_entidad?: string | null;
  orden_ubicacion_por_entidad?: number | null;
  direccion_deposito?: string | null;
  activo?: boolean | null;
  cod_municipio_nal?: number | null;
  cod_pais_exterior?: string | null;
  id_sucursal_entidad?: number | null;
  estante?: IObjEstanteArbol[] | null;
}
export interface IObjEstantes {
  id_estante_deposito?: number | null;
  identificacion_por_deposito?: string | null;
  orden_ubicacion_por_deposito?: number | null;
  id_deposito?: number | null;
  deposito_identificacion?: string | null;
  deposito_nombre?: string | null;
}

export interface IObjBandejas {
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
export interface IObjcarpetas {
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

export interface IObjarbol {
  deposito: {
    id_deposito?: number | string | null;
    nombre_deposito?: string | null;
    identificacion_deposito?: string | null;
    orden_deposito?: number | null;
    Informacion_Mostrar?: string | null;
  };
  estantes?: IObjEstanteArbol[] | null;
}

export interface IObjEstanteArbol {
  id_estante?: number | null;
  identificacion_por_estante?: string | null;
  orden_estante?: number | null;
  Informacion_Mostrar?: string | null;
  bandejas:IObjBandejaArbol[];
}
export interface IObjBandejaArbol {
  id_bandeja?: number | null;
  identificacion_por_bandeja?: string | null;
  orden_bandeja?: number | null;
  Informacion_Mostrar?: string | null;
  cajas: IObjCajaArbol[];
  
}

export interface IObjCajaArbol {
  id_caja?: number | null;
  identificacion_por_caja?: string | null;
  orden_caja?: number | null;
  Informacion_Mostrar?: string | null;
  carpetas:IObjCarpetaArbol[];
}
export interface IObjCarpetaArbol{
  id_carpeta: number | null;
  identificacion_por_carpeta?: string | null;
  orden_carpeta?: number | null;
  numero_expediente?: string | null;
  Informacion_Mostrar?: string | null;
}

export interface IObjExpediente{
  id_expediente?: number | null;
  id_carpeta_caja?: number | null;
  titulo_expediente?: string | null;
  descripcion_expediente?: string | null;
  tipo_expediente?: string | null;
  tipo_expediente_cod?: string | null;
  nombre_serie?: string | null;
  nombre_subserie?: string | null;
  id_persona_titular_exp_complejo?: number | null;
  Nombre_Persona_titular?: string | null;
  estado_expediente?: string | null;
  fecha_folio_inicial?: string | null;
  fecha_folio_final?: string | null;
  etapa_de_archivo?: string | null;
}