/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_laboratorio_hook = () => {
  // Datos GGenerales

  const [fecha_toma_muestra, set_fecha_toma_muestra] = useState<Dayjs | null>(
    null
  );
  const [fecha_envio, set_fecha_envio] = useState<Dayjs | null>(null);
  const [fecha_resultado, set_fecha_resultado] = useState<Dayjs | null>(null);
  const [clase_muestra_choices, set_clase_muestra_choices] = useState('');

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_toma_muestra':
        set_fecha_toma_muestra(value);
        break;
      case 'fecha_envio':
        set_fecha_envio(value);
        break;
      case 'fecha_resultado':
        set_fecha_resultado(value);
        break;
    }
  };

  const handle_clase_muestra_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_clase_muestra_choices(event.target.value);
  };

  const [rows_laboratorio, set_rows_laboratorio] = useState<any[]>([]);
  // medición

  return {
    rows_laboratorio,
    fecha_toma_muestra,
    fecha_envio,
    fecha_resultado,
    set_fecha_toma_muestra,
    handle_date_change,
    handle_clase_muestra_change,
  };
};
