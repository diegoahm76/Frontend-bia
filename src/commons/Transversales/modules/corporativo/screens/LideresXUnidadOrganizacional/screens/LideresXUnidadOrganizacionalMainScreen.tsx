/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';

import { get_organigrama_actual_lideres_screen_service } from '../toolkit/LideresThunks/OrganigramaLideresThunks';
import { set_organigrama_lideres_current } from '../toolkit/LideresSlices/LideresSlice';
import { useAppDispatch } from '../../../../../../../hooks';
import { OrganigramaLideresScreen } from '../components/Organigrama/screen/OrganigramaLideresScreen';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  //* ----- fetch current organigrama  (carga por defecto inicial) -------
  const fetchCurrentOrganigrama = async (): Promise<void> => {
    try {
      const res = await get_organigrama_actual_lideres_screen_service();
      dispatch(set_organigrama_lideres_current(res));
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
    </>
  );
};
