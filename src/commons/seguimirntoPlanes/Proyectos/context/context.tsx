/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProgramas, IProyectos } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_programas, get_proyecto_id } from '../services/services';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_proyecto: number | null;
  set_id_proyecto: (value: number | null) => void;

  // * rows
  rows_proyecto: IProyectos[];
  set_rows_proyecto: (value: IProyectos[]) => void;
  rows_programa: IProgramas[];
  set_rows_programa: (value: IProgramas[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_proyecto: () => Promise<void>;
  fetch_data_programa: () => Promise<void>;
}

export const DataContextProyectos = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  id_programa: null,
  set_id_programa: () => {},
  id_proyecto: null,
  set_id_proyecto: () => {},
  // * rows
  rows_proyecto: [],
  set_rows_proyecto: () => {},
  rows_programa: [],
  set_rows_programa: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_proyecto: async () => {},
  fetch_data_programa: async () => {},
});

export const UserProviderProyectos = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);
  const [rows_programa, set_rows_programa] = React.useState<IProgramas[]>([]);

  // * rows

  const [rows_proyecto, set_rows_proyecto] = React.useState<IProyectos[]>([]);

  // * info

  // * fetch
  //* declaracion context
  // const {
  //   programa: { id_programa },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_proyecto = async (): Promise<void> => {
    try {
      set_rows_proyecto([]);
      const response = await get_proyecto_id(id_programa as number);
      if (response?.length > 0) {
        const data_proyecto: IProyectos[] = response.map(
          (item: IProyectos) => ({
            ...item,
          })
        );

        set_rows_proyecto(data_proyecto);
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
    id_proyecto,
    set_id_proyecto,

    // * select
    tipo_eje_selected,
    set_tipo_eje_selected,
    rows_programa,
    set_rows_programa,

    // * rows
    rows_proyecto,
    set_rows_proyecto,

    // * info

    // * fetch
    fetch_data_proyecto,
    fetch_data_programa,
  };

  return (
    <DataContextProyectos.Provider value={value}>
      {children}
    </DataContextProyectos.Provider>
  );
};
