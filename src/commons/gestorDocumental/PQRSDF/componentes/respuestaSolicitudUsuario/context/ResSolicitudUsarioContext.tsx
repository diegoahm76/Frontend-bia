/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const ResSolicitudUsuarioContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
});

export const ResSolicitudUsuarioProvider = ({ children }: any): JSX.Element => {
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
    <ResSolicitudUsuarioContext.Provider value={value}>
      {children}
    </ResSolicitudUsuarioContext.Provider>
  );
};
