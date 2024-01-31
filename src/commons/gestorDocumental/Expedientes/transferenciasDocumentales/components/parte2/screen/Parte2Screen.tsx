/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useTransferenciasDocumentales } from '../../../hook/useTransferenciasDocumentales';
import { Transferencias } from '../components/transferencias/Transferencias';

export const Parte2Screen = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  //* use hooks declarations
  const { handleBack } = useTransferenciasDocumentales();

  return (
    <>
      {/*parte inicial, busqueda y grillado de resultados de los expedientes a trasnferir*/}
      <Transferencias
        controlHistorialTransferencias={controlHistorialTransferencias}
        resetHistorialTransferencias={resetHistorialTransferencias}
        watchHistorialTransferenciasExe={watchHistorialTransferenciasExe}
      />
      {/*parte inicial, busqueda y grillado de resultados*/}

      {/*Modal de búsqueda de personas*/}
      <>Soy la parte 2 de la parte 2</>
{/*
      <Button variant="contained" color="primary" onClick={handleBack}>
        Volver
      </Button>*/}

      {/*Modal de búsqueda de personas*/}
    </>
  );
};
7;
