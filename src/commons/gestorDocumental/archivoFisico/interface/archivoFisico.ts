export interface IArchivoFisico {
  depositos: IObjDepositos[];
}

export interface IObjDepositos {
  id_deposito?: number | null;
  nombre_deposito?: string | null;
  identificacion_por_entidad?: string | null;
  orden_ubicacion_por_entidad?: number | null;
}
