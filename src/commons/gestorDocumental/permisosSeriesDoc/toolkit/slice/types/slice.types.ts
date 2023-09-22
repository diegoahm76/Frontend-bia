import { PayloadAction } from '@reduxjs/toolkit';

export interface Ipsd {
  //* fase ccd
  ccdsBusqueda: any[];
  ccd_current_busqueda: any;
  //* fase unidades organizacionales
  unidadesOrganizacionales: any[];
  current_unidad_organizacional: any;
  //* fase series - subseries documentales
  listSeriesSubseries: any[];
  currentSeriesSubseries: any;
  //* restricciones
  restriccionesParaTodasLasUnidadesOrganizacionales: any;
  restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable: any;

  //* fase permisos
  unidadActuales: any[];
  unidadesActualesExternas: any[];
}
