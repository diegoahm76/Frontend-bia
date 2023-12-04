/* eslint-disable @typescript-eslint/naming-convention */
//* create a simple contetx to share the state of the component

import { createContext, useState } from 'react';

export const AsignacionGrupoContext = createContext<any>({
  listaSeccionesSubsecciones: [],
  setListaSeccionesSubsecciones: () => {},
});
export const AsignacionGrupoProvider = ({ children }: any): JSX.Element => {
  // ? state declaration
  const [listaSeccionesSubsecciones, setListaSeccionesSubsecciones] =
    useState<any>([]);

  const [listaSubGrupos, setListaSubGrupos] = useState<any>([]);

  const [liderAsignado, setLiderAsignado] = useState(null);

  // ? functions declaration
  /* const setCurrentElementPqrsdComplementoTramitesYotrosContext = (
    element: any
  ) => {
    setCurrentElementPqrsdComplementoTramitesYotros(element);
  };*/

  const value = {
    listaSeccionesSubsecciones,
    setListaSeccionesSubsecciones,

    listaSubGrupos,
    setListaSubGrupos,

    liderAsignado,
    setLiderAsignado,
  };

  return (
    <AsignacionGrupoContext.Provider value={value}>
      {children}
    </AsignacionGrupoContext.Provider>
  );
};
