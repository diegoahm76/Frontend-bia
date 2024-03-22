/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

export const AsignacionGrupoTramiteContext = createContext<any>({
  listaSeccionesSubsecciones: [],
  setListaSeccionesSubsecciones: () => {},
});

export const AsignacionGrupoTramiteProvider = ({ children }: any): JSX.Element => {
  // ? state declaration
  const [listaSeccionesSubsecciones, setListaSeccionesSubsecciones] =
    useState<any>([]);

    const [listaSubGrupos, setListaSubGrupos] = useState<any>([]);
    const [listaSeries, setListaSeries] = useState<any>([])
    // se va a cambiar para definir el current grupo y serie
    const [currentGrupo, setCurrentGrupo] = useState({
      grupoSelected: null,
      currentSerie: null,
    })
  const [liderAsignado, setLiderAsignado] = useState(null);

  const [listaAsignaciones, setListaAsignaciones] = useState<any[]>([])

  const value = {
    listaSeccionesSubsecciones,
    setListaSeccionesSubsecciones,

    listaSubGrupos,
    setListaSubGrupos,
    listaSeries,
    setListaSeries,

    currentGrupo,
    setCurrentGrupo,

    liderAsignado,
    setLiderAsignado,

    listaAsignaciones,
    setListaAsignaciones
  };

  return (
    <AsignacionGrupoTramiteContext.Provider value={value}>
      {children}
    </AsignacionGrupoTramiteContext.Provider>
  );
};
