/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const SolicitudAlUsuarioContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
});

export const SolicitudAlUsuarioProvider = ({ children }: any): JSX.Element => {
  // ? state declaration
  const [infoInicialUsuario, setInfoInicialUsuario] =
    useState<any>([]);


  


  const value = {
    infoInicialUsuario,
    setInfoInicialUsuario,
  };



  return (
    <SolicitudAlUsuarioContext.Provider value={value}>
      {children}
    </SolicitudAlUsuarioContext.Provider>
  );
};
