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

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);
  const [rows_programa, set_rows_programa] = React.useState<IProgramas[]>([]);

  // * rows

  const [rows_subprogramas, set_rows_subprogramas] = React.useState<ISubprogramas[]>([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    programa: { id_programa },
  } = useAppSelector((state) => state.planes);

  const fetch_data_subprogramas = async (): Promise<void> => {
    try {
      set_rows_subprogramas([]);
      const response = await get_subprograma_id(id_programa as number);
      if (response?.length > 0) {
        const data_subprogramas: ISubprogramas[] = response.map(
          (item: ISubprogramas) => ({
            id_programa: item.id_programa,
            id_subprograma: item.id_subprograma,
            nombre_subprograma: item.nombre_subprograma,
            nombre_programa: item.nombre_programa,
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
            id_programa: item.id_programa,
            nombre_plan: item.nombre_plan,
            nombre_programa: item.nombre_programa,
            porcentaje_1: item.porcentaje_1,
            porcentaje_2: item.porcentaje_2,
            porcentaje_3: item.porcentaje_3,
            porcentaje_4: item.porcentaje_4,
            id_plan: item.id_plan,
            fecha_creacion: item.fecha_creacion,
            cumplio: item.cumplio,
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
