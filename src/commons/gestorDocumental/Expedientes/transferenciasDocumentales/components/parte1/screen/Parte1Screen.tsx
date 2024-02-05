/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { BusquedaPersonas } from '../components/modalBusquedaPersona/ModalBusquedaPersona';
import { HistoricoTransferenciasDoc } from '../components/historicoTransferenciasDoc/HistoricoTransferenciasDoc';

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
    <>
      {/*parte inicial, busqueda y grillado de resultados*/}
      <HistoricoTransferenciasDoc
        controlHistorialTransferencias={controlHistorialTransferencias}
        resetHistorialTransferencias={resetHistorialTransferencias}
        watchHistorialTransferenciasExe={watchHistorialTransferenciasExe}
      />
      {/*parte inicial, busqueda y grillado de resultados*/}

      {/*Modal de búsqueda de personas*/}
      <BusquedaPersonas
        controlHistorialTransferencias={controlHistorialTransferencias}
        resetHistorialTransferencias={resetHistorialTransferencias}
        watchHistorialTransferenciasExe={watchHistorialTransferenciasExe}
      />

      {/*Modal de búsqueda de personas*/}
    </>
  );
};
7;
