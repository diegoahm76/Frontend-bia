import type { Dispatch, SetStateAction } from "react";

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

export interface FormValues {
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
}

export type keys_object = 'tipo_documento' | 'numero_documento' | 'nombre';