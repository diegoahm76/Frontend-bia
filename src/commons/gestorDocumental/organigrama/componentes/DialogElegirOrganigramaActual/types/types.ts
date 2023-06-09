import type { Dispatch, SetStateAction } from "react";

export interface OrgActual {
  actual: boolean;
  descripcion: string;
  fecha_puesta_produccion: string;
  fecha_retiro_produccion: string | null;
  fecha_terminado: string;
  id_organigrama: number;
  id_persona_cargo: number | null;
  justificacion_nueva_version: string | null;
  nombre: string;
  ruta_resolucion: string | null;
  version: string;
}

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
  organigrama: number | string;
  ccd: number;
  trd: number;
  tca: number;
  justificacion: string;
}

export type keys_object = 'organigrama' | 'ccd' | 'justificacion';