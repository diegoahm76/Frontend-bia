/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const ReasignacionContext = createContext<any>({
  listaSeccionesSubsecciones: [],
  setListaSeccionesSubsecciones: () => {},
});

export const ReasignacionProvider = ({ children }: any): JSX.Element => {
  // ? state declaration
  const [listaSeccionesSubsecciones, setListaSeccionesSubsecciones] =
    useState<any>([]);

  const [listaSubGrupos, setListaSubGrupos] = useState<any>([]);
  const [currentGrupo, setCurrentGrupo] = useState(null)

  const [liderAsignado, setLiderAsignado] = useState(null);

  const [listaAsignaciones, setListaAsignaciones] = useState<any[]>([])

  const value = {
    listaSeccionesSubsecciones,
    setListaSeccionesSubsecciones,

    listaSubGrupos,
    setListaSubGrupos,

    currentGrupo,
    setCurrentGrupo,

    liderAsignado,
    setLiderAsignado,

    listaAsignaciones,
    setListaAsignaciones
  };

  return (
    <ReasignacionContext.Provider value={value}>
      {children}
    </ReasignacionContext.Provider>
  );
};
