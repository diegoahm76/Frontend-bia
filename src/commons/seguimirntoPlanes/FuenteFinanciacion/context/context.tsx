/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IConceptoPOAI, IFuentes } from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import { get_fuente_financiancion } from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_concepto_poai } from '../../ConceptoPOAI/services/services';

interface UserContext {
  // * id

  // * rows
  rows_fuentes: IFuentes[];
  set_rows_fuentes: (value: IFuentes[]) => void;

  // * select
  concepto_selected: ValueProps[];
  set_concepto_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_fuente_financiacion: () => Promise<void>;
  fetch_data_concepto: () => Promise<void>;
}

export const DataContextFuentesFinanciacion = createContext<UserContext>({
  rows_fuentes: [],
  set_rows_fuentes: () => {},

  concepto_selected: [],
  set_concepto_selected: () => {},

  fetch_data_fuente_financiacion: async () => {},
  fetch_data_concepto: async () => {},
});

export const UserProviderFuentesFinanciacion = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select
  const [concepto_selected, set_concepto_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_fuentes, set_rows_fuentes] = React.useState<IFuentes[]>([]);

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
        const data_fuentes: IFuentes[] = response.map((item: IFuentes) => ({
          id_fuente: item.id_fuente,
          nombre_fuente: item.nombre_fuente,
          vano_1: item.vano_1,
          vano_2: item.vano_2,
          vano_3: item.vano_3,
          vano_4: item.vano_4,
          concepto: item.concepto,
          id_concepto: item.id_concepto,
        }));

        set_rows_fuentes(data_fuentes);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_concepto = async (): Promise<void> => {
    try {
      const response = await get_concepto_poai();
      if (response?.length > 0) {
        const data_concepto: ValueProps[] | any = response.map(
          (item: IConceptoPOAI) => ({
            value: item.id_concepto,
            label: item.concepto,
          })
        );
        set_concepto_selected(data_concepto);
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
    concepto_selected,
    set_concepto_selected,

    // * rows
    rows_fuentes,
    set_rows_fuentes,

    // * info

    // * fetch
    fetch_data_fuente_financiacion,
    fetch_data_concepto,
  };

  return (
    <DataContextFuentesFinanciacion.Provider value={value}>
      {children}
    </DataContextFuentesFinanciacion.Provider>
  );
};
