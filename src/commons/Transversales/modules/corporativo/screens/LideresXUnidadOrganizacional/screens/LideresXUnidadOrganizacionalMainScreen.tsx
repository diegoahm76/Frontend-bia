/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';
import { OrganigramaLideres } from '../components/Organigrama/OrganigramaLideres';
import { get_organigrama_actual_lideres_screen_service } from '../toolkit/LideresThunks/OrganigramaLideresThunks';

export const LideresXUnidadOrganizacionalMainScreen = (): JSX.Element => {

  
  useEffect(() => {
    console.log('LideresXUnidadOrganizacionalMainScreen');

    void get_organigrama_actual_lideres_screen_service();
  }, []);

  return (
    <>
      {/* firt part of screen: Organigrama */}
      <OrganigramaLideres />
    </>
  );
};
