// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";
import { type row } from "../../../interfaces/IProps";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_previsualizacion = () => {
    const [rows, set_rows] = useState<row[]>([]);
    const [marca, set_marca] = useState<string>("");
    const [serial_placa, set_serial_placa] = useState<string>("");
    const [modelo, set_modelo] = useState<string>("");
    const [kilometraje, set_kilometraje] = useState<string>("");

    return {
        // States
        rows,
        marca,
        serial_placa,
        modelo,
        kilometraje,
        // Edita States
        set_rows,
        set_marca,
        set_serial_placa,
        set_modelo,
        set_kilometraje
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_previsualizacion;