/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../context/contextData';
import { control_error } from '../../../../../../helpers';
import { useAppSelector } from '../../../../../../hooks';
import dayjs from 'dayjs';
import {
  post_resultado_aforo,
  put_archivos,
  put_resultado_aforo_select,
} from '../../../request/request';
import { control_success } from '../../../../requets/Request';
import { v4 as uuidv4 } from 'uuid';
import type { Aforo } from '../../../interfaces/interface';
import type { DataCarteraAforo } from '../../../../ConsultaBiblioteca/interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_register_aforo_hook = () => {
  // * context
  const {
    archivos,
    nombres_archivos,
    rows_anexos_cartera,
    rows_data_cartera,
    set_archivos,
    set_rows_data_cartera,
    set_nombres_archivos,
    fetch_data_anexos_carteras,
    fetch_data_cartera_especifica,

    // * editar archivo
  } = useContext(DataContext);

  // use form

  const {
    control: control_cartera_aforo,
    watch: watch_cartera_aforo,
    register: register_cartera_aforo,
    handleSubmit: handleSubmit_cartera_aforo,
    setValue: set_value_cartera_aforo,
    reset: reset_cartera_aforo,
    formState: { errors: errors_cartera_aforo },
  } = useForm({
    defaultValues: {
      id_cuenca: 0,
      ubicacion_aforo: '',
      descripcion: '',
      latitud: '',
      longitud: '',
      fecha_aforo: '',
      cod_tipo_aforo: '',
      numero_serie: '',
      numero_helice: '',
      molinete: '',
      id_cartera_aforos: 0,
      id_instrumento: 0,

      // * calculos de la cartera de aforo

      distancia_a_la_orilla: '',
      profundidad: '',
      velocidad_superficial: '',
      velocidad_profunda: '',
      transecto: '',
      profundidad_promedio: '',
      velocidad_promedio: '',
      velocidad_transecto: '',
      caudal: '',

      // * anexos
      nombre_actualizar: '',
    },
  });

  const watch_aforo = watch_cartera_aforo();

  // Datos generales

  const [fecha_aforo, set_fecha_aforo] = useState<Dayjs | null>(null);
  const [tipo_aforo_value, set_tipo_aforo_value] = useState('');

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_aforo':
        if (value) {
          set_fecha_aforo(value);
          set_value_cartera_aforo(
            'fecha_aforo',
            value.format('YYYY-MM-DDTHH:mm:ss')
          );
        }
        break;
    }
  };
  const handle_tipo_aforo_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    set_value_cartera_aforo('cod_tipo_aforo', event.target.value);
    set_tipo_aforo_value(event.target.value);
  };

  // calulo de cartera de aforo
  // *------------------------------------------------ Agregar aforo ------------------------------------------------*//
  const [row_aforo, set_row_aforo] = useState<any[]>([]);
  const [editingId, setEditingId] = useState(null);

  const calcularValores = (currentRow: Aforo, previousRow?: Aforo): any => {
    // Calcular los nuevos valores
    const transecto = previousRow
      ? currentRow.distancia_a_la_orilla - previousRow.distancia_a_la_orilla
      : 0;
    const profundidad_promedio = previousRow
      ? (Number(currentRow.profundidad) + Number(previousRow.profundidad)) / 2
      : Number(currentRow.profundidad);
    const velocidad_promedio =
      (Number(currentRow.velocidad_superficial) +
        Number(currentRow.velocidad_profunda)) /
      2;
    const velocidad_transecto = previousRow
      ? (velocidad_promedio + Number(previousRow.velocidad_promedio)) / 2
      : velocidad_promedio;
    const caudal = transecto * profundidad_promedio * velocidad_transecto;

    // Devolver el nuevo objeto con los valores calculados
    return {
      ...currentRow,
      transecto,
      profundidad_promedio,
      velocidad_promedio,
      velocidad_transecto,
      caudal,
    };
  };
  const handle_update = (id: string, updatedValues: Partial<Aforo>): void => {
    // Encontrar el índice del registro a actualizar
    const index = row_aforo.findIndex((row: Aforo) => row.id === id);

    // Crear una copia de row_aforo
    let updatedRowAforo = [...row_aforo];

    // Actualizar el registro en la copia de la lista
    updatedRowAforo[index] = {
      ...updatedRowAforo[index],
      ...updatedValues,
    };

    // Recalcular y actualizar el registro actualizado
    const anterior = index > 0 ? updatedRowAforo[index - 1] : null;
    updatedRowAforo[index] = calcularValores(updatedRowAforo[index], anterior);

    // Recalcular y actualizar todos los registros desde el siguiente al actualizado hasta el final
    for (let i = index + 1; i < updatedRowAforo.length; i++) {
      updatedRowAforo[i] = calcularValores(
        updatedRowAforo[i],
        updatedRowAforo[i - 1]
      );
    }

    // Actualizar el estado con la copia modificada de la lista
    set_row_aforo(updatedRowAforo);
  };
  const handle_agregar = (): void => {
    if (editingId !== null) {
      // Estamos en modo de edición

      // Obtén los valores actuales del formulario
      const updatedValues = {
        distancia_a_la_orilla: Number(watch_aforo.distancia_a_la_orilla),
        profundidad: Number(watch_aforo.profundidad),
        velocidad_superficial: Number(watch_aforo.velocidad_superficial),
        velocidad_profunda: Number(watch_aforo.velocidad_profunda),
      };

      // Actualiza el registro existente con estos valores
      handle_update(editingId, updatedValues);

      // Sale del modo de edición
      setEditingId(null);
    } else {
      // Estamos en modo de adición

      // Último registro de la tabla
      const anterior = row_aforo[row_aforo.length - 1];

      // Convertir los valores del formulario a números
      const distanciaOrilla = Number(watch_aforo.distancia_a_la_orilla);
      const profundidadValor = Number(watch_aforo.profundidad);
      const velocidadSuperficialValor = Number(
        watch_aforo.velocidad_superficial
      );
      const velocidadProfundaValor = Number(watch_aforo.velocidad_profunda);

      // Cálculo del transecto
      const transecto = anterior?.distancia_a_la_orilla
        ? distanciaOrilla - anterior.distancia_a_la_orilla
        : 0;

      // Cálculo de la profundidad promedio

      const profundidad_promedio =
        row_aforo.length === 0
          ? profundidadValor
          : (profundidadValor + anterior?.profundidad) / 2;

      // Cálculo de la velocidad promedio
      const velocidad_promedio =
        (velocidadSuperficialValor + velocidadProfundaValor) / 2;

      // Cálculo de la velocidad del transecto
      const velocidad_transecto =
        row_aforo.length === 0
          ? velocidad_promedio
          : (velocidad_promedio + (Number(anterior?.velocidad_promedio) || 0)) /
            2;

      // Cálculo del caudal
      const caudal = transecto * profundidad_promedio * velocidad_transecto;

      // Crear el nuevo registro
      const new_data = {
        id: uuidv4(),
        distancia_a_la_orilla: distanciaOrilla,
        transecto,
        profundidad: profundidadValor,
        profundidad_promedio,
        velocidad_promedio,
        velocidad_superficial: velocidadSuperficialValor,
        velocidad_profunda: velocidadProfundaValor,
        velocidad_transecto,
        caudal,
      };

      // Agregar el nuevo registro a la lista de registros
      set_row_aforo([...row_aforo, new_data]);
    }

    // Limpiar los valores de los inputs
    set_value_cartera_aforo('distancia_a_la_orilla', '');
    set_value_cartera_aforo('profundidad', '');
    set_value_cartera_aforo('velocidad_superficial', '');
    set_value_cartera_aforo('velocidad_profunda', '');
  };
  const handle_delete = (id: string): void => {
    // Encuentra el índice del registro a eliminar
    const index = row_aforo.findIndex((row: Aforo) => row.id === id);

    // Si el registro no se encontró, termina la ejecución
    if (index === -1) return;

    // Crea una copia de row_aforo y elimina el registro
    let updatedRowAforo = [...row_aforo];
    updatedRowAforo.splice(index, 1);

    // Recalcular y actualizar todos los registros desde el eliminado (o el siguiente si se eliminó el primer registro) hasta el final
    let startIndex = index > 0 ? index - 1 : 0;
    for (let i = startIndex; i < updatedRowAforo.length; i++) {
      const previousRow = i > 0 ? updatedRowAforo[i - 1] : undefined;
      updatedRowAforo[i] = calcularValores(updatedRowAforo[i], previousRow);
    }

    // Actualizar el estado con la copia modificada de la lista
    set_row_aforo(updatedRowAforo);
  };

  const limpiar_formulario = (): void => {
    set_value_cartera_aforo('id_cuenca', 0);
    set_value_cartera_aforo('ubicacion_aforo', '');
    set_value_cartera_aforo('descripcion', '');
    set_value_cartera_aforo('latitud', '');
    set_value_cartera_aforo('longitud', '');
    set_value_cartera_aforo('fecha_aforo', '');
    set_value_cartera_aforo('cod_tipo_aforo', '');
    set_value_cartera_aforo('numero_serie', '');
    set_value_cartera_aforo('numero_helice', '');
    set_value_cartera_aforo('molinete', '');
    set_value_cartera_aforo('id_cartera_aforos', 0);
    set_value_cartera_aforo('id_instrumento', 0);
    set_fecha_aforo(null);
    set_tipo_aforo_value('');
    set_row_aforo([]);
    // set_rows_data_cartera([]);
    set_nombres_archivos([]);
    set_archivos([]);
  };

  const {
    id_instrumento: id_instrumento_slice,
    id_cartera_aforos: id_cartera_aforos_slice,
  } = useAppSelector((state) => state.instrumentos_slice);

  const [is_saving, set_is_saving] = useState(false);

  const onSubmit = handleSubmit_cartera_aforo(async (data: any) => {
    try {
      set_is_saving(true);

      data.fecha_aforo = dayjs(fecha_aforo).format('YYYY-MM-DDTHH:mm:ss');
      data.id_instrumento = id_instrumento_slice;

      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'CDA';
      const archivos_aforo = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          archivos_aforo.append(`ruta_archivo`, archivo);
          archivos_aforo.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_aforo.append('id_instrumento', String(id_instrumento_slice));
      archivos_aforo.append('cod_tipo_de_archivo', codigo_archivo);

      await post_resultado_aforo(data, row_aforo, archivos_aforo, archivos);
      control_success('Cartera de aforo registrada correctamente');
      limpiar_formulario();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
    }
  });
  // *---------------------- Seleccionar Aforo ----------------------* //
  // seleccionar editar
  const calcularValores_select = (currentRow: any, previousRow?: any): any => {
    // Calcular los nuevos valores
    const transecto = previousRow
      ? currentRow.distancia_a_la_orilla - previousRow.distancia_a_la_orilla
      : 0;
    const profundidad_promedio = previousRow
      ? (Number(currentRow.profundidad) + Number(previousRow.profundidad)) / 2
      : Number(currentRow.profundidad);
    const velocidad_promedio =
      (Number(currentRow.velocidad_superficial) +
        Number(currentRow.velocidad_profunda)) /
      2;
    const velocidad_transecto = previousRow
      ? (velocidad_promedio + Number(previousRow.velocidad_promedio)) / 2
      : velocidad_promedio;
    const caudal = transecto * profundidad_promedio * velocidad_transecto;

    // Devolver el nuevo objeto con los valores calculados
    return {
      ...currentRow,
      transecto,
      profundidad_promedio,
      velocidad_promedio,
      velocidad_transecto,
      caudal,
    };
  };
  const handle_update_select = (
    id: string,
    updatedValues: Partial<DataCarteraAforo>
  ): void => {
    // Encontrar el índice del registro a actualizar
    const index = rows_data_cartera.findIndex(
      (row: DataCarteraAforo) => row.id === id
    );

    // Crear una copia de rows_data_cartera
    let updatedRowAforo = [...rows_data_cartera];

    // Actualizar el registro en la copia de la lista
    updatedRowAforo[index] = {
      ...updatedRowAforo[index],
      ...updatedValues,
    };

    // Recalcular y actualizar el registro actualizado
    const anterior = index > 0 ? updatedRowAforo[index - 1] : null;
    updatedRowAforo[index] = calcularValores_select(
      updatedRowAforo[index],
      anterior
    );

    // Recalcular y actualizar todos los registros desde el siguiente al actualizado hasta el final
    for (let i = index + 1; i < updatedRowAforo.length; i++) {
      updatedRowAforo[i] = calcularValores_select(
        updatedRowAforo[i],
        updatedRowAforo[i - 1]
      );
    }

    // Actualizar el estado con la copia modificada de la lista
    set_rows_data_cartera(updatedRowAforo);
  };
  const handle_agregar_select = (): void => {
    if (editingId !== null) {
      // Estamos en modo de edición

      // Obtén los valores actuales del formulario
      const updatedValues = {
        distancia_a_la_orilla: Number(watch_aforo.distancia_a_la_orilla),
        profundidad: Number(watch_aforo.profundidad),
        velocidad_superficial: Number(watch_aforo.velocidad_superficial),
        velocidad_profunda: Number(watch_aforo.velocidad_profunda),
      };

      // Actualiza el registro existente con estos valores
      handle_update_select(editingId, updatedValues as any);

      // Sale del modo de edición
      setEditingId(null);
    } else {
      // Estamos en modo de adición

      // Último registro de la tabla
      const anterior = rows_data_cartera[rows_data_cartera.length - 1];

      // Convertir los valores del formulario a números
      const distanciaOrilla = Number(watch_aforo.distancia_a_la_orilla);
      const profundidadValor = Number(watch_aforo.profundidad);
      const velocidadSuperficialValor = Number(
        watch_aforo.velocidad_superficial
      );
      const velocidadProfundaValor = Number(watch_aforo.velocidad_profunda);

      // Cálculo del transecto
      const transecto = anterior?.distancia_a_la_orilla
        ? distanciaOrilla - Number(anterior.distancia_a_la_orilla)
        : 0;

      // Cálculo de la profundidad promedio

      const profundidad_promedio =
        rows_data_cartera.length === 0
          ? profundidadValor
          : Number(profundidadValor + Number(anterior?.profundidad)) / 2;

      // Cálculo de la velocidad promedio
      const velocidad_promedio =
        (velocidadSuperficialValor + velocidadProfundaValor) / 2;

      // Cálculo de la velocidad del transecto
      const velocidad_transecto =
        rows_data_cartera.length === 0
          ? velocidad_promedio
          : (velocidad_promedio + (Number(anterior?.velocidad_promedio) || 0)) /
            2;

      // Cálculo del caudal
      const caudal = transecto * profundidad_promedio * velocidad_transecto;

      // Crear el nuevo registro
      const new_data = {
        id_dato_cartera_aforos: null,
        id: uuidv4(),
        distancia_a_la_orilla: distanciaOrilla,
        transecto,
        profundidad: profundidadValor,
        profundidad_promedio,
        velocidad_promedio,
        velocidad_superficial: velocidadSuperficialValor,
        velocidad_profunda: velocidadProfundaValor,
        velocidad_transecto,
        caudal,
      };

      // Agregar el nuevo registro a la lista de registros
      set_rows_data_cartera([...(rows_data_cartera as any), new_data as any]);
    }

    // Limpiar los valores de los inputs
    set_value_cartera_aforo('distancia_a_la_orilla', '');
    set_value_cartera_aforo('profundidad', '');
    set_value_cartera_aforo('velocidad_superficial', '');
    set_value_cartera_aforo('velocidad_profunda', '');
  };
  const handle_delete_select = (id: string): void => {
    // Encuentra el índice del registro a eliminar
    const index = rows_data_cartera.findIndex(
      (row: DataCarteraAforo) => row.id === id
    );

    // Si el registro no se encontró, termina la ejecución
    if (index === -1) return;

    // Crea una copia de rows_data_cartera y elimina el registro
    let updatedRowAforo = [...rows_data_cartera];
    updatedRowAforo.splice(index, 1);

    // Recalcular y actualizar todos los registros desde el eliminado (o el siguiente si se eliminó el primer registro) hasta el final
    let startIndex = index > 0 ? index - 1 : 0;
    for (let i = startIndex; i < updatedRowAforo.length; i++) {
      const previousRow = i > 0 ? updatedRowAforo[i - 1] : undefined;
      updatedRowAforo[i] = calcularValores_select(
        updatedRowAforo[i],
        previousRow
      );
    }

    // Actualizar el estado con la copia modificada de la lista
    set_rows_data_cartera(updatedRowAforo);
  };
  // *-------------- editar archivo afoto ------------------*
  // * Editar Archivos
  const [id_archivo, set_id_archivo] = useState<number | null>(null);
  const [is_open_edit_archivos, set_is_open_edit_archivos] =
    useState<boolean>(false);

  const onSubmit_select = handleSubmit_cartera_aforo(async (data: any) => {
    try {
      set_is_saving(true);

      data.fecha_aforo = dayjs(fecha_aforo).format('YYYY-MM-DDTHH:mm:ss');
      data.id_instrumento = id_instrumento_slice;
      data.id_cartera_aforos = id_cartera_aforos_slice;
      // data.id_dato_cartera_aforos;

      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const codigo_archivo = 'CDA';
      const archivos_aforo = new FormData();

      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          archivos_aforo.append(`ruta_archivo`, archivo);
          archivos_aforo.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });
      archivos_aforo.append('id_instrumento', String(id_instrumento_slice));
      archivos_aforo.append('cod_tipo_de_archivo', codigo_archivo);

      await put_resultado_aforo_select(
        data,
        rows_data_cartera,
        archivos_aforo,
        archivos
      );
      if (is_open_edit_archivos) {
        await put_archivos(id_archivo as number, data.nombre_actualizar);
        set_is_open_edit_archivos(false);
      }
      control_success('Se registraron o actualizaron los datos correctamente');
      await fetch_data_anexos_carteras(id_cartera_aforos_slice);
      await fetch_data_cartera_especifica(id_cartera_aforos_slice);
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
    // use form cartera de aforo
    control_cartera_aforo,
    watch_aforo,
    errors_cartera_aforo,
    register_cartera_aforo,
    handleSubmit_cartera_aforo,
    set_value_cartera_aforo,
    reset_cartera_aforo,

    // general
    fecha_aforo,
    tipo_aforo_value,
    row_aforo,
    rows_data_cartera,
    rows_anexos_cartera,
    fetch_data_cartera_especifica,
    fetch_data_anexos_carteras,
    set_fecha_aforo,
    setEditingId,
    handle_date_change,
    handle_tipo_aforo_change,
    handle_agregar,
    handle_delete,
    handle_agregar_select,
    handle_delete_select,

    // * onSubmit
    onSubmit,
    onSubmit_select,
    is_saving,

    // * Editar Archivos
    is_open_edit_archivos,
    id_archivo,
    set_is_open_edit_archivos,
    set_id_archivo,
  };
};
