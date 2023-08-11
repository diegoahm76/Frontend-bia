/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { OrganigramaLideresScreen } from '../components/Organigrama/screen/OrganigramaLideresScreen';
import { UnidadOrganizacionalScreen } from '../components/UnidadOrganizacional/screen/UnidadOrganizacionalScreen';
import { AsignacionesDeLideresScreen } from '../components/Asignados/screen/AsignacionesLideresScreen';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  );

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

  if (
    !organigrama_lideres_current ||
    Object.keys(organigrama_lideres_current).length === 0
  )
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );

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
