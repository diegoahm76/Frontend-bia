/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IProyectos } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_proyecto, put_proyecto } from '../services/services';
import { DataContextProyectos } from '../context/context';

export const useProyectoHook = (): any => {
  const {
    control: control_proyecto,
    watch: watch_proyecto,
    register: register_proyecto,
    handleSubmit: handleSubmit_proyecto,
    setValue: set_value_proyecto,
    reset: reset_proyecto,
    formState: { errors: errors_proyecto },
  } = useForm<IProyectos>({
    defaultValues: {
      nombre_proyecto: '',
      numero_proyecto: 0,
      nombre_programa: '',
      pondera_1: 0,
      pondera_2: 0,
      pondera_3: 0,
      pondera_4: 0,
    },
  });

  const data_watch_proyecto = watch_proyecto();

  // limpiar formulario
  const limpiar_formulario_proyecto = async () => {
    reset_proyecto({
      nombre_proyecto: '',
      numero_proyecto: 0,
      pondera_1: 0,
      pondera_2: 0,
      pondera_3: 0,
      pondera_4: 0,
    });
  };

  // saving
  const [is_saving_proyecto, set_is_saving_proyecto] = useState<boolean>(false);

  // declaracion context
  const { fetch_data_proyecto } = useContext(DataContextProyectos);

  // declaracion redux
  const {
    proyecto: { id_proyecto },
    programa: { id_programa },
  } = useAppSelector((state) => state.planes);

  const onsubmit_proyecto = handleSubmit_proyecto(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_programa = id_programa;
      set_is_saving_proyecto(true);
      await post_proyecto(data as IProyectos);
      control_success('Se creó correctamente');
      await limpiar_formulario_proyecto();
      await fetch_data_proyecto();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_proyecto(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_proyecto(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_proyecto(true);
      await put_proyecto((id_proyecto as number) ?? 0, data as IProyectos);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_proyecto();
      await fetch_data_proyecto();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_proyecto(false);
    }
  });

  return {
    // use form proyecto
    control_proyecto,
    watch_proyecto,
    register_proyecto,
    handleSubmit_proyecto,
    set_value_proyecto,
    reset_proyecto,
    errors_proyecto,

    data_watch_proyecto,

    onsubmit_proyecto,
    onsubmit_editar,
    is_saving_proyecto,

    limpiar_formulario_proyecto,
  };
};
