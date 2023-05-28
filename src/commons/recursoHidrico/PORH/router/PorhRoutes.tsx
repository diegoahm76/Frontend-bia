/* eslint-disable @typescript-eslint/naming-convention */
// import React from 'react'

import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PorhMain } from '../screen/PorhMain/PorhMain';

export const PorhRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<PorhMain />} />
      <Route path="/*" element={<div>Ruta no encontrado</div>} />
    </Routes>
  );
};
