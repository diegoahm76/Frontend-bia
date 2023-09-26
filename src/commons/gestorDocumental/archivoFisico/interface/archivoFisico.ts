export interface IArchivoFisico {
  depositos: IObjDepositos[];
  estantes: IObjEstantes[];
}

export interface IObjDepositos {
  id_deposito?: number | null;
  nombre_deposito?: string | null;
  identificacion_por_entidad?: string | null;
  orden_ubicacion_por_entidad?: number | null;
}

export interface IObjEstantes {
  id_estante_deposito?: number | null;
  identificacion_por_deposito?: string | null;
  orden_ubicacion_por_deposito?: number | null;
  id_deposito?: number | null;
}
