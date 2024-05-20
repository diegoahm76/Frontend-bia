/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from "react";
import { IActividadPgar, IIndicadorPgar, ILineaBasePgar, IMedicion, IMetasPgar, IUnidadOrganizacional } from "../../types/types";
import { control_error } from "../../../../helpers";
import { get_actividades_id_linea_base, get_armonizaciones, get_indicadores_id_actividad, get_linea_base_id_meta, get_mediciones, get_metas_id_eje, get_planes_pai, get_planes_pgar, get_seguimientos_pgar, get_unidades_organizacionales } from "../services/services";
import { data } from '../../../almacen/gestionDeInventario/catalogoBienes/interfaces/Nodo';


interface UserContext {
  // * id
  id_eje_estrategico: number | null;
  set_id_eje_estrategico: (value: number | null) => void;
  id_meta_eje: number | null;
  set_id_meta_eje: (value: number | null) => void;
  id_linea_base: number | null;
  set_id_linea_base: (value: number | null) => void;
  id_actividad: number | null;
  set_id_actividad: (value: number | null) => void;
  id_indicador: number | null;
  set_id_indicador: (value: number | null) => void;
  id_armonizar: number | null;
  set_id_armonizar: (value: number | null) => void;
  id_seguimiento_pgar: number | null;
  set_id_seguimiento_pgar: (value: number | null) => void;
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;
  id_objetivo: number | null;
  set_id_objetivo: (value: number | null) => void;

  // * rows
  data_mediciones: IMedicion[];
  set_data_mediciones: (value: IMedicion[]) => void;
  data_unidades_organizacionales: IUnidadOrganizacional[];
  set_data_unidades_organizacionales: (value: IUnidadOrganizacional[]) => void;
  data_planes_pai: any[];
  set_data_planes_pai: (value: any[]) => void;
  data_planes_pgar: any[];
  set_data_planes_pgar: (value: any[]) => void;

  rows_armonizacion: any[];
  set_rows_armonizacion: (value: any[]) => void;
  rows_seguimiento_pgar: any[];
  set_rows_seguimiento_pgar: (value: any[]) => void;
  rows_meta_pgar: IMetasPgar[];
  set_rows_meta_pgar: (value: IMetasPgar[]) => void;
  rows_linea_base: ILineaBasePgar[];
  set_rows_linea_base: (value: ILineaBasePgar[]) => void;
  rows_actividad: IActividadPgar[];
  set_rows_actividad: (value: IActividadPgar[]) => void;
  rows_indicador: IIndicadorPgar[];
  set_rows_indicador: (value: IIndicadorPgar[]) => void;


  // * select

  // * info

  // * fetch
  fetch_data_mediciones: () => Promise<void>;
  fetch_data_unidades: () => Promise<void>;
  fetch_data_planes_pai: () => Promise<void>;
  fetch_data_planes_pgar: () => Promise<void>;

  fetch_data_armonizaciones: () => Promise<void>;
  fetch_data_seguimiento_pgar: () => Promise<void>;
  fetch_data_linea_base: () => Promise<void>;
  fetch_data_meta_pgar: () => Promise<void>;
  fetch_data_actividad_pgar: () => Promise<void>;
  fetch_data_indicador_pgar: () => Promise<void>;

}

