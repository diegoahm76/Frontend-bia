/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import type {
  GetBandejas,
  GetEstantes,
  ListarDepositos,
  ListarOrdenSiguiente,
  ListarSucursales,
} from '../types/types';
import {
  get_depositos,
  get_bandejas_estante,
  get_estantes_deposito,
  get_sucursales,
  listar_orden_estantes,
} from '../services/services';
import { control_error } from '../../../../../helpers';
import type { ICajas, ICarpetas } from '../../Cajas/types/types';
import { useAppSelector } from '../../../../../hooks/hooks';
import {
  get_caja_carpetas,
  get_cajas_bandeja,
  listar_orden_cajas,
} from '../../Cajas/services/services';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { type AxiosError } from 'axios';

interface UserContext {
  // * id
  id_deposito: number | null;
  set_id_deposito: (value: number | null) => void;
  id_estante: number | null;
  set_id_estante: (value: number | null) => void;
  id_caja: number | null;
  set_id_caja: (value: number | null) => void;
  id_bandeja: number | null;
  set_id_bandeja: (value: number | null) => void;

  // * orden estantes
  orden: number | null;
  set_orden: (value: number | null) => void;
  nuevo_orden: number | null;
  set_nuevo_orden: (value: number | null) => void;

  // * select
  sucusal_selected: ValueProps[];
  depositos_selected: ValueProps[];
  depositos_selected_mover_estante: ValueProps[];
  nuevo_orden_estantes_selected: ValueProps[];
  nuevo_orden_cajas_selected: ValueProps[];
  estantes_selected: ValueProps[];
  bandejas_selected_get: ValueProps[];
  set_bandejas_selected_get: (value: ValueProps[]) => void;
  bandejas_selected: ValueProps[];
  depositos_selected_mover_caja: ValueProps[];
  set_depositos_selected_mover_caja: (value: ValueProps[]) => void;
  set_depositos_selected: (value: ValueProps[]) => void;
  set_sucusal_selected: (value: ValueProps[]) => void;
  set_depositos_selected_mover_estante: (value: ValueProps[]) => void;
  set_nuevo_orden_estantes_selected: (value: ValueProps[]) => void;
  set_nuevo_orden_cajas_selected: (value: ValueProps[]) => void;
  set_estantes_selected: (value: ValueProps[]) => void;
  set_bandejas_selected: (value: ValueProps[]) => void;

  // * rows
  rows_estantes: GetEstantes[];
  set_rows_estantes: (value: GetEstantes[]) => void;
  rows_bandejas: GetBandejas[];
  set_rows_bandejas: (value: GetBandejas[]) => void;
  rows_carpetas: ICarpetas[];
  set_rows_carpetas: (value: ICarpetas[]) => void;
  rows_cajas: ICajas[];
  set_rows_cajas: (value: ICajas[]) => void;

  // * info
  identificacion_deposito: string;
  set_identificacion_deposito: (value: string) => void;
  identificacion_caja: string;
  set_identificacion_caja: (value: string) => void;
  orden_siguiente: ListarOrdenSiguiente | undefined;
  set_orden_siguiente: (value: ListarOrdenSiguiente | undefined) => void;

  // * fetch
  fetch_data_sucursal: () => Promise<void>;
  fetch_data_depositos: () => Promise<void>;
  fetch_data_estantes_depositos: () => Promise<void>;
  fetch_data_bandejas_estantes: () => Promise<void>;
  fetch_data_caja_carpeta: () => Promise<void>;
  fetch_data_caja_bandeja: () => Promise<void>;
  fetch_data_orden_estante: () => Promise<void>;
  fetch_data_orden_cajas: () => Promise<void>;

  // ? --------------------------------- Mover cajas ---------------------------------
  fetch_data_depositos_mover_caja: () => Promise<void>;
  fetch_data_estantes_mover_cajas: () => Promise<void>;
  fetch_data_bandejas_mover_caja: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  // * id
  id_deposito: null,
  set_id_deposito: () => {},
  id_estante: null,
  set_id_estante: () => {},
  id_caja: null,
  set_id_caja: () => {},
  id_bandeja: null,
  set_id_bandeja: () => {},

  // *orden estantes
  orden: null,
  set_orden: () => {},
  nuevo_orden: null,
  set_nuevo_orden: () => {},

