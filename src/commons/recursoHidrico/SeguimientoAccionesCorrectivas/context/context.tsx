/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext } from "react";
import { IAccionCorrectiva } from "../interfaces/types";
import React from "react";
import { get_acciones_correctivas_id_tramite } from "../services/services";
import { control_error } from "../../../../helpers";

interface UserContext {
  // * id
  id_tramite: number | null;
  set_id_tramite: (value: number | null) => void;
  id_expediente: number | null;
  set_id_expediente: (value: number | null) => void;
  id_accion: number | null;
  set_id_accion: (value: number | null) => void;

  // * select
  is_expediente: boolean;
  set_is_expediente: (value: boolean) => void;
  is_proyecto: boolean;
  set_is_proyecto: (value: boolean) => void;

  // * rows
  //TODO: Definir interfaz tramite
  rows_tramites: any[];
  set_rows_tramites: (value: any[]) => void;
  rows_acciones: IAccionCorrectiva[];
  set_rows_acciones: (value: IAccionCorrectiva[]) => void;

  // * select

  // * info

  // * fetch
  fetch_data_acciones_correctivas: () => Promise<void>;
}

export const DataContextAccionesCorrectivas = createContext<UserContext>({
  // * id
  id_tramite: null,
  set_id_tramite: () => {},
  id_expediente: null,
  set_id_expediente: () => {},
  id_accion: null,
  set_id_accion: () => {},

  // * select
  is_expediente: false,
  set_is_expediente: () => {},
  is_proyecto: false,
  set_is_proyecto: () => {},

  rows_tramites: [],
  set_rows_tramites: () => {},
  rows_acciones: [],
  set_rows_acciones: () => {},

  fetch_data_acciones_correctivas: async () => {},
});

export const UserProviderAccionCorrectiva = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id
  const [id_tramite, set_id_tramite] = React.useState<number | null>(null);
  const [id_expediente, set_id_expediente] = React.useState<number | null>(null);
  const [id_accion, set_id_accion] = React.useState<number | null>(null);

  // * select
  const [is_expediente, set_is_expediente] = React.useState<boolean>(false);
  const [is_proyecto, set_is_proyecto] = React.useState<boolean>(false);
  // * rows

  const [rows_tramites, set_rows_tramites] = React.useState<any[]>([]);
  const [rows_acciones, set_rows_acciones] = React.useState<IAccionCorrectiva[]>([]);

  // * info

  // * fetch
  //* declaracion context

  const fetch_data_acciones_correctivas = async (): Promise<void> => {
    try {
      set_rows_acciones([]);
      const response = await get_acciones_correctivas_id_tramite(id_tramite as number);
      if (response?.length > 0) {
        const data_acciones_correctivas: IAccionCorrectiva[] = response.map(
          (item: IAccionCorrectiva) => ({
            ...item,
          })
        );
        set_rows_acciones(data_acciones_correctivas);
      }else{
        control_error('No hay acciones correctivas registradas para este tramite')
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  }

  const value: UserContext = {
    // * id
    id_tramite,
    set_id_tramite,
    id_expediente,
    set_id_expediente,
    id_accion,
    set_id_accion,

    // * select
    is_expediente,
    set_is_expediente,
    is_proyecto,
    set_is_proyecto,

    // * rows
    rows_tramites,
    set_rows_tramites,
    rows_acciones,
    set_rows_acciones,

    // * info

    // * fetch
    fetch_data_acciones_correctivas
  };

  return (
    <DataContextAccionesCorrectivas.Provider value={value}>
      {children}
    </DataContextAccionesCorrectivas.Provider>
  );
};