/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { usePanelVentanilla } from '../../../../../../hook/usePanelVentanilla';

export const ElementosPrincipales = (): JSX.Element => {
  const { watch_busqueda_panel_ventanilla } = usePanelVentanilla();

  useEffect(() => {
    console.log(
      'watch_busqueda_panel_ventanilla',
      watch_busqueda_panel_ventanilla
    );
  });

  return (
    <RenderDataGrid rows={[]} columns={[]} title={`Elementos principales (...)`} />
  );
};

/*, asociados a ${watch_busqueda_panel_ventanilla.tipo_de_solicitud?.label} ${watch_busqueda_panel_ventanilla.estado_actual?.label*/
