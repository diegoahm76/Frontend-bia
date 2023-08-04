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
import { get_data_cuenca_instrumentos } from '../../../../ConsultaBiblioteca/request/request';
import type { AxiosError } from 'axios';
import { set } from 'date-fns';
import { useAppSelector } from '../../../../../../hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const useRegisterInstrumentoHook = () => {
  // use form

  const {
    handleSubmit,
    register,
    reset: reset_instrumento,
    control,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      nombre: '',
      nombre_seccion: '',
      nombre_subseccion: '',
      cod_tipo_agua: '',
      fecha_creacion_instrumento: '',
      fecha_fin_vigencia: '',
      id_cuencas: [],
      id_pozo: '',
      nombre_actualizar: '',
    },
  });

  const watch_instrumento = watch();

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
    id_instrumento,
    set_is_loading_submit,
    set_is_open_cuenca,
    set_is_open_pozos,
    fetch_data_pozo,
    set_archivos,
    set_nombres_archivos,
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
        setValue('fecha_fin_vigencia', value?.format('YYYY-MM-DD') ?? '');
        break;
      default:
        break;
    }
  };

  //  autocomplete y select pozos
  const { id_instrumento: id_instrumento_slice } = useAppSelector(
    (state) => state.instrumentos_slice
  );

  const [cuenca, set_cuenca] = useState<ValueProps[]>([]);
  const [cuenca_select, set_cuenca_select] = useState<ValueProps[]>([]);
  const [originalCuencaValues, setOriginalCuencaValues] = useState<
    ValueProps[]
  >([]);

  const data_id_cuencas = watch('id_cuencas') ?? [];

  const fetch_data_cuencas_instrumentos_select = async (): Promise<void> => {
    try {
      if (id_instrumento) {
        const response = await get_data_cuenca_instrumentos(
          id_instrumento || id_instrumento_slice
        );
        if (response?.length > 0) {
          const data_cuenca = response.map((item: IpropsCuenca) => ({
            value: item.id_cuenca,
            label: item.cuenca ?? '',
          }));
          set_cuenca_select(data_cuenca);
          // setOriginalCuencaValues(data_cuenca); // Store the fetched data in the original state
        }
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const fetch_data_cuencas = async (): Promise<void> => {
    try {
      const response = await get_cuencas();
      if (response?.length > 0) {
        const data_cuenca = response.map((item: IpropsCuenca) => ({
          value: item.id_cuenca,
          label: item.nombre ?? '',
        }));
        // setValue('id_cuencas', data_cuenca.map((e) => e.value) as never[]);
        setOriginalCuencaValues(data_cuenca);
        set_cuenca(data_cuenca);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const handle_change_autocomplete_edit = (
    event: React.SyntheticEvent<Element, Event>,
    value: ValueProps[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ValueProps>
  ): void => {
    setValue('id_cuencas', value.map((e) => e.value) as never[]);
    set_cuenca_select(value);
  };

  const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: ValueProps[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ValueProps>
  ): void => {
    setValue('id_cuencas', value.map((e) => e.value) as never[]);
  };

  const limpiar_formulario = (): void => {
    reset_instrumento();
    set_fecha_creacion(null);
    set_fecha_vigencia(null);
    set_cuenca([]);
    set_archivos([]);
    set_nombres_archivos([]);
  };

  const limpiar_archivos = (): void => {
    set_archivos([]);
    set_nombres_archivos([]);
  };

  // <-------------------> ver cartera de aforo o prueba de bombeo <------------------->

  const [is_open_cartera_aforo, set_is_open_cartera_aforo] =
    useState<boolean>(false);
  const [is_open_prueba_bombeo, set_is_open_prueba_bombeo] =
    useState<boolean>(false);

  // * Editar Archivos
  const [id_archivo, set_id_archivo] = useState<number | null>(null);
  const [is_open_edit_archivos, set_is_open_edit_archivos] =
    useState<boolean>(false);

  // * agregar resultado de laboratorio

  const [is_open_result_laboratorio, set_is_open_result_laboratorio] =
    useState(false);

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
    handle_change_autocomplete_edit,
    fetch_data_cuencas,
    fetch_data_pozo,

    // * ver cartera de aforo o prueba de bombeo
    is_open_cartera_aforo,
    is_open_prueba_bombeo,
    set_is_open_cartera_aforo,
    set_is_open_prueba_bombeo,

    // * Editar Archivos
    is_open_edit_archivos,
    set_is_open_edit_archivos,
    id_archivo,
    set_id_archivo,

    // *use form
    register,
    reset_instrumento,
    handleSubmit,
    watch,
    setValue,
    watch_instrumento,
    control,
    formErrors,

    // * limpia formulario
    limpiar_formulario,
    limpiar_archivos,

    //* data cuenca

    fetch_data_cuencas_instrumentos_select,
    cuenca_select,

    // * agregar resultado de laboratorio

    is_open_result_laboratorio,
    set_is_open_result_laboratorio,
  };
};
