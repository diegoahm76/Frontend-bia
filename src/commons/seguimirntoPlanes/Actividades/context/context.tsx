/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProductos, IActividades, IPlanes } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { get_productos, get_actividades_id_plan, get_planes, get_actividades_id } from '../services/services';
import type{ ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';

interface UserContext {
  // * id
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_proyecto: number | null;
  set_id_proyecto: (value: number | null) => void;
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_actividad: number | null;
  set_id_actividad: (value: number | null) => void;
  id_producto: number | null;
  set_id_producto: (value: number | null) => void;

  // * rows
  rows_actividad: IActividades[];
  set_rows_actividad: (value: IActividades[]) => void;
  rows_productos: IProductos[];
  set_rows_productos: (value: IProductos[]) => void;

  // * select
  planes_selected: ValueProps[];
  set_planes_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_actividad: () => Promise<void>;
  fetch_data_producto: () => Promise<void>;
  fetch_data_planes_selected: () => Promise<void>;
  fetch_data_actividad_id_plan: () => Promise<void>;

}

export const DataContextActividades = createContext<UserContext>({
  // * id
  id_programa: null,
  set_id_programa: () => {},
  id_proyecto: null,
  set_id_proyecto: () => {},
  id_plan: null,
  set_id_plan: () => {},
  id_actividad: null,
  set_id_actividad: () => {},
  id_producto: null,
  set_id_producto: () => {},

  // * rows
  rows_actividad: [],
  set_rows_actividad: () => {},
  rows_productos: [],
  set_rows_productos: () => {},

  planes_selected: [],
  set_planes_selected: () => {},

  fetch_data_actividad: async () => {},
  fetch_data_producto: async () => {},
  fetch_data_planes_selected: async () => {},
  fetch_data_actividad_id_plan: async () => {},
});

export const UserProviderActividades = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);

  // * select
  const [planes_selected, set_planes_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_productos, set_rows_productos] = React.useState<IProductos[]>([]);
  const [rows_actividad, set_rows_actividad] = React.useState<IActividades[]>(
    []
  );

  // * info

  // * fetch
  //* declaracion context
  // const {
  //   producto: { id_producto },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_actividad = async (): Promise<void> => {
    try {
      set_rows_actividad([]);
      const response = await get_actividades_id(id_producto as number);
      if (response?.length > 0) {
        const data_actividad: IActividades[] = response.map(
          (item: IActividades) => ({
           ...item,
          })
        );

        set_rows_actividad(data_actividad);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_actividad_id_plan = async (): Promise<void> => {
    try {
      set_rows_actividad([]);
      const response = await get_actividades_id_plan(id_producto as number);
      if (response?.length > 0) {
        const data_actividad: IActividades[] = response.map(
          (item: IActividades) => ({
            ...item,
          })
        );

        set_rows_actividad(data_actividad);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_producto = async (): Promise<void> => {
    try {
      set_rows_productos([]);
      const response = await get_productos();
      if (response?.length > 0) {
        const data_proyecto: IProductos[] = response.map(
          (item: IProductos) => ({
            ...item,
          })
        );

        set_rows_productos(data_proyecto);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_planes_selected = async (): Promise<void> => {
    try {
      const response = await get_planes();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map(
          (item: IPlanes) => ({
            value: item.id_plan,
            label: item.nombre_plan,
          })
        );
        set_planes_selected(data_plan);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id
    id_programa,
    set_id_programa,
    id_proyecto,
    set_id_proyecto,
    id_plan,
    set_id_plan,
    id_actividad,
    set_id_actividad,
    id_producto,
    set_id_producto,

    // * select
    planes_selected,
    set_planes_selected,

    // * rows
    rows_productos,
    set_rows_productos,
    rows_actividad,
    set_rows_actividad,

    // * info

    // * fetch
    fetch_data_actividad,
    fetch_data_producto,
    fetch_data_planes_selected,
    fetch_data_actividad_id_plan,
  };

  return (
    <DataContextActividades.Provider value={value}>
      {children}
    </DataContextActividades.Provider>
  );
};
