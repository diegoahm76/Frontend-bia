/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_tipos_radicado } from '../../services/services';

interface UserContext {
  mode: string;
  set_mode: (mode: string) => void;
  // * selected
  tipos_radicado_selected: ValueProps[];
  set_tipos_radicado_selected: (tipos_radicado_selected: ValueProps[]) => void;
  fetch_data_tipos_radicado_selected: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  set_mode: () => {},
  // * selected
  tipos_radicado_selected: [],
  set_tipos_radicado_selected: () => {},
  fetch_data_tipos_radicado_selected: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [mode, set_mode] = React.useState('');

  const [tipos_radicado_selected, set_tipos_radicado_selected] = React.useState<
    ValueProps[]
  >([]);

  const fetch_data_tipos_radicado_selected = async (): Promise<void> => {
    const response = await get_tipos_radicado();
    set_tipos_radicado_selected(response);
  };

  const value: UserContext = {
    mode,
    set_mode,
    tipos_radicado_selected,
    set_tipos_radicado_selected,
    fetch_data_tipos_radicado_selected,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
