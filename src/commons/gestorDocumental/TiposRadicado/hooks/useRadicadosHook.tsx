/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { post_tipos_radicado, put_tipos_radicado } from '../services/services';
import { control_error, control_success } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { get_user_by_id } from '../../../../request';
import type { AxiosError } from 'axios';
import type { Users } from '../../../seguridad/interfaces';
import { useEffect, useState } from 'react';

export const useRadicadosHook = () => {
  // useForm
  const {
    control: control_radicados,
    register: register_radicados,
    handleSubmit: handleSubmit_radicados,
    reset: reset_radicados,
    setValue: setValue_radicados,
    watch: watch_radicados,
    formState: { errors: errors_radicados },
  } = useForm({
    defaultValues: {
      agno_radicado: 0,
      cod_tipo_radicado: '',
      prefijo_consecutivo: '',
      consecutivo_inicial: '',
      cantidad_digitos: '',
      implementar: false,
    },
  });

  const data_watch_radicados = watch_radicados();

  // * años
  const currentYear = dayjs().year();
  const nextYear = dayjs().add(1, 'year').year();

  const currentDate = dayjs();
  const formattedDate = currentDate.format('DD/MM/YYYY');

  const { userinfo } = useAppSelector((state) => state.auth);
  const [datos, set_datos] = useState<Users>();

  const datos_usuario = async (id_usuario: number): Promise<void> => {
    try {
      const {
        data: { data },
      } = await get_user_by_id(id_usuario);
      set_datos(data);
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };
  // * useEffect
  useEffect(() => {
    void datos_usuario(userinfo.id_usuario);
  }, []);

  // ? limpiar formulario
  const limpiar_formulario = () => {
    setValue_radicados('cod_tipo_radicado', '');
    setValue_radicados('prefijo_consecutivo', '');
    setValue_radicados('consecutivo_inicial', '1');
    setValue_radicados('cantidad_digitos', '0');
    setValue_radicados('implementar', false);
  };

  const [is_saving, set_is_saving] = useState(false);

  // * onSubmit
  const onSubmit_radicados = handleSubmit_radicados(async (data) => {
    try {
      set_is_saving(true);
      const data_radicados = {
        agno_radicado: Number(data.agno_radicado),
        cod_tipo_radicado: data.cod_tipo_radicado,
        prefijo_consecutivo: Number(data.prefijo_consecutivo),
        consecutivo_inicial: Number(data.consecutivo_inicial),
        cantidad_digitos: data.cantidad_digitos,
        implementar: data.implementar,
      };
      await post_tipos_radicado(data_radicados);
      limpiar_formulario();
      control_success('Se ha creado el tipo de radicado exitosamente');
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving(false);
    }
  });

  // actualizar submit
  const onSubmit_radicados_update = handleSubmit_radicados(
    async (data, id_radicado) => {
      try {
        set_is_saving(true);
        const data_radicados = {
          prefijo_consecutivo: data.prefijo_consecutivo,
          consecutivo_inicial: Number(data.consecutivo_inicial),
          cantidad_digitos: Number(data.cantidad_digitos),
          implementar: data.implementar,
        };
        await put_tipos_radicado(id_radicado as any, data_radicados);
        control_success('Se ha actualziado el tipo de radicado exitosamente');
      } catch (error: any) {
        control_error(error.response.data.detail);
      } finally {
        set_is_saving(false);
      }
    }
  );
  return {
    control_radicados,
    register_radicados,
    handleSubmit_radicados,
    reset_radicados,
    setValue_radicados,
    errors_radicados,
    data_watch_radicados,

    // * años
    currentYear,
    nextYear,
    formattedDate,

    // * onSubmit
    onSubmit_radicados,
    onSubmit_radicados_update,
    is_saving,
    // ? limpiar formulario
    limpiar_formulario,
    // * datos login
    datos,
  };
};
