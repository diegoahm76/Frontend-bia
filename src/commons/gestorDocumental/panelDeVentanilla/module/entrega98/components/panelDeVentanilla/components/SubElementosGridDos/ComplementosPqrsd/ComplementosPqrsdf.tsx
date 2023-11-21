/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { columnsComplementoPqrsdf } from './columnsComplementoPqrsd/colComplePqrsdf';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaComplementosRequerimientosOtros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  return (
    <RenderDataGrid
      rows={listaComplementosRequerimientosOtros ?? []}
      columns={columnsComplementoPqrsdf ?? []}
      title="Complementos del elemento seleccionado"
    />
  );
};
