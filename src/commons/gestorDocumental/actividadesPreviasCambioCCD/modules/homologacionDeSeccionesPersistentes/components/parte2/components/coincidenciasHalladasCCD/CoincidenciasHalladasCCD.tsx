/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const CoincidenciasHalladasCCD = (): JSX.Element | null => {
  return (
    <>
      <RenderDataGrid
        columns={[] || []}
        rows={[]|| []}
        title="Coincidencias halladas entre CCD's ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
