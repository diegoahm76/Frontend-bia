export interface getUnidadesOrganizacionalesInterface{
  idOrganigrama: number;
  setLoadingUnidadesOrg: React.Dispatch<React.SetStateAction<boolean>> | Function;
  nombre?: string;
}

export interface getSeriesSubseriesInterface{
  idUnidadOrganizacional: number;
  idCcd: number;
  setLoadingSeriesSubseries: React.Dispatch<React.SetStateAction<boolean>> | Function;
}