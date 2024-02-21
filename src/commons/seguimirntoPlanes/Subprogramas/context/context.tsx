/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProgramas, ISubprogramas } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_programas, get_subprograma_id } from '../services/services';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_subprograma: number | null;
  set_id_subprograma: (value: number | null) => void;

  // * rows
  rows_subprogramas: ISubprogramas[];
  set_rows_subprogramas: (value: ISubprogramas[]) => void;
  rows_programa: IProgramas[];
  set_rows_programa: (value: IProgramas[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_subprogramas: () => Promise<void>;
  fetch_data_programa: () => Promise<void>;
}

export const DataContextSubprogramas = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  id_programa: null,
  set_id_programa: () => {},
  id_subprograma: null,
  set_id_subprograma: () => {},

  // * rows
  rows_subprogramas: [],
  set_rows_subprogramas: () => {},
  rows_programa: [],
  set_rows_programa: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_subprogramas: async () => {},
  fetch_data_programa: async () => {},
});

export const UserProviderSubprogramas = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_subprograma, set_id_subprograma] = React.useState<number | null>(null);

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);
  const [rows_programa, set_rows_programa] = React.useState<IProgramas[]>([]);

  // * rows

  const [rows_subprogramas, set_rows_subprogramas] = React.useState<
    ISubprogramas[]
  >([]);

  // * info

  // * fetch
  //* declaracion context
  // const {
  //   programa: { id_programa },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_subprogramas = async (): Promise<void> => {
    try {
      set_rows_subprogramas([]);
      const response = await get_subprograma_id(id_programa as number);
      if (response?.length > 0) {
        const data_subprogramas: ISubprogramas[] = response.map(
          (item: ISubprogramas) => ({
            ...item,
          })
        );

        set_rows_subprogramas(data_subprogramas);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_programa = async (): Promise<void> => {
    try {
      set_rows_programa([]);
      const response = await get_programas();
      if (response?.length > 0) {
        const data_programa: IProgramas[] = response.map(
          (item: IProgramas) => ({
            ...item,
          })
        );

        set_rows_programa(data_programa);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id
    id_plan,
    set_id_plan,
    id_programa,
    set_id_programa,
    id_subprograma,
    set_id_subprograma,

    // * select
    tipo_eje_selected,
    set_tipo_eje_selected,
    rows_programa,
    set_rows_programa,

    // * rows
    rows_subprogramas,
    set_rows_subprogramas,

    // * info

    // * fetch
    fetch_data_subprogramas,
    fetch_data_programa,
  };

  return (
    <DataContextSubprogramas.Provider value={value}>
      {children}
    </DataContextSubprogramas.Provider>
  );
};