  // * select
  sucusal_selected: [],
  depositos_selected: [],
  depositos_selected_mover_estante: [],
  nuevo_orden_estantes_selected: [],
  nuevo_orden_cajas_selected: [],
  estantes_selected: [],
  bandejas_selected: [],
  bandejas_selected_get: [],
  depositos_selected_mover_caja: [],
  set_depositos_selected_mover_caja: () => {},
  set_bandejas_selected_get: () => {},
  set_depositos_selected: () => {},
  set_sucusal_selected: () => {},
  set_depositos_selected_mover_estante: () => {},
  set_nuevo_orden_estantes_selected: () => {},
  set_nuevo_orden_cajas_selected: () => {},
  set_estantes_selected: () => {},
  set_bandejas_selected: () => {},

  // * rows
  rows_estantes: [],
  set_rows_estantes: () => {},
  rows_bandejas: [],
  set_rows_bandejas: () => {},
  rows_carpetas: [],
  set_rows_carpetas: () => {},
  rows_cajas: [],
  set_rows_cajas: () => {},

  // * info
  identificacion_deposito: '',
  set_identificacion_deposito: () => {},
  identificacion_caja: '',
  set_identificacion_caja: () => {},
  orden_siguiente: {
    success: false,
    orden_siguiente: 0,
  },
  set_orden_siguiente: () => {},

  // * fetch
  fetch_data_sucursal: async () => {},
  fetch_data_depositos: async () => {},
  fetch_data_estantes_depositos: async () => {},
  fetch_data_bandejas_estantes: async () => {},
  fetch_data_caja_carpeta: async () => {},
  fetch_data_caja_bandeja: async () => {},
  fetch_data_orden_estante: async () => {},
  fetch_data_orden_cajas: async () => {},

  // ? --------------------------------- Mover cajas ---------------------------------
  fetch_data_depositos_mover_caja: async () => {},
  fetch_data_estantes_mover_cajas: async () => {},
  fetch_data_bandejas_mover_caja: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  const { cajas } = useAppSelector((state) => state.deposito);

  // * id
  const [id_deposito, set_id_deposito] = React.useState<number | null>(null);
  const [id_estante, set_id_estante] = React.useState<number | null>(null);
  const [id_caja, set_id_caja] = React.useState<number | null>(null);
  const [id_bandeja, set_id_bandeja] = React.useState<number | null>(null);

  // * orden estantes
  const [orden, set_orden] = React.useState<number | null>(null);
  const [nuevo_orden, set_nuevo_orden] = React.useState<number | null>(null);

  // * select
  const [sucusal_selected, set_sucusal_selected] = React.useState<ValueProps[]>(
    []
  );
  const [depositos_selected, set_depositos_selected] = React.useState<
    ValueProps[]
  >([]);
  const [nuevo_orden_estantes_selected, set_nuevo_orden_estantes_selected] =
    React.useState<ValueProps[]>([]);

  const [nuevo_orden_cajas_selected, set_nuevo_orden_cajas_selected] =
    React.useState<ValueProps[]>([]);

  const [
    depositos_selected_mover_estante,
    set_depositos_selected_mover_estante,
  ] = React.useState<ValueProps[]>([]);

  const [estantes_selected, set_estantes_selected] = React.useState<
    ValueProps[]
  >([]);

  const [bandejas_selected, set_bandejas_selected] = React.useState<
    ValueProps[]
  >([]);

  const [bandejas_selected_get, set_bandejas_selected_get] = React.useState<
    ValueProps[]
  >([]);
  const [depositos_selected_mover_caja, set_depositos_selected_mover_caja] =
    React.useState<ValueProps[]>([]);

  // * rows

  const [rows_estantes, set_rows_estantes] = React.useState<GetEstantes[]>([]);
  const [rows_bandejas, set_rows_bandejas] = React.useState<GetBandejas[]>([]);
  const [rows_carpetas, set_rows_carpetas] = React.useState<ICarpetas[]>([]);
  const [rows_cajas, set_rows_cajas] = React.useState<ICajas[]>([]);

  // * info
  const [identificacion_deposito, set_identificacion_deposito] =
    React.useState<string>('');
  const [identificacion_caja, set_identificacion_caja] = React.useState('');
  const [orden_siguiente, set_orden_siguiente] =
    React.useState<ListarOrdenSiguiente>();

