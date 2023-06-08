/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  rows: any[];
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows: (rows: any[]) => void;
}

export const DataContext = createContext<UserContext>({
  rows: [],
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows: () => {},
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {
  const [rows, set_rows] = React.useState<any>([]);
  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);

  const value = {
    rows,
    set_rows,
    filter,
    setFilter,
    columns,
    setColumns,
    actionIcons,
    setActionIcons,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
