/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from './../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { colOrgActANuevo } from './columns/collOrgActANuevo';

export const GridActualANuevo: FC<any> = (): JSX.Element => {
  const title = 'Traslado masivo de organigrama actual a nuevo';

  const columnsModified = [
    ...colOrgActANuevo,
    {
      headerName: 'Unidad organizacional nueva',
      field: 'unidadesDisponiblesParaTraslado',
      width: 350,
      // renderiza un select que permite seleccionar la unidad organizacional nueva
      cellRenderer: 'select',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Unidad 1', 'Unidad 2', 'Unidad 3']
      }
    }
  ];

  return (
    <RenderDataGrid columns={columnsModified || []} rows={[]} title={title} />
  );
};
