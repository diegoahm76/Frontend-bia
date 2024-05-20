/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  ISeguiminetoPOAI,
  IFuentes,
  IMetaIndicador,
  IProyectos,
  IRubro,
  IConceptoPOAI,
  IDetalleCuentas,
  IUnidadesActuales,
  IBanco,
} from '../../types/types';
import type {
  // IIntervalo,
  IModalidad,
  IUbicacion,
} from '../../configuraciones/interfaces/interfaces';

import { control_error } from '../../../../helpers';
import {
  get_seguimiento,
  get_metas_indicador,
  get_proyectos,
  get_rubros,
  get_detalle_inversion,
  get_ubicaciones,
  get_modalidades,
  get_banco,
  get_clase_tercero,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import {
  get_fuente_financiancion,
  get_fuente_financiancion_by_id,
} from '../../FuenteFinanciacion/services/services';
import { get_sector } from '../../configuraciones/Request/request';
import { ISector } from '../../configuraciones/interfaces/interfaces';
import {
  get_concepto_poai,
  get_unidades_organizacionales,
} from '../../ConceptoPOAI/services/services';
import { ClaseTercero } from '../../../../interfaces/globalModels';
import { get_banco_by_meta_id } from '../../BancoProyecto/services/services';

interface UserContext {
  // data
  data_fuente: IFuentes;
  set_data_fuente: (value: IFuentes) => void;

  // * id
  id_plan: number | null;
  id_programa: number | null;
  id_proyecto: number | null;
  id_producto: number | null;
  id_actividad: number | null;
  id_indicador: number | null;
  id_meta: number | null;
  id_fuente: number | null;
  set_id_plan: (value: number | null) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_producto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  set_id_indicador: (value: number | null) => void;
  set_id_meta: (value: number | null) => void;
  set_id_fuente: (value: number | null) => void;

  // * rows
  rows_seguimiento: ISeguiminetoPOAI[];
  set_rows_seguimiento: (value: ISeguiminetoPOAI[]) => void;

  // * select
  metas_selected: ValueProps[];
  set_metas_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  rubros_selected: ValueProps[];
  set_rubros_selected: (value: ValueProps[]) => void;
  fuentes_selected: ValueProps[];
  set_fuentes_selected: (value: ValueProps[]) => void;
  sector_selected: ValueProps[];
  set_sector_selected: (value: ValueProps[]) => void;

  // * select
  concepto_selected: ValueProps[];
  set_concepto_selected: (value: ValueProps[]) => void;
  detalle_selected: ValueProps[];
  set_detalle_selected: (value: ValueProps[]) => void;
  ubicacion_selected: ValueProps[];
  set_ubicacion_selected: (value: ValueProps[]) => void;
  unidades_organizaciones_selected: ValueProps[];
  set_unidades_organizaciones_selected: (value: ValueProps[]) => void;
  modalidad_selected: ValueProps[];
  set_modalidad_selected: (value: ValueProps[]) => void;
  clase_terceros_selected: ValueProps[];
  set_clase_terceros_selected: (value: ValueProps[]) => void;
  banco_selected: ValueProps[];
  set_banco_selected: (value: ValueProps[]) => void;

  // * nombre
  nombre_plan: string;
  nombre_programa: string;
  nombre_proyecto: string;
  nombre_producto: string;
  nombre_actividad: string;
  nombre_indicador: string;
  nombre_meta: string;
  set_nombre_plan: (value: string) => void;
  set_nombre_programa: (value: string) => void;
  set_nombre_proyecto: (value: string) => void;
  set_nombre_producto: (value: string) => void;
  set_nombre_actividad: (value: string) => void;
  set_nombre_indicador: (value: string) => void;
  set_nombre_meta: (value: string) => void;

  // * info

  // * fetch

  fetch_data_seguimiento: () => Promise<void>;
  fetch_data_metas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_rubros: () => Promise<void>;
  fetch_data_fuentes: () => Promise<void>;
  fetach_data_sector: () => Promise<void>;
  fetch_data_concepto: () => Promise<void>;
  fetch_data_detalle: () => Promise<void>;
  fetch_data_ubicacion: () => Promise<void>;
  fetch_data_unidades_organizaciones: () => Promise<void>;
  fetch_data_modalidad: () => Promise<void>;
  fetch_data_clase_terceros: () => Promise<void>;
  fetch_data_banco: () => Promise<void>;
  fetch_data_fuentes_by_id: () => Promise<void>;
}

export const DataContextSeguimientoPOAI = createContext<UserContext>({
  // data
  data_fuente: {
    id_fuente: null,
    nombre_fuente: '',
    vano_1: null,
    vano_2: null,
    vano_3: null,
    vano_4: null,
    concepto: '',
    id_concepto: null,
  },
  set_data_fuente: () => {},
  id_plan: null,
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,
  id_fuente: null,
  set_id_plan: () => {},
  set_id_programa: () => {},
  set_id_proyecto: () => {},
  set_id_producto: () => {},
  set_id_actividad: () => {},
  set_id_indicador: () => {},
  set_id_meta: () => {},
  set_id_fuente: () => {},

  rows_seguimiento: [],
  set_rows_seguimiento: () => {},

  metas_selected: [],
  set_metas_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  rubros_selected: [],
  set_rubros_selected: () => {},
  fuentes_selected: [],
  set_fuentes_selected: () => {},
  sector_selected: [],
  set_sector_selected: () => {},

  concepto_selected: [],
  set_concepto_selected: () => {},
  detalle_selected: [],
  set_detalle_selected: () => {},
  ubicacion_selected: [],
  set_ubicacion_selected: () => {},
  unidades_organizaciones_selected: [],
  set_unidades_organizaciones_selected: () => {},
  modalidad_selected: [],
  set_modalidad_selected: () => {},
  clase_terceros_selected: [],
  set_clase_terceros_selected: () => {},
  banco_selected: [],
  set_banco_selected: () => {},

  // nombre
  nombre_plan: '',
  nombre_programa: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_indicador: '',
  nombre_meta: '',
  set_nombre_plan: () => {},
  set_nombre_programa: () => {},
  set_nombre_proyecto: () => {},
  set_nombre_producto: () => {},
  set_nombre_actividad: () => {},
  set_nombre_indicador: () => {},
  set_nombre_meta: () => {},

  fetch_data_seguimiento: async () => {},
  fetch_data_metas: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_rubros: async () => {},
  fetch_data_fuentes: async () => {},
  fetach_data_sector: async () => {},
  fetch_data_concepto: async () => {},
  fetch_data_detalle: async () => {},
  fetch_data_ubicacion: async () => {},
  fetch_data_unidades_organizaciones: async () => {},
  fetch_data_modalidad: async () => {},
  fetch_data_clase_terceros: async () => {},
  fetch_data_banco: async () => {},
  fetch_data_fuentes_by_id: async () => {},
});

export const UserProviderSeguimientoPOAI = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // data
  const [data_fuente, set_data_fuente] = React.useState<IFuentes>({
    id_fuente: null,
    nombre_fuente: '',
    vano_1: null,
    vano_2: null,
    vano_3: null,
    vano_4: null,
    concepto: '',
    id_concepto: null,
  });

  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_producto, set_id_producto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);
  const [id_meta, set_id_meta] = React.useState<number | null>(null);
  const [id_fuente, set_id_fuente] = React.useState<number | null>(null);

  // * select
  const [metas_selected, set_metas_selected] = React.useState<ValueProps[]>([]);
  const [proyectos_selected, set_proyectos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [rubros_selected, set_rubros_selected] = React.useState<ValueProps[]>(
    []
  );
  const [fuentes_selected, set_fuentes_selected] = React.useState<ValueProps[]>(
    []
  );
  const [sector_selected, set_sector_selected] = React.useState<ValueProps[]>(
    []
  );

  const [concepto_selected, set_concepto_selected] = React.useState<
    ValueProps[]
  >([]);

  const [detalle_selected, set_detalle_selected] = React.useState<ValueProps[]>(
    []
  );

  // * select
  const [ubicacion_selected, set_ubicacion_selected] = React.useState<
    ValueProps[]
  >([]);
  const [
    unidades_organizaciones_selected,
    set_unidades_organizaciones_selected,
  ] = React.useState<ValueProps[]>([]);
  const [modalidad_selected, set_modalidad_selected] = React.useState<
    ValueProps[]
  >([]);

  const [clase_terceros_selected, set_clase_terceros_selected] = React.useState<
    ValueProps[]
  >([]);

  const [banco_selected, set_banco_selected] = React.useState<ValueProps[]>([]);

  // * nombre
  const [nombre_plan, set_nombre_plan] = React.useState<string>('');
  const [nombre_programa, set_nombre_programa] = React.useState<string>('');
  const [nombre_proyecto, set_nombre_proyecto] = React.useState<string>('');
  const [nombre_producto, set_nombre_producto] = React.useState<string>('');
  const [nombre_actividad, set_nombre_actividad] = React.useState<string>('');
  const [nombre_indicador, set_nombre_indicador] = React.useState<string>('');
  const [nombre_meta, set_nombre_meta] = React.useState<string>('');

  // * rows

  const [rows_seguimiento, set_rows_seguimiento] = React.useState<
    ISeguiminetoPOAI[]
  >([]);

  // * info

  const fetch_data_seguimiento = async (): Promise<void> => {
    try {
      const response = await get_seguimiento();
      if (response?.length > 0) {
        const data_detalle_inversion: ISeguiminetoPOAI[] = response.map(
          (item: ISeguiminetoPOAI) => ({
            ...item,
          })
        );

        set_rows_seguimiento(data_detalle_inversion);
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

  const fetch_data_detalle = async (): Promise<void> => {
    try {
      const response = await get_detalle_inversion();
      if (response?.length > 0) {
        const data_detalle: ValueProps[] | any = response.map(
          (item: IDetalleCuentas) => ({
            value: item.id_detalle_inversion,
            label: item.cuenta,
          })
        );
        set_detalle_selected(data_detalle);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_unidades_organizaciones = async (): Promise<void> => {
    try {
      const response = await get_unidades_organizacionales();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IUnidadesActuales) => ({
            value: item.id_unidad_organizacional,
            label: item.nombre,
          })
        );
        set_unidades_organizaciones_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_ubicacion = async (): Promise<void> => {
    try {
      const response = await get_ubicaciones();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IUbicacion) => ({
            value: item.id_ubicacion,
            label: item.nombre_ubicacion,
          })
        );
        set_ubicacion_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_modalidad = async (): Promise<void> => {
    try {
      const response = await get_modalidades();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IModalidad) => ({
            value: item.id_modalidad,
            label: item.nombre_modalidad,
          })
        );
        set_modalidad_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_clase_terceros = async (): Promise<void> => {
    try {
      const response = await get_clase_tercero();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: ClaseTercero) => ({
            value: item.value,
            label: item.label,
          })
        );
        set_clase_terceros_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_banco = async (): Promise<void> => {
    try {
      const response = await get_banco();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IBanco) => ({
            value: item.id_banco,
            label: item.objeto_contrato,
          })
        );
        set_banco_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_metas = async (): Promise<void> => {
    try {
      const response = await get_metas_indicador();
      if (response?.length > 0) {
        const data_programas: ValueProps[] | any = response.map(
          (item: IMetaIndicador) => ({
            value: item.id_meta,
            label: item.nombre_meta,
          })
        );
        set_metas_selected(data_programas);
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
        const data_proyecto: ValueProps[] | any = response.map(
          (item: IProyectos) => ({
            value: item.id_proyecto,
            label: item.nombre_proyecto,
          })
        );
        set_proyectos_selected(data_proyecto);
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

  const fetch_data_fuentes = async (): Promise<void> => {
    try {
      const response = await get_fuente_financiancion();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IFuentes) => ({
            value: item.id_fuente,
            label: item.nombre_fuente,
          })
        );
        set_fuentes_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_fuentes_by_id = async (): Promise<void> => {
    try {
      const response = await get_fuente_financiancion();
      if (response?.length > 0) {
        const data = response.find(
          (fuente: IFuentes) => fuente.id_fuente === id_fuente
        );
        if (data) {
          set_data_fuente(data);
        } else {
        }
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetach_data_sector = async (): Promise<void> => {
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
  const value: UserContext = {
    data_fuente,
    set_data_fuente,
    id_plan,
    id_programa,
    id_proyecto,
    id_producto,
    id_actividad,
    id_indicador,
    id_meta,
    id_fuente,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,
    set_id_fuente,

    // * select
    metas_selected,
    set_metas_selected,
    proyectos_selected,
    set_proyectos_selected,
    rubros_selected,
    set_rubros_selected,
    fuentes_selected,
    set_fuentes_selected,
    sector_selected,
    set_sector_selected,

    // * select
    concepto_selected,
    set_concepto_selected,
    detalle_selected,
    set_detalle_selected,
    ubicacion_selected,
    set_ubicacion_selected,
    unidades_organizaciones_selected,
    set_unidades_organizaciones_selected,
    modalidad_selected,
    set_modalidad_selected,
    clase_terceros_selected,
    set_clase_terceros_selected,
    banco_selected,
    set_banco_selected,

    // * nombre
    nombre_plan,
    nombre_programa,
    nombre_proyecto,
    nombre_producto,
    nombre_actividad,
    nombre_indicador,
    nombre_meta,
    set_nombre_plan,
    set_nombre_programa,
    set_nombre_proyecto,
    set_nombre_producto,
    set_nombre_actividad,
    set_nombre_indicador,
    set_nombre_meta,

    // * rows
    rows_seguimiento,
    set_rows_seguimiento,

    // * info

    // * fetch
    fetch_data_seguimiento,
    fetch_data_metas,
    fetch_data_proyectos,
    fetch_data_rubros,
    fetch_data_fuentes,
    fetach_data_sector,
    fetch_data_concepto,
    fetch_data_detalle,
    fetch_data_ubicacion,
    fetch_data_unidades_organizaciones,
    fetch_data_modalidad,
    fetch_data_clase_terceros,
    fetch_data_banco,
    fetch_data_fuentes_by_id,
  };

  return (
    <DataContextSeguimientoPOAI.Provider value={value}>
      {children}
    </DataContextSeguimientoPOAI.Provider>
  );
};
