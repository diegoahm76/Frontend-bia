/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IFuentesFinanciacion,
  Indicadores,
  IActividades,
  IProductos,
  IProyectos,
  IMetaIndicador,
} from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import {
  get_cuencas,
  get_fuente_financiancion,
  get_producto_id_proyecto,
  get_actividades_id_producto,
  get_proyectos,
  get_metas_id_indicador,
  get_fuente_financiancion_by_meta_id,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import type { Cuenca } from '../../configuraciones/interfaces/interfaces';
import { get_indicadores } from '../../Indicadores/services/services';

interface UserContext {
  // * id
  id_plan: number | null;
  id_programa: number | null;
  id_proyecto: number | null;
  id_producto: number | null;
  id_actividad: number | null;
  id_indicador: number | null;
  id_meta: number | null;
  set_id_plan: (value: number | null) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_producto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  set_id_indicador: (value: number | null) => void;
  set_id_meta: (value: number | null) => void;

  // * rows
  rows_fuentes: IFuentesFinanciacion[];
  set_rows_fuentes: (value: IFuentesFinanciacion[]) => void;
  rows_metas: IMetaIndicador[];
  set_rows_metas: (value: IMetaIndicador[]) => void;

  // * select
  cuencas_selected: ValueProps[];
  set_cuencas_selected: (value: ValueProps[]) => void;
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  productos_selected: ValueProps[];
  set_productos_selected: (value: ValueProps[]) => void;
  actividades_selected: ValueProps[];
  set_actividades_selected: (value: ValueProps[]) => void;
  // * info

  // * fetch

  fetch_data_fuente_financiacion: () => Promise<void>;
  fetch_data_fuente_financiacion_indicadores: () => Promise<void>;
  fetch_data_cuencas: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_productos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  fetch_data_metas_id_indicador: () => Promise<void>;
}

export const DataContextFuentesFinanciacion = createContext<UserContext>({
  // * id
  id_plan: null,
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,

  set_id_plan: () => {},
  set_id_programa: () => {},
  set_id_proyecto: () => {},
  set_id_producto: () => {},
  set_id_actividad: () => {},
  set_id_indicador: () => {},
  set_id_meta: () => {},

  rows_fuentes: [],
  set_rows_fuentes: () => {},
  rows_metas: [],
  set_rows_metas: () => {},

  cuencas_selected: [],
  set_cuencas_selected: () => {},
  indicadores_selected: [],
  set_indicadores_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  productos_selected: [],
  set_productos_selected: () => {},
  actividades_selected: [],
  set_actividades_selected: () => {},

  fetch_data_fuente_financiacion: async () => {},
  fetch_data_fuente_financiacion_indicadores: async () => {},
  fetch_data_cuencas: async () => {},
  fetch_data_indicadores: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_productos: async () => {},
  fetch_data_actividades: async () => {},
  fetch_data_metas_id_indicador: async () => {},
});

export const UserProviderFuentesFinanciacion = ({
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
  const [id_meta, set_id_meta] = React.useState<number | null>(null);
  // * select
  const [cuencas_selected, set_cuencas_selected] = React.useState<ValueProps[]>(
    []
  );
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

  // * rows

  const [rows_fuentes, set_rows_fuentes] = React.useState<
    IFuentesFinanciacion[]
  >([]);

  const [rows_metas, set_rows_metas] = React.useState<IMetaIndicador[]>([]);

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
            ...item,
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

  const fetch_data_fuente_financiacion_indicadores = async (): Promise<void> => {
    try {
      console.log(id_meta)
      const response = await get_fuente_financiancion_by_meta_id(id_meta || 0);
      if (response?.length > 0) {
        const data_fuentes: IFuentesFinanciacion[] = response.map(
          (item: any) => ({
            ...item,
          })
        );
        set_rows_fuentes(data_fuentes);
      }
    } catch (error: any) {
      set_rows_fuentes([]);
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

  const fetch_data_proyectos = async (): Promise<void> => {
    try {
      const response = await get_proyectos();
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

  const fetch_data_metas_id_indicador = async (): Promise<void> => {
    try {
      set_rows_metas([]);
      const response = await get_metas_id_indicador(id_indicador!);
      if (response?.length > 0) {
        const data_metas: IMetaIndicador[] = response.map(
          (item: IMetaIndicador) => ({
            ...item,
          })
        );
        set_rows_metas(data_metas);
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
    id_meta,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,

    // * select
    cuencas_selected,
    set_cuencas_selected,
    indicadores_selected,
    set_indicadores_selected,
    proyectos_selected,
    set_proyectos_selected,
    productos_selected,
    set_productos_selected,
    actividades_selected,
    set_actividades_selected,

    // * rows
    rows_fuentes,
    set_rows_fuentes,
    rows_metas,
    set_rows_metas,

    // * info

    // * fetch
    fetch_data_fuente_financiacion,
    fetch_data_fuente_financiacion_indicadores,
    fetch_data_cuencas,
    fetch_data_indicadores,
    fetch_data_proyectos,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_metas_id_indicador,
  };

  return (
    <DataContextFuentesFinanciacion.Provider value={value}>
      {children}
    </DataContextFuentesFinanciacion.Provider>
  );
};
