/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';
import { OrganigramaLideres } from '../components/Organigrama/OrganigramaLideres';
import { get_organigrama_actual_lideres_screen_service } from '../toolkit/LideresThunks/OrganigramaLideresThunks';
import { set_organigrama_lideres_current } from '../toolkit/LideresSlices/LideresSlice';
import { useAppDispatch } from '../../../../../../../hooks';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('LideresXUnidadOrganizacionalMainScreen');

    void get_organigrama_actual_lideres_screen_service().then((res: any) => {
      console.log(res);
      dispatch(set_organigrama_lideres_current(res));
    });
  }, []);

  return (
    <>
      {/* firt part of screen: Organigrama */}
      <OrganigramaLideres />
    </>
  );
};
