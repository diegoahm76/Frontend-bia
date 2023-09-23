export interface getUnidadesOrgInterface{
  idOrganigrama: number;
  setLoadingUnidadesOrg: React.Dispatch<React.SetStateAction<boolean>>;
  nombre?: string;
}

export interface getSeriesSubseriesInterface{
  idUnidadOrganizacional: number;
  idCcd: number;
  setLoadingSeriesSubseries: React.Dispatch<React.SetStateAction<boolean>>;
}