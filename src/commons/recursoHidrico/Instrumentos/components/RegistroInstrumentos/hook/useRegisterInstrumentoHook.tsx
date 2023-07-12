import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const useRegisterInstrumentoHook = () => {
  // informacion instrumento

  const [fecha_creacion, set_fecha_creacion] = useState<Dayjs | null>(null);
  const [fecha_vigencia, set_fecha_vigencia] = useState<Dayjs | null>(null);
  const [current_date, set_current_date] = useState(
    dayjs().format('DD/MM/YYYY')
  );

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_creacion':
        set_fecha_creacion(value);
        break;
      case 'fecha_vigencia':
        set_fecha_vigencia(value);
        break;
      default:
        break;
    }
  };

  return {
    fecha_creacion,
    fecha_vigencia,
    current_date,
    set_current_date,
    set_fecha_creacion,
    set_fecha_vigencia,
    handle_date_change,
  };
};
