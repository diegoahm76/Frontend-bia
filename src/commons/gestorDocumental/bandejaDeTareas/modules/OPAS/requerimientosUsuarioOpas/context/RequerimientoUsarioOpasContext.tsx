/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const RequerimientoAlUsuarioOPASContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
});

export const RequerimientoAlUsuarioOPASProvider = ({ children }: any): JSX.Element => {
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
    <RequerimientoAlUsuarioOPASContext.Provider value={value}>
      {children}
    </RequerimientoAlUsuarioOPASContext.Provider>
  );
};
