export interface IGetAgrupacionesCoincidetesCcd {
  id_ccd_actual: number;
  id_ccd_nuevo: number;
  id_unidad_actual: number;
  id_unidad_nueva: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGetAgrupacionesCoincidetesCcdWithoutActual
  extends Omit<IGetAgrupacionesCoincidetesCcd, 'id_ccd_actual'> {}
