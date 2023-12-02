/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  ISeguimientoPAI,
  IActividades,
  Indicadores,
  IProyectos,
  IMetaIndicador,
  IProductos,
  IUnidadesActuales,
} from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import {
  get_productos,
  get_seguimiento_pai,
  get_actividades,
  get_indicadores,
  get_proyectos,
  get_metas,
  get_documentos_seguimiento_pai,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_unidades_organizacionales } from '../../ConceptoPOAI/services/services';
import { useAppSelector } from '../../../../hooks';
import { AxiosError } from 'axios';

interface UserContext {
  // * id

  // * rows
  rows_seguimiento_pai: ISeguimientoPAI[];
  set_rows_seguimiento_pai: (value: ISeguimientoPAI[]) => void;
  rows_anexos: any[];
  set_rows_anexos: (value: any[]) => void;

  // * select
  productos_selected: ValueProps[];
  set_productos_selected: (value: ValueProps[]) => void;
  actividades_selected: ValueProps[];
  set_actividades_selected: (value: ValueProps[]) => void;
  indicadores_selected: ValueProps[];
  set_indicadores_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  metas_selected: ValueProps[];
  set_metas_selected: (value: ValueProps[]) => void;
  unidad_organizacional_selected: ValueProps[];
  set_unidad_organizacional_selected: (value: ValueProps[]) => void;

  // archivos

  archivos: any;
  set_archivos: (archivos: any) => void;
  // * info

  // * fetch

  fetch_data_seguimiento_pai: () => Promise<void>;
  fetch_data_productos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_metas: () => Promise<void>;
  fetch_data_unidad_organizacional: () => Promise<void>;
  fetch_data_anexos: () => Promise<void>;
}

export const DataContextSeguimientoPAI = createContext<UserContext>({
  rows_seguimiento_pai: [],
  set_rows_seguimiento_pai: () => {},
  rows_anexos: [],
  set_rows_anexos: () => {},

  productos_selected: [],
  set_productos_selected: () => {},
  actividades_selected: [],
  set_actividades_selected: () => {},
  indicadores_selected: [],
  set_indicadores_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  metas_selected: [],
  set_metas_selected: () => {},
  unidad_organizacional_selected: [],
  set_unidad_organizacional_selected: () => {},

  archivos: [null],
  set_archivos: () => {},

  fetch_data_seguimiento_pai: async () => {},
  fetch_data_productos: async () => {},
  fetch_data_actividades: async () => {},
  fetch_data_indicadores: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_metas: async () => {},
  fetch_data_unidad_organizacional: async () => {},
  fetch_data_anexos: async () => {},
});

