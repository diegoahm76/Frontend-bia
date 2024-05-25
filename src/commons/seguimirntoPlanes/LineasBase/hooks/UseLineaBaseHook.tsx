import { useForm } from "react-hook-form";
import { ILineaBasePgar } from "../../types/types";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { control_error, control_success } from "../../../../helpers";
import { post_linea_base, put_linea_base } from "../../SeguimientoPGAR/services/services";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";
import { useAppDispatch } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";

/* eslint-disable @typescript-eslint/naming-convention */
export const useLineaBaseHook = (): any => {
    const {
      control: control_linea,
      watch: watch_linea,
      register: register_linea,
      handleSubmit: handleSubmit_linea,
      setValue: set_value_linea,
      reset: reset_linea,
      formState: { errors: errors_linea },
    } = useForm<ILineaBasePgar>({
      defaultValues: {
        nombre_eje_estrategico: '',
        nombre_plan: '',
        nombre_objetivo: '',
        nombre_meta: '',
        tipo_eje_estrategico: '',
        nombre_linea_base: '',
        id_eje_estrategico: null,
        id_meta_eje: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
        fecha_creacion: '',
      },
    });

    const data_watch_linea = watch_linea();

    const dispatch = useAppDispatch();

    // limpiar formulario
    const limpiar_formulario_linea = async () => {
      reset_linea({
        nombre_eje_estrategico: '',
        nombre_plan: '',
        nombre_objetivo: '',
        nombre_meta: '',
        tipo_eje_estrategico: '',
        nombre_linea_base: '',
        id_eje_estrategico: null,
        id_meta_eje: null,
        id_plan: null,
        id_objetivo: null,
        cumplio: false,
      });
    };

    // saving
    const [is_saving_linea, set_is_saving_linea] = useState<boolean>(false);

    // fecha
    const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
      new Date()
    );

    const handle_change_fecha_creacion = (date: Date | null) => {
      set_fecha_creacion(date);
      set_value_linea('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
    };

    // declaracion context
    const { id_linea_base, id_meta_eje, id_eje_estrategico, id_plan, id_objetivo, fetch_data_linea_base } =
      useContext(DataContextPgar);

    const onsubmit_linea = handleSubmit_linea(async (data) => {
      try {
        set_is_saving_linea(true);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        data.id_linea_base = id_linea_base;
        data.id_meta_eje = id_meta_eje;
        data.id_plan = id_plan;
        data.id_objetivo = id_objetivo;
        data.id_eje_estrategico = id_eje_estrategico;
        await post_linea_base(data as ILineaBasePgar);
        control_success('Se creó correctamente');
        await limpiar_formulario_linea();
        await fetch_data_linea_base();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_linea(false);
      }
    });

    // editar

    const onsubmit_editar = handleSubmit_linea(async (data) => {
      try {
        set_is_saving_linea(true);
        data.id_linea_base = id_linea_base;
        data.id_meta_eje = id_meta_eje;
        data.id_eje_estrategico = id_eje_estrategico;
        data.id_plan = id_plan;
        data.id_objetivo = id_objetivo;
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        await put_linea_base((id_linea_base as number) ?? 0, data as ILineaBasePgar);
        control_success('Se actualizó correctamente');
        await limpiar_formulario_linea();
        dispatch(
          set_current_mode_planes({
            ver: true,
            crear: true,
            editar: false,
          })
        );
        await fetch_data_linea_base();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al actualizar, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_linea(false);
      }
    });

    return {
      // use form programa
      control_linea,
      watch_linea,
      register_linea,
      handleSubmit_linea,
      set_value_linea,
      reset_linea,
      errors_linea,

      data_watch_linea,

      onsubmit_linea,
      onsubmit_editar,
      is_saving_linea,

      limpiar_formulario_linea,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    };
  };