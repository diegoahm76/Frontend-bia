import type { Dispatch, SetStateAction } from "react";

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
}

export interface IFormValues {
  codigo: number | string;
  nombre: string;
  id_subserie_doc: number | null;
  id_serie_doc: number | null;
}