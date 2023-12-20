/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import {
  get_indicadores_id_actividad,
  get_metas_tiempo,
  get_planes,
} from '../services/services';
import type {
  IActividades,
  IProductos,
  IProgramas,
  IProyectos,
  Indicadores,
  IMetaIndicador,
  IPlanes,
} from '../../types/types';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_programas } from '../../Proyectos/services/services';
import {
  get_actividades_id_producto,
  get_producto_id_proyecto,
  get_proyectos_id_programa,
} from '../../Rubro/Rubro/services/services';
import { useConsultaMetasHook } from '../hooks/useConsultaMetasHook';
import dayjs from 'dayjs';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_proyecto: number | null;
  set_id_proyecto: (value: number | null) => void;
  id_producto: number | null;
  set_id_producto: (value: number | null) => void;
  id_actividad: number | null;
  set_id_actividad: (value: number | null) => void;
  id_inidicador: number | null;
  set_id_inidicador: (value: number | null) => void;

  // selected
  planes_selected: ValueProps[];
  set_planes_selected: (value: ValueProps[]) => void;
  programas_selected: ValueProps[];
  set_programas_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  productos_selected: ValueProps[];
  set_productos_selected: (value: ValueProps[]) => void;
  actividades_selected: ValueProps[];
  set_actividades_selected: (value: ValueProps[]) => void;
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;

  // * rows
  rows_metas: IMetaIndicador[];
  set_rows_metas: (value: IMetaIndicador[]) => void;

  // * info

  // loader
  loading: boolean;
  set_loading: (value: boolean) => void;

  tipo_consulta: string | null;
  set_tipo_consulta: (value: string | null) => void;

  // * fetch

  fetch_data_planes_selected: () => Promise<void>;
  fetch_data_programas_selected: () => Promise<void>;
  fetch_data_proyectos_selected: () => Promise<void>;
  fetch_data_productos_selected: () => Promise<void>;
  fetch_data_actividades_selected: () => Promise<void>;
  fetch_data_indicadores_selected: () => Promise<void>;
  // fetch_data_metas: () => Promise<void>;
}

export const DataContextConsulas = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  id_programa: null,
  set_id_programa: () => {},
  id_proyecto: null,
  set_id_proyecto: () => {},
  id_producto: null,
  set_id_producto: () => {},
  id_actividad: null,
  set_id_actividad: () => {},
  id_inidicador: null,
  set_id_inidicador: () => {},

  // selected
  planes_selected: [],
  set_planes_selected: () => {},
  programas_selected: [],
  set_programas_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  productos_selected: [],
  set_productos_selected: () => {},
  actividades_selected: [],
  set_actividades_selected: () => {},
  indicadores_selected: [],
  set_indicadores_selected: () => {},

  // * rows
  rows_metas: [],
  set_rows_metas: () => {},

  // loader
  loading: false,
  set_loading: () => {},

  tipo_consulta: null,
  set_tipo_consulta: () => {},

  // * info

  // * fetch
  fetch_data_planes_selected: async () => {},
  fetch_data_programas_selected: async () => {},
  fetch_data_proyectos_selected: async () => {},
  fetch_data_productos_selected: async () => {},
  fetch_data_actividades_selected: async () => {},
  fetch_data_indicadores_selected: async () => {},
  // fetch_data_metas: async () => {},
});

export const UserProviderConsultarPlanes = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_inidicador, set_id_inidicador] = React.useState<number | null>(
    null
  );

  // * select

  const [planes_selected, set_planes_selected] = React.useState<ValueProps[]>(
    []
  );
  const [programas_selected, set_programas_selected] = React.useState<
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
  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_metas, set_rows_metas] = React.useState<IMetaIndicador[]>([]);

  // * info

  // loader

  const [loading, set_loading] = React.useState<boolean>(false);

  const [tipo_consulta, set_tipo_consulta] = React.useState<string | null>(
    null
  );

  const fetch_data_planes_selected = async (): Promise<void> => {
    try {
      set_loading(true);
      const response = await get_planes();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map((item: IPlanes) => ({
          value: item.id_plan,
          label: item.nombre_plan,
        }));
        set_planes_selected(data_plan);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    } finally {
      set_loading(false);
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

  const fetch_data_indicadores = async (): Promise<void> => {
    try {
      set_indicadores_selected([]);
      const response = await get_indicadores_id_actividad(id_actividad!);
      if (response?.length > 0) {
        const data_indicador: ValueProps[] | any = response.map(
          (item: Indicadores) => ({
            value: item.id_indicador,
            label: item.nombre_indicador,
          })
        );
        set_indicadores_selected(data_indicador);
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
    id_programa,
    set_id_programa,
    id_proyecto,
    set_id_proyecto,
    id_producto,
    set_id_producto,
    id_actividad,
    set_id_actividad,
    id_inidicador,
    set_id_inidicador,

    // * select

    planes_selected,
    set_planes_selected,
    programas_selected,
    set_programas_selected,
    proyectos_selected,
    set_proyectos_selected,
    productos_selected,
    set_productos_selected,
    actividades_selected,
    set_actividades_selected,
    indicadores_selected,
    set_indicadores_selected,

    // * rows
    rows_metas,
    set_rows_metas,

    // * info

    // loader

    loading,
    set_loading,

    tipo_consulta,
    set_tipo_consulta,

    // * fetch
    fetch_data_planes_selected,
    fetch_data_programas_selected: fetch_data_programas,
    fetch_data_proyectos_selected: fetch_data_proyectos,
    fetch_data_productos_selected: fetch_data_productos,
    fetch_data_actividades_selected: fetch_data_actividades,
    fetch_data_indicadores_selected: fetch_data_indicadores,
    // fetch_data_metas,
  };

  return (
    <DataContextConsulas.Provider value={value}>
      {children}
    </DataContextConsulas.Provider>
  );
};
