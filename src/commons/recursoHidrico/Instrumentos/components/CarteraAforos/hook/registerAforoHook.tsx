/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_aforo_hook = () => {

  // use form
  
  const {
    control: control_cartera_aforo,
    watch: watch_cartera_aforo,
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  const watch_aforo = watch_cartera_aforo();

  // Datos generales

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

  // calulo de cartera de aforo

  const [row_aforo, set_row_aforo] = useState<any[]>([]);
  const [distancia_orilla, set_distancia_orilla] = useState('');
  const [profundidad, set_profundidad] = useState('');
  const [velocidad_superficial, set_velocidad_superficial] = useState('');
  const [velocidad_profunda, set_velocidad_profunda] = useState('');

  const handle_agregar = (): void => {
    const anterior = row_aforo[row_aforo.length - 1]; // Último registro de la tabla

    const distanciaOrilla = parseFloat(distancia_orilla);
    const profundidadValor = parseFloat(profundidad);
    const velocidadSuperficialValor = parseFloat(velocidad_superficial);
    const velocidadProfundaValor = parseFloat(velocidad_profunda);

    const transecto = anterior
      ? distanciaOrilla - parseFloat(anterior.distancia_orilla)
      : 0; // Cálculo del transecto

    const profundidad_promedio =
      (profundidadValor + (anterior ? parseFloat(anterior.profundidad) : 0)) /
      2; // Cálculo de la profundidad promedio

    const velocidad_promedio =
      (velocidadSuperficialValor + velocidadProfundaValor) / 2; // Cálculo de la velocidad promedio

    const velocidad_transecto =
      (velocidad_promedio +
        (anterior ? parseFloat(anterior.velocidad_promedio) : 0)) /
      2; // Cálculo de la velocidad del transecto

    const caudal = transecto * profundidad_promedio * velocidad_transecto; // Cálculo del caudal

    const new_data = {
      distancia_orilla: distanciaOrilla,
      transecto,
      profundidad: profundidadValor,
      Profundidad_promedio: profundidad_promedio,
      velocidad_promedio,
      valocidad_superficial: velocidadSuperficialValor,
      valocidad_profunda: velocidadProfundaValor,
      valocidad_transecto: velocidad_transecto,
      caudal,
    };

    set_row_aforo([...row_aforo, new_data]);

    // Limpiar los valores de los inputs
    set_distancia_orilla('');
    set_profundidad('');
    set_velocidad_superficial('');
    set_velocidad_profunda('');
  };

  return {
    // use form cartera de aforo
    control_cartera_aforo,
    watch_aforo,
    errors,

    // general
    fecha_aforo,
    tipo_aforo_value,
    row_aforo,
    distancia_orilla,
    profundidad,
    velocidad_superficial,
    velocidad_profunda,
    set_distancia_orilla,
    set_profundidad,
    set_velocidad_superficial,
    set_velocidad_profunda,
    handle_date_change,
    handle_tipo_aforo_change,
    handle_agregar,
  };
};
