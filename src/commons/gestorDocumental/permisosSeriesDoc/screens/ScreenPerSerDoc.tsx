/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';

import { ModalContextPSD } from '../context/ModalContextPSD';
import { SerieAdministrar } from '../components/parte1/SerieAdministrar/screen/SerieAdministrarScreen';

export const ScreenPerSerDoc: FC<any> = (): JSX.Element => {
  // ? context necesarios
  const { handleSeleccionCCD_PSD } = useContext(ModalContextPSD);

  return (
    <>
      <div>Screen permisos sobre series documentales</div>

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

      <button onClick={() => handleSeleccionCCD_PSD(true)}>open</button>
    </>
  );
};
