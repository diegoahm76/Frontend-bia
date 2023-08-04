/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
// import localizedFormat from 'dayjs/plugin/localizedFormat';

export const use_register_bombeo_hook = () => {
  // * USE FORM

  const {
    register: register_bombeo,
    handleSubmit: handleSubmit_bombeo,
    formState: { errors: errors_bombeo },
    control: control_bombeo,
    reset: reset_bombeo,
    setValue: setValue_bombeo,
    getValues: getValues_bombeo,
    watch: watch_bombeo,
  } = useForm({
    defaultValues: {
      // Datos generales
      id_prueba_bombeo: '',
      id_instrumento: '',
      id_pozo: '',
      descripcion: '',
      fecha_prueba_bombeo: '',
      latitud: '',
      longitud: '',
      ubicacion_prueba: '',

      // * secciones
      id_sesion_prueba_bombeo: '',
      hora_inicio: '',
      cod_tipo_sesion: '',

      // *datos prueba de bombeo
      tiempo_transcurrido: '0',
      nivel: '',
      resultado: '',
      caudal: '',
    },
  });

  // Datos generales

  const [fecha_prubea_bombeo, set_fecha_prubea_bombeo] = useState<Dayjs | null>(
    null
  );

  const [horaPruebaBombeo, setHoraPruebaBombeo] = useState<Dayjs | null>(null);

  const handle_time_change = (value: Dayjs | null): void => {
    if (value !== null) {
      const time = value.format('HH:mm:ss'); // Cambia 'HH:mm:ss' a 'hh:mm:ss A' para el formato de 12 horas.
      setHoraPruebaBombeo(dayjs(time, 'HH:mm:ss'));
      setValue_bombeo('hora_inicio', time);
    }
  };

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    if (value !== null) {
      switch (fieldName) {
        case 'fecha_prueba':
          set_fecha_prubea_bombeo(value);
          break;
        default:
          break;
      }
    }
  };

  // prueba de bombeo

  const [row_prueba, set_row_prueba] = useState<any[]>([]);
  const [row_data_prueba, set_row_data_prueba] = useState<any[]>([]);

  const handle_agregar = () => {
    // obtener los valores actuales del formulario
    const values = getValues_bombeo();

    // convertir el tiempo transcurrido a milisegundos
    const tiempoTranscurridoMs =
      parseInt(values.tiempo_transcurrido, 10) * 60000;

    // calcular la nueva hora de inicio basada en el tiempo transcurrido
    const originalHoraInicio = dayjs(values.hora_inicio, 'HH:mm:ss'); // La hora de inicio original en formato HH:mm:ss
    const newHoraInicio = originalHoraInicio
      .add(tiempoTranscurridoMs, 'millisecond')
      .format('HH:mm:ss'); // Suma el tiempo transcurrido a la hora de inicio y cambia el formato de fecha a HH:mm:ss

    // agregar los datos a row_prueba
    set_row_prueba((prevState) =>
      [
        ...prevState,
        {
          tiempo_transcurrido:
            row_prueba.length === 0 ? 0 : values.tiempo_transcurrido,
          hora_inicio: newHoraInicio,
          nivel: values.nivel,
          resultado: values.resultado,
          caudal: values.caudal,
        },
      ].sort((a, b) => (a.hora_inicio > b.hora_inicio ? 1 : -1))
    ); // Ordenamos las filas por hora de inicio

    // agregar los datos a row_data_prueba
    if (row_data_prueba.length === 0) {
      set_row_data_prueba((prevState) => [
        ...prevState,
        {
          hora_inicio: newHoraInicio,
          cod_tipo_sesion: values.cod_tipo_sesion,
        },
      ]);
    }

    // Reinicia los campos de entrada
    setValue_bombeo('tiempo_transcurrido', '');
    setValue_bombeo('nivel', '');
    setValue_bombeo('resultado', '');
    setValue_bombeo('caudal', '');
  };

  const [is_saving, set_is_saving] = useState<boolean>(false);
  const onSubmit = handleSubmit_bombeo(async (data: any) => {
    try {
      set_is_saving(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      set_is_saving(false);
    }
  });

  return {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
    row_data_prueba,
    set_fecha_prubea_bombeo,
    handle_agregar,
    handle_date_change,
    handle_time_change,

    // * USE FORM
    register_bombeo,
    handleSubmit_bombeo,
    errors_bombeo,
    control_bombeo,
    reset_bombeo,
    setValue_bombeo,
    getValues_bombeo,
    watch_bombeo,

    // * onSubmit
    onSubmit,
    is_saving,
  };
};
