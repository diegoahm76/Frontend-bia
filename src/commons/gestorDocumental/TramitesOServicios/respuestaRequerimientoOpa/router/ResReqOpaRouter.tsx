import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainFirstPartResReqOpa } from '../modules/firstPart/screen/MainFirstPartResReqOpa';
import { MainResReqOpaScreen } from '../modules/secondPart/screen/MainResReqOpaScreen';
import { ResRequerimientoOpaProvider } from '../modules/secondPart/context/ResRequerimientoOpaContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResReqOpaRouter = (): ReactElement => {
  return (
    <ResRequerimientoOpaProvider>
      <Routes>
        <Route path="/" element={<MainFirstPartResReqOpa />} />
        <Route path="formulario_usuario" element={<MainResReqOpaScreen />} />
      </Routes>
    </ResRequerimientoOpaProvider>
  );
};
