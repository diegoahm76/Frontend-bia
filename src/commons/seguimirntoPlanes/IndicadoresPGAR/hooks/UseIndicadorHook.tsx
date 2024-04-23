import { useForm } from "react-hook-form";
import { IActividadPgar, IIndicadorPgar } from "../../types/types";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { control_error, control_success } from "../../../../helpers";
import { post_actividad_pgar, post_indicador_pgar, post_linea_base, put_actividad_pgar, put_indicador_pgar, put_linea_base } from "../../SeguimientoPGAR/services/services";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";
import { useAppDispatch } from "../../../../hooks";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";

/* eslint-disable @typescript-eslint/naming-convention */
export const useIndicadorPgarHook = (): any => {
    const {
      control: control_indicador,
      watch: watch_indicador,
      register: register_indicador,
      handleSubmit: handleSubmit_indicador,
      setValue: set_value_indicador,
      reset: reset_indicador,
      formState: { errors: errors_indicador },
    } = useForm<IIndicadorPgar>({
      defaultValues: {
        nombre_indicador: '',
        numero_indicador: '',
        nombre_linea_base: '',
        medida: '',
        tipo_indicador: '',
        nombre_actividad: '',
        nombre_plan: '',
        nombre_eje_estrategico: '',
        nombre_meta: '',
        entidad_responsable: '',
        id_medicion: null,
        id_actividad: null,
        id_plan: null,
        id_linea_base: null,
        id_meta_eje: null,
        id_eje_estrategico: null,
        id_objetivo: null,
        id_unidad_organizacional: null,
        cumplio: false,
        fecha_creacion: '',
      },
    });

    const data_watch_indicador = watch_indicador();
    const dispatch = useAppDispatch();

    // limpiar formulario
    const limpiar_formulario_indicador = async () => {
      reset_indicador({
        nombre_indicador: '',
        numero_indicador: '',
        nombre_linea_base: '',
        medida: '',
        tipo_indicador: '',
        nombre_actividad: '',
        nombre_plan: '',
        nombre_eje_estrategico: '',
        nombre_meta: '',
        id_medicion: null,
        id_actividad: null,
        id_plan: null,
        id_linea_base: null,
        id_meta_eje: null,
        id_eje_estrategico: null,
        id_objetivo: null,
        id_unidad_organizacional: null,
        cumplio: false,
      });
    };

    // saving
    const [is_saving_indicador, set_is_saving_indicador] = useState<boolean>(false);

    // fecha
    const [fecha_creacion, set_fecha_creacion] = useState<Date | null>(
      new Date()
    );

    const handle_change_fecha_creacion = (date: Date | null) => {
      set_fecha_creacion(date);
      set_value_indicador('fecha_creacion', dayjs(date).format('YYYY-MM-DD'));
    };

    // declaracion context
    const { id_indicador, id_actividad, id_linea_base, id_meta_eje, id_eje_estrategico, id_plan, id_objetivo, fetch_data_indicador_pgar } =
      useContext(DataContextPgar);

    const set_ids = (data: any): void => {
      data.id_indicador = id_indicador;
      data.id_actividad = id_actividad;
      data.id_linea_base = id_linea_base;
      data.id_meta_eje = id_meta_eje;
      data.id_plan = id_plan;
      data.id_objetivo = id_objetivo;
      data.id_eje_estrategico = id_eje_estrategico;
    }

    const onsubmit_indicador = handleSubmit_indicador(async (data) => {
      try {
        set_is_saving_indicador(true);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        set_ids(data);
        console.log(data)
        await post_indicador_pgar(data as IIndicadorPgar);
        control_success('Se creó correctamente');
        await limpiar_formulario_indicador();
        await fetch_data_indicador_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_indicador(false);
      }
    });

    // editar

    const onsubmit_editar = handleSubmit_indicador(async (data) => {
      try {
        set_is_saving_indicador(true);
        set_ids(data);
        const fecha_creacion_format = dayjs(fecha_creacion).format('YYYY-MM-DD');
        data.fecha_creacion = fecha_creacion_format;
        await put_indicador_pgar((id_actividad as number) ?? 0, data as IIndicadorPgar);
        control_success('Se actualizó correctamente');
        await limpiar_formulario_indicador();
        dispatch(
          set_current_mode_planes({
            ver: true,
            crear: true,
            editar: false,
          })
        );
        await fetch_data_indicador_pgar();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al actualizar, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_indicador(false);
      }
    });

    return {
      // use form programa
      control_indicador,
      watch_indicador,
      register_indicador,
      handleSubmit_indicador,
      set_value_indicador,
      reset_indicador,
      errors_indicador,

      data_watch_indicador,

      onsubmit_indicador,
      onsubmit_editar,
      is_saving_indicador,

      limpiar_formulario_indicador,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    };
  };