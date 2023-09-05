/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import ModalSeleccionCCDPSD from '../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD';

export const SerieAdministrar: FC<any> = (): JSX.Element => {
  return (
    <>
      <div>SerieAdministrar</div>

      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
      <ModalSeleccionCCDPSD />
      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
    </>
  );
};