  // * fetch
  const fetch_data_sucursal = async (): Promise<void> => {
    try {
      const response = await get_sucursales();
      if (response?.length > 0) {
        const data_sucursal: ValueProps[] = response.map(
          (item: ListarSucursales) => ({
            value: item.id_sucursal_empresa,
            label: item.descripcion_sucursal,
          })
        );
        set_sucusal_selected(data_sucursal);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_depositos = async (): Promise<void> => {
    try {
      const response = await get_depositos();
      if (response?.length > 0) {
        const data_depo: ValueProps[] = response.map(
          (item: ListarDepositos) => ({
            value: item.id_deposito,
            label: item.nombre_deposito,
            // label: `${item.identificacion_por_entidad} - ${item.nombre_deposito}`,
          })
        );
        set_depositos_selected(data_depo);

        const data_mover: ValueProps[] = response.map(
          (item: ListarDepositos) => ({
            item,
            value: item.identificacion_por_entidad,
            label: item.nombre_deposito,
            // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
          })
        );
        set_depositos_selected_mover_estante(data_mover);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_estantes_depositos = async (): Promise<void> => {
    try {
      const response = await get_estantes_deposito(id_deposito as number);
      if (response?.length > 0) {
        const data_estantes: GetEstantes[] = response.map(
          (item: GetEstantes) => ({
            id_estante_deposito: item.id_estante_deposito,
            orden_ubicacion_por_deposito: item.orden_ubicacion_por_deposito,
            identificacion_por_deposito: item.identificacion_por_deposito,
          })
        );
        set_rows_estantes(data_estantes);

        const data_selected: any[] = response.map((item: GetEstantes) => ({
          value: item.orden_ubicacion_por_deposito ?? '',
          label: item.orden_ubicacion_por_deposito ?? '',
          // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
        }));
        set_nuevo_orden_estantes_selected(data_selected);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_bandejas_estantes = async (): Promise<void> => {
    try {
      const response = await get_bandejas_estante(id_estante as number);
      if (response?.length > 0) {
        const data_bandejas: GetBandejas[] = response.map(
          (item: GetBandejas) => ({
            id_bandeja_estante: item.id_bandeja_estante,
            orden_ubicacion_por_estante: item.orden_ubicacion_por_estante,
            identificacion_por_estante: item.identificacion_por_estante,
          })
        );
        set_rows_bandejas(data_bandejas);
        // const data_selected: any[] = response.map((item: GetBandejas) => ({
        //   value: item.orden_ubicacion_por_estante ?? '',
        //   label: item.orden_ubicacion_por_estante ?? '',
        //   // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
        // }));
        // set_nuevo_orden_estantes_selected(data_selected);

        const data_bandeja: any[] = response.map((item: GetBandejas) => ({
          value: item.id_bandeja_estante ?? '',
          label: item.identificacion_por_estante ?? '',
          // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
        }));
        set_bandejas_selected_get(data_bandeja);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_caja_carpeta = async (): Promise<void> => {
    try {
      const response = await get_caja_carpetas(id_caja as number);
      if (response?.length > 0) {
        const data_carpetas: ICarpetas[] | any = response.map((item: ICarpetas) => ({
          id_carpeta_caja: item.id_caja_bandeja,
          identificacion_por_caja: item.identificacion_por_caja,
          orden_ubicacion_por_caja: item.orden_ubicacion_por_caja,
          id_expediente: item.id_expediente,
          id_caja_bandeja: item.id_caja_bandeja,
          identificacion_caja: item.identificacion_caja,
        }));
        set_rows_carpetas(data_carpetas);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_caja_bandeja = async (): Promise<void> => {
    try {
      const response = await get_cajas_bandeja(id_bandeja as number);
      if (response?.length > 0) {
        const data_cajas: ICajas[] = response.map((item: ICajas) => ({
          id_caja_bandeja: item.id_caja_bandeja,
          identificacion_por_bandeja: item.identificacion_por_bandeja,
          orden_ubicacion_por_bandeja: item.orden_ubicacion_por_bandeja,
          id_bandeja_estante: item.id_bandeja_estante,
          identificacion_bandeja: item.identificacion_bandeja,
        }));
        set_rows_cajas(data_cajas);
        const data_orden: any[] = response.map((item: ICajas) => ({
          value: item.orden_ubicacion_por_bandeja ?? '',
          label: item.orden_ubicacion_por_bandeja ?? '',
        }));
        set_nuevo_orden_cajas_selected(data_orden);
      } else {
        set_rows_cajas([]);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Algo paso, intente de nuevo' ||
          'Hubo un error, intente de nuevo'
      );
    }
  };

  const fetch_data_orden_estante = async (): Promise<void> => {
    try {
      const response = await listar_orden_estantes();
      set_orden_siguiente(response);
      // //  console.log('')('response', response);
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const fetch_data_orden_cajas = async (): Promise<void> => {
    try {
      const response = await listar_orden_cajas();
      set_orden_siguiente(response);
      // //  console.log('')('response', response);
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  // ? --------------------------------- Mover cajas ---------------------------------
  const fetch_data_depositos_mover_caja = async (): Promise<void> => {
    try {
      const response = await get_depositos();
      if (response?.length > 0) {
        const filterDataMover = response.filter(
          (el) => el.id_deposito !== cajas.id_deposito
        );

        const data_mover: ValueProps[] = filterDataMover.map(
          (item: ListarDepositos) => ({
            item,
            value: item.identificacion_por_entidad,
            label: `${item.identificacion_por_entidad} - ${item.nombre_deposito} `,
          })
        );
        set_depositos_selected_mover_caja(data_mover);
      } else {
        control_warning('No hay depositos disponibles');
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_estantes_mover_cajas = async (): Promise<void> => {
    try {
      const response = await get_estantes_deposito(id_deposito as number);
      if (response?.length > 0) {
        const filterDataMover = response.filter(
          (el) => el.id_estante_deposito !== cajas.id_estante
        );

        const data_selected: any[] = filterDataMover.map(
          (item: GetEstantes) => ({
            item,
            value: item.identificacion_por_deposito ?? '',
            label: item.identificacion_por_deposito ?? '',
          })
        );
        set_estantes_selected(data_selected);
      } else {
        control_warning('No hay estantes disponibles');
        set_estantes_selected([]);
        set_id_deposito(null);
      }
    } catch (error: any) {
      const err: AxiosError = error;
      if (err?.response?.status === 404) {
        control_warning('No hay estantes disponibles');
        set_estantes_selected([]);
        set_id_deposito(null);
      } else {
        control_error(
          error.response.data.detail || 'Algo paso, intente de nuevo'
        );
      }
    }
  };
  const fetch_data_bandejas_mover_caja = async (): Promise<void> => {
    try {
      const response = await get_bandejas_estante(id_estante as number);
      if (response?.length > 0) {
        const filterDataMover = response.filter(
          (el) => el.id_bandeja_estante !== cajas.id_bandeja
        );

        const data_bandeja: any[] = filterDataMover.map(
          (item: GetBandejas) => ({
            item,
            value: item.identificacion_por_estante ?? '',
            label: item.identificacion_por_estante ?? '',
          })
        );
        set_bandejas_selected(data_bandeja);
      } else {
        control_warning('No hay bandejas disponibles');
        set_bandejas_selected([]);
        set_id_estante(null);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id
    id_deposito,
    set_id_deposito,
    id_estante,
    set_id_estante,
    id_caja,
    set_id_caja,
    id_bandeja,
    set_id_bandeja,
    // * orden estantes
    orden,
    set_orden,
    nuevo_orden,
    set_nuevo_orden,
    // * select
    sucusal_selected,
    depositos_selected,
    depositos_selected_mover_estante,
    nuevo_orden_estantes_selected,
    nuevo_orden_cajas_selected,
    estantes_selected,
    bandejas_selected,
    bandejas_selected_get,
    depositos_selected_mover_caja,
    set_depositos_selected_mover_caja,
    set_bandejas_selected_get,
    set_depositos_selected,
    set_sucusal_selected,
    set_depositos_selected_mover_estante,
    set_nuevo_orden_estantes_selected,
    set_nuevo_orden_cajas_selected,
    set_estantes_selected,
    set_bandejas_selected,
    // * rows
    rows_estantes,
    set_rows_estantes,
    rows_bandejas,
    set_rows_bandejas,
    rows_carpetas,
    set_rows_carpetas,
    rows_cajas,
    set_rows_cajas,
    // * info
    identificacion_deposito,
    set_identificacion_deposito,
    identificacion_caja,
    set_identificacion_caja,
    orden_siguiente,
    set_orden_siguiente,
    // * fetch
    fetch_data_sucursal,
    fetch_data_depositos,
    fetch_data_estantes_depositos,
    fetch_data_bandejas_estantes,
    fetch_data_caja_carpeta,
    fetch_data_caja_bandeja,
    fetch_data_orden_estante,
    fetch_data_orden_cajas,
    // ? --------------------------------- Mover cajas ---------------------------------

    fetch_data_depositos_mover_caja,
    fetch_data_estantes_mover_cajas,
    fetch_data_bandejas_mover_caja,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
