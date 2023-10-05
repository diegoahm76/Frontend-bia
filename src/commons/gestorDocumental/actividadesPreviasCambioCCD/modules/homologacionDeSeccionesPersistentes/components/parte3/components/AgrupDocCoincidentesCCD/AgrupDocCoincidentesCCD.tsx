/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { columnsAgrupDocCoinCCD } from './columnsAgrupDocCoinCCD/columnsAgrupDocCoinCCD';

export const AgrupDocCoincidentesCCD = (): JSX.Element | null => {
  //* redux declaration
  const { homologacionAgrupacionesSerieSubserie } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  //* declaración de columnas del data grid
  const columns = [...columnsAgrupDocCoinCCD];

  const rows = [...homologacionAgrupacionesSerieSubserie].sort(
    (a: any, b: any) => {
      if (a.iguales && !b.iguales) {
        return -1;
      } else if (!a.iguales && b.iguales) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  if (homologacionAgrupacionesSerieSubserie.length === 0) return null;

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={rows || []}
        title="Agrupaciones documentales coincidentes entre CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
