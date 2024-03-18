import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainFirstPartResReqOpa } from '../modules/firstPart/screen/MainFirstPartResReqOpa';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResReqOpaRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<MainFirstPartResReqOpa/>} />
      <Route path="formulario_usuario" element={<>Aquí se desarrollara los formularios de la respuesta del requerimiento de la opa</>} />
    </Routes>
  );
};