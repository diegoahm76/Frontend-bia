/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IRubro,
  Indicadores,
  IActividades,
  IProductos,
  IProyectos,
  IProgramas,
} from '../../../types/types';
import { control_error } from '../../../../../helpers';
import {
  get_rubros,
  get_programas,
  get_producto_id_proyecto,
  get_actividades_id_producto,
  get_proyectos_id_programa,
} from '../services/services';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_indicadores } from '../../../Indicadores/services/services';

interface UserContext {
  // * id
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_proyecto: number | null;
  set_id_proyecto: (value: number | null) => void;
  id_producto: number | null;
  set_id_producto: (value: number | null) => void;
  // * rows
  rows_rubros: IRubro[];
  set_rows_rubros: (value: IRubro[]) => void;

  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  productos_selected: ValueProps[];
  set_productos_selected: (value: ValueProps[]) => void;
  actividades_selected: ValueProps[];
  set_actividades_selected: (value: ValueProps[]) => void;
  programas_selected: ValueProps[];
  set_programas_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_rubros: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_productos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  fetch_data_programas: () => Promise<void>;
}

export const DataContextRubros = createContext<UserContext>({
  // * id
  id_programa: null,
  set_id_programa: () => {},
  id_proyecto: null,
  set_id_proyecto: () => {},
  id_producto: null,
  set_id_producto: () => {},

  rows_rubros: [],
  set_rows_rubros: () => {},

  indicadores_selected: [],
  set_indicadores_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  productos_selected: [],
  set_productos_selected: () => {},
  actividades_selected: [],
  set_actividades_selected: () => {},
  programas_selected: [],
  set_programas_selected: () => {},

  fetch_data_rubros: async () => {},
  fetch_data_indicadores: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_productos: async () => {},
  fetch_data_actividades: async () => {},
  fetch_data_programas: async () => {},
});

export const UserProviderRubros = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);

  // * select

  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);

  const [proyectos_selected, set_proyectos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [productos_selected, set_productos_selected] = React.useState<
    ValueProps[]
  >([]);

  const [actividades_selected, set_actividades_selected] = React.useState<
    ValueProps[]
  >([]);

  const [programas_selected, set_programas_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_rubros, set_rows_rubros] = React.useState<IRubro[]>([]);

  // * info

  // * fetch
  const fetch_data_rubros = async (): Promise<void> => {
    try {
      const response = await get_rubros();
      if (response?.length > 0) {
        const data_rubros: IRubro[] | any = response.map((item: IRubro) => ({
          id_rubro: item.id_rubro,
          cuenta: item.cuenta,
          cod_pre: item.cod_pre,
          valcuenta: item.valcuenta,
          nombre_programa: item.nombre_programa,
          nombre_proyecto: item.nombre_proyecto,
          nombre_producto: item.nombre_producto,
          nombre_actividad: item.nombre_actividad,
          nombre_indicador: item.nombre_indicador,
          id_programa: item.id_programa,
          id_proyecto: item.id_proyecto,
          id_producto: item.id_producto,
          id_actividad: item.id_actividad,
          id_indicador: item.id_indicador,
        }));
        set_rows_rubros(data_rubros);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
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

  const fetch_data_proyectos = async (): Promise<void> => {
    try {
      const response = await get_proyectos_id_programa(id_programa!);
      if (response?.length > 0) {
        const data_proyectos: ValueProps[] | any = response.map(
          (item: IProyectos) => ({
            value: item.id_proyecto,
            label: item.nombre_proyecto,
          })
        );
        set_proyectos_selected(data_proyectos);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_productos = async (): Promise<void> => {
    try {
      set_productos_selected([]);
      const response = await get_producto_id_proyecto(id_proyecto!);
      if (response?.length > 0) {
        const data_productos: ValueProps[] | any = response.map(
          (item: IProductos) => ({
            value: item.id_producto,
            label: item.nombre_producto,
          })
        );
        set_productos_selected(data_productos);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_actividades = async (): Promise<void> => {
    try {
      set_actividades_selected([]);
      const response = await get_actividades_id_producto(id_producto!);
      if (response?.length > 0) {
        const data_actividades: ValueProps[] | any = response.map(
          (item: IActividades) => ({
            value: item.id_actividad,
            label: item.nombre_actividad,
          })
        );
        set_actividades_selected(data_actividades);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_programas = async (): Promise<void> => {
    try {
      const response = await get_programas();
      if (response?.length > 0) {
        const data_programas: ValueProps[] | any = response.map(
          (item: IProgramas) => ({
            value: item.id_programa,
            label: item.nombre_programa,
          })
        );
        set_programas_selected(data_programas);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id
    id_programa,
    set_id_programa,
    id_proyecto,
    set_id_proyecto,
    id_producto,
    set_id_producto,
    // * select
    indicadores_selected,
    set_indicadores_selected,
    proyectos_selected,
    set_proyectos_selected,
    productos_selected,
    set_productos_selected,
    actividades_selected,
    set_actividades_selected,
    programas_selected,
    set_programas_selected,
    // * rows
    rows_rubros,
    set_rows_rubros,

    // * info

    // * fetch
    fetch_data_rubros,
    fetch_data_indicadores,
    fetch_data_proyectos,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_programas,
  };

  return (
    <DataContextRubros.Provider value={value}>
      {children}
    </DataContextRubros.Provider>
  );
};
