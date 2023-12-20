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
  const {
    programa: { id_programa },
  } = useAppSelector((state) => state.planes);

  const fetch_data_proyecto = async (): Promise<void> => {
    try {
      set_rows_proyecto([]);
      const response = await get_proyecto_id(id_programa as number);
      if (response?.length > 0) {
        const data_proyecto: IProyectos[] = response.map(
          (item: IProyectos) => ({
            id_proyecto: item.id_proyecto,
            numero_proyecto: item.numero_proyecto,
            nombre_proyecto: item.nombre_proyecto,
            pondera_1: item.pondera_1,
            pondera_2: item.pondera_2,
            pondera_3: item.pondera_3,
            pondera_4: item.pondera_4,
            id_programa: item.id_programa,
            nombre_programa: item.nombre_programa,
            id_plan: item.id_plan,
            fecha_creacion: item.fecha_creacion,
            cumplio: item.cumplio,
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
    id_plan,
    set_id_plan,

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
