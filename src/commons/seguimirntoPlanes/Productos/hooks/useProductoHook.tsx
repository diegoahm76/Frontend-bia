/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IProductos } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_producto, put_producto } from '../services/services';
import { DataContextProductos } from '../context/context';
import dayjs from 'dayjs';

export const useProductoHook = (): any => {
  const {
    control: control_producto,
    watch: watch_producto,
    register: register_producto,
    handleSubmit: handleSubmit_producto,
    setValue: set_value_producto,
    reset: reset_producto,
    formState: { errors: errors_producto },
  } = useForm<IProductos>({
    defaultValues: {
      nombre_producto: '',
      numero_producto: '',
      nombre_proyecto: '',
      id_plan: null,
      id_programa: null,
      id_producto: null,
      fecha_creacion: '',
      cumplio: false,
    },
  });

  const data_watch_producto = watch_producto();

  // limpiar formulario
  const limpiar_formulario_producto = async () => {
    reset_producto({
      nombre_producto: '',
      numero_producto: '',
      nombre_proyecto: '',
      id_plan: null,
      id_programa: null,
      id_producto: null,
      // fecha_creacion: '',
      cumplio: false,
    });
  };

  // * fechas
  const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
    new Date()
  );

  const handle_change_fecha_creacion = (date: Date | null) => {
    set_fecha_creacion(date);
    set_value_producto('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
  };

  // saving
  const [is_saving_producto, set_is_saving_producto] = useState<boolean>(false);

  // declaracion context
  const {
    id_plan,
    id_programa,
    id_proyecto,
    id_producto,
    fetch_data_producto,
  } = useContext(DataContextProductos);
  // declaracion redux
  // const {
  //   producto: { id_producto },
  //   proyecto: { id_proyecto },
  // } = useAppSelector((state) => state.planes);

  const onsubmit_producto = handleSubmit_producto(async (data) => {
    try {
      set_is_saving_producto(true);
      console.log(id_plan, 'id_plan');
      console.log(id_programa, 'id_programa');
      console.log(data, 'data');
      data.id_plan = id_plan;
      data.id_programa = id_programa;
      data.id_producto = id_producto;
      data.id_proyecto = id_proyecto;
      const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
      data.fecha_creacion = fecha_creacion_format;
      await post_producto(data as IProductos);
      control_success('Se creó correctamente');
      await limpiar_formulario_producto();
      await fetch_data_producto();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_producto(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_producto(async (data) => {
    try {
      set_is_saving_producto(true);
      console.log(data, 'data');
      const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
      data.fecha_creacion = fecha_creacion_format;
      data.id_plan = id_plan;
      data.id_programa = id_programa;
      data.id_producto = id_producto;
      data.id_proyecto = id_proyecto;
      data.id_proyecto = id_proyecto;
      await put_producto((id_producto as number) ?? 0, data as IProductos);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_producto();
      await fetch_data_producto();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_producto(false);
    }
  });

  return {
    // use form producto
    control_producto,
    watch_producto,
    register_producto,
    handleSubmit_producto,
    set_value_producto,
    reset_producto,
    errors_producto,

    data_watch_producto,

    onsubmit_producto,
    onsubmit_editar,
    is_saving_producto,

    limpiar_formulario_producto,

    // fechas
    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  };
};
