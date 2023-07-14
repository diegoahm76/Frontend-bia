/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../context/contextData';
import type { IpropsCuenca, ValueProps } from '../../../interfaces/interface';
import {
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
} from '@mui/material';
import { control_error } from '../../../../../../helpers';
import { get_cuencas } from '../../../../configuraciones/Request/request';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const useRegisterInstrumentoHook = () => {
  // use form

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      nombre: '',
      cod_tipo_agua: '',
      fecha_creacion_instrumento: '',
      fecha_fin_vigencia: '',
      id_cuencas: [],
      id_pozo: '',
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
    pozos_selected,
    is_loading_submit,
    set_is_loading_submit,
    set_is_open_cuenca,
    set_is_open_pozos,
    fetch_data_pozo,
  } = useContext(DataContext);

  const tipo_agua_selected = watch('cod_tipo_agua') ?? '';
  const id_pozo_selected = watch('id_pozo') ?? '';

  useEffect(() => {
    setValue('cod_tipo_agua', tipo_agua_selected);
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
        setValue(
          'fecha_creacion_instrumento',
          value?.format('YYYY-MM-DDTHH:mm:ss') ?? ''
        );
        break;
      case 'fecha_vigencia':
        set_fecha_vigencia(value);
        setValue(
          'fecha_fin_vigencia',
          value?.format('YYYY-MM-DD') ?? ''
        );
        break;
      default:
        break;
    }
  };

  //  autocomplete y select pozos
  const [cuenca, set_cuenca] = useState<ValueProps[]>([]);

  const data_id_cuencas = watch('id_cuencas') ?? [];

  const fetch_data_cuencas = async (): Promise<void> => {
    try {
      const response = await get_cuencas();
      if (response?.length > 0) {
        const data_cuenca = response.map((item: IpropsCuenca) => ({
          value: item.id_cuenca,
          label: item.nombre,
        }));
        // setValue('id_cuencas', data_cuenca.map((e) => e.value) as never[]);
        set_cuenca(data_cuenca);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: ValueProps[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ValueProps>
  ): void => {
    setValue('id_cuencas', value.map((e) => e.value) as never[]);
  };

  return {
    is_loading_submit,
    pozos_selected,
    data_id_cuencas,
    id_pozo_selected,
    cuenca,
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
    set_is_loading_submit,
    set_fecha_creacion,
    set_fecha_vigencia,
    set_is_open_cuenca,
    set_is_open_pozos,
    handle_date_change,
    handle_change_autocomplete,
    fetch_data_cuencas,
    fetch_data_pozo,
    register,
    reset,
    handleSubmit,
    watch,
    control,
    formErrors,
  };
};
