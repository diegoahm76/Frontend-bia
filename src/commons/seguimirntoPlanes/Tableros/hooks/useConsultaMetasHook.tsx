/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs'; // Import dayjs library
import {
  get_metas_tiempo,
  get_programas_tiempo,
  get_proyectos_tiempo,
} from '../services/services';
import { IMetaIndicador, IProyectos, IProgramas } from '../../types/types';
import { control_error } from '../../../../helpers';
import { DataContextConsulas } from '../context/context';

export const useConsultaMetasHook = (): any => {
  const {
    control: control_consulta_metas,
    watch: watch_consulta_metas,
    register: register_consulta_metas,
    handleSubmit: handleSubmit_consulta_metas,
    setValue: set_value_consulta_metas,
    reset: reset_consulta_metas,
    formState: { errors: errors_consulta_metas },
  } = useForm<any>({
    defaultValues: {
      id_plan: '',
      id_programa: '',
      id_proyecto: '',
      id_producto: '',
      id_actividad: '',
      id_indicador: '',
      fecha_inicio: '',
      fecha_fin: '',
    },
  });

  const data_watch_consulta_metas = watch_consulta_metas();

  // * Declaracion constext

  const { id_plan } = useContext(DataContextConsulas);

  // declaracion de variables de fecha usando dayjs formato YYYY-MM-DD

  const [fecha_inicio, set_fecha_inicio] = useState<Date | null>(new Date());
  const [fecha_fin, set_fecha_fin] = useState<Date | null>(new Date());

  const handle_change_fecha_inicio = (date: Date | null) => {
    set_fecha_inicio(date);
  };
  const handle_change_fecha_fin = (date: Date | null) => {
    set_fecha_fin(date);
  };

  const [loading, set_loading] = useState<boolean>(false);
  const [rows_metas, set_rows_metas] = useState<IMetaIndicador[]>([]);
  const [rows_proyectos, set_rows_proyectos] = useState<IProyectos[]>([]);
  const [rows_programas, set_rows_programas] = useState<IProgramas[]>([]);

  // * fetch
  const fetch_data_metas = async (): Promise<void> => {
    try {
      set_loading(true);
      const fecha_inicio_format = dayjs(fecha_inicio).format('YYYY-MM-DD');
      const fecha_fin_format = dayjs(fecha_fin).format('YYYY-MM-DD');
      console.log(fecha_inicio_format, fecha_fin_format, 'fechas');
      const response = await get_metas_tiempo(
        fecha_inicio_format,
        fecha_fin_format
      );
      if (response?.length > 0) {
        set_rows_metas(response);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    } finally {
      set_loading(false);
    }
  };

  // proyectos recibe 3 parametros fehca_inicio, fecha_fin, id_plan

  const fetch_data_proyectos = async (): Promise<void> => {
    try {
      set_loading(true);
      const fecha_inicio_format = dayjs(fecha_inicio).format('YYYY-MM-DD');
      const fecha_fin_format = dayjs(fecha_fin).format('YYYY-MM-DD');
      console.log(fecha_inicio_format, fecha_fin_format, 'fechas');
      const response = await get_proyectos_tiempo(
        fecha_inicio_format,
        fecha_fin_format,
        (id_plan as number) ?? 0
      );
      if (response?.length > 0) {
        set_rows_proyectos(response);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    } finally {
      set_loading(false);
    }
  };

  // programas recibe 3 parametros fehca_inicio, fecha_fin, id_plan

  const fetch_data_programas = async (): Promise<void> => {
    try {
      set_loading(true);
      const fecha_inicio_format = dayjs(fecha_inicio).format('YYYY-MM-DD');
      const fecha_fin_format = dayjs(fecha_fin).format('YYYY-MM-DD');
      console.log(fecha_inicio_format, fecha_fin_format, 'fechas');
      const response = await get_programas_tiempo(
        fecha_inicio_format,
        fecha_fin_format,
        (id_plan as number) ?? 0
      );
      if (response?.length > 0) {
        set_rows_programas(response);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    } finally {
      set_loading(false);
    }
  };

  return {
    control_consulta_metas,
    watch_consulta_metas,
    register_consulta_metas,
    handleSubmit_consulta_metas,
    set_value_consulta_metas,
    reset_consulta_metas,
    errors_consulta_metas,
    data_watch_consulta_metas,

    // fechas de consulta
    fecha_inicio,
    fecha_fin,
    set_fecha_fin,

    // funciones de fechas
    handle_change_fecha_inicio,
    handle_change_fecha_fin,

    // funciones de consulta
    fetch_data_metas,
    loading,
    rows_metas,

    // proyectos
    fetch_data_proyectos,
    rows_proyectos,

    // programas
    fetch_data_programas,
    rows_programas,
  };
};
