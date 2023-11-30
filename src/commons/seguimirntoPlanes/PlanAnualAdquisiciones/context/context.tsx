/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IPlanAdquisiciones,
  IPlanes,
  IUnidadesActuales,
  IUnspsc,
} from '../../types/types';
import type {
  ICodigoUnspsc,
  IEstadoVF,
  IFuenteRecursoPAA,
  IIntervalo,
  IModalidad,
  IUbicacion,
} from '../../configuraciones/interfaces/interfaces';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import {
  get_codigo_unspsc,
  get_estados_vf,
  get_intervalos,
  get_modalidades,
  get_paa_codigos_id_plan,
  get_plan_adiquisiciones,
  get_recursos_paa,
  get_ubicaciones,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_planes } from '../../Actividades/services/services';
import { get_unidades_organizacionales } from '../../ConceptoPOAI/services/services';

interface UserContext {
  // boolean
  is_limpiar_formulario: boolean;
  set_is_limpiar_formulario: (value: boolean) => void;

  // * id
  id_indicador: number | null;
  set_id_indicador: (value: number | null) => void;

  // * rows
  rows_plan_adquisiciones: IPlanAdquisiciones[];
  set_rows_plan_adquisiciones: (value: IPlanAdquisiciones[]) => void;
  rows_paa_codigos: IPlanAdquisiciones[];
  set_rows_paa_codigos: (value: IPlanAdquisiciones[]) => void;

  // * select
  planes_selected: ValueProps[];
  set_planes_selected: (value: ValueProps[]) => void;
  intervalos_selected: ValueProps[];
  set_intervalos_selected: (value: ValueProps[]) => void;
  modalidad_selected: ValueProps[];
  set_modalidad_selected: (value: ValueProps[]) => void;
  recurso_paa_selected: ValueProps[];
  set_recurso_paa_selected: (value: ValueProps[]) => void;
  estado_vf_selected: ValueProps[];
  set_estado_vf_selected: (value: ValueProps[]) => void;
  ubicacion_selected: ValueProps[];
  set_ubicacion_selected: (value: ValueProps[]) => void;
  unidades_organizaciones_selected: ValueProps[];
  set_unidades_organizaciones_selected: (value: ValueProps[]) => void;
  codigos_unspsc_selected: ValueProps[];
  set_codigos_unspsc_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_plan_adquisiciones: () => Promise<void>;
  fetch_data_planes: () => Promise<void>;
  fetch_data_intervalos: () => Promise<void>;
  fetch_data_modalidad: () => Promise<void>;
  fetch_data_recurso_paa: () => Promise<void>;
  fetch_data_unidades: () => Promise<void>;
  fetch_data_ubicacion: () => Promise<void>;
  fetch_data_estado_vf: () => Promise<void>;
  fetch_data_codigos_unspsc: () => Promise<void>;
  fetch_data_paa_codigos: () => Promise<void>;
}

export const DataContextAdquisiciones = createContext<UserContext>({
  is_limpiar_formulario: false,
  set_is_limpiar_formulario: () => {},

  id_indicador: null,
  set_id_indicador: () => {},

  rows_plan_adquisiciones: [],
  set_rows_plan_adquisiciones: () => {},
  rows_paa_codigos: [],
  set_rows_paa_codigos: () => {},

  planes_selected: [],
  set_planes_selected: () => {},
  intervalos_selected: [],
  set_intervalos_selected: () => {},
  modalidad_selected: [],
  set_modalidad_selected: () => {},
  recurso_paa_selected: [],
  set_recurso_paa_selected: () => {},
  estado_vf_selected: [],
  set_estado_vf_selected: () => {},
  ubicacion_selected: [],
  set_ubicacion_selected: () => {},
  unidades_organizaciones_selected: [],
  set_unidades_organizaciones_selected: () => {},
  codigos_unspsc_selected: [],
  set_codigos_unspsc_selected: () => {},

  fetch_data_plan_adquisiciones: async () => {},
  fetch_data_planes: async () => {},
  fetch_data_intervalos: async () => {},
  fetch_data_modalidad: async () => {},
  fetch_data_recurso_paa: async () => {},
  fetch_data_unidades: async () => {},
  fetch_data_ubicacion: async () => {},
  fetch_data_estado_vf: async () => {},
  fetch_data_codigos_unspsc: async () => {},
  fetch_data_paa_codigos: async () => {},
});

