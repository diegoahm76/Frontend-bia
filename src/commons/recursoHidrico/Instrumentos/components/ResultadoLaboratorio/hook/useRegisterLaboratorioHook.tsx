/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  get_data_cuenca_instrumentos,
  get_data_pozo_id,
} from '../../../../ConsultaBiblioteca/request/request';
import { useAppSelector } from '../../../../../../hooks';
import type {
  IpropsCuenca,
  IpropsParametros,
  IpropsPozos,
  ValueProps,
} from '../../../interfaces/interface';
import { type AxiosError } from 'axios';
import { control_error } from '../../../../../../helpers';
import { useForm } from 'react-hook-form';
import {
  get_parametros_laboratorio,
  post_resultado_laboratorio,
} from '../../../request/request';
import { control_success } from '../../../../requets/Request';
import { DataContext } from '../../../context/contextData';
import { data } from '../../../../../almacen/gestionDeInventario/catalogoBienes/interfaces/Nodo';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_laboratorio_hook = () => {
  // * context
  const { id_resultado_laboratorio, set_id_resultado_laboratorio } =
    useContext(DataContext);

  // * Use Form
  const {
    handleSubmit: handleSubmit_laboratorio,
    register: register_laboratorio,
    reset: reset_laboratorio,
    control: control_registro_laboratorio,
    setValue: set_value_laboratorio,
    watch: watch_laboratorio,
    formState: { errors: formErrors_laboratorio },
  } = useForm({
    defaultValues: {
      descripcion: '',
      lugar_muestra: '',
      cod_clase_muestra: '',
      fecha_toma_muestra: '',
      fecha_resultados_lab: '',
      fecha_envio_lab: '',
      fecha_analisis: '',
      latitud: '',
      longitud: '',
      id_cuenca: '',
      id_pozo: '',
      id_parametro: '',
      metodo: '',
      resultado: '',
    },
  });

  const data_watch = watch_laboratorio();
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
        set_value_laboratorio(
          'fecha_toma_muestra',
          value?.format('YYYY-MM-DD') ?? ''
        );
        set_fecha_toma_muestra(value);
        break;
      case 'fecha_envio':
        set_value_laboratorio(
          'fecha_envio_lab',
          value?.format('YYYY-MM-DD') ?? ''
        );
        set_fecha_envio(value);
        break;
      case 'fecha_resultado':
        set_value_laboratorio(
          'fecha_resultados_lab',
          value?.format('YYYY-MM-DD') ?? ''
        );
        set_fecha_resultado(value);
        break;
      case 'fecha_analisis':
        set_value_laboratorio(
          'fecha_analisis',
          value?.format('YYYY-MM-DD') ?? ''
        );
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
  // *Autocomplete
  const { id_instrumento: id_instrumento_slice } = useAppSelector(
    (state) => state.instrumentos_slice
  );

  const [cuenca_select, set_cuenca_select] = useState<ValueProps[]>([]);
  const [pozos_selected, set_pozos_selected] = useState<ValueProps[]>([]);
  const [parametros_select, set_parametros_select] = useState<ValueProps[]>([]);
  const [undidad_medida_select, set_undidad_medida_select] = useState('');

  const fetch_data_cuencas_instrumentos_select = async (): Promise<void> => {
    try {
      if (id_instrumento_slice) {
        const response = await get_data_cuenca_instrumentos(
          id_instrumento_slice
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
  const fetch_data_pozo_instrumentos_select = async (
    id_pozo: number
  ): Promise<void> => {
    try {
      if (id_pozo) {
        const response = await get_data_pozo_id(id_pozo);
        if (response?.length > 0) {
          const data_pozo = response.map((item: IpropsPozos) => ({
            value: item.id_pozo,
            label: ` ${item.cod_pozo} - ${item.nombre} `,
          }));
          set_pozos_selected(data_pozo);
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

  const fetch_data_parametros_laboratorios_select = async (): Promise<void> => {
    try {
      if (tipo_parametro_value) {
        const response = await get_parametros_laboratorio(tipo_parametro_value);
        if (response?.length > 0) {
          const data_parametros = response.map((item: IpropsParametros) => ({
            value: item.id_parametro,
            label: item.nombre ?? '',
          }));
          set_parametros_select(data_parametros);
          const data_unidad_medida = response.map(
            (item: IpropsParametros) => item.unidad_de_medida ?? ''
          );
          set_undidad_medida_select(data_unidad_medida.join(', '));
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

  const [rows_laboratorio, set_rows_laboratorio] = useState<any[]>([]);
  const [metodo, set_metodo] = useState('');
  const [resultado, set_resultado] = useState('');

  const handle_agregar = (): void => {
    console.log(data_watch, 'data_watch');
    const new_row = {
      id_parametro: data_watch.id_parametro,
      parametro: tipo_parametro_value,
      unidad: undidad_medida_select,
      metodo: data_watch.metodo,
      fecha_analisis: (fecha_analisis ?? dayjs()).format('YYYY-MM-DD'),
      resultado: data_watch.resultado,
    };
    set_rows_laboratorio([...rows_laboratorio, new_row]);

    set_undidad_medida_select('');
    set_parametros_select([]);
    set_value_laboratorio('metodo', '');
    set_value_laboratorio('resultado', '');
    set_fecha_analisis(null);
  };

  const reset_formulario = (): void => {
    reset_laboratorio();
    set_fecha_toma_muestra(null);
    set_fecha_envio(null);
    set_fecha_resultado(null);
    set_fecha_analisis(null);
    set_clase_muestra_value('');
    set_tipo_parametro_value('');
    set_unidad_medida_value('');
    set_parametro_value('');
    set_cuenca_select([]);
    set_pozos_selected([]);
    set_parametros_select([]);
    set_undidad_medida_select('');
    set_rows_laboratorio([]);
    set_metodo('');
    set_resultado('');
  };

  // * Onsubmit
  const { instrumentos } = useAppSelector((state) => state.instrumentos_slice);
  const [is_saving, set_is_saving] = useState(false);

  const onSubmit = handleSubmit_laboratorio(async (data: any) => {
    try {
      set_is_saving(true);
      set_id_resultado_laboratorio(null);
      console.log(data);
      data.id_instrumento = id_instrumento_slice;
      data.id_resultado_laboratorio = id_resultado_laboratorio;
      data.cod_clase_muestra = instrumentos?.cod_tipo_agua;
      data.fecha_toma_muestra = dayjs(fecha_toma_muestra).format('YYYY-MM-DD');
      data.fecha_resultados_lab = dayjs(fecha_resultado).format('YYYY-MM-DD');
      data.fecha_envio_lab = dayjs(fecha_envio).format('YYYY-MM-DD');
      await post_resultado_laboratorio(data, rows_laboratorio);
      reset_formulario();
      control_success('Registro de laboratorio creado exitosamente');
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
    }
  });

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

    // *Autocomplete
    cuenca_select,
    pozos_selected,
    parametros_select,
    undidad_medida_select,
    id_instrumento_slice,
    fetch_data_parametros_laboratorios_select,
    fetch_data_cuencas_instrumentos_select,
    fetch_data_pozo_instrumentos_select,

    // * Use Form
    handleSubmit_laboratorio,
    register_laboratorio,
    reset_laboratorio,
    control_registro_laboratorio,
    set_value_laboratorio,
    watch_laboratorio,
    formErrors_laboratorio,

    // * Onsubmit
    onSubmit,
    is_saving,
  };
};
