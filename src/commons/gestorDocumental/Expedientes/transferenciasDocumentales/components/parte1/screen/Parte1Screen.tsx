/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { BusquedaPersonas } from '../components/modalBusquedaPersona/ModalBusquedaPersona';

export const Parte1Screen = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  return (
    <div>
      {/*Modal de búsqueda de personas*/}
      <BusquedaPersonas
        controlHistorialTransferencias={controlHistorialTransferencias}
        resetHistorialTransferencias={resetHistorialTransferencias}
        watchHistorialTransferenciasExe={watchHistorialTransferenciasExe}
      />
      {/*Modal de búsqueda de personas*/}
    </div>
  );
};
7;