export const UserProviderSeguimientoPAI = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select
  const [productos_selected, set_productos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [actividades_selected, set_actividades_selected] = React.useState<
    ValueProps[]
  >([]);
  const [indicadores_selected, set_indicadores_selected] = React.useState<
    ValueProps[]
  >([]);
  const [proyectos_selected, set_proyectos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [metas_selected, set_metas_selected] = React.useState<ValueProps[]>([]);
  const [unidad_organizacional_selected, set_unidad_organizacional_selected] =
    React.useState<ValueProps[]>([]);

  // archivos
  const [archivos, set_archivos] = React.useState<Array<File | null>>([null]);

  // * rows

  const [rows_seguimiento_pai, set_rows_seguimiento_pai] = React.useState<
    ISeguimientoPAI[]
  >([]);
  const [rows_anexos, set_rows_anexos] = React.useState<any[]>([]);

  // * info

  // * fetch
  // //* declaracion context
  const {
    seguimiento_pai: { id_seguimiento_pai },
  } = useAppSelector((state) => state.planes);

  const fetch_data_seguimiento_pai = async (): Promise<void> => {
    try {
      const response = await get_seguimiento_pai();
      if (response?.length > 0) {
        const data: ISeguimientoPAI[] = response.map(
          (item: ISeguimientoPAI) => ({
            id_seguimiento_pai: item.id_seguimiento_pai,
            nombre_proyecto: item.nombre_proyecto,
            nombre_producto: item.nombre_producto,
            nombre_actividad: item.nombre_actividad,
            nombre_unidad: item.nombre_unidad,
            nombre_indicador: item.nombre_indicador,
            nombre_meta: item.nombre_meta,
            razagada: item.razagada,
            mes: item.mes,
            porcentaje_avance: item.porcentaje_avance,
            fecha_registro_avance: item.fecha_registro_avance,
            entrega_vigencia: item.entrega_vigencia,
            hizo: item.hizo,
            cuando: item.cuando,
            donde: item.donde,
            resultado: item.resultado,
            participacion: item.participacion,
            beneficiarios: item.beneficiarios,
            compromisos: item.compromisos,
            contratros: item.contratros,
            id_unidad_organizacional: item.id_unidad_organizacional,
            id_proyecto: item.id_proyecto,
            id_producto: item.id_producto,
            id_actividad: item.id_actividad,
            id_indicador: item.id_indicador,
            id_meta: item.id_meta,
          })
        );
        set_rows_seguimiento_pai(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_productos = async (): Promise<void> => {
    try {
      const response = await get_productos();
      if (response?.length > 0) {
        const data: ValueProps[] | any = response.map((item: IProductos) => ({
          value: item.id_producto,
          label: item.nombre_producto,
        }));
        set_productos_selected(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_actividades = async (): Promise<void> => {
    try {
      const response = await get_actividades();
      if (response?.length > 0) {
        const data: ValueProps[] | any = response.map((item: IActividades) => ({
          value: item.id_actividad,
          label: item.nombre_actividad,
        }));
        set_actividades_selected(data);
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
        const data: ValueProps[] | any = response.map((item: Indicadores) => ({
          value: item.id_indicador,
          label: item.nombre_indicador,
        }));
        set_indicadores_selected(data);
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
        const data: ValueProps[] | any = response.map((item: IProyectos) => ({
          value: item.id_proyecto,
          label: item.nombre_proyecto,
        }));
        set_proyectos_selected(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_metas = async (): Promise<void> => {
    try {
      const response = await get_metas();
      if (response?.length > 0) {
        const data: ValueProps[] | any = response.map(
          (item: IMetaIndicador) => ({
            value: item.id_meta,
            label: item.nombre_meta,
          })
        );
        set_metas_selected(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_unidad_organizacional = async (): Promise<void> => {
    try {
      const response = await get_unidades_organizacionales();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IUnidadesActuales) => ({
            value: item.id_unidad_organizacional,
            label: item.nombre,
          })
        );
        set_unidad_organizacional_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_anexos = async (): Promise<void> => {
    try {
      set_rows_anexos([]);
      if (id_seguimiento_pai) {
        const response = await get_documentos_seguimiento_pai(
          id_seguimiento_pai
        );
        let contador = 1;
        const responseWithCounter = response.map((obj: any) => {
          return { ...obj, numero_documento: contador++ };
        });
        set_rows_anexos(responseWithCounter);
        // set_rows_anexos(response);
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(
          err.response.data.detail || 'Algo paso, intente de nuevo'
        );
      }
    }
  };

  const value: UserContext = {
    // * id

    // * select
    productos_selected,
    set_productos_selected,
    actividades_selected,
    set_actividades_selected,
    indicadores_selected,
    set_indicadores_selected,
    proyectos_selected,
    set_proyectos_selected,
    metas_selected,
    set_metas_selected,
    unidad_organizacional_selected,
    set_unidad_organizacional_selected,

    // archivos
    archivos,
    set_archivos,

    // * rows
    rows_seguimiento_pai,
    set_rows_seguimiento_pai,
    rows_anexos,
    set_rows_anexos,

    // * info

    // * fetch
    fetch_data_seguimiento_pai,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_indicadores,
    fetch_data_proyectos,
    fetch_data_metas,
    fetch_data_unidad_organizacional,
    fetch_data_anexos,
  };

  return (
    <DataContextSeguimientoPAI.Provider value={value}>
      {children}
    </DataContextSeguimientoPAI.Provider>
  );
};