export const DataContextPgar = createContext<UserContext>({
  // * id
  id_eje_estrategico: null,
  set_id_eje_estrategico: () => {},
  id_meta_eje: null,
  set_id_meta_eje: () => {},
  id_linea_base: null,
  set_id_linea_base: () => {},
  id_actividad: null,
  set_id_actividad: () => {},
  id_indicador: null,
  set_id_indicador: () => {},
  id_armonizar: null,
  set_id_armonizar: () => {},
  id_seguimiento_pgar: null,
  set_id_seguimiento_pgar: () => {},
  id_plan: null,
  set_id_plan: () => {},
  id_objetivo: null,
  set_id_objetivo: () => {},
  // * rows
  data_mediciones: [],
  set_data_mediciones: () => {},
  data_unidades_organizacionales: [],
  set_data_unidades_organizacionales: () => {},
  data_planes_pai: [],
  set_data_planes_pai: () => {},
  data_planes_pgar: [],
  set_data_planes_pgar: () => {},

  rows_armonizacion: [],
  set_rows_armonizacion: () => {},
  rows_seguimiento_pgar: [],
  set_rows_seguimiento_pgar: () => {},
  rows_meta_pgar: [],
  set_rows_meta_pgar: () => {},
  rows_linea_base: [],
  set_rows_linea_base: () => {},
  rows_actividad: [],
  set_rows_actividad: () => {},
  rows_indicador: [],
  set_rows_indicador: () => {},

  fetch_data_mediciones: async () => {},
  fetch_data_unidades: async () => {},
  fetch_data_planes_pai: async () => {},
  fetch_data_planes_pgar: async () => {},

  fetch_data_armonizaciones: async () => {},
  fetch_data_seguimiento_pgar: async () => {},
  fetch_data_meta_pgar: async () => {},
  fetch_data_linea_base: async () => {},
  fetch_data_actividad_pgar: async () => {},
  fetch_data_indicador_pgar: async () => {},

});

