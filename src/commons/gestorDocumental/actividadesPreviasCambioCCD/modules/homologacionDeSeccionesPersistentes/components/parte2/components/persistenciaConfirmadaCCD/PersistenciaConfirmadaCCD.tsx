/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidenciasHalladas as columnsPersistenciasConfirmadas } from '../coincidenciasHalladasCCD/columnsCoincidenciasHalladas/columnsCoincidenciasHalladas';

export const PersistenciaConfirmadaCCD = (): JSX.Element => {
  //* redux states
  const { unidadesPersistentes } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  // ? columnas modificadas para la tabla de persistencia confirmada
  const columns = [...columnsPersistenciasConfirmadas];

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={unidadesPersistentes || []}
        title="Persistencia confirmada en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
