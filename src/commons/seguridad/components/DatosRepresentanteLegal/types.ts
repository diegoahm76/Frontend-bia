import type { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface PropsDatosRepresentanteLegal {
    id_persona: number;
    id_representante_legal: number;
    fecha_inicio: string;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    set_id_reoresentante_legal : (id_representante_legal: number) => void;
}