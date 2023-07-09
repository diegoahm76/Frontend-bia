/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  mode: string;
  info_seccion_subseccion: any;
  set_mode: (mode: string) => void;
  set_info_seccion_subseccion: (info_seccion_subseccion: any) => void;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  info_seccion_subseccion: {},
  set_mode: () => {},
  set_info_seccion_subseccion: () => {},

});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  const [mode, set_mode] = React.useState('');

  const [info_seccion_subseccion, set_info_seccion_subseccion] = React.useState<any>()
  const value = {
    mode,
    info_seccion_subseccion,
    set_mode,
    set_info_seccion_subseccion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
