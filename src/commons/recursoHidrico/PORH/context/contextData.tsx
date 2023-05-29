/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useContext } from 'react';

/* interface User {
  name: string;
  email: string;
} */

interface UserContext {
  data: any[];
  filter: any[];
  columns: string[];
  actionIcons: any[];
}

export const DataContext = createContext<UserContext | null>({
  data: [],
  filter: [],
  columns: [],
  actionIcons: []
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {
  const [data, setData] = React.useState<any>([]);
  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);

  // create a function that find a data in the array
  const findData = (data: any[], id: number): any[] => {
    return data.find((item) => item.id === id);
  };

  // create a function that delete a data in the array
  const deleteData = (data: any[], id: number): any[] => {
    return data.filter((item) => item.id !== id);
  };

  // create a function that update a data in the array
  const updateData = (data: any[], newData: any): any[] => {
    return data.map((item) => (item.id === newData.id ? newData : item));
  };

  /* const login = (newUser: User) => {
    setUser(newUser);
  };

   const logout = () => {
    setUser(null);
  };
*/

  const value = {
    data,
    setData,
    filter,
    setFilter,
    columns,
    setColumns,
    actionIcons,
    setActionIcons
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
