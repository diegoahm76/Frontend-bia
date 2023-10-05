/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';

export const PersistenciaSeriesConfirmadasCCD = (): JSX.Element | null => {
  //* redux states declarations
  const { agrupacionesPersistentesSerieSubserie } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  if (agrupacionesPersistentesSerieSubserie?.length === 0) return null;
  return (
    <>
      <RenderDataGrid
        columns={[] || []}
        rows={[] || []}
        title="Persistencia de series confirmadas en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
