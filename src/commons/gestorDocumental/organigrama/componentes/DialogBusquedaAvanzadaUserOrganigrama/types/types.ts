import type { Dispatch, SetStateAction } from "react";
import type { UserDelegacionOrganigrama } from "../../../interfaces/organigrama";

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  search_result: (data: UserDelegacionOrganigrama) => void;
}

export interface FormValues {
  nombre_usuario: string;
}

export type keys_object = 'primer_nombre' | 'primer_apellido';
