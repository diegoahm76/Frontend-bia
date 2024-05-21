import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainResReqOpaScreen } from '../modules/secondPart/screen/MainResReqOpaScreen';
import { BandejaTareasProvider } from '../../../../../bandejaDeTareas/mainModule/context/BandejaTareasContext';
import { MainFirstPartResReqOpa } from '../modules/firstPart/screen/MainFirstPartResReqPermiso';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResReqPermisoMenorRouter = (): ReactElement => {
  return (
    <BandejaTareasProvider>
        <Routes>
          <Route path="/" element={<MainFirstPartResReqOpa />} />
          <Route path="formulario_usuario" element={<MainResReqOpaScreen />} />
        </Routes>
    </BandejaTareasProvider>
  );
};
