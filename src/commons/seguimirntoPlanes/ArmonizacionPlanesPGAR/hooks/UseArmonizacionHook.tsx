import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { control_error, control_success } from "../../../../helpers";
import { post_actividad_pgar, post_armonizacion, post_linea_base, put_actividad_pgar, put_armonizacion, put_linea_base } from "../../SeguimientoPGAR/services/services";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";
import { useAppDispatch } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";

/* eslint-disable @typescript-eslint/naming-convention */
export const useArmonizacionHook = (): any => {
    const {
      control: control_armonizacion,
      watch: watch_armonizacion,
      register: register_armonizacion,
      handleSubmit: handleSubmit_armonizacion,
      setValue: set_value_armonizacion,
      reset: reset_armonizacion,
      formState: { errors: errors_armonizacion },
    } = useForm<any>({
      defaultValues: {
        nombre_relacion: '',
        nombre_planPGAR: '',
        nombre_planPAI: '',
        estado: false,
        fecha_creacion: '',
        id_planPGAR: null,
        id_planPAI: null,
      },
    });

    const data_watch_armonizacion = watch_armonizacion();
    const dispatch = useAppDispatch();

    // limpiar formulario
    const limpiar_formulario_armonizacion = async () => {
      reset_armonizacion({
        nombre_relacion: '',
        nombre_planPGAR: '',
        nombre_planPAI: '',
        estado: false,
        id_planPGAR: null,
        id_planPAI: null,
      });
    };

    // saving
    const [is_saving_armonizacion, set_is_saving_armonizacion] = useState<boolean>(false);

    // fecha
    const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
      new Date()
    );

    const handle_change_fecha_creacion = (date: Date | null) => {
      set_fecha_creacion(date);
      set_value_armonizacion('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
    };

    // declaracion context
    const { id_armonizar, fetch_data_armonizaciones } =
      useContext(DataContextPgar);

    const set_ids = (data: any): void => {
      data.id_armonizar = id_armonizar;
    }

    const onsubmit_armonizacion = handleSubmit_armonizacion(async (data) => {
      try {
        set_is_saving_armonizacion(true);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        set_ids(data);
        await post_armonizacion(data as any);
        control_success('Se creó correctamente');
        await limpiar_formulario_armonizacion();
        await fetch_data_armonizaciones();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_armonizacion(false);
      }
    });

    // editar

    const onsubmit_editar = handleSubmit_armonizacion(async (data) => {
      try {
        set_is_saving_armonizacion(true);
        set_ids(data);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        await put_armonizacion((id_armonizar as number) ?? 0, data as any);
        control_success('Se actualizó correctamente');
        await limpiar_formulario_armonizacion();
        dispatch(
          set_current_mode_planes({
            ver: true,
            crear: true,
            editar: false,
          })
        );
        await fetch_data_armonizaciones();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al actualizar, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_armonizacion(false);
      }
    });

    return {
      // use form programa
      control_armonizacion,
      watch_armonizacion,
      register_armonizacion,
      handleSubmit_armonizacion,
      set_value_armonizacion,
      reset_armonizacion,
      errors_armonizacion,

      data_watch_armonizacion,

      onsubmit_armonizacion,
      onsubmit_editar,
      is_saving_armonizacion,

      limpiar_formulario_armonizacion,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    };
  };