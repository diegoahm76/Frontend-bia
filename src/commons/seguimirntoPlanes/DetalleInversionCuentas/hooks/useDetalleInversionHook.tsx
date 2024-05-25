/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IDetalleCuentas } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import {
  post_detalle_inversion,
  put_detalle_inversion,
} from '../services/services';
import { DataContextDetalleInversion } from '../context/context';

export const useDetalleInversionHook = (): any => {
  const {
    control: control_detalle,
    watch: watch_detalle,
    register: register_detalle,
    handleSubmit: handleSubmit_detalle,
    setValue: set_value_detalle,
    reset: reset_detalle,
    formState: { errors: errors_detalle },
  } = useForm<IDetalleCuentas>({
    defaultValues: {
      nombre_sector: '',
      nombre_rubro: '',
      nombre_programa: '',
      nombre_subprograma: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      cuenta: '',
      valor_cuenta: 0,
      id_sector: 0,
      id_rubro: 0,
      id_programa: 0,
      id_subprograma: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
    },
  });

  const data_watch_detalle = watch_detalle();

  // limpiar formulario
  const limpiar_formulario_detalle = async () => {
    reset_detalle({
      nombre_sector: '',
      nombre_rubro: '',
      nombre_programa: '',
      nombre_subprograma: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      cuenta: '',
      valor_cuenta: 0,
      id_sector: 0,
      id_rubro: 0,
      id_programa: 0,
      id_subprograma: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
    });
  };

  // saving
  const [is_saving_detalle, set_is_saving_detalle] = useState<boolean>(false);

  // declaracion context
  const {
    id_programa,
    id_proyecto,
    id_producto,
    id_actividad,
    id_indicador,
    id_meta,
    fetch_data_detalle_inversion,
  } = useContext(DataContextDetalleInversion);

  // declaracion redux
  const {
    detalle_inversion: { id_detalle_inversion },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_detalle = handleSubmit_detalle(async (data) => {
    try {
      //  console.log('')(data, 'data');
      // data.id_indicador = id_indicador;
      set_is_saving_detalle(true);
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      data.id_actividad = id_actividad;
      data.id_indicador = id_indicador;
      data.id_meta = id_meta;
      await post_detalle_inversion(data as IDetalleCuentas);
      control_success('Se creó correctamente');
      await limpiar_formulario_detalle();
      await fetch_data_detalle_inversion();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_detalle(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_detalle(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_detalle(true);
      // data.id_indicador = id_indicador;
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      data.id_actividad = id_actividad;
      data.id_indicador = id_indicador;
      data.id_meta = id_meta;
      await put_detalle_inversion(
        (id_detalle_inversion as number) ?? 0,
        data as IDetalleCuentas
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_detalle();
      await fetch_data_detalle_inversion();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_detalle(false);
    }
  });

  return {
    control_detalle,
    watch_detalle,
    register_detalle,
    handleSubmit_detalle,
    set_value_detalle,
    reset_detalle,
    errors_detalle,

    data_watch_detalle,

    onsubmit_detalle,
    onsubmit_editar,
    is_saving_detalle,

    limpiar_formulario_detalle,
  };
};
