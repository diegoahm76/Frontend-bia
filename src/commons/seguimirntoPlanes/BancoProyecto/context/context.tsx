/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  IBanco,
  IFuentes,
  IMetaIndicador,
  IProyectos,
  IRubro,
} from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import {
  get_banco,
  get_metas_indicador,
  get_proyectos,
  get_rubros,
} from '../services/services';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_fuente_financiancion } from '../../FuenteFinanciacion/services/services';

interface UserContext {
  // * id
  id_indicador: number | null;
  set_id_indicador: (value: number | null) => void;

  // * rows
  rows_bancos: IBanco[];
  set_rows_bancos: (value: IBanco[]) => void;

  // * select
  metas_selected: ValueProps[];
  set_metas_selected: (value: ValueProps[]) => void;
  proyectos_selected: ValueProps[];
  set_proyectos_selected: (value: ValueProps[]) => void;
  rubros_selected: ValueProps[];
  set_rubros_selected: (value: ValueProps[]) => void;
  fuentes_selected: ValueProps[];
  set_fuentes_selected: (value: ValueProps[]) => void;
  // * info

  // * fetch

  fetch_data_bancos: () => Promise<void>;
  fetch_data_metas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_rubros: () => Promise<void>;
  fetch_data_fuentes: () => Promise<void>;
}

export const DataContextBancos = createContext<UserContext>({
  id_indicador: null,
  set_id_indicador: () => {},

  rows_bancos: [],
  set_rows_bancos: () => {},

  metas_selected: [],
  set_metas_selected: () => {},
  proyectos_selected: [],
  set_proyectos_selected: () => {},
  rubros_selected: [],
  set_rubros_selected: () => {},
  fuentes_selected: [],
  set_fuentes_selected: () => {},

  fetch_data_bancos: async () => {},
  fetch_data_metas: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_rubros: async () => {},
  fetch_data_fuentes: async () => {},
});

export const UserProviderBanco = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_indicador, set_id_indicador] = React.useState<number | null>(null);

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

  // * rows

  const [rows_bancos, set_rows_bancos] = React.useState<IBanco[]>([]);

  // * info

  // * fetch
  // //* declaracion context
  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);

  const fetch_data_bancos = async (): Promise<void> => {
    try {
      const response = await get_banco();
      if (response?.length > 0) {
        const data_detalle_inversion: IBanco[] = response.map(
          (item: IBanco) => ({
            id_banco: item.id_banco,
            nombre_proyecto: item.nombre_proyecto,
            nombre_actividad: item.nombre_actividad,
            nombre_indicador: item.nombre_indicador,
            nombre_meta: item.nombre_meta,
            rubro: item.rubro,
            banco_valor: item.banco_valor,
            objeto_contrato: item.objeto_contrato,
            id_proyecto: item.id_proyecto,
            id_actividad: item.id_actividad,
            id_indicador: item.id_indicador,
            id_meta: item.id_meta,
            id_rubro: item.id_rubro,
            id_fuente_financiacion: item.id_fuente_financiacion,
          })
        );

        set_rows_bancos(data_detalle_inversion);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  // const fetch_data_metas = async (): Promise<void> => {
  //   try {
  //     if (!id_indicador) return;
  //     const response = await get_metas_indicador((id_indicador as number) ?? 0);
  //     if (response?.length > 0) {
  //       const data_programas: ValueProps[] | any = response.map(
  //         (item: IMetaIndicador) => ({
  //           value: item.id_meta,
  //           label: item.nombre_meta,
  //         })
  //       );
  //       set_metas_selected(data_programas);
  //     }
  //   } catch (error: any) {
  //     control_error(
  //       error.response?.data?.detail || 'Algo paso, intente de nuevo'
  //     );
  //   }
  // };
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

  const value: UserContext = {
    // * id
    id_indicador,
    set_id_indicador,

    // * select
    metas_selected,
    set_metas_selected,
    proyectos_selected,
    set_proyectos_selected,
    rubros_selected,
    set_rubros_selected,
    fuentes_selected,
    set_fuentes_selected,

    // * rows
    rows_bancos,
    set_rows_bancos,

    // * info

    // * fetch
    fetch_data_bancos,
    fetch_data_metas,
    fetch_data_proyectos,
    fetch_data_rubros,
    fetch_data_fuentes,
  };

  return (
    <DataContextBancos.Provider value={value}>
      {children}
    </DataContextBancos.Provider>
  );
};
