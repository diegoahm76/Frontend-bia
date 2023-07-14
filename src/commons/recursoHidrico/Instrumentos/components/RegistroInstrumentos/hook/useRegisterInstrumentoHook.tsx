/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const useRegisterInstrumentoHook = () => {
  // use form

  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      nombre: '',
      cod_tipo_agua: '',
      fecha_creacion_instrumento: '',
      fecha_vigencia_instrumento: '',
    },
  });

  const {
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    archivos,
    nombres_archivos,
    id_seccion,
    id_subseccion,
    set_is_open_cuenca,
    set_is_open_pozos,
  } = useContext(DataContext);

  const tipo_agua_selected = watch('cod_tipo_agua') ?? '';

  useEffect(() => {
    reset({
      cod_tipo_agua: tipo_agua_selected,
    });
  }, [tipo_agua_selected]);

  // informacion instrumento

  const [fecha_creacion, set_fecha_creacion] = useState<Dayjs | null>(null);
  const [fecha_vigencia, set_fecha_vigencia] = useState<Dayjs | null>(null);

  const current_date = dayjs().format('YYYY-MM-DD');

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_creacion':
        set_fecha_creacion(
          value ? dayjs(value.format('YYYY-MM-DDTHH:mm:ss')) : null
        );
        reset({
          fecha_creacion_instrumento: value?.format('YYYY-MM-DDTHH:mm:ss'),
        });
        break;
      case 'fecha_vigencia':
        set_fecha_vigencia(value);
        reset({
          fecha_vigencia_instrumento: value?.format('YYYY-MM-DD'),
        });
        break;
      default:
        break;
    }
  };

  return {
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    fecha_creacion,
    fecha_vigencia,
    current_date,
    tipo_agua_selected,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    set_fecha_creacion,
    set_fecha_vigencia,
    set_is_open_cuenca,
    set_is_open_pozos,
    handle_date_change,
    register,
    reset,
    handleSubmit,
    watch,
    control,
    formErrors,
  };
};
