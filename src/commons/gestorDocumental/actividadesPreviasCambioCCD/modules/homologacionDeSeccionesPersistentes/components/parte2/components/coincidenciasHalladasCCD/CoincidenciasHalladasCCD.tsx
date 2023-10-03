/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const CoincidenciasHalladasCCD = (): JSX.Element | null => {


  //* redux states
  const {homologacionUnidades} = useAppSelector((state) => state.HomologacionesSlice);

  return (
    <>
      <RenderDataGrid
        columns={columnsCoincidenciasHalladas ?? []}
        rows={homologacionUnidades ?? []}
        title="Coincidencias halladas entre CCD's ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
