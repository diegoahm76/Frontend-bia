/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';

export const CatalogoTRDSeleccionado: FC<any> = ({
  rows,
  columns,
  title
}: any): JSX.Element => {
  return (
    <>
      <RenderDataGrid rows={rows} columns={columns} title={title} />
    </>
  );
};
