/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IConceptoPOAI,
  IUnidadesActuales,
  Indicadores,
} from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import {
  get_concepto_poai,
  get_unidades_organizacionales,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_indicadores } from '../../Indicadores/services/services';

interface UserContext {
  // * id
  id_plan: number | null;
  id_programa: number | null;
  id_proyecto: number | null;
  id_producto: number | null;
  id_actividad: number | null;
  id_indicador: number | null;
  set_id_plan: (value: number | null) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_producto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  set_id_indicador: (value: number | null) => void;

  // * rows
  rows_concepto: IConceptoPOAI[];
  set_rows_concepto: (value: IConceptoPOAI[]) => void;

  // * select
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  unidades_organizacionales_selected: ValueProps[];
  set_unidades_organizacionales_selected: (value: ValueProps[]) => void;
  // * info

  // * fetch

  fetch_data_concepto_poai: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
  fetch_data_unidades_organizacionales: () => Promise<void>;
}

export const DataContextConceptoPOAI = createContext<UserContext>({
  id_plan: null,
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  set_id_plan: () => {},
  set_id_programa: () => {},
  set_id_proyecto: () => {},
  set_id_producto: () => {},
  set_id_actividad: () => {},
  set_id_indicador: () => {},

  rows_concepto: [],
  set_rows_concepto: () => {},

  indicadores_selected: [],
  set_indicadores_selected: () => {},
  unidades_organizacionales_selected: [],
  set_unidades_organizacionales_selected: () => {},

  fetch_data_concepto_poai: async () => {},
  fetch_data_indicadores: async () => {},
  fetch_data_unidades_organizacionales: async () => {},
});

export const UserProviderConceptoPOAI = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);
  // * select
  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);
  const [
    unidades_organizacionales_selected,
    set_unidades_organizacionales_selected,
  ] = React.useState<ValueProps[]>([]);

  // * rows

  const [rows_concepto, set_rows_concepto] = React.useState<IConceptoPOAI[]>(
    []
  );

  // * info

  // * fetch
  // //* declaracion context
  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_concepto_poai = async (): Promise<void> => {
    try {
      const response = await get_concepto_poai();
      if (response?.length > 0) {
        const data_concepto: IConceptoPOAI[] = response.map(
          (item: IConceptoPOAI) => ({
            id_concepto: item.id_concepto,
            nombre_indicador: item.nombre_indicador,
            nombre: item.nombre,
            concepto: item.concepto,
            cuenta: item.cuenta,
            valor_total: item.valor_total,
            id_rubro: item.id_rubro,
            id_indicador: item.id_indicador,
            id_unidad_organizacional: item.id_unidad_organizacional,
          })
        );

        set_rows_concepto(data_concepto);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_indicadores = async (): Promise<void> => {
    try {
      const response = await get_indicadores();
      if (response?.length > 0) {
        const data_indicadores: ValueProps[] | any = response.map(
          (item: Indicadores) => ({
            value: item.id_indicador,
            label: item.nombre_indicador,
          })
        );
        set_indicadores_selected(data_indicadores);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_unidades_organizacionales = async (): Promise<void> => {
    try {
      const response = await get_unidades_organizacionales();
      if (response?.length > 0) {
        const data_unidades_organizacionales: ValueProps[] | any = response.map(
          (item: IUnidadesActuales) => ({
            value: item.id_unidad_organizacional,
            label: item.nombre,
          })
        );
        set_unidades_organizacionales_selected(data_unidades_organizacionales);
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
    id_programa,
    id_proyecto,
    id_producto,
    id_actividad,
    id_indicador,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,

    // * select
    indicadores_selected,
    set_indicadores_selected,
    unidades_organizacionales_selected,
    set_unidades_organizacionales_selected,

    // * rows
    rows_concepto,
    set_rows_concepto,

    // * info

    // * fetch
    fetch_data_concepto_poai,
    fetch_data_indicadores,
    fetch_data_unidades_organizacionales,
  };

  return (
    <DataContextConceptoPOAI.Provider value={value}>
      {children}
    </DataContextConceptoPOAI.Provider>
  );
};
