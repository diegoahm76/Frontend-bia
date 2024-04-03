/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const filtrarOrganigramas = (
  organigramas: any[],
): any[] => {
  const organigramaActual = organigramas.find((org: any) => org.actual);
  //  console.log('')('organigramaActualllllllllllllllll', organigramaActual);

 // //  console.log('')('organigramasssssssssss', organigramas);

  const organigramasDisponiblesParaRetornar = organigramas
    .filter(
      (org: any) =>
        new Date(org.fecha_terminado) >
          new Date(organigramaActual?.fecha_terminado) && !org.actual
    )
    .map((item: any) => ({
      item,
      label: item?.nombre,
      value: item?.id_organigrama
    }));

    //  console.log('')('organigramasDisponiblesParaRetornarrrrrrrrrrrrrrrrr', organigramasDisponiblesParaRetornar);

  if (organigramasDisponiblesParaRetornar.length === 0) {
    control_warning(
      'si vas a hacer un cambio de organigrama actual a nuevo, ten presente que no hay organigramas disponibles para hacer el cambio en este momento , crea uno para poder hacer el respectivo traslado'
    );
    return [{ label: '' }];
  } else {
    return organigramasDisponiblesParaRetornar;
  }
};
