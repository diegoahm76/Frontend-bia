/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const RequerimientoAlUsuarioContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
});

export const RequerimientoAlUsuarioProvider = ({ children }: any): JSX.Element => {
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
    <RequerimientoAlUsuarioContext.Provider value={value}>
      {children}
    </RequerimientoAlUsuarioContext.Provider>
  );
};
