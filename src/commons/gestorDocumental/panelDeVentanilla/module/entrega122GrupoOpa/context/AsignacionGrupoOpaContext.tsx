/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';
import { current } from '@reduxjs/toolkit';

export const AsignacionGrupoOpaContext = createContext<any>({
  listaSeccionesSubsecciones: [],
  setListaSeccionesSubsecciones: () => {},
});

export const AsignacionGrupoOpaProvider = ({ children }: any): JSX.Element => {
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
    <AsignacionGrupoOpaContext.Provider value={value}>
      {children}
    </AsignacionGrupoOpaContext.Provider>
  );
};
