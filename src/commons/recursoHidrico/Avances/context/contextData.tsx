/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { GetActividades, GetAvances, GetPrograma, GetProyectos } from '../Interfaces/interfaces';

interface UserContext {
  crear_programa: any;
  set_crear_programa: any;
  rows_programas: GetPrograma[];
  rows_proyectos: GetProyectos[];
  rows_actividades: GetActividades[];
  rows_avances: any[];
  id_programa: number | null;
  id_proyecto: number | null;
  id_actividad: number | null;
  id_avance: number | null;
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows_programas: (rows: GetPrograma[]) => void;
  set_rows_proyectos: (rows: GetProyectos[]) => void;
  set_rows_actividades: (rows: GetActividades[]) => void;
  set_rows_avances: (rows: any[]) => void;
  set_id_programa: (id: number | null) => void;
  set_id_proyecto: (id: number | null) => void;
  set_id_actividad: (id: number | null) => void;
  set_id_avance: (id: number | null) => void;
}

export const DataContext = createContext<UserContext>({
  rows_programas: [],
  rows_proyectos: [],
  rows_actividades: [],
  rows_avances: [],
  id_programa: null,
  id_proyecto: null,
  id_actividad: null,
  id_avance: null,
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows_programas: () => { },
  set_rows_proyectos: () => { },
  set_rows_actividades: () => { },
  set_rows_avances: () => { },
  crear_programa: {},
  set_crear_programa: () => { },
  set_id_programa: () => { },
  set_id_proyecto: () => { },
  set_id_actividad: () => { },
  set_id_avance: () => { },
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_avance, set_id_avance] = React.useState<number | null>(null);

  // tablas contenido programatico
  const [rows_programas, set_rows_programas] = React.useState<GetPrograma[]>([]);
  const [rows_proyectos, set_rows_proyectos] = React.useState<GetProyectos[]>([]);
  const [rows_actividades, set_rows_actividades] = React.useState<GetActividades[]>([]);
  const [rows_avances, set_rows_avances] = React.useState<GetAvances[]>([]);

  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);
  const [crear_programa, set_crear_programa] = React.useState({});



  const value = {
    set_id_avance,
    id_avance,
    set_id_actividad,
    id_actividad,
    set_id_proyecto,
    id_proyecto,
    set_id_programa,
    id_programa,
    set_rows_avances,
    rows_avances,
    set_crear_programa,
    crear_programa,
    rows_programas,
    set_rows_programas,
    rows_proyectos,
    set_rows_proyectos,
    rows_actividades,
    set_rows_actividades,
    filter,
    setFilter,
    columns,
    setColumns,
    actionIcons,
    setActionIcons,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
