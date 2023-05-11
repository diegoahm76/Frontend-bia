// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";
import { type crear_mantenimiento } from "../../../interfaces/IProps";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_previsualizacion = () => {
    const [rows, set_rows] = useState<crear_mantenimiento[]>([]);
    const [tipo_mantenimiento, set_tipo_mantenimiento] = useState<string>("");
    const [especificacion, set_especificacion] = useState<string>("");
    const [detalle_seleccionado, set_detalle_seleccionado] = useState<any | null>(null);
    const [prog_detalle, set_prog_detalle] = useState<any | null>(null);
    const [user_info, set_user_info] = useState<any | null>(null);
    const [programacion, set_programacion] = useState<any | null>(null);
    return {
        // States
        rows,
        detalle_seleccionado,
        tipo_mantenimiento,
        especificacion,
        user_info,
        programacion,
        prog_detalle,
        // Edita States
        set_rows,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_especificacion,
        set_user_info,
        set_programacion,
        set_prog_detalle
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_previsualizacion;