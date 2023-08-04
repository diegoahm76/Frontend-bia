/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from "react-hook-form";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_alerta_hook = () => {

    // * use form hook
    const {
        register: register_alerta,
        handleSubmit: handleSubmit_alerta,
        control: control_alerta,
        reset: reset_alerta,
        formState: { errors: errors_alerta },
        setValue: setValue_alerta,
        getValues: getValues_alerta,
    }= useForm();

    return {
        register_alerta,
        handleSubmit_alerta,
        control_alerta,
        reset_alerta,
        errors_alerta,
        setValue_alerta,
        getValues: getValues_alerta,
    };
}