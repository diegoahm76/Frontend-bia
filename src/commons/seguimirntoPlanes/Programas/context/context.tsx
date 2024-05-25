/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProgramas } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_programa_id } from '../services/services';
import { get_sector } from '../../configuraciones/Request/request';
import { ISector } from '../../configuraciones/interfaces/interfaces';

interface UserContext {
  // * id
  id_eje_estrategico: number | null;
  set_id_eje_estrategico: (value: number | null) => void;
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;

  // * rows
  rows_programa: IProgramas[];
  set_rows_programa: (value: IProgramas[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;
  sector_selected: ValueProps[];
  set_sector_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_programa: () => Promise<void>;
  fetch_data_sector: () => Promise<void>;
}

export const DataContextprograma = createContext<UserContext>({
  // * id
  id_eje_estrategico: null,
  set_id_eje_estrategico: () => {},
  id_programa: null,
  set_id_programa: () => {},
  // * rows
  rows_programa: [],
  set_rows_programa: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},
  sector_selected: [],
  set_sector_selected: () => {},

  fetch_data_programa: async () => {},
  fetch_data_sector: async () => {},
});

export const UserProviderPrograma = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_eje_estrategico, set_id_eje_estrategico] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);

  const [sector_selected, set_sector_selected] = React.useState<ValueProps[]>(
    []
  );


  // * rows

  const [rows_programa, set_rows_programa] = React.useState<IProgramas[]>([]);

  // * info

  // * fetch
  //* declaracion context
  // const {
  //   plan: { id_eje_estrategico },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_programa = async (): Promise<void> => {
    try {
      set_rows_programa([]);
      const response = await get_programa_id(id_eje_estrategico as number);
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

  const fetch_data_sector = async (): Promise<void> => {
    try {
      const response = await get_sector();
      if (response?.length > 0) {
        const data_sector: ValueProps[] | any = response.map(
          (item: ISector) => ({
            value: item.id_sector,
            label: item.nombre_sector,
          })
        );
        set_sector_selected(data_sector);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id
    id_eje_estrategico,
    set_id_eje_estrategico,
    id_programa,
    set_id_programa,

    // * select
    tipo_eje_selected,
    set_tipo_eje_selected,
    sector_selected,
    set_sector_selected,

    // * rows
    rows_programa,
    set_rows_programa,

    // * info

    // * fetch
    fetch_data_programa,
    fetch_data_sector,
  };

  return (
    <DataContextprograma.Provider value={value}>
      {children}
    </DataContextprograma.Provider>
  );
};
