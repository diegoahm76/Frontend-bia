/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IEjeEstrategico } from '../../types/types';
import { control_error } from '../../../../helpers';
import {
  get_eje_estrategico,
  get_eje_estrategico_id,
  get_eje_estrategico_id_obj,
  get_tipos_eje,
} from '../services/services';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { TiposEjes } from '../../configuraciones/interfaces/interfaces';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_programa: number | null;
  id_objetivo: number | null;
  set_id_programa: (value: number | null) => void;
  set_id_objetivo: (value: number | null) => void;
  id_eje_estrategico: number | null;
  set_id_eje_estrategico: (value: number | null) => void;


  // * rows
  rows_eje_estrategico: IEjeEstrategico[];
  set_rows_eje_estrategico: (value: IEjeEstrategico[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_eje_estrategico: () => Promise<void>;
  fetch_data_eje_estrategico_id_obj: () => Promise<void>;
  fetch_data_eje_estrategico2: () => Promise<void>;
  fetch_data_tipo_eje: () => Promise<void>;
}

export const DataContextEjeEstrategico = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  id_programa: null,
  id_objetivo: null,
  set_id_programa: () => {},
  set_id_objetivo: () => {},
  id_eje_estrategico: null,
  set_id_eje_estrategico: () => {},

  rows_eje_estrategico: [],
  set_rows_eje_estrategico: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_eje_estrategico: async () => {},
  fetch_data_eje_estrategico_id_obj: async () => {},
  fetch_data_eje_estrategico2: async () => {},
  fetch_data_tipo_eje: async () => {},
});

export const UserProviderEjeEstrategico = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_objetivo, set_id_objetivo] = React.useState<number | null>(null);
  const [id_eje_estrategico, set_id_eje_estrategico] = React.useState<number | null>(
    null
  );

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
  // const {
  //   plan: { id_plan },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_eje_estrategico = async (): Promise<void> => {
    set_rows_eje_estrategico([]);
    try {
      const response = await get_eje_estrategico_id(id_plan as number);
      if (response?.length > 0) {
        const data_eje_estrategico: IEjeEstrategico[] = response.map(
          (item: IEjeEstrategico) => ({
            ...item,
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

  const fetch_data_eje_estrategico_id_obj = async (): Promise<void> => {
    set_rows_eje_estrategico([]);
    try {
      const response = await get_eje_estrategico_id_obj(id_objetivo as number);
      if (response?.length > 0) {
        const data_eje_estrategico: IEjeEstrategico[] = response.map(
          (item: IEjeEstrategico) => ({
            ...item,
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
    id_plan,
    set_id_plan,
    id_programa,
    id_objetivo,
    set_id_programa,
    set_id_objetivo,
    id_eje_estrategico,
    set_id_eje_estrategico,

    // * select
    tipo_eje_selected,
    set_tipo_eje_selected,

    // * rows
    rows_eje_estrategico,
    set_rows_eje_estrategico,

    // * info

    // * fetch
    fetch_data_eje_estrategico,
    fetch_data_eje_estrategico_id_obj,
    fetch_data_eje_estrategico2,
    fetch_data_tipo_eje,
  };

  return (
    <DataContextEjeEstrategico.Provider value={value}>
      {children}
    </DataContextEjeEstrategico.Provider>
  );
};
