/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  rows_programas: any[];
  rows_proyectos: any[];
  rows_actividades: any[];
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows_programas: (rows: any[]) => void;
  set_rows_proyectos: (rows: any[]) => void;
  set_rows_actividades: (rows: any[]) => void;
}

export const DataContext = createContext<UserContext>({
  rows_programas: [],
  rows_proyectos: [],
  rows_actividades: [],
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows_programas: () => {},
  set_rows_proyectos: () => {},
  set_rows_actividades: () => {},
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {
  const [rows_programas, set_rows_programas] = React.useState<any>([]);
  const [rows_proyectos, set_rows_proyectos] = React.useState<any>([]);
  const [rows_actividades, set_rows_actividades] = React.useState<any>([]);
  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);

  const value = {
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
