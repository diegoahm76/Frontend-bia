/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const ResRequerimientoOpaContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
});

export const ResRequerimientoOpaProvider = ({ children }: any): JSX.Element => {
  // ? state declaration

  const [infoInicialUsuario, setInfoInicialUsuario] =
    useState<any>([]);

    const [currentSolicitudUsuario, setCurrentSolicitudUsuario] = useState<any>({})

  const value = {
    infoInicialUsuario,
    setInfoInicialUsuario,
    currentSolicitudUsuario,
    setCurrentSolicitudUsuario
  };

  return (
    <ResRequerimientoOpaContext.Provider value={value}>
      {children}
    </ResRequerimientoOpaContext.Provider>
  );
};
