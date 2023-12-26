/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IActividades,
  IPlanes,
  IProductos,
  IProyectos,
  Indicadores,
} from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import {
  get_actividades,
  get_indicadores,
  get_medidor,
  get_planes,
  get_productos,
  get_tipos,
  get_proyectos,
} from '../services/services';
import { IMedicion, ITipos } from '../../configuraciones/interfaces/interfaces';

interface UserContext {
  // * id
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;

  // * rows
  rows_indicador: Indicadores[];
  set_rows_indicador: (value: Indicadores[]) => void;

  // * select
  planes_selected: ValueProps[];
  set_planes_selected: (value: ValueProps[]) => void;
  actividad_selected: ValueProps[];
  set_actividad_selected: (value: ValueProps[]) => void;
  productos_selected: ValueProps[];
  set_productos_selected: (value: ValueProps[]) => void;
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  // configutariones basicas selected
  medidor_selected: ValueProps[];
  set_medidor_selected: (value: ValueProps[]) => void;
  tipos_selected: ValueProps[];
  set_tipos_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_actividad_selected: () => Promise<void>;
  fetch_data_producto_selected: () => Promise<void>;
  fetch_data_planes_selected: () => Promise<void>;
  fetch_data_proyectos_selected: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;

  fetch_data_medidor_selected: () => Promise<void>;
  fetch_data_tipos_selected: () => Promise<void>;
}

export const DataContextIndicador = createContext<UserContext>({
  // * id
  id_programa: null,
  set_id_programa: () => {},
  // * rows
  rows_indicador: [],
  set_rows_indicador: () => {},

  actividad_selected: [],
  set_actividad_selected: () => {},
  planes_selected: [],
  set_planes_selected: () => {},
  productos_selected: [],
  set_productos_selected: () => {},
  indicadores_selected: [],
  set_indicadores_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  // configutariones basicas selected
  medidor_selected: [],
  set_medidor_selected: () => {},
  tipos_selected: [],
  set_tipos_selected: () => {},

  fetch_data_actividad_selected: async () => {},
  fetch_data_producto_selected: async () => {},
  fetch_data_planes_selected: async () => {},
  fetch_data_proyectos_selected: async () => {},
  fetch_data_indicadores: async () => {},

  fetch_data_medidor_selected: async () => {},
  fetch_data_tipos_selected: async () => {},
});

export const UserProviderIndicador = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_programa, set_id_programa] = React.useState<number | null>(null);

  // * select
  const [planes_selected, set_planes_selected] = React.useState<ValueProps[]>(
    []
  );
  const [productos_selected, set_productos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [actividad_selected, set_actividad_selected] = React.useState<
    ValueProps[]
  >([]);
  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);
  const [proyectos_selected, set_proyectos_selected] = React.useState<
    ValueProps[]
  >([]);
  // configutariones basicas selected
  const [medidor_selected, set_medidor_selected] = React.useState<ValueProps[]>(
    []
  );
  const [tipos_selected, set_tipos_selected] = React.useState<ValueProps[]>([]);

  // * rows
  const [rows_indicador, set_rows_indicador] = React.useState<Indicadores[]>(
    []
  );

  // * info

  // * fetch
  // //* declaracion context
  // const dispatch = useAppDispatch();
  // const {
  //   producto: { id_producto },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_indicadores = async (): Promise<void> => {
    try {
      const response = await get_indicadores();
      if (response?.length > 0) {
        const data_indicador: Indicadores[] = response.map(
          (item: Indicadores) => ({
            id_indicador: item.id_indicador,
            nombre_indicador: item.nombre_indicador,
            linea_base: item.linea_base,
            medida: item.medida,
            id_medicion: item.id_medicion,
            id_tipo: item.id_tipo,
            id_producto: item.id_producto,
            id_actividad: item.id_actividad,
            id_plan: item.id_plan,
            id_proyecto: item.id_proyecto,
            tipo_indicador: item.tipo_indicador,
            nombre_medicion: item.nombre_medicion,
            nombre_tipo: item.nombre_tipo,
            nombre_producto: item.nombre_producto,
            nombre_actividad: item.nombre_actividad,
            nombre_plan: item.nombre_plan,
            id_programa: item.id_programa,
            fecha_creacion: item.fecha_creacion,
            cumplio: item.cumplio,
          })
        );
        // dispatch(
        //   set_current_indicador(data_indicador)
        // );
        set_rows_indicador(data_indicador);
        const data_indicador_selected: ValueProps[] | any = response.map(
          (item: Indicadores) => ({
            value: item.id_indicador,
            label: item.nombre_indicador,
          })
        );
        set_indicadores_selected(data_indicador_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_actividad_selected = async (): Promise<void> => {
    try {
      set_actividad_selected([]);
      const response = await get_actividades();
      if (response?.length > 0) {
        const data_producto: ValueProps[] | any = response.map(
          (item: IActividades) => ({
            value: item.id_actividad,
            label: item.nombre_actividad,
          })
        );
        set_actividad_selected(data_producto);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_producto_selected = async (): Promise<void> => {
    try {
      set_productos_selected([]);
      const response = await get_productos();
      if (response?.length > 0) {
        const data_producto: ValueProps[] | any = response.map(
          (item: IProductos) => ({
            value: item.id_producto,
            label: item.nombre_producto,
          })
        );
        set_productos_selected(data_producto);
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
    }
  };

  const fetch_data_medidor_selected = async (): Promise<void> => {
    try {
      const response = await get_medidor();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map(
          (item: IMedicion) => ({
            value: item.id_medicion,
            label: item.nombre_medicion,
          })
        );
        set_medidor_selected(data_plan);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_tipos_selected = async (): Promise<void> => {
    try {
      const response = await get_tipos();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map((item: ITipos) => ({
          value: item.id_tipo,
          label: item.nombre_tipo,
        }));
        set_tipos_selected(data_plan);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_proyectos_selected = async (): Promise<void> => {
    try {
      const response = await get_proyectos();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map(
          (item: IProyectos) => ({
            value: item.id_proyecto,
            label: item.nombre_proyecto,
          })
        );
        set_proyectos_selected(data_plan);
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
    // * select
    planes_selected,
    set_planes_selected,
    productos_selected,
    set_productos_selected,
    actividad_selected,
    set_actividad_selected,
    proyectos_selected,
    set_proyectos_selected,
    // configutariones basicas selected
    medidor_selected,
    set_medidor_selected,
    tipos_selected,
    set_tipos_selected,
    indicadores_selected,
    set_indicadores_selected,

    // * rows
    rows_indicador,
    set_rows_indicador,

    // * info

    // * fetch
    fetch_data_actividad_selected,
    fetch_data_producto_selected,
    fetch_data_planes_selected,
    fetch_data_proyectos_selected,
    fetch_data_indicadores,

    fetch_data_medidor_selected,
    fetch_data_tipos_selected,
  };

  return (
    <DataContextIndicador.Provider value={value}>
      {children}
    </DataContextIndicador.Provider>
  );
};
