/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import { post_rubro, put_rubro } from '../services/services';
import { useContext, useState } from 'react';
import { IRubro } from '../../../types/types';
import { DataContextRubros } from '../context/context';
import { useAppSelector } from '../../../../../hooks';

export const useRubrosHook = (): any => {
  const {
    control: control_rubro,
    watch: watch_rubro,
    register: register_rubro,
    handleSubmit: handleSubmit_rubro,
    setValue: set_value_rubro,
    reset: reset_rubro,
    formState: { errors: errors_rubro },
  } = useForm<IRubro>({
    defaultValues: {
      cod_pre: '',
      cuenta: '',
      valcuenta: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_indicador: '',
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
    },
  });

  const data_watch_rubro = watch_rubro();

  // limpiar formulario
  const limpiar_formulario_rubro = async () => {
    reset_rubro({
      cod_pre: '',
      cuenta: '',
      valcuenta: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_indicador: '',
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
    });
  };

  // saving
  const [is_saving_rubro, set_is_saving_rubro] = useState<boolean>(false);

  // declaracion context
  const { fetch_data_rubros } = useContext(DataContextRubros);

  const onsubmit_rubro = handleSubmit_rubro(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_rubro(true);
      await post_rubro(data as IRubro);
      control_success('Se creó correctamente');
      await limpiar_formulario_rubro();
      await fetch_data_rubros();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_rubro(false);
    }
  });

  // editar
  // declaracion redux
  const {
    rubro: { id_rubro },
  } = useAppSelector((state) => state.planes);

  const onsubmit_editar = handleSubmit_rubro(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_rubro(true);
      await put_rubro((id_rubro as number) ?? 0, data as IRubro);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_rubro();
      await fetch_data_rubros();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_rubro(false);
    }
  });

  return {
    control_rubro,
    watch_rubro,
    register_rubro,
    handleSubmit_rubro,
    set_value_rubro,
    reset_rubro,
    errors_rubro,

    data_watch_rubro,

    onsubmit_rubro,
    onsubmit_editar,
    is_saving_rubro,

    limpiar_formulario_rubro,
  };
};
