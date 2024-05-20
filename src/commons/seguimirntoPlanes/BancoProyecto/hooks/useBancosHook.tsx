/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import type { IBanco } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_banco, put_banco } from '../services/services';
import { DataContextBancos } from '../context/context';

export const useBancosHook = (): any => {
  const {
    control: control_banco,
    watch: watch_banco,
    register: register_banco,
    handleSubmit: handleSubmit_banco,
    setValue: set_value_banco,
    reset: reset_banco,
    formState: { errors: errors_banco },
  } = useForm<IBanco>({
    defaultValues: {
      nombre_proyecto: '',
      nombre_actividad: '',
      nombre_indicador: '',
      nombre_meta: '',
      rubro: '',
      banco_valor: 0,
      objeto_contrato: '',
      id_proyecto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
      id_rubro: 0,
      id_fuente_financiacion: 0,
    },
  });

  const data_watch_banco = watch_banco();

  // limpiar formulario
  const limpiar_formulario_banco = async () => {
    reset_banco({
      nombre_proyecto: '',
      nombre_actividad: '',
      nombre_indicador: '',
      nombre_meta: '',
      rubro: '',
      banco_valor: 0,
      objeto_contrato: '',
      id_proyecto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
      id_rubro: 0,
      id_fuente_financiacion: 0,
    });
  };

  // saving
  const [is_saving_banco, set_is_saving_banco] = useState<boolean>(false);

  // declaracion context
  const {
    id_proyecto,
    id_actividad,
    id_indicador,
    id_meta,
    fetch_data_bancos,
  } = useContext(DataContextBancos);

  // declaracion redux
  const {
    banco: { id_banco },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_banco = handleSubmit_banco(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_indicador = id_indicador;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      set_is_saving_banco(true);
      await post_banco(data as IBanco);
      control_success('Se creó correctamente');
      await limpiar_formulario_banco();
      await fetch_data_bancos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_banco(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_banco(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_banco(true);
      data.id_indicador = id_indicador;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      await put_banco((id_banco as number) ?? 0, data as IBanco);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_banco();
      await fetch_data_bancos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_banco(false);
    }
  });

  return {
    control_banco,
    watch_banco,
    register_banco,
    handleSubmit_banco,
    set_value_banco,
    reset_banco,
    errors_banco,

    data_watch_banco,

    onsubmit_banco,
    onsubmit_editar,
    is_saving_banco,

    limpiar_formulario_banco,
  };
};