export const UserProviderPgar = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_eje_estrategico, set_id_eje_estrategico] = React.useState<number | null>(null);
  const [id_meta_eje, set_id_meta_eje] = React.useState<number | null>(null);
  const [id_linea_base, set_id_linea_base] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);
  const [id_armonizar, set_id_armonizar] = React.useState<number | null>(null);
  const [id_seguimiento_pgar, set_id_seguimiento_pgar] = React.useState<number | null>(null);
  const [id_plan, set_id_plan] = React.useState<number | null>(null);
  const [id_objetivo, set_id_objetivo] = React.useState<number | null>(null);



  // * rows
  const [data_mediciones, set_data_mediciones] = React.useState<IMedicion[]>([]);
  const [data_unidades_organizacionales, set_data_unidades_organizacionales] = React.useState<IUnidadOrganizacional[]>([]);
  const [data_planes_pai, set_data_planes_pai] = React.useState<any[]>([]);
  const [data_planes_pgar, set_data_planes_pgar] = React.useState<any[]>([]);

  //TODO: Cambiar any por el tipo correcto
  const [rows_armonizacion, set_rows_armonizacion] = React.useState<any[]>([]);
  const [rows_seguimiento_pgar, set_rows_seguimiento_pgar] = React.useState<any[]>([]);
  const [rows_meta_pgar, set_rows_meta_pgar] = React.useState<IMetasPgar[]>([]);
  const [rows_linea_base, set_rows_linea_base] = React.useState<ILineaBasePgar[]>([]);
  const [rows_actividad, set_rows_actividad] = React.useState<IActividadPgar[]>([]);
  const [rows_indicador, set_rows_indicador] = React.useState<IIndicadorPgar[]>([]);

  // * info

  const fetch_data_meta_pgar = async (): Promise<void> => {
    try {
      set_rows_meta_pgar([]);
      const response = await get_metas_id_eje(id_eje_estrategico as number);
      if (response?.length > 0) {
        const data_meta: IMetasPgar[] = response.map(
          (item: IMetasPgar) => ({
            ...item,
          })
        );

        set_rows_meta_pgar(data_meta);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_linea_base = async (): Promise<void> => {
    try {
      set_rows_linea_base([]);
      const response = await get_linea_base_id_meta(id_meta_eje as number);
      if (response?.length > 0) {
        const data_linea: ILineaBasePgar[] = response.map(
          (item: ILineaBasePgar) => ({
            ...item,
          })
        );

        set_rows_linea_base(data_linea);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_actividad_pgar = async (): Promise<void> => {
    try {
      set_rows_actividad([]);
      const response = await get_actividades_id_linea_base(id_linea_base as number);
      if (response?.length > 0) {
        const data_act: IActividadPgar[] = response.map(
          (item: IActividadPgar) => ({
            ...item,
          })
        );

        set_rows_actividad(data_act);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_indicador_pgar = async (): Promise<void> => {
    try {
      set_rows_indicador([]);
      const response = await get_indicadores_id_actividad(id_actividad as number);
      if (response?.length > 0) {
        const data_indicador: IIndicadorPgar[] = response.map(
          (item: IIndicadorPgar) => ({
            ...item,
          })
        );

        set_rows_indicador(data_indicador);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  // * General info

  const fetch_data_armonizaciones = async (): Promise<void> => {
    try {
      set_rows_armonizacion([]);
      const response = await get_armonizaciones();
      if (response?.length > 0) {
        const data_armonizaciones: any[] = response.map(
          (item: any) => ({
            ...item,
          })
        );

        set_rows_armonizacion(data_armonizaciones);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener las armonizaciones'
      );
    }
  };

  const fetch_data_seguimiento_pgar = async (): Promise<void> => {
    try {
      set_rows_seguimiento_pgar([]);
      const response = await get_seguimientos_pgar();
      if (response?.length > 0) {
        const data_seguimiento_pgar: any[] = response.map(
          (item: any) => ({
            ...item,
          })
        );

        set_rows_seguimiento_pgar(data_seguimiento_pgar);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener los seguimientos'
      );
    }
  };

  const fetch_data_mediciones = async (): Promise<void> => {
    try {
      set_data_mediciones([]);
      const response = await get_mediciones();
      if (response?.length > 0) {
        const data_mediciones: IMedicion[] = response.map(
          (item: IMedicion) => ({
            ...item,
          })
        );

        set_data_mediciones(data_mediciones);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener las mediciones'
      );
    }
  };

  const fetch_data_unidades = async (): Promise<void> => {
    try {
      set_data_unidades_organizacionales([]);
      const response = await get_unidades_organizacionales();
      if (response?.length > 0) {
        const data_unidades: IUnidadOrganizacional[] = response.map(
          (item: IUnidadOrganizacional) => ({
            ...item,
          })
        );

        set_data_unidades_organizacionales(data_unidades);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener las unidades organizacionales'
      );
    }
  };

  const fetch_data_planes_pai = async (): Promise<void> => {
    try {
      set_data_planes_pai([]);
      const response = await get_planes_pai();
      if (response?.length > 0) {
        const data_planes_pai: any[] = response.map(
          (item: any) => ({
            ...item,
          })
        );
        set_data_planes_pai(data_planes_pai);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener los planes PAI'
      );
    }
  };

  const fetch_data_planes_pgar = async (): Promise<void> => {
    try {
      set_data_planes_pgar([]);
      const response = await get_planes_pgar();
      if (response?.length > 0) {
        const data_planes_pgar: any[] = response.map(
          (item: any) => ({
            ...item,
          })
        );

        set_data_planes_pgar(data_planes_pgar);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Ocurrió un error al obtener los planes PGAR'
      );
    }
  };



  const value: UserContext = {
    // * id
    id_eje_estrategico,
    set_id_eje_estrategico,
    id_meta_eje,
    set_id_meta_eje,
    id_linea_base,
    set_id_linea_base,
    id_actividad,
    set_id_actividad,
    id_indicador,
    set_id_indicador,
    id_armonizar,
    set_id_armonizar,
    id_seguimiento_pgar,
    set_id_seguimiento_pgar,
    id_plan,
    set_id_plan,
    id_objetivo,
    set_id_objetivo,

    // * rows
    data_mediciones,
    set_data_mediciones,
    data_unidades_organizacionales,
    set_data_unidades_organizacionales,
    data_planes_pai,
    set_data_planes_pai,
    data_planes_pgar,
    set_data_planes_pgar,

    rows_armonizacion,
    set_rows_armonizacion,
    rows_seguimiento_pgar,
    set_rows_seguimiento_pgar,
    rows_meta_pgar,
    set_rows_meta_pgar,
    rows_linea_base,
    set_rows_linea_base,
    rows_actividad,
    set_rows_actividad,
    rows_indicador,
    set_rows_indicador,


    // * info

    // * fetch
    fetch_data_mediciones,
    fetch_data_unidades,
    fetch_data_planes_pai,
    fetch_data_planes_pgar,

    fetch_data_armonizaciones,
    fetch_data_seguimiento_pgar,
    fetch_data_meta_pgar,
    fetch_data_linea_base,
    fetch_data_actividad_pgar,
    fetch_data_indicador_pgar
  };

  return (
    <DataContextPgar.Provider value={value}>
      {children}
    </DataContextPgar.Provider>
  );
};
