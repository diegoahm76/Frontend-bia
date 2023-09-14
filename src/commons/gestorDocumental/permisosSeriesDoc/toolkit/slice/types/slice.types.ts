import { PayloadAction } from "@reduxjs/toolkit";

interface Ipsd {
  //* fase ccd
  ccdsBusqueda: any[];
  ccd_current_busqueda: any;
  //* fase unidades organizacionales
  unidadesOrganizacionales: any[];
  current_unidad_organizacional: any;
  //* fase series - subseries documentales
  listSeriesSubseries: any[];
  currentSeriesSubseries: any;
}

interface Restricciones {
  paraTodasLasUnidadesOrganizacionales: any;
  paraUnidadesDiferentesAlaSeccionOsubseccionActualResponsable: any;
}

export interface InterfaceSlice extends Ipsd {
  restricciones: Restricciones;
  objeto: {
    setRestriccionTodasUnidadesOrganizacionales: (state: any, action: PayloadAction<any>) => any;
  };
}
