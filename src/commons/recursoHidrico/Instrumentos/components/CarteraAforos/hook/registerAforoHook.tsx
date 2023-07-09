import { useState } from 'react';
import type { Dayjs } from 'dayjs';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const register_aforo_hook = () => {
  const [fecha_aforo, set_fecha_aforo] = useState<Dayjs | null>(null);

  const [tipo_aforo_value, set_tipo_aforo_value] = useState('');

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_aforo':
        set_fecha_aforo(value);
        break;
    }
  };
  const handle_tipo_aforo_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_tipo_aforo_value(event.target.value);
  };

  return {
    fecha_aforo,
    tipo_aforo_value,
    handle_date_change,
    handle_tipo_aforo_change,
  };
};
