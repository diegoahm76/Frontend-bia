/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IEjeEstrategico } from '../../types/types';
import { control_error } from '../../../../helpers';
import {
  get_eje_estrategico,
  get_eje_estrategico_id,
  get_tipos_eje,
} from '../services/services';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { TiposEjes } from '../../configuraciones/interfaces/interfaces';

interface UserContext {
  // * id

  // * rows
  rows_eje_estrategico: IEjeEstrategico[];
  set_rows_eje_estrategico: (value: IEjeEstrategico[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_eje_estrategico: () => Promise<void>;
  fetch_data_eje_estrategico2: () => Promise<void>;
  fetch_data_tipo_eje: () => Promise<void>;
}

export const DataContextEjeEstrategico = createContext<UserContext>({
  rows_eje_estrategico: [],
  set_rows_eje_estrategico: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_eje_estrategico: async () => {},
  fetch_data_eje_estrategico2: async () => {},
  fetch_data_tipo_eje: async () => {},
});

export const UserProviderEjeEstrategico = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_eje_estrategico, set_rows_eje_estrategico] = React.useState<
    IEjeEstrategico[]
  >([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    plan: { id_plan },
  } = useAppSelector((state) => state.planes);

  const fetch_data_eje_estrategico = async (): Promise<void> => {
    set_rows_eje_estrategico([]);
    try {
      const response = await get_eje_estrategico_id(id_plan as number);
      if (response?.length > 0) {
        const data_eje_estrategico: IEjeEstrategico[] = response.map(
          (item: IEjeEstrategico) => ({
            id_eje_estrategico: item.id_eje_estrategico,
            nombre_plan: item.nombre_plan,
            nombre_tipo_eje: item.nombre_tipo_eje,
            nombre: item.nombre,
            id_plan: item.id_plan,
            id_tipo_eje: item.id_tipo_eje,
          })
        );

        set_rows_eje_estrategico(data_eje_estrategico);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_eje_estrategico2 = async (): Promise<void> => {
    try {
      set_rows_eje_estrategico([]);
      const response = await get_eje_estrategico();
      if (response?.length > 0) {
        const data_eje_estrategico: IEjeEstrategico[] | any = response.map(
          (item: IEjeEstrategico) => ({
            id_eje_estrategico: item.id_eje_estrategico,
            nombre_plan: item.nombre_plan,
            nombre_tipo_eje: item.nombre_tipo_eje,
            nombre: item.nombre,
            id_plan: item.id_plan,
            id_tipo_eje: item.id_tipo_eje,
          })
        );
        set_rows_eje_estrategico(data_eje_estrategico);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_tipo_eje = async (): Promise<void> => {
    try {
      const response = await get_tipos_eje();
      if (response?.length > 0) {
        const data_tipo_eje: ValueProps[] | any = response.map(
          (item: TiposEjes) => ({
            value: item.id_tipo_eje,
            label: item.nombre_tipo_eje,
          })
        );
        set_tipo_eje_selected(data_tipo_eje);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const value: UserContext = {
    // * id

    // * select
    tipo_eje_selected,
    set_tipo_eje_selected,

    // * rows
    rows_eje_estrategico,
    set_rows_eje_estrategico,

    // * info

    // * fetch
    fetch_data_eje_estrategico,
    fetch_data_eje_estrategico2,
    fetch_data_tipo_eje,
  };

  return (
    <DataContextEjeEstrategico.Provider value={value}>
      {children}
    </DataContextEjeEstrategico.Provider>
  );
};
