/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { BuscadorPanelVentanilla } from '../../components/panelDeVentanilla/components/buscadorPanelVentanilla/BuscadorPanelVentanilla';
import { ElementosPrincipales } from '../../components/panelDeVentanilla/components/elementosPrincipales/ElementosPrincipales';
import { SalidaModulo } from '../../components/panelDeVentanilla/components/salidaModulo/SalidaModulo';
import { SubElementoPrincipales } from '../../components/panelDeVentanilla/components/SubElementosGridDos/SubElementosPrincipales';

export const PanelDeVentanillaScreen = (): JSX.Element => {
  return (
    <>
      {/* segunda parte, buscado panel de ventanilla */}
      <BuscadorPanelVentanilla />
      {/* tercer parte, elementos principales de la busqueda (pqrsdf, tramites u otros) */}
      <ElementosPrincipales />
      {/*
        Cuarta parte, elementos secundarios de la busqueda (pqrsdf, tramites u otros)
      */}
      <SubElementoPrincipales />
      {/* Acciones finales, salida del módulo */}
      <SalidaModulo />
    </>
  );
};
