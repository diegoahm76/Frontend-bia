/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';

import {
  get_asignaciones_lideres_organigrama_actual_service,
  get_organigrama_actual_lideres_screen_service
} from '../toolkit/LideresThunks/OrganigramaLideresThunks';
import {
  get_list_asignaciones_lideres,
  set_organigrama_lideres_current
} from '../toolkit/LideresSlices/LideresSlice';
import { useAppDispatch } from '../../../../../../../hooks';
import { OrganigramaLideresScreen } from '../components/Organigrama/screen/OrganigramaLideresScreen';
import { AsignacionesDeLideresScreen } from '../components/Asignados/screen/AsignacionesDeLideresScreen';
import { UnidadOrganizacionalScreen } from '../components/UnidadOrganizacional/screen/UnidadOrganizacionalScreen';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  //* ----- fetch current organigrama  (carga por defecto inicial) -------
  const fetchCurrentOrganigrama = async (): Promise<void> => {
    try {
      const resOrganigramaActual =
        await get_organigrama_actual_lideres_screen_service();
      const resAsignacionesLideresOrganigramaActual =
        await get_asignaciones_lideres_organigrama_actual_service();

      dispatch(set_organigrama_lideres_current(resOrganigramaActual));
      dispatch(
        get_list_asignaciones_lideres(resAsignacionesLideresOrganigramaActual)
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    void fetchCurrentOrganigrama();
  }, []);

  return (
    <>
      {/* firt part of screen: Organigrama */}
      <OrganigramaLideresScreen />

      {/* segunda parte asignacion lideres Unidad organizacional */}

      <UnidadOrganizacionalScreen />

      {/* listado de asignaciones de lideres a unidades organizacionales por organigrama seleccionado */}

      <AsignacionesDeLideresScreen />
    </>
  );
};
