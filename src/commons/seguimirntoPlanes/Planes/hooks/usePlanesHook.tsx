/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { post_planes, put_planes } from '../services/services';
import { useContext, useState } from 'react';
import { IPlanes } from '../../types/types';
import { DataContextPlanes } from '../context/context';
import { useAppSelector } from '../../../../hooks';

export const usePlanesHook = (): any => {
  const {
    control: control_planes,
    watch: watch_planes,
    register: register_planes,
    handleSubmit: handleSubmit_planes,
    setValue: set_value_planes,
    reset: reset_planes,
    formState: { errors: errors_planes },
  } = useForm<IPlanes>({
    defaultValues: {
      nombre_plan: '',
      sigla_plan: '',
      tipo_plan: '',
      agno_inicio: 0,
      agno_fin: 0,
      estado_vigencia: false,
    },
  });

  const data_watch_planes = watch_planes();

  // //  console.log('')(data_watch_planes, 'data_watch_planes');

  const [agno_ini, set_agno_ini] = useState<number>(0);
  const [agno_fin, set_agno_fin] = useState<number>(0);

  // limpiar formulario
  const limpiar_formulario_planes = async () => {
    reset_planes({
      nombre_plan: '',
      sigla_plan: '',
      tipo_plan: '',
      agno_inicio: 0,
      agno_fin: 0,
      estado_vigencia: false,
    });
  };

  // saving
  const [is_saving_planes, set_is_saving_planes] = useState<boolean>(false);

  // declaracion context
  const { id_plan, fetch_data_planes } = useContext(DataContextPlanes);

  const onsubmit_planes = handleSubmit_planes(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.agno_inicio = agno_ini;
      data.agno_fin = agno_fin;
      set_is_saving_planes(true);
      await post_planes(data as IPlanes);
      control_success('Se creó correctamente');
      await limpiar_formulario_planes();
      await fetch_data_planes();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_planes(false);
    }
  });

  // editar
  // declaracion redux
  // const {
  //   plan: { id_plan },
  // } = useAppSelector((state) => state.planes);

  const onsubmit_editar = handleSubmit_planes(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_plan = id_plan;
      data.agno_inicio = agno_ini;
      data.agno_fin = agno_fin;
      set_is_saving_planes(true);
      await put_planes((id_plan as number) ?? 0, data as IPlanes);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_planes();
      await fetch_data_planes();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_planes(false);
    }
  });

  return {
    // agno
    set_agno_ini,
    set_agno_fin,
    // use form planes
    control_planes,
    watch_planes,
    register_planes,
    handleSubmit_planes,
    set_value_planes,
    reset_planes,
    errors_planes,

    data_watch_planes,

    onsubmit_planes,
    onsubmit_editar,
    is_saving_planes,

    limpiar_formulario_planes,
  };
};
