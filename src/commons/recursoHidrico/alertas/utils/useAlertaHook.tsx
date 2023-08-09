/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { DataContext } from '../context/contextData';
import type { InfoPersona } from '../../../../interfaces/globalModels';
import { get_unidades_organizacionales_by_id_organigrama_service } from '../request/request';
// import localizedFormat from 'dayjs/plugin/localizedFormat';

export const useAlertaHook = () => {
  // * USE FORM
  // *crear alerta
  const {
    register: register_alertas,
    handleSubmit: handleSubmit_alertas,
    formState: { errors: errors_alertas },
    control: control_alertas,
    reset: reset_alertas,
    setValue: setValue_alertas,
    getValues: getValues_alertas,
    watch: watch_alertas,
  } = useForm({
    defaultValues: {
      // creacion de fecha
      cod_clase_alerta: {
        value: '',
        label: '',
      },
      dia_cumplimiento: 0,
      mes_cumplimiento: 0,

      // * info alerta
      nombre_clase_alerta: '',
      descripcion_clase_alerta: '',
    },
  });

  const data_watch_alertas = watch_alertas();
  // * Crear destinatario
  const {
    register: register_destinatario,
    handleSubmit: handleSubmit_destinatario,
    formState: { errors: errors_destinatario },
    control: control_destinatario,
    reset: reset_destinatario,
    setValue: setValue_destinatario,
    getValues: getValues_destinatario,
    watch: watch_destinatario,
  } = useForm({
    defaultValues: {
      cod_clase_alerta: {
        value: '',
        label: '',
      },
      id_persona: '',
      id_unidad_org_lider: '',
      perfil_sistema: {
        value: '',
        label: '',
      },
      es_responsable_directo: false,
      registro_editable: false,
    },
  });

  const watch_destinatario_alertas = watch_destinatario();

  const limpiar_destinatario = () => {
    reset_destinatario();
  };

  // * Context
  const {
    alertas,
    alertas_selected,
    perfiles_selected,
    fetch_seleced_alerta,
    fetch_data_alerta_cod,
    fetch_data_perfiles,
    fetch_data_personas,
    fetch_data_alerta_programada,
  } = useContext(DataContext);

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [daysArray, setDaysArray] = useState<number[]>([]);

  // ? ------- use states declarations for unitys -------

  const [unidadesOrganizacionales, setUnidadesOrganizacionales] = useState<
    any[]
  >([
    {
      label: '',
      value: '',
    },
  ]);

  // * UseEffect

  useEffect(() => {
    void fetch_seleced_alerta();
    void fetch_data_perfiles();
  }, []);

  useEffect(() => {
    if (data_watch_alertas.cod_clase_alerta) {
      if (data_watch_alertas.cod_clase_alerta.value !== '') {
        void fetch_data_alerta_cod(data_watch_alertas.cod_clase_alerta.value);
        void fetch_data_personas(data_watch_alertas.cod_clase_alerta.value);
        void fetch_data_alerta_programada(
          data_watch_alertas.cod_clase_alerta.value
        );
      }
    }
  }, [data_watch_alertas.cod_clase_alerta]);

  useEffect(() => {
    if (alertas) {
      // console.log(alertas.nombre_clase_alerta, 'alertas');
      setValue_alertas('nombre_clase_alerta', alertas.nombre_clase_alerta);
      setValue_alertas(
        'descripcion_clase_alerta',
        alertas.descripcion_clase_alerta
      );
    }
  }, [alertas]);

  useEffect(() => {
    if (selectedMonth !== null) {
      let daysInMonth = dayjs(`${selectedMonth + 1}`).daysInMonth();
      let days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      setDaysArray(days);
    }
  }, [selectedMonth]);

  // * unidades del organigrama actual
  // ? useEffect to get unidades organizacionales organigrama
  useEffect(() => {
    void get_unidades_organizacionales_by_id_organigrama_service().then(
      (res: any) => {
        setUnidadesOrganizacionales(
          res?.map((el: any) => ({
            // el,
            label: el?.nombre,
            value: el?.id_unidad_organizacional,
          }))
        );
      }
    );
  }, []);

  // * personas
  const [persona, set_persona] = useState<InfoPersona>();

  const on_result = async (info_persona: InfoPersona): Promise<void> => {
    set_persona(info_persona);
    // console.log(info_persona, 'info_persona');
  };

  return {
    // * use form
    register_alertas,
    handleSubmit_alertas,
    errors_alertas,
    control_alertas,
    reset_alertas,
    setValue_alertas,
    getValues_alertas,
    watch_alertas,

    // * use form destinatario
    register_destinatario,
    handleSubmit_destinatario,
    errors_destinatario,
    control_destinatario,
    reset_destinatario,
    setValue_destinatario,
    getValues_destinatario,
    watch_destinatario,

    // * date
    selectedMonth,
    selectedDay,
    daysArray,
    setSelectedMonth,
    setSelectedDay,

    // * selected
    alertas_selected,
    perfiles_selected,

    // * info
    alertas,

    // * persona
    on_result,

    // * unidad organizacional
    unidadesOrganizacionales,

    // watch_destinatario_alertas,
    watch_destinatario_alertas,

    // limpiar
    limpiar_destinatario,
  };
};
