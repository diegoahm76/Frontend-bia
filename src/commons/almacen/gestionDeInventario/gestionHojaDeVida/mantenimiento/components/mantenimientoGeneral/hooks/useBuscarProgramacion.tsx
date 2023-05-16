// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_buscar_programacion = () => {
    const [title_programacion, set_title_programacion] = useState<string>('');
    const [buscar_programacion_is_active, set_buscar_programacion_is_active] = useState<boolean>(false);

    return {
        // States
        title_programacion,
        buscar_programacion_is_active,
        // Edita States
        set_title_programacion,
        set_buscar_programacion_is_active
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_buscar_programacion;