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
      tiempo_transcurrido: '',
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

  const handle_agregar = () => {
    // Reinicia los campos de entrada
    setValue_bombeo('tiempo_transcurrido', '');
    setValue_bombeo('nivel', '');
    setValue_bombeo('resultado', '');
    setValue_bombeo('caudal', '');
    setHoraPruebaBombeo(null);
  };
  
  return {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
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
  };
};
