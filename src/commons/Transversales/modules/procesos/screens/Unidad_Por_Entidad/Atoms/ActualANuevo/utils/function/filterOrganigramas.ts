/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const filtrarOrganigramas = (
  organigramas: any[],
  navigate: any
): any[] => {
  const organigramaActual = organigramas.find((org: any) => org.actual);

  console.log('organigramasssssssssss', organigramas);

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

  if (organigramasDisponiblesParaRetornar.length === 0) {
    void Swal.fire({
      icon: 'warning',
      title: 'NO HAY ORGANIGRAMAS DISPONIBLES',
      text: 'No hay organigramas nuevos disponibles para hacer el traslado de datos, por favor cree uno nuevo',
     // showCloseButton: false,
     // allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: 'Ir al módulo de organigramas',
      confirmButtonColor: '#042F4A',
     // allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/app/gestor_documental/organigrama/crear');
      }
    });
    return [{ label: '' }];
  } else {
    return organigramasDisponiblesParaRetornar;
  }
};
