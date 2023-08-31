/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from './../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { colOrgActANuevo } from './columns/collOrgActANuevo';

export const GridActualANuevo: FC<any> = (): JSX.Element => {
  const title = 'Traslado masivo de organigrama actual a nuevo';

  const columnsModified = [...colOrgActANuevo];

  return (
    <RenderDataGrid columns={columnsModified || []} rows={[]} title={title} />
  );
};
