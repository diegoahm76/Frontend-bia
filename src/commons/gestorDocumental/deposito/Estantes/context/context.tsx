/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import type {
  GetBandejas,
  GetEstantes,
  ListarDepositos,
  ListarSucursales,
} from '../types/types';
import {
  get_depositos,
  get_depositos_estante,
  get_estantes_deposito,
  get_sucursales,
} from '../services/services';
import { control_error } from '../../../../../helpers';

interface UserContext {
  // * id
  id_deposito: number | null;
  set_id_deposito: (value: number | null) => void;
  id_estante: number | null;
  set_id_estante: (value: number | null) => void;

  // * select
  sucusal_selected: ValueProps[];
  depositos_selected: ValueProps[];
  depositos_selected_mover_estante: ValueProps[];
  set_depositos_selected: (value: ValueProps[]) => void;
  set_sucusal_selected: (value: ValueProps[]) => void;
  set_depositos_selected_mover_estante: (value: ValueProps[]) => void;

  // * rows
  rows_estantes: GetEstantes[];
  set_rows_estantes: (value: GetEstantes[]) => void;
  rows_bandejas: GetBandejas[];
  set_rows_bandejas: (value: GetBandejas[]) => void;

  // * info
  identificacion_deposito: string;
  set_identificacion_deposito: (value: string) => void;

  // * fetch
  fetch_data_sucursal: () => Promise<void>;
  fetch_data_depositos: () => Promise<void>;
  fetch_data_estantes_depositos: () => Promise<void>;
  fetch_data_bandejas_estantes: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  // * id
  id_deposito: null,
  set_id_deposito: () => {},
  id_estante: null,
  set_id_estante: () => {},

  // * select
  sucusal_selected: [],
  depositos_selected: [],
  depositos_selected_mover_estante: [],
  set_depositos_selected: () => {},
  set_sucusal_selected: () => {},
  set_depositos_selected_mover_estante: () => {},

  // * rows
  rows_estantes: [],
  set_rows_estantes: () => {},
  rows_bandejas: [],
  set_rows_bandejas: () => {},

  // * info
  identificacion_deposito: '',
  set_identificacion_deposito: () => {},

  // * fetch
  fetch_data_sucursal: async () => {},
  fetch_data_depositos: async () => {},
  fetch_data_estantes_depositos: async () => {},
  fetch_data_bandejas_estantes: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_deposito, set_id_deposito] = React.useState<number | null>(null);
  const [id_estante, set_id_estante] = React.useState<number | null>(null);

  // * select
  const [sucusal_selected, set_sucusal_selected] = React.useState<ValueProps[]>(
    []
  );
  const [depositos_selected, set_depositos_selected] = React.useState<
    ValueProps[]
  >([]);

  const [
    depositos_selected_mover_estante,
    set_depositos_selected_mover_estante,
  ] = React.useState<ValueProps[]>([]);

  // * rows

  const [rows_estantes, set_rows_estantes] = React.useState<GetEstantes[]>([]);
  const [rows_bandejas, set_rows_bandejas] = React.useState<GetBandejas[]>([]);

  // * info
  const [identificacion_deposito, set_identificacion_deposito] =
    React.useState<string>('');

  // * fetch
  const fetch_data_sucursal = async (): Promise<void> => {
    try {
      const response = await get_sucursales();
      if (response?.length > 0) {
        const data_sucursal: ValueProps[] = response.map(
          (item: ListarSucursales) => ({
            value: item.id_sucursal_empresa,
            label: item.descripcion_sucursal,
          })
        );
        set_sucusal_selected(data_sucursal);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_depositos = async (): Promise<void> => {
    try {
      const response = await get_depositos();
      if (response?.length > 0) {
        const data_sucursal: ValueProps[] = response.map(
          (item: ListarDepositos) => ({
            value: item.id_deposito,
            label: item.nombre_deposito,
            // label: `${item.identificacion_por_entidad} - ${item.nombre_deposito}`,
          })
        );
        set_depositos_selected(data_sucursal);

        const data_mover: ValueProps[] = response.map(
          (item: ListarDepositos) => ({
            value: item.identificacion_por_entidad,
            label: item.nombre_deposito,
            // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
          })
        );
        set_depositos_selected_mover_estante(data_mover);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_estantes_depositos = async (): Promise<void> => {
    try {
      const response = await get_estantes_deposito(id_deposito as number);
      if (response?.length > 0) {
        const data_estantes: GetEstantes[] = response.map(
          (item: GetEstantes) => ({
            id_estante_deposito: item.id_estante_deposito,
            orden_ubicacion_por_deposito: item.orden_ubicacion_por_deposito,
            identificacion_por_deposito: item.identificacion_por_deposito,
          })
        );
        set_rows_estantes(data_estantes);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_bandejas_estantes = async (): Promise<void> => {
    try {
      const response = await get_depositos_estante(id_estante as number);
      if (response?.length > 0) {
        const data_bandejas: GetBandejas[] = response.map(
          (item: GetBandejas) => ({
            id_bandeja_estante: item.id_bandeja_estante,
            orden_ubicacion_por_estante: item.orden_ubicacion_por_estante,
            identificacion_por_estante: item.identificacion_por_estante,
          })
        );
        set_rows_bandejas(data_bandejas);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const value: UserContext = {
    // * id
    id_deposito,
    set_id_deposito,
    id_estante,
    set_id_estante,
    // * select
    sucusal_selected,
    depositos_selected,
    depositos_selected_mover_estante,
    set_depositos_selected,
    set_sucusal_selected,
    set_depositos_selected_mover_estante,
    // * rows
    rows_estantes,
    set_rows_estantes,
    rows_bandejas,
    set_rows_bandejas,
    // * info
    identificacion_deposito,
    set_identificacion_deposito,
    // * fetch
    fetch_data_sucursal,
    fetch_data_depositos,
    fetch_data_estantes_depositos,
    fetch_data_bandejas_estantes,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
