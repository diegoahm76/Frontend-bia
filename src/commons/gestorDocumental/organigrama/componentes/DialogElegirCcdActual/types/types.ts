import type { Dispatch, SetStateAction } from "react";

export interface CCD {
  id_ccd: string;
  nombre: string;
  tca: {
    nombre: string;
    version: string;
  };
  trd: {
    nombre: string;
    version: string;
  };
  version: string;
}

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

export interface FormValues {
  ccd: number;
  justificacion: string;
}

export type keys_object = 'ccd' | 'justificacion';