/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IDetalleCuentas,
  ISubprogramas,
  IProgramas,
  IProyectos,
  IRubro,
  IActividades,
  IProductos,
} from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import {
  get_sector,
  get_detalle_inversion,
  get_subprogramas,
  get_programas,
  get_rubros,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import type { ISector } from '../../configuraciones/interfaces/interfaces';
import {
  get_actividades_id_producto,
  get_producto_id_proyecto,
  get_proyectos_id_programa,
} from '../../Rubro/Rubro/services/services';

interface UserContext {
  // * id
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
  rows_detalle_inversion: IDetalleCuentas[];
  set_rows_detalle_inversion: (value: IDetalleCuentas[]) => void;

  // * select
  sector_selected: ValueProps[];
  set_sector_selected: (value: ValueProps[]) => void;
  subprogramas_selected: ValueProps[];
  set_subprogramas_selected: (value: ValueProps[]) => void;
  rubros_selected: ValueProps[];
  set_rubros_selected: (value: ValueProps[]) => void;

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

  fetch_data_detalle_inversion: () => Promise<void>;
  fetch_data_sectores: () => Promise<void>;
  fetch_data_subprogramas: () => Promise<void>;
  fetch_data_programas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_rubros: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  fetch_data_productos: () => Promise<void>;
}

export const DataContextDetalleInversion = createContext<UserContext>({
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

  rows_detalle_inversion: [],
  set_rows_detalle_inversion: () => {},

  // * select
  sector_selected: [],
  set_sector_selected: () => {},
  subprogramas_selected: [],
  set_subprogramas_selected: () => {},
  rubros_selected: [],
  set_rubros_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  productos_selected: [],
  set_productos_selected: () => {},
  actividades_selected: [],
  set_actividades_selected: () => {},
  programas_selected: [],
  set_programas_selected: () => {},

  fetch_data_detalle_inversion: async () => {},
  fetch_data_sectores: async () => {},
  fetch_data_subprogramas: async () => {},
  fetch_data_programas: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_rubros: async () => {},
  fetch_data_actividades: async () => {},
  fetch_data_productos: async () => {},
});

export const UserProviderDetalleInversion = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  /// * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);
  const [id_meta, set_id_meta] = React.useState<number | null>(null);

  // * select
  const [sector_selected, set_sector_selected] = React.useState<ValueProps[]>(
    []
  );
  const [subprogramas_selected, set_subprogramas_selected] = React.useState<
    ValueProps[]
  >([]);
  const [programas_selected, set_programas_selected] = React.useState<
    ValueProps[]
  >([]);
  const [proyectos_selected, set_proyectos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [rubros_selected, set_rubros_selected] = React.useState<ValueProps[]>(
    []
  );
  const [productos_selected, set_productos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [actividades_selected, set_actividades_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_detalle_inversion, set_rows_detalle_inversion] = React.useState<
    IDetalleCuentas[]
  >([]);

  // * info

  // * fetch
  // //* declaracion context
  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_detalle_inversion = async (): Promise<void> => {
    try {
      const response = await get_detalle_inversion();
      if (response?.length > 0) {
        const data_detalle_inversion: IDetalleCuentas[] = response.map(
          (item: IDetalleCuentas) => ({
            id_detalle_inversion: item.id_detalle_inversion,
            nombre_sector: item.nombre_sector,
            nombre_rubro: item.nombre_rubro,
            nombre_programa: item.nombre_programa,
            nombre_subprograma: item.nombre_subprograma,
            nombre_proyecto: item.nombre_proyecto,
            nombre_producto: item.nombre_producto,
            nombre_actividad: item.nombre_actividad,
            nombre_indicador: item.nombre_indicador,
            nombre_meta: item.nombre_meta,
            cuenta: item.cuenta,
            valor_cuenta: item.valor_cuenta,
            id_sector: item.id_sector,
            id_rubro: item.id_rubro,
            id_programa: item.id_programa,
            id_subprograma: item.id_subprograma,
            id_proyecto: item.id_proyecto,
            id_producto: item.id_producto,
            id_actividad: item.id_actividad,
            id_indicador: item.id_indicador,
            id_meta: item.id_meta,
          })
        );

        set_rows_detalle_inversion(data_detalle_inversion);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_sectores = async (): Promise<void> => {
    try {
      const response = await get_sector();
      if (response?.length > 0) {
        const data_sector: ValueProps[] | any = response.map(
          (item: ISector) => ({
            value: item.id_sector,
            label: item.nombre_sector,
          })
        );
        set_sector_selected(data_sector);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_subprogramas = async (): Promise<void> => {
    try {
      const response = await get_subprogramas();
      if (response?.length > 0) {
        const data_ISubprogramas: ValueProps[] | any = response.map(
          (item: ISubprogramas) => ({
            value: item.id_subprograma,
            label: item.nombre_subprograma,
          })
        );
        set_subprogramas_selected(data_ISubprogramas);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_rubros = async (): Promise<void> => {
    try {
      const response = await get_rubros();
      if (response?.length > 0) {
        const data_rubro: ValueProps[] | any = response.map((item: IRubro) => ({
          value: item.id_rubro,
          label: `${item.cuenta} - ${item.cod_pre}`,
        }));
        set_rubros_selected(data_rubro);
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
    sector_selected,
    set_sector_selected,
    subprogramas_selected,
    set_subprogramas_selected,
    programas_selected,
    set_programas_selected,
    proyectos_selected,
    set_proyectos_selected,
    rubros_selected,
    set_rubros_selected,
    productos_selected,
    set_productos_selected,
    actividades_selected,
    set_actividades_selected,

    // * rows
    rows_detalle_inversion,
    set_rows_detalle_inversion,

    // * info

    // * fetch
    fetch_data_detalle_inversion,
    fetch_data_sectores,
    fetch_data_subprogramas,
    fetch_data_programas,
    fetch_data_proyectos,
    fetch_data_rubros,
    fetch_data_actividades,
    fetch_data_productos,
  };

  return (
    <DataContextDetalleInversion.Provider value={value}>
      {children}
    </DataContextDetalleInversion.Provider>
  );
};
