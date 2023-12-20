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
  IProgramas,
} from '../../types/types';
import { control_error } from '../../../../helpers';
// import { useAppSelector } from '../../../../hooks';
import {
  get_seguimiento_pai,
  get_indicadores,
  get_metas,
  get_documentos_seguimiento_pai,
  get_metas_id,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_unidades_organizacionales } from '../../ConceptoPOAI/services/services';
import { useAppSelector } from '../../../../hooks';
import { AxiosError } from 'axios';
import {
  get_actividades_id_producto,
  get_producto_id_proyecto,
  get_programas,
  get_proyectos_id_programa,
} from '../../Rubro/Rubro/services/services';

interface UserContext {
  // * id
  id_programa: number | null;
  set_id_programa: (value: number | null) => void;
  id_proyecto: number | null;
  set_id_proyecto: (value: number | null) => void;
  id_producto: number | null;
  set_id_producto: (value: number | null) => void;
  id_indicador: number | null;
  set_id_indicador: (value: number | null) => void;
  id_meta: number | null;
  set_id_meta: (value: number | null) => void;
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
  programas_selected: ValueProps[];
  set_programas_selected: (value: ValueProps[]) => void;

  // archivos

  archivos: any;
  set_archivos: (archivos: any) => void;
  // * info
  info_meta: IMetaIndicador;
  set_info_meta: (value: IMetaIndicador) => void;
  // * metas
  // New variables
  valor_meta: string;
  set_valor_meta: (value: string) => void;

  porcentaje_meta: string;
  set_porcentaje_meta: (value: string) => void;

  avance_fisico: string;
  set_avance_fisico: (value: string) => void;

  // * fetch

  fetch_data_seguimiento_pai: () => Promise<void>;
  fetch_data_productos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  fetch_data_indicadores: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_metas: () => Promise<void>;
  fetch_data_unidad_organizacional: () => Promise<void>;
  fetch_data_anexos: () => Promise<void>;
  fetch_data_programas: () => Promise<void>;
  fetch_data_metas_id: () => Promise<void>;
}

export const DataContextSeguimientoPAI = createContext<UserContext>({
  // * id
  id_programa: null,
  set_id_programa: () => {},
  id_proyecto: null,
  set_id_proyecto: () => {},
  id_producto: null,
  set_id_producto: () => {},
  id_indicador: null,
  set_id_indicador: () => {},
  id_meta: null,
  set_id_meta: () => {},

  // * rows

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
  programas_selected: [],
  set_programas_selected: () => {},

  
  archivos: [null],
  set_archivos: () => {},

  info_meta: {
    id_meta: null,
    nombre_indicador: '',
    nombre_meta: '',
    unidad_meta: '',
    porcentaje_meta: null,
    valor_meta: '',
    cumplio: false,
    fecha_creacion_meta: '',
    agno_1: null,
    agno_2: null,
    agno_3: null,
    agno_4: null,
    valor_ejecutado_compromiso: null,
    valor_ejecutado_obligado: null,
    avance_fisico: null,
    id_indicador: null,
  },
  set_info_meta: () => {},

  valor_meta: '',
  set_valor_meta: () => {},

  porcentaje_meta: '',
  set_porcentaje_meta: () => {},

  avance_fisico: '',
  set_avance_fisico: () => {},

  fetch_data_seguimiento_pai: async () => {},
  fetch_data_productos: async () => {},
  fetch_data_actividades: async () => {},
  fetch_data_indicadores: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_metas: async () => {},
  fetch_data_unidad_organizacional: async () => {},
  fetch_data_anexos: async () => {},
  fetch_data_programas: async () => {},
  fetch_data_metas_id: async () => {},
});

export const UserProviderSeguimientoPAI = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);
  const [id_meta, set_id_meta] = React.useState<number | null>(null);

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
  const [programas_selected, set_programas_selected] = React.useState<
    ValueProps[]
  >([]);

  // archivos
  const [archivos, set_archivos] = React.useState<Array<File | null>>([null]);

  // * rows

  const [rows_seguimiento_pai, set_rows_seguimiento_pai] = React.useState<
    ISeguimientoPAI[]
  >([]);
  const [rows_anexos, set_rows_anexos] = React.useState<any[]>([]);

  // * info

  const [info_meta, set_info_meta] = React.useState<IMetaIndicador>({
    id_meta: null,
    nombre_indicador: '',
    nombre_meta: '',
    unidad_meta: '',
    porcentaje_meta: null,
    valor_meta: '',
    cumplio: false,
    fecha_creacion_meta: '',
    agno_1: null,
    agno_2: null,
    agno_3: null,
    agno_4: null,
    valor_ejecutado_compromiso: null,
    valor_ejecutado_obligado: null,
    avance_fisico: null,
    id_indicador: null,
  });

  // * Metas
  const [valor_meta, set_valor_meta] = React.useState<string>('');
  const [porcentaje_meta, set_porcentaje_meta] = React.useState<string>('');
  const [avance_fisico, set_avance_fisico] = React.useState<string>('');

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
            nombre_programa: item.nombre_programa,
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
            adelanto: item.adelanto,
            fecha_creacion: item.fecha_creacion,
            id_unidad_organizacional: item.id_unidad_organizacional,
            id_programa: item.id_programa,
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

  const fetch_data_metas_id = async (): Promise<void> => {
    try {
      const response = await get_metas_id(id_meta as number ?? 0);
      if (response?.length > 0) {
        // Assuming you want to set info_meta with the first item in the response
        const firstMeta: IMetaIndicador = response[0];
  
        set_info_meta(firstMeta);
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
    id_programa,
    set_id_programa,
    id_proyecto,
    set_id_proyecto,
    id_producto,
    set_id_producto,
    id_indicador,
    set_id_indicador,
    id_meta,
    set_id_meta,

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
    programas_selected,
    set_programas_selected,

    // archivos
    archivos,
    set_archivos,

    // * rows
    rows_seguimiento_pai,
    set_rows_seguimiento_pai,
    rows_anexos,
    set_rows_anexos,

    // * info

    info_meta,
    set_info_meta,

    // * Metas

    valor_meta,
    set_valor_meta,

    porcentaje_meta,
    set_porcentaje_meta,

    avance_fisico,
    set_avance_fisico,

    // * fetch
    fetch_data_seguimiento_pai,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_indicadores,
    fetch_data_proyectos,
    fetch_data_metas,
    fetch_data_unidad_organizacional,
    fetch_data_anexos,
    fetch_data_programas,
    fetch_data_metas_id,
  };

  return (
    <DataContextSeguimientoPAI.Provider value={value}>
      {children}
    </DataContextSeguimientoPAI.Provider>
  );
};
