/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import {
  get_consulta_consecutivos,
  get_datos_consecutivos,
  get_tipos_radicado,
} from '../../services/services';
import type { IConsecutivos } from '../../types/types';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

interface UserContext {
  mode: string;
  set_mode: (mode: string) => void;
  // * selected
  tipos_radicado_selected: ValueProps[];
  set_tipos_radicado_selected: (tipos_radicado_selected: ValueProps[]) => void;
  // * info
  data_consecutivo: IConsecutivos | undefined;
  set_data_consecutivo: (data_consecutivo: IConsecutivos) => void;

  // * rows
  rows_radicado: IConsecutivos[];
  set_rows_radicado: (rows_radicado: IConsecutivos[]) => void;
  // * fetch
  fetch_data_tipos_radicado_selected: () => Promise<void>;
  fetch_data_consecutivo: (
    agno: number,
    condigo_consecutivo: string
  ) => Promise<void>;
  fetch_consulta_consecutivo: (
    agno: number,
    condigo_consecutivo: string
  ) => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  set_mode: () => {},
  // * selected
  tipos_radicado_selected: [],
  set_tipos_radicado_selected: () => {},
  // * info
  data_consecutivo: undefined,
  set_data_consecutivo: () => {},
  // * rows
  rows_radicado: [],
  set_rows_radicado: () => {},
  // * fetch
  fetch_data_tipos_radicado_selected: async () => {},
  fetch_data_consecutivo: async () => {},
  fetch_consulta_consecutivo: async () => {},
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

  // info
  const [data_consecutivo, set_data_consecutivo] =
    React.useState<IConsecutivos>();

  // * rows

  const [rows_radicado, set_rows_radicado] = React.useState<IConsecutivos[]>(
    []
  );

  const fetch_data_tipos_radicado_selected = async (): Promise<void> => {
    const response = await get_tipos_radicado();
    set_tipos_radicado_selected(response);
  };

  const fetch_data_consecutivo = async (
    agno: number,
    condigo_consecutivo: string
  ): Promise<void> => {
    try {
      const response = await get_datos_consecutivos(agno, condigo_consecutivo);
      set_data_consecutivo(response);
    } catch (error: any) {
      control_warning(error.response.data.detail);
    }
  };

  const fetch_consulta_consecutivo = async (
    agno: number,
    condigo_consecutivo: string
  ): Promise<void> => {
    try {
      const response = await get_consulta_consecutivos(
        agno,
        condigo_consecutivo
      );
      set_rows_radicado(response);
    } catch (error: any) {
      control_warning(error.response.data.detail);
    }
  };

  const value: UserContext = {
    mode,
    set_mode,
    tipos_radicado_selected,
    set_tipos_radicado_selected,
    data_consecutivo,
    set_data_consecutivo,
    rows_radicado,
    set_rows_radicado,
    fetch_data_tipos_radicado_selected,
    fetch_data_consecutivo,
    fetch_consulta_consecutivo,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
