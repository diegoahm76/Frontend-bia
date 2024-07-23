/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderConceptoPOAI } from '../context/context';
import { ConceptoPOAIScreen } from '../screen/ConceptoPOAIScreen';
import { UserProviderDetalleInversion } from '../../DetalleInversionCuentas/context/context';
import { ControlPoai } from '../screen/ControlPoai';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConceptoPOAIRoutes = (): ReactElement => {
  return (
    <UserProviderConceptoPOAI>
      <UserProviderDetalleInversion>
        <Routes>
          <Route path="concepto/*" element={<ConceptoPOAIScreen />} />
          <Route path="control_poai/*" element={<ControlPoai />} /> 
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderDetalleInversion>
    </UserProviderConceptoPOAI>
  );
};
