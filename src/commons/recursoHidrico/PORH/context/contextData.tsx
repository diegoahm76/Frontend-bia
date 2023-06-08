/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useContext } from 'react';
import { api } from '../../../../api/axios';
import { ca } from 'date-fns/locale';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import { set } from 'date-fns';

/* interface User {
  name: string;
  email: string;
} */

interface UserContext {
  rows: any[];
  filter: any[];
  columns: string[];
  actionIcons: any[];
  get_data_id: (id: number) => any;
}

export const DataContext = createContext<UserContext>({
  rows: [],
  filter: [],
  columns: [],
  actionIcons: [],
  get_data_id: () => { },
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

  const get_data_id = async (id: number): Promise<any[]> => {
    const { data } = await api.get<ResponseServer<any[]>>(
        `hidrico/programas/get/programas/${id}/`
    );
    set_rows(data.data);
    return data.data;
};

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
    rows,
    set_rows,
    filter,
    setFilter,
    columns,
    setColumns,
    actionIcons,
    setActionIcons,
    get_data_id,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
