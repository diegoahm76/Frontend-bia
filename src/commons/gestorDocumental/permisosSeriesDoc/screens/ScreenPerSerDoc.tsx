/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { SerieAdministrar } from '../components/parte1/SerieAdministrar/screen/SerieAdministrarScreen';

export const ScreenPerSerDoc: FC<any> = (): JSX.Element => {
  return (
    <>
      {/* definición parte administración de la serie */}
      {/*
      la vista de serie a admministrar a incluir los siguientes componentes:
      1. Busqueda de ccd psd
      2. Vista de ccd seleccionado psd
      3. vista de seccion o subseccion seleccionada
      4. serie - subserie de seccion elegida
      5. A manera informativa se mostrará la respectiva seccón y serie seleccionada
      */}
      <SerieAdministrar />
    </>
  );
};
