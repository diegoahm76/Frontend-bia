/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode, createContext, useState } from 'react';

export const PanelVentanillaContext = createContext({});


export const PanelVentanillaProvider = ({ children }: ReactNode | any) => {
  const [state, setRadicado] = useState({
    busqueda_panel_ventanilla: {
      tipo_de_solicitud: '',
    },
  });

  return (
    <PanelVentanillaContext.Provider value={{ state, setRadicado }}>
      {children}
    </PanelVentanillaContext.Provider>
  );
};
