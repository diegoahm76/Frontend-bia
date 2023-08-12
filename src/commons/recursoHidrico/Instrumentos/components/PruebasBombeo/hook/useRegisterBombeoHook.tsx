/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { post_archivos, post_prueba_bombeo } from '../../../request/request';
import { control_error, control_success } from '../../../../../../helpers';
import { useAppSelector } from '../../../../../../hooks';
import { DataContext } from '../../../context/contextData';
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
      id_pozo: {
        value: '',
        label: '',
      },
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

  const {
    archivos,
    nombres_archivos,
    rows_sesion_bombeo,
    id_bombeo_general,
    info_sesion_bombeo,
    info_data_sesion_bombeo,
    rows_data_sesion_bombeo,
    id_sesion_bombeo,
    rows_anexos_bombeo,
    fetch_data_general_sesion,
    set_id_bombeo_general,
    set_id_sesion_bombeo,
    set_info_sesion_bombeo,
    set_archivos,
    set_nombres_archivos,
    fetch_data_sesion,
    set_info_data_sesion_bombeo,
    fetch_data_anexos_bombeo,
    // * editar archivo
  } = useContext(DataContext);

  const { id_instrumento: id_instrumento_slice, id_prueba_bombeo } =
    useAppSelector((state) => state.instrumentos_slice);

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
          setValue_bombeo('fecha_prueba_bombeo', value.format('YYYY-MM-DD'));
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
    console.log(values, 'values');

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
  const [id_sesion_prueba_bombeo, set_id_sesion_prueba_bombeo] = useState<
    number | null
  >(null);

  const limpiar_formulario = (): void => {
    set_row_prueba([]);
    set_row_data_prueba([]);
    setValue_bombeo('id_sesion_prueba_bombeo', '');
    setValue_bombeo('hora_inicio', '');
    setValue_bombeo('cod_tipo_sesion', '');
    setValue_bombeo('tiempo_transcurrido', '');
    setValue_bombeo('nivel', '');
    setValue_bombeo('resultado', '');
    setValue_bombeo('caudal', '');
    setHoraPruebaBombeo(null);
    set_nombres_archivos([]);
    set_archivos([]);
  };

  const onSubmit = handleSubmit_bombeo(async (data: any) => {
    try {
      set_is_saving(true);
      set_id_sesion_prueba_bombeo(null);
      data.id_sesion_prueba_bombeo = id_sesion_prueba_bombeo;
      data.id_instrumento = id_instrumento_slice;
      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'LAB';
      const archivos_bombeo = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          archivos_bombeo.append(`ruta_archivo`, archivo);
          archivos_bombeo.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_bombeo.append('id_instrumento', String(id_instrumento_slice));
      archivos_bombeo.append('cod_tipo_de_archivo', codigo_archivo);

      await post_prueba_bombeo(
        data,
        row_data_prueba,
        row_prueba,
        archivos_bombeo,
        archivos
      ).then((response) => {
        set_id_sesion_prueba_bombeo(
          response?.reponse_general?.data?.prueba_bombeo?.id_prueba_bombeo
        );
        set_id_bombeo_general(
          response?.reponse_general?.data?.prueba_bombeo?.id_prueba_bombeo
        );
        if (id_bombeo_general) {
          void fetch_data_general_sesion();
        }
      });
      control_success('Prueba de bombeo guardada correctamente');
      limpiar_formulario();
    } catch (error: any) {
      control_error(
        error.response?.data?.detail ||
          'Ha ocurrido un error, vuelva a intentarlo más tarde'
      );
      console.log(error, 'error');
    } finally {
      set_is_saving(false);
    }
  });
  const onSubmit_archivos = handleSubmit_bombeo(async (data: any) => {
    try {
      set_is_saving(true);
      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'LAB';
      const archivos_bombeo = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          archivos_bombeo.append(`ruta_archivo`, archivo);
          archivos_bombeo.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_bombeo.append('id_prueba_bombeo', String(id_prueba_bombeo));
      archivos_bombeo.append('id_instrumento', String(id_instrumento_slice));
      archivos_bombeo.append('cod_tipo_de_archivo', codigo_archivo);

      await post_archivos(archivos_bombeo);
      await fetch_data_anexos_bombeo(id_prueba_bombeo);
      control_success('Archivo añadido correctamente');
      set_archivos([]);
      set_nombres_archivos([]);
    } catch (error: any) {
      control_error(
        error.response?.data?.detail ||
          'Ha ocurrido un error, vuelva a intentarlo más tarde'
      );
      console.log(error, 'error');
    } finally {
      set_is_saving(false);
    }
  });

  return {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
    row_data_prueba,
    setHoraPruebaBombeo,
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
    onSubmit_archivos,
    is_saving,

    // * datos de sesion
    rows_sesion_bombeo,
    id_bombeo_general,
    info_sesion_bombeo,
    info_data_sesion_bombeo,
    rows_data_sesion_bombeo,
    id_sesion_bombeo,
    rows_anexos_bombeo,
    set_id_sesion_bombeo,
    set_info_data_sesion_bombeo,
    set_info_sesion_bombeo,
    set_id_bombeo_general,
    fetch_data_general_sesion,
    fetch_data_sesion,
    fetch_data_anexos_bombeo,
  };
};
