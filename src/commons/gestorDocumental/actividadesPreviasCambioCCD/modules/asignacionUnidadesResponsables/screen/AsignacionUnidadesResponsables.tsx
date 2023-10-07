/* eslint-disable @typescript-eslint/naming-convention */
import { AccionesLoad } from '../components/final/screen/Acciones.load';
import { Parte1Screen } from '../components/parte1/screen/Parte1ScreenAsignacionUnResp';
/**
 * Pantalla principal módulo asignación unidades responsables
 * @returns JSX.Element
 */
export const AsignacionUnidadesResponsables = (): JSX.Element => {
  return (
    <>
      {/* Parte 1 */}
      {/* busqueda de cdd's para homologación y puesta de ccd y organigrama, y de grid de secciones que persistirán en un nuevo CCD */}
      <Parte1Screen />
      {/* Parte 2 */}
      {/* Secciones que persisterán en CCD nuevo*/}
      <>
        Selección de series responsables del ccd nuevo sobre las series
        documentales de secciones del CCD actual
      </>
      {/* Parte 3 */}
      {/* Listado de asignaciones */}
      <>Listado de asignaciones</>
      {/* Acciones */}
      <AccionesLoad />
    </>
  );
};