export const UserProviderAdquisiciones = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * boolean

  const [is_limpiar_formulario, set_is_limpiar_formulario] =
    React.useState<boolean>(false);

  // * id
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);

  // * select
  const [planes_selected, set_planes_selected] = React.useState<ValueProps[]>(
    []
  );
  const [intervalos_selected, set_intervalos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [modalidad_selected, set_modalidad_selected] = React.useState<
    ValueProps[]
  >([]);
  const [recurso_paa_selected, set_recurso_paa_selected] = React.useState<
    ValueProps[]
  >([]);
  const [estado_vf_selected, set_estado_vf_selected] = React.useState<
    ValueProps[]
  >([]);
  const [ubicacion_selected, set_ubicacion_selected] = React.useState<
    ValueProps[]
  >([]);
  const [
    unidades_organizaciones_selected,
    set_unidades_organizaciones_selected,
  ] = React.useState<ValueProps[]>([]);
  const [codigos_unspsc_selected, set_codigos_unspsc_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_plan_adquisiciones, set_rows_plan_adquisiciones] = React.useState<
    IPlanAdquisiciones[]
  >([]);
  const [rows_paa_codigos, set_rows_paa_codigos] = React.useState<IUnspsc[]>(
    []
  );

  // * info

  // * fetch
  //* declaracion context
  const {
    plan_adquisiciones: { id_plan_anual },
  } = useAppSelector((state) => state.planes);

  const fetch_data_plan_adquisiciones = async (): Promise<void> => {
    try {
      const response = await get_plan_adiquisiciones();
      if (response?.length > 0) {
        const data: IPlanAdquisiciones[] = response.map(
          (item: IPlanAdquisiciones) => ({
            id_plan_anual: item.id_plan_anual,
            nombre_plan: item.nombre_plan,
            nombre_intervalo: item.nombre_intervalo,
            nombre_modalidad: item.nombre_modalidad,
            nombre_fuente: item.nombre_fuente,
            nombre_estado: item.nombre_estado,
            nombre_unidad: item.nombre_unidad,
            nombre_ubicacion: item.nombre_ubicacion,
            persona_responsable: item.persona_responsable,
            descripcion: item.descripcion,
            mes_inicio: item.mes_inicio,
            mes_oferta: item.mes_oferta,
            duracion: item.duracion,
            valor_total_estimado: item.valor_total_estimado,
            valor_vigencia_actual: item.valor_vigencia_actual,
            vigencia_futura: item.vigencia_futura,
            decreto_paa: item.decreto_paa,
            suministro_paa: item.suministro_paa,
            id_plan: item.id_plan,
            id_intervalo: item.id_intervalo,
            id_modalidad: item.id_modalidad,
            id_recurso_paa: item.id_recurso_paa,
            id_estado_vf: item.id_estado_vf,
            id_unidad_organizacional: item.id_unidad_organizacional,
            id_ubicaion: item.id_ubicaion,
            id_persona_responsable: item.id_persona_responsable,
          })
        );

        set_rows_plan_adquisiciones(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_planes = async (): Promise<void> => {
    try {
      const response = await get_planes();
      if (response?.length > 0) {
        const data_programas: ValueProps[] | any = response.map(
          (item: IPlanes) => ({
            value: item.id_plan,
            label: item.nombre_plan,
          })
        );
        set_planes_selected(data_programas);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_intervalos = async (): Promise<void> => {
    try {
      const response = await get_intervalos();
      if (response?.length > 0) {
        const data_proyecto: ValueProps[] | any = response.map(
          (item: IIntervalo) => ({
            value: item.id_intervalo,
            label: item.nombre_intervalo,
          })
        );
        set_intervalos_selected(data_proyecto);
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
        const data_rubro: ValueProps[] | any = response.map(
          (item: IModalidad) => ({
            value: item.id_modalidad,
            label: item.nombre_modalidad,
          })
        );
        set_modalidad_selected(data_rubro);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_recurso_paa = async (): Promise<void> => {
    try {
      const response = await get_recursos_paa();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IFuenteRecursoPAA) => ({
            value: item.id_fuente,
            label: item.nombre_fuente,
          })
        );
        set_recurso_paa_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_unidades = async (): Promise<void> => {
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

  const fetch_data_estado_vf = async (): Promise<void> => {
    try {
      const response = await get_estados_vf();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: IEstadoVF) => ({
            value: item.id_estado,
            label: item.nombre_estado,
          })
        );
        set_estado_vf_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_codigos_unspsc = async (): Promise<void> => {
    try {
      const response = await get_codigo_unspsc();
      if (response?.length > 0) {
        const data_selected: ValueProps[] | any = response.map(
          (item: ICodigoUnspsc) => ({
            value: item.id_codigo,
            label: `${item.codigo_unsp} - ${item.nombre_producto_unsp}`,
          })
        );
        set_codigos_unspsc_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_paa_codigos = async (): Promise<void> => {
    try {
      const response = await get_paa_codigos_id_plan(
        (id_plan_anual as number) ?? 0
      );
      if (response?.length > 0) {
        const data: IUnspsc[] = response.map((item: IUnspsc) => ({
          id_paacodigo: item.id_paacodigo,
          nombre_paa: item.nombre_paa,
          nombre_producto_unsp: item.nombre_producto_unsp,
          codigo_unsp: item.codigo_unsp,
          id_plan: item.id_plan,
          id_codigos: item.id_codigo,
        }));

        set_rows_paa_codigos(data);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * boolean
    is_limpiar_formulario,
    set_is_limpiar_formulario,

    // * id
    id_indicador,
    set_id_indicador,

    // * select
    planes_selected,
    set_planes_selected,
    intervalos_selected,
    set_intervalos_selected,
    modalidad_selected,
    set_modalidad_selected,
    recurso_paa_selected,
    set_recurso_paa_selected,
    estado_vf_selected,
    set_estado_vf_selected,
    ubicacion_selected,
    set_ubicacion_selected,
    unidades_organizaciones_selected,
    set_unidades_organizaciones_selected,
    codigos_unspsc_selected,
    set_codigos_unspsc_selected,

    // * rows
    rows_plan_adquisiciones,
    set_rows_plan_adquisiciones,
    rows_paa_codigos,
    set_rows_paa_codigos,

    // * info

    // * fetch
    fetch_data_plan_adquisiciones,
    fetch_data_planes,
    fetch_data_intervalos,
    fetch_data_modalidad,
    fetch_data_recurso_paa,
    fetch_data_unidades,
    fetch_data_ubicacion,
    fetch_data_estado_vf,
    fetch_data_codigos_unspsc,
    fetch_data_paa_codigos,
  };

  return (
    <DataContextAdquisiciones.Provider value={value}>
      {children}
    </DataContextAdquisiciones.Provider>
  );
};
