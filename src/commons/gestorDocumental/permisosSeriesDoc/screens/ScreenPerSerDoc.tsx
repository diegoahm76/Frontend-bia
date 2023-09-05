/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { SerieAdministrar } from '../components/parte1/SerieAdministrar/SerieAdministrar';
import { ModalContextPSD } from '../context/ModalContextPSD';

export const ScreenPerSerDoc: FC<any> = (): JSX.Element => {

  // ? context necesarios
  const {
    modalSeleccionCCD_PSD,
    // handleSeleccionCCD_PSD,
    loadingButtonPSD
    // setLoadingButtonPSD
  } = useContext(ModalContextPSD);


  return (
    <>
      <div>Screen permisos sobre series documentales</div>

      {/* definición parte administración de la serie */}
      <SerieAdministrar />

      <button>
        open
      </button>
    </>
  );
};
