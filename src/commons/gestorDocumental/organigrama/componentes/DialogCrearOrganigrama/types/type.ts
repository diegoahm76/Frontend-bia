import type { Dispatch, SetStateAction } from "react";

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

export interface FormValues {
  nombre: string;
  version: string;
  descripcion: string;
}