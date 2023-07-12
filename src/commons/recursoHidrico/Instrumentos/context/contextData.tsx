/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  mode: string;
  info_seccion_subseccion: any;
  row_cartera_aforo: any;
  row_prueba_bombeo: any;
  row_result_laboratorio: any;
  set_mode: (mode: string) => void;
  set_info_seccion_subseccion: (info_seccion_subseccion: any) => void;
  set_row_cartera_aforo: (row_cartera_aforo: any) => void;
  set_row_prueba_bombeo: (row_prueba_bombeo: any) => void;
  set_row_result_laboratorio: (row_result_laboratorio: any) => void;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  info_seccion_subseccion: {},
  row_cartera_aforo: {},
  row_prueba_bombeo: {},
  row_result_laboratorio: {},
  set_mode: () => {},
  set_info_seccion_subseccion: () => {},
  set_row_cartera_aforo: () => {},
  set_row_prueba_bombeo: () => {},
  set_row_result_laboratorio: () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  const [mode, set_mode] = React.useState('');

  const [info_seccion_subseccion, set_info_seccion_subseccion] =
    React.useState<any>();

  const [row_cartera_aforo, set_row_cartera_aforo] = React.useState<any>({});
  const [row_prueba_bombeo, set_row_prueba_bombeo] = React.useState<any>({});
  const [row_result_laboratorio, set_row_result_laboratorio] =
    React.useState<any>({});

  const value = {
    mode,
    info_seccion_subseccion,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    set_mode,
    set_info_seccion_subseccion,
    set_row_cartera_aforo,
    set_row_prueba_bombeo,
    set_row_result_laboratorio,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
