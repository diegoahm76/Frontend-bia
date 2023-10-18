/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';

export const GridListadoAsign = (): JSX.Element => {
  return (
    <RenderDataGrid
      title="Listado de asignaciones (Unidad CCD actual / Unidad responsable CCD nuevo)"
      columns={[]}
      rows={[]}
    />
  );
};
