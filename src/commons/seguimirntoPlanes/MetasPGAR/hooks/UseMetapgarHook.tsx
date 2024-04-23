import { useForm } from "react-hook-form";
import { IMetasPgar } from "../../types/types";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { control_error, control_success } from "../../../../helpers";
import { post_meta, put_meta } from "../../SeguimientoPGAR/services/services";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";
import { useAppDispatch } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";


/* eslint-disable @typescript-eslint/naming-convention */
export const useMetapgarHook = (): any => {
    const {
      control: control_meta,
      watch: watch_meta,
      register: register_meta,
      handleSubmit: handleSubmit_meta,
      setValue: set_value_meta,
      reset: reset_meta,
      formState: { errors: errors_meta },
    } = useForm<IMetasPgar>({
      defaultValues: {
        nombre_plan: '',
        nombre_eje_estrategico: '',
        nombre_objetivo: '',
        tipo_eje_estrategico: '',
        nombre_plan_objetivo: '',
        nombre_meta_eje: '',
        numero_meta_eje: '',
        id_eje_estrategico: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
        fecha_creacion: '',
      },
    });

    const data_watch_meta = watch_meta();

    const dispatch = useAppDispatch();

    // limpiar formulario
    const limpiar_formulario_meta = async () => {
      reset_meta({
        nombre_plan: '',
        nombre_eje_estrategico: '',
        nombre_objetivo: '',
        tipo_eje_estrategico: '',
        nombre_plan_objetivo: '',
        nombre_meta_eje: '',
        numero_meta_eje: '',
        id_eje_estrategico: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
      });
    };

    // saving
    const [is_saving_meta, set_is_saving_meta] = useState<boolean>(false);

    // fecha
    const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
      new Date()
    );

    const handle_change_fecha_creacion = (date: Date | null) => {
      set_fecha_creacion(date);
      set_value_meta('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
    };

    // declaracion context
    const { id_meta_eje, id_eje_estrategico, id_plan, id_objetivo, fetch_data_meta_pgar } =
      useContext(DataContextPgar);

    const onsubmit_meta = handleSubmit_meta(async (data) => {
      try {
        set_is_saving_meta(true);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        data.id_meta_eje = id_meta_eje;
        data.id_plan = id_plan;
        data.id_objetivo = id_objetivo;
        data.id_eje_estrategico = id_eje_estrategico;
        await post_meta(data as IMetasPgar);
        control_success('Se creó correctamente');
        await limpiar_formulario_meta();
        await fetch_data_meta_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_meta(false);
      }
    });

    // editar

    const onsubmit_editar = handleSubmit_meta(async (data) => {
      try {
        set_is_saving_meta(true);
        data.id_meta_eje = id_meta_eje;
        data.id_eje_estrategico = id_eje_estrategico;
        data.id_plan = id_plan;
        data.id_objetivo = id_objetivo;
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        await put_meta((id_meta_eje as number) ?? 0, data as IMetasPgar);
        control_success('Se actualizó correctamente');
        await limpiar_formulario_meta();
        dispatch(
          set_current_mode_planes({
            ver: true,
            crear: true,
            editar: false,
          })
        );
        await fetch_data_meta_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al actualizar, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_meta(false);
      }
    });

    return {
      // use form programa
      control_meta,
      watch_meta,
      register_meta,
      handleSubmit_meta,
      set_value_meta,
      reset_meta,
      errors_meta,

      data_watch_meta,

      onsubmit_meta,
      onsubmit_editar,
      is_saving_meta,

      limpiar_formulario_meta,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    };
  };