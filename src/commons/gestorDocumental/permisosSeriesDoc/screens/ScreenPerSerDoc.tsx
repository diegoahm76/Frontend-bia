/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { SerieAdministrar } from '../components/parte1/SerieAdministrar/SerieAdministrar';
import { ModalContextPSD } from '../context/ModalContextPSD';

export const ScreenPerSerDoc: FC<any> = (): JSX.Element => {

  // ? context necesarios
  const {
    handleSeleccionCCD_PSD,
  } = useContext(ModalContextPSD);


  return (
    <>
      <div>Screen permisos sobre series documentales</div>

      {/* definición parte administración de la serie */}
      <SerieAdministrar />

      <button
        onClick={
          () => handleSeleccionCCD_PSD(true)
        }
      >
        open
      </button>
    </>
  );
};
