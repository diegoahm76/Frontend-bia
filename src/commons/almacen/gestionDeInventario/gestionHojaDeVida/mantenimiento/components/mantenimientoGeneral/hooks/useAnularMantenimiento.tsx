// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_anular_mantenimiento = () => {
    const [title, set_title] = useState<string>('');
    const [anular_mantenimiento_is_active, set_anular_mantenimiento_is_active] = useState<boolean>(false);

    return {
        // States
        title,
        anular_mantenimiento_is_active,
        // Edita States
        set_title,
        set_anular_mantenimiento_is_active
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_anular_mantenimiento;