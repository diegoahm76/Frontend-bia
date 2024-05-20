import { useForm } from "react-hook-form";
import { IActividadPgar, ILineaBasePgar } from "../../types/types";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { control_error, control_success } from "../../../../helpers";
import { post_actividad_pgar, post_linea_base, put_actividad_pgar, put_linea_base } from "../../SeguimientoPGAR/services/services";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { useAppDispatch } from "../../../../hooks";

/* eslint-disable @typescript-eslint/naming-convention */
export const useActividadHook = (): any => {
    const {
      control: control_actividad,
      watch: watch_actividad,
      register: register_actividad,
      handleSubmit: handleSubmit_actividad,
      setValue: set_value_actividad,
      reset: reset_actividad,
      formState: { errors: errors_actividad },
    } = useForm<IActividadPgar>({
      defaultValues: {
        numero_actividad: '',
        nombre_actividad: '',
        nombre_plan: '',
        nombre_objetivo: '',
        nombre_eje_estrategico: '',
        nombre_meta: '',
        nombre_linea_base: '',
        id_linea_base: null,
        id_eje_estrategico: null,
        id_meta_eje: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
        fecha_creacion: '',
      },
    });

    const data_watch_actividad = watch_actividad();

    const dispatch = useAppDispatch();

    // limpiar formulario
    const limpiar_formulario_actividad = async () => {
      reset_actividad({
        numero_actividad: '',
        nombre_actividad: '',
        nombre_plan: '',
        nombre_objetivo: '',
        nombre_eje_estrategico: '',
        nombre_meta: '',
        nombre_linea_base: '',
        id_linea_base: null,
        id_eje_estrategico: null,
        id_meta_eje: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
      });
    };

    // saving
    const [is_saving_actividad, set_is_saving_actividad] = useState<boolean>(false);

    // fecha
    const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
      new Date()
    );

    const handle_change_fecha_creacion = (date: Date | null) => {
      set_fecha_creacion(date);
      set_value_actividad('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
    };

    // declaracion context
    const { id_actividad, id_linea_base, id_meta_eje, id_eje_estrategico, id_plan, id_objetivo, fetch_data_actividad_pgar } =
      useContext(DataContextPgar);

    const set_ids = (data: any): void => {
      data.id_actividad = id_actividad;
      data.id_linea_base = id_linea_base;
      data.id_meta_eje = id_meta_eje;
      data.id_plan = id_plan;
      data.id_objetivo = id_objetivo;
      data.id_eje_estrategico = id_eje_estrategico;
    }

    const onsubmit_actividad = handleSubmit_actividad(async (data) => {
      try {
        set_is_saving_actividad(true);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        set_ids(data);
        await post_actividad_pgar(data as IActividadPgar);
        control_success('Se creó correctamente');
        await limpiar_formulario_actividad();
        await fetch_data_actividad_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_actividad(false);
      }
    });

    // editar

    const onsubmit_editar = handleSubmit_actividad(async (data) => {
      try {
        set_is_saving_actividad(true);
        set_ids(data);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        await put_actividad_pgar((id_actividad as number) ?? 0, data as IActividadPgar);
        control_success('Se actualizó correctamente');
        await limpiar_formulario_actividad();
        dispatch(
          set_current_mode_planes({
            ver: true,
            crear: true,
            editar: false,
          })
        );
        await fetch_data_actividad_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al actualizar, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_actividad(false);
      }
    });

    return {
      // use form programa
      control_actividad,
      watch_actividad,
      register_actividad,
      handleSubmit_actividad,
      set_value_actividad,
      reset_actividad,
      errors_actividad,

      data_watch_actividad,

      onsubmit_actividad,
      onsubmit_editar,
      is_saving_actividad,

      limpiar_formulario_actividad,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    };
  };