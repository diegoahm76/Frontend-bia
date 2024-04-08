/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  get_data_cuenca_instrumentos,
  get_data_pozo_id,
  get_data_resulatado_laboratorio_id,
} from '../../../../ConsultaBiblioteca/request/request';
import { useAppSelector } from '../../../../../../hooks';
import type {
  DataAgregarLaboratorio,
  IpropsCuenca,
  IpropsParametros,
  IpropsPozos,
  ValueProps,
} from '../../../interfaces/interface';
import { type AxiosError } from 'axios';
import { control_error } from '../../../../../../helpers';
import { useForm } from 'react-hook-form';
import {
  get_cuenca_id,
  get_parametros_laboratorio,
  post_resultado_laboratorio,
  put_archivos,
  put_resultado_laboratorio,
} from '../../../request/request';
import { control_success } from '../../../../requets/Request';
import { DataContext } from '../../../context/contextData';
import type { Laboratorio } from '../../../../ConsultaBiblioteca/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_laboratorio_hook = () => {
  // * context
  const {
    id_resultado_laboratorio,
    archivos,
    nombres_archivos,
    rows_anexos_laboratorio,
    fetch_data_anexos_laboratorio,
    set_id_resultado_laboratorio,
    set_archivos,
    set_nombres_archivos,
  } = useContext(DataContext);

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

      // * Anexos
      nombre_actualizar: '',
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
  const [parametro_select, set_parametro_select] = useState('');

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
  const { info_laboratorio } = useAppSelector(
    (state) => state.instrumentos_slice
  );
  const [cuenca_select, set_cuenca_select] = useState<ValueProps[]>([]);
  const [pozos_selected, set_pozos_selected] = useState<any[]>([]);
  const [parametros_select, set_parametros_select] = useState<ValueProps[]>([]);
  const [undidad_medida_select, set_undidad_medida_select] = useState('');
  const [cuenca_laboratorio, set_cuenca_id_laboratorio] = useState<
    ValueProps[]
  >([]);

  const fetch_data_cuencas_id = async (): Promise<void> => {
    try {
      if (info_laboratorio) {
        const response = await get_cuenca_id(info_laboratorio?.id_cuenca);
        if (response?.length > 0) {
          const data_cuenca = response.map((item: IpropsCuenca) => ({
            value: item.id_cuenca,
            label: item.nombre ?? '',
          }));
          set_cuenca_id_laboratorio(data_cuenca);
        }
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };
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
        }
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };
  const fetch_data_parametros_laboratorios_select_id =
    async (): Promise<void> => {
      try {
        if (tipo_parametro_value) {
          const response = await get_parametros_laboratorio(
            tipo_parametro_value
          );
          if (response?.length > 0) {
            // Find the parameter object that has the matching ID
            const matchingParam = response.find(
              (item: IpropsParametros) =>
                item.id_parametro === (data_watch.id_parametro as any)
            );

            // Extract the unit of measure from the matching parameter object
            const unidad_medida = matchingParam?.unidad_de_medida ?? '';
            set_undidad_medida_select(unidad_medida);

            //  console.log('')('unidad_medida', unidad_medida);
          }
          // setOriginalCuencaValues(data_cuenca); // Store the fetched data in the original state
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
  const [selectedRow, setSelectedRow] = useState<DataAgregarLaboratorio | null>(
    null
  );

  const handleEdit = (row: any): void => {
    setSelectedRow(row);
    set_value_laboratorio('metodo', row.metodo);
    set_value_laboratorio('resultado', row.resultado);
    set_tipo_parametro_value(row.parametro);
    set_undidad_medida_select(row.unidad);
    set_fecha_analisis(row.fecha_analisis);
  };

  const handleDelete = (id: ReturnType<typeof uuidv4>): void => {
    set_rows_laboratorio(rows_laboratorio.filter((row) => row.id !== id));
  };

  const handle_agregar = (): void => {
    const new_row = {
      id_dato_registro_laboratorio: null,
      id: uuidv4(),
      id_parametro: data_watch.id_parametro,
      parametro: tipo_parametro_value,
      unidad: undidad_medida_select,
      metodo: data_watch.metodo,
      fecha_analisis: dayjs(fecha_analisis).format('YYYY-MM-DD') ?? '',
      resultado: data_watch.resultado,
    };
    // Si se está editando una fila, reemplace esa fila en lugar de agregar una nueva
    if (selectedRow) {
      set_rows_laboratorio(
        rows_laboratorio.map((row) =>
          row.id === selectedRow.id ? new_row : row
        )
      );
      setSelectedRow(null); // Borra la selección
    } else {
      set_rows_laboratorio([...rows_laboratorio, new_row]);
    }

    set_value_laboratorio('metodo', '');
    set_value_laboratorio('resultado', '');
    set_fecha_analisis(null);
  };

  const reset_formulario = (): void => {
    reset_laboratorio({
      descripcion: '',
      lugar_muestra: '',
      fecha_toma_muestra: '',
      fecha_resultados_lab: '',
      fecha_envio_lab: '',
      latitud: '',
      longitud: '',
    });
    set_archivos([]);
    set_nombres_archivos([]);
    set_fecha_toma_muestra(null);
    set_fecha_envio(null);
    set_fecha_resultado(null);
    set_fecha_analisis(null);
    set_rows_laboratorio([]);
    set_metodo('');
    set_resultado('');
  };

  // * Onsubmit
  const {
    instrumentos,
    id_resultado_laboratorio: id_resultado_laboratorio_slice,
  } = useAppSelector((state) => state.instrumentos_slice);
  const [is_saving, set_is_saving] = useState(false);

  const onSubmit = handleSubmit_laboratorio(async (data: any) => {
    try {
      set_is_saving(true);
      set_id_resultado_laboratorio(null);
      data.id_instrumento = id_instrumento_slice;
      data.id_resultado_laboratorio = id_resultado_laboratorio;
      data.cod_clase_muestra = instrumentos?.cod_tipo_agua;
      data.fecha_toma_muestra = dayjs(fecha_toma_muestra).format('YYYY-MM-DD');
      data.fecha_resultados_lab = dayjs(fecha_resultado).format('YYYY-MM-DD');
      data.fecha_envio_lab = dayjs(fecha_envio).format('YYYY-MM-DD');

      //  console.log('')(archivos, 'archivos');
      //  console.log('')(nombres_archivos, 'nombres_archivos');

      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'LAB';
      const archivos_lab = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          archivos_lab.append(`ruta_archivo`, archivo);
          archivos_lab.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_lab.append('id_instrumento', String(id_instrumento_slice));
      archivos_lab.append('cod_tipo_de_archivo', codigo_archivo);

      await post_resultado_laboratorio(
        data,
        rows_laboratorio,
        archivos_lab,
        archivos
      );
      reset_formulario();
      control_success('Registro de laboratorio creado exitosamente');
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
    }
  });

  // * ver resultados de laboratorio

  const [rows_resultado_laboratorio, set_rows_resultado_laboratorio] = useState<
    Laboratorio[]
  >([]);

  const fetch_data_resultado_laboratorio = async (): Promise<any> => {
    try {
      set_rows_resultado_laboratorio([]);
      if (info_laboratorio.id_resultado_laboratorio && parametro_select) {
        const response = await get_data_resulatado_laboratorio_id(
          info_laboratorio.id_resultado_laboratorio,
          parametro_select
        );
        const elementosAssingnedLaboratorio = response.map((row: any) => {
          return {
            ...row,
            id: uuidv4(),
          };
        });

        set_rows_resultado_laboratorio(elementosAssingnedLaboratorio);
        return elementosAssingnedLaboratorio;
      } else if (
        info_laboratorio.id_resultado_laboratorio &&
        tipo_parametro_value
      ) {
        const response = await get_data_resulatado_laboratorio_id(
          info_laboratorio.id_resultado_laboratorio,
          tipo_parametro_value
        );
        const elementosAssingnedLaboratorio = response.map((row: any) => {
          return {
            ...row,
            id: uuidv4(),
          };
        });

        set_rows_resultado_laboratorio(elementosAssingnedLaboratorio);
        return elementosAssingnedLaboratorio;
      }
    } catch (err: any) {
      control_error(err.response.data.detail);
    }
  };

  useEffect(() => {
    if (info_laboratorio?.id_resultado_laboratorio) {
      void fetch_data_anexos_laboratorio(
        info_laboratorio?.id_resultado_laboratorio
      );
    }
  }, [info_laboratorio?.id_resultado_laboratorio]);

  // * <----------------------->Editando laboratorio<----------------------->

  // *-------------- editar archivo afoto ------------------*
  // * Editar Archivos
  const [id_archivo, set_id_archivo] = useState<number | null>(null);
  const [is_open_edit_archivos, set_is_open_edit_archivos] =
    useState<boolean>(false);

  const handle_agregar_select = (): void => {
    const new_row = {
      id_dato_registro_laboratorio: null,
      id_registro_laboratorio: id_resultado_laboratorio_slice,
      id: uuidv4(),
      id_parametro: data_watch.id_parametro,
      parametro: tipo_parametro_value,
      unidad: undidad_medida_select,
      metodo: data_watch.metodo,
      fecha_analisis: dayjs(fecha_analisis).format('YYYY-MM-DD') ?? '',
      resultado: data_watch.resultado,
    };
    // Si se está editando una fila, reemplace esa fila en lugar de agregar una nueva
    if (selectedRow) {
      set_rows_laboratorio(
        rows_laboratorio.map((row) =>
          row.id === selectedRow.id ? new_row : row
        )
      );
      setSelectedRow(null); // Borra la selección
    } else {
      set_rows_laboratorio([...rows_laboratorio, new_row]);
    }

    set_value_laboratorio('metodo', '');
    set_value_laboratorio('resultado', '');
    set_fecha_analisis(null);
  };

  const [selectedRow_edit, setSelectedRow_edit] = useState<Laboratorio | null>(
    null
  );

  const handleEdit_select = (row: any): void => {
    setSelectedRow_edit(row);
    set_value_laboratorio('metodo', row.metodo);
    set_value_laboratorio('resultado', row.resultado);
    set_value_laboratorio('id_parametro', row.id_parametro);
    set_tipo_parametro_value(row.cod_clase);
    set_undidad_medida_select(row.unidad);
    set_fecha_analisis(row.fecha_analisis);
  };

  const handleDelete_select = (id: any): void => {
    set_rows_resultado_laboratorio(
      rows_resultado_laboratorio.filter((row) => row.id !== id)
    );
  };

  const handle_agregar_editar = (): void => {
    const new_row = {
      id_dato_registro_laboratorio: null,
      id_registro_laboratorio: id_resultado_laboratorio_slice,
      id: uuidv4(),
      id_parametro: data_watch.id_parametro,
      parametro: tipo_parametro_value,
      unidad: undidad_medida_select,
      metodo: data_watch.metodo,
      fecha_analisis: dayjs(fecha_analisis).format('YYYY-MM-DD') ?? '',
      resultado: data_watch.resultado,
    };
    // Si se está editando una fila, reemplace esa fila en lugar de agregar una nueva
    if (selectedRow_edit) {
      set_rows_resultado_laboratorio(
        rows_resultado_laboratorio.map((row: any) =>
          row.id === selectedRow_edit.id ? new_row : row
        )
      );
      setSelectedRow_edit(null); // Borra la selección
    } else {
      set_rows_resultado_laboratorio([
        ...(rows_resultado_laboratorio as any),
        new_row,
      ]);
    }

    set_value_laboratorio('metodo', '');
    set_value_laboratorio('resultado', '');
    set_fecha_analisis(null);
  };

  const onSubmit_select = handleSubmit_laboratorio(async (data: any) => {
    try {
      set_is_saving(true);

      data.id_instrumento = id_instrumento_slice;
      data.id_resultado_laboratorio = id_resultado_laboratorio_slice;
      data.cod_clase_muestra = instrumentos?.cod_tipo_agua;
      data.fecha_toma_muestra = dayjs(fecha_toma_muestra).format('YYYY-MM-DD');
      data.fecha_resultados_lab = dayjs(fecha_resultado).format('YYYY-MM-DD');
      data.fecha_envio_lab = dayjs(fecha_envio).format('YYYY-MM-DD');
      data.id_registro_laboratorio = id_resultado_laboratorio_slice;

      if (data.id_dato_registro_laboratorio) {
        control_error('Por favor pulsa el boton de agregar');
        return;
      }

      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'LAB';
      const archivos_lab = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo !== null) {
          archivos_lab.append(`ruta_archivo`, archivo);
          archivos_lab.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_lab.append('id_instrumento', String(id_instrumento_slice));
      archivos_lab.append('cod_tipo_de_archivo', codigo_archivo);

      await put_resultado_laboratorio(
        data,
        rows_laboratorio,
        archivos_lab,
        archivos
      );
      if (is_open_edit_archivos) {
        await put_archivos(id_archivo as number, data.nombre_actualizar);
        set_is_open_edit_archivos(false);
      }
      control_success(
        'Registro o actualización de laboratorio creado exitosamente'
      );
      await fetch_data_resultado_laboratorio();
      await fetch_data_anexos_laboratorio(id_resultado_laboratorio_slice);
      set_rows_laboratorio([]);
      set_nombres_archivos([]);
      set_archivos([]);
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
      set_is_open_edit_archivos(false);
    }
  });
  const onSubmit_editar = handleSubmit_laboratorio(async (data: any) => {
    try {
      set_is_saving(true);

      data.id_instrumento = id_instrumento_slice;
      data.id_resultado_laboratorio = id_resultado_laboratorio_slice;
      data.cod_clase_muestra = instrumentos?.cod_tipo_agua;
      data.fecha_toma_muestra = dayjs(fecha_toma_muestra).format('YYYY-MM-DD');
      data.fecha_resultados_lab = dayjs(fecha_resultado).format('YYYY-MM-DD');
      data.fecha_envio_lab = dayjs(fecha_envio).format('YYYY-MM-DD');
      data.id_registro_laboratorio = id_resultado_laboratorio_slice;

      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'LAB';
      const archivos_lab = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo !== null) {
          archivos_lab.append(`ruta_archivo`, archivo);
          archivos_lab.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_lab.append('id_instrumento', String(id_instrumento_slice));
      archivos_lab.append('cod_tipo_de_archivo', codigo_archivo);

      await put_resultado_laboratorio(
        data,
        rows_resultado_laboratorio,
        archivos_lab,
        archivos
      );
      if (is_open_edit_archivos) {
        await put_archivos(id_archivo as number, data.nombre_actualizar);
        set_is_open_edit_archivos(false);
      }
      control_success(
        'Registro o actualización de laboratorio creado exitosamente'
      );
      await fetch_data_resultado_laboratorio();
      await fetch_data_anexos_laboratorio(id_resultado_laboratorio_slice);
      set_nombres_archivos([]);
      set_archivos([]);
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
      set_is_open_edit_archivos(false);
    }
  });

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
    setSelectedRow,
    set_fecha_toma_muestra,
    set_fecha_envio,
    set_fecha_resultado,
    set_metodo,
    set_resultado,
    handle_date_change,
    handle_change_inputs,
    handle_agregar,
    handleEdit,
    handleDelete,
    handle_agregar_select,
    handle_agregar_editar,
    handleEdit_select,
    handleDelete_select,
    setSelectedRow_edit,

    // *Autocomplete
    cuenca_select,
    pozos_selected,
    parametros_select,
    undidad_medida_select,
    id_instrumento_slice,
    fetch_data_parametros_laboratorios_select,
    fetch_data_parametros_laboratorios_select_id,
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
    data_watch,

    // * Onsubmit
    onSubmit,
    onSubmit_select,
    onSubmit_editar,
    is_saving,
    reset_formulario,

    // * ver resultados de laboratorio
    parametro_select,
    rows_resultado_laboratorio,
    cuenca_laboratorio,
    set_parametro_select,
    set_cuenca_id_laboratorio,
    fetch_data_resultado_laboratorio,
    fetch_data_cuencas_id,
    rows_anexos_laboratorio,
    fetch_data_anexos_laboratorio,

    // * Editar Archivos
    is_open_edit_archivos,
    id_archivo,
    set_is_open_edit_archivos,
    set_id_archivo,
  };
};
