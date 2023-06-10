/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  crear_programa: any;
  set_crear_programa: any;
  rows_programas: any[];
  rows_proyectos: any[];
  rows_actividades: any[];
  rows_avances: any[];
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows_programas: (rows: any[]) => void;
  set_rows_proyectos: (rows: any[]) => void;
  set_rows_actividades: (rows: any[]) => void;
  set_rows_avances: (rows: any[]) => void;
}

export const DataContext = createContext<UserContext>({
  rows_programas: [],
  rows_proyectos: [],
  rows_actividades: [],
  rows_avances: [],
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows_programas: () => {},
  set_rows_proyectos: () => {},
  set_rows_actividades: () => {},
  set_rows_avances: () => {},
  crear_programa: {},
  set_crear_programa: () => {},
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {
  const [rows_programas, set_rows_programas] = React.useState<any>([]);
  const [rows_proyectos, set_rows_proyectos] = React.useState<any>([]);
  const [rows_actividades, set_rows_actividades] = React.useState<any>([]);
  const [rows_avances, set_rows_avances] = React.useState<any>([]);
  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);
  const [crear_programa, set_crear_programa] = React.useState({});


  
  const value = {
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
