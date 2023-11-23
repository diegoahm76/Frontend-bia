/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IFuentesFinanciacion, Indicadores } from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import { get_cuencas, get_fuente_financiancion } from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import type { Cuenca } from '../../configuraciones/interfaces/interfaces';
import { get_indicadores } from '../../Indicadores/services/services';

interface UserContext {
  // * id

  // * rows
  rows_fuentes: IFuentesFinanciacion[];
  set_rows_fuentes: (value: IFuentesFinanciacion[]) => void;

  // * select
  cuencas_selected: ValueProps[];
  set_cuencas_selected: (value: ValueProps[]) => void;
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  // * info

  // * fetch

  fetch_data_fuente_financiacion: () => Promise<void>;
  fetch_data_cuencas: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
}

export const DataContextFuentesFinanciacion = createContext<UserContext>({
  rows_fuentes: [],
  set_rows_fuentes: () => {},

  cuencas_selected: [],
  set_cuencas_selected: () => {},
  indicadores_selected: [],
  set_indicadores_selected: () => {},

  fetch_data_fuente_financiacion: async () => {},
  fetch_data_cuencas: async () => {},
  fetch_data_indicadores: async () => {},
});

export const UserProviderFuentesFinanciacion = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select
  const [cuencas_selected, set_cuencas_selected] = React.useState<ValueProps[]>(
    []
  );
  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_fuentes, set_rows_fuentes] = React.useState<IFuentesFinanciacion[]>(
    []
  );

  // * info

  // * fetch
  // //* declaracion context
  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_fuente_financiacion = async (): Promise<void> => {
    try {
      const response = await get_fuente_financiancion();
      if (response?.length > 0) {
        const data_fuentes: IFuentesFinanciacion[] = response.map(
          (item: IFuentesFinanciacion) => ({
            id_fuente: item.id_fuente,
            nombre_fuente: item.nombre_fuente,
            nombre_indicador: item.nombre_indicador,
            nombre_cuenca: item.nombre_cuenca,
            vano_1: item.vano_1,
            vano_2: item.vano_2,
            vano_3: item.vano_3,
            vano_4: item.vano_4,
            valor_total: item.valor_total,
            id_cuenca: item.id_cuenca,
            id_indicador: item.id_indicador,
          })
        );

        set_rows_fuentes(data_fuentes);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_cuencas = async (): Promise<void> => {
    try {
      const response = await get_cuencas();
      if (response?.length > 0) {
        const data_cuencas: ValueProps[] = response.map((item: Cuenca) => ({
          value: item.id_cuenca,
          label: item.nombre,
        }));
        set_cuencas_selected(data_cuencas);
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

  const value: UserContext = {
    // * id

    // * select
    cuencas_selected,
    set_cuencas_selected,
    indicadores_selected,
    set_indicadores_selected,

    // * rows
    rows_fuentes,
    set_rows_fuentes,

    // * info

    // * fetch
    fetch_data_fuente_financiacion,
    fetch_data_cuencas,
    fetch_data_indicadores,
  };

  return (
    <DataContextFuentesFinanciacion.Provider value={value}>
      {children}
    </DataContextFuentesFinanciacion.Provider>
  );
};
