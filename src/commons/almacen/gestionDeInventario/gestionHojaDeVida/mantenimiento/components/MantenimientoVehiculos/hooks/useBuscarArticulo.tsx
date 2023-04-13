// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_buscar_articulo = () => {
    const [title, set_title] = useState<string>('');
    const [consulta_buscar_articulo_is_active, set_buscar_articulo_is_active] = useState<boolean>(false);

    return {
        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_buscar_articulo;