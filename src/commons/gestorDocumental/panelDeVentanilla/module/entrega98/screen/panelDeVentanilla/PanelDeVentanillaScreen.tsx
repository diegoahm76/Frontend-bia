/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { ButtonsPanelVentanilla } from '../../components/panelDeVentanilla/components/buttonsPanelVentanilla/ButtonsPanelVentanilla';
import { BuscadorPanelVentanilla } from '../../components/panelDeVentanilla/components/buscadorPanelVentanilla/BuscadorPanelVentanilla';

export const PanelDeVentanillaScreen = (): JSX.Element => {
  return (
    <>
      {/* primer parte, button */}
      <ButtonsPanelVentanilla />
      {/* segunda parte, buscado panel de ventanilla */}
      <BuscadorPanelVentanilla/>
    </>
  );
};
