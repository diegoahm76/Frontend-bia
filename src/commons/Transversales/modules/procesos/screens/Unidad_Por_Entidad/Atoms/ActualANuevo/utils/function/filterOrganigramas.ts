/* eslint-disable @typescript-eslint/naming-convention */
export const filtrarOrganigramas = (organigramas: any[]): any[] => {
  const organigramaActual = organigramas.find((org: any) => org.actual);

  return organigramas
    .filter(
      (org: any) =>
        new Date(org.fecha_terminado) >=
        new Date(organigramaActual?.fecha_terminado)
    )
    .map((item: any) => ({
      label: item?.nombre,
      value: item?.id_organigrama
    }));
};
