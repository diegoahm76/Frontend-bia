/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_laboratorio_hook = () => {
  // Datos GGenerales

  const [fecha_toma_muestra, set_fecha_toma_muestra] = useState<Dayjs | null>(
    null
  );
  const [fecha_envio, set_fecha_envio] = useState<Dayjs | null>(null);
  const [fecha_resultado, set_fecha_resultado] = useState<Dayjs | null>(null);
  const [fecha_analisis, set_fecha_analisis] = useState<Dayjs | null>(null);

  const [clase_muestra_value, set_clase_muestra_value] = useState('');
  const [tipo_parametro_value, set_tipo_parametro_value] = useState('');
  const [unidad_medida_value, set_unidad_medida_value] = useState('');
  const [parametro_value, set_parametro_value] = useState('');

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
      case 'fecha_analisis':
        set_fecha_analisis(value);
        break;
    }
  };

  const handle_change_inputs = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    switch (name) {
      case 'clase_muestra':
        set_clase_muestra_value(value);
        break;
      case 'tipo_parametro':
        set_tipo_parametro_value(value);
        break;
      case 'unidad_medida':
        set_unidad_medida_value(value);
        break;
      case 'parametro':
        set_parametro_value(value);
        break;
    }
  };

  const [rows_laboratorio, set_rows_laboratorio] = useState<any[]>([]);
  const [metodo, set_metodo] = useState('');
  const [resultado, set_resultado] = useState('');

  const handle_agregar = (): void => {
    const new_row = {
      parametro: parametro_value,
      unidad: unidad_medida_value,
      metodo,
      fecha_analisas: (fecha_analisis ?? dayjs()).format('DD/MM/YYYY'),
      resultado,
    };
    set_rows_laboratorio([...rows_laboratorio, new_row]);

    set_unidad_medida_value('');
    set_parametro_value('');
    set_metodo('');
    set_resultado('');
    set_fecha_analisis(null);
  };

  // medición

  return {
    clase_muestra_value,
    tipo_parametro_value,
    unidad_medida_value,
    parametro_value,
    rows_laboratorio,
    fecha_toma_muestra,
    fecha_analisis,
    fecha_envio,
    fecha_resultado,
    metodo,
    resultado,
    set_metodo,
    set_resultado,
    handle_date_change,
    handle_change_inputs,
    handle_agregar,
  };
};
