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
import {
  delete_fecha_alerta,
  delete_persona_alerta,
  get_unidades_organizacionales_by_id_organigrama_service,
  post_fecha_alerta,
  post_persona_alerta,
  put_configuracion_alerta,
} from '../request/request';
import { control_error } from '../../../../helpers';
import { control_success } from '../../requets/Request';
import Swal from 'sweetalert2';
// import localizedFormat from 'dayjs/plugin/localizedFormat';

export const useAlertaHook = () => {
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
    selectedValueFromSelect,
  } = useContext(DataContext);

  // * USE FORM
  // *crear alerta
  const {
    register: register_alertas,
    handleSubmit: handleSubmit_alertas,
    formState: { errors: errors_alertas },
    control: control_alertas,
    setValue: setValue_alertas,
    getValues: getValues_alertas,
    watch: watch_alertas,
  } = useForm({
    defaultValues: {
      // creacion de fecha
      cod_clase_alerta: selectedValueFromSelect.value,
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
      cod_clase_alerta: selectedValueFromSelect.value,
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

  // * use form configuracion alertas

  const {
    control: controlConfiguracionGeneralAlertas,
    handleSubmit: handleSubmitConfiguracionGeneralAlertas,
    formState: formStateConfiguracionGeneralAlertas,
    reset: resetConfiguracionGeneralAlertas,
    watch: watchConfiguracionGeneralAlertas,
  } = useForm({
    defaultValues: {
      prioridadAlerta: {
        value: '',
        label: '',
      },
      notificacionEmail: false,
      estadoAlerta: false,
    },
  });
  const watch_configuracion_general_alertas =
    watchConfiguracionGeneralAlertas();
  console.log(
    watch_configuracion_general_alertas,
    'watch_configuracion_general_alertas'
  );
  const watch_destinatario_alertas = watch_destinatario();

  const limpiar_destinatario = () => {
    reset_destinatario();
  };
  const limpiar_alertas = () => {
    setValue_alertas('dia_cumplimiento', 0);
    setValue_alertas('mes_cumplimiento', 0);
  };

  // * Context

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
    if (selectedValueFromSelect.value !== '') {
      void fetch_data_alerta_cod(selectedValueFromSelect.value);
      void fetch_data_personas(selectedValueFromSelect.value);
      void fetch_data_alerta_programada(selectedValueFromSelect.value);
    }
  }, [selectedValueFromSelect.value]);

  useEffect(() => {
    if (alertas) {
      setValue_alertas('nombre_clase_alerta', alertas.nombre_clase_alerta);
      setValue_alertas(
        'descripcion_clase_alerta',
        alertas.descripcion_clase_alerta
      );
      resetConfiguracionGeneralAlertas({
        prioridadAlerta: {
          value: alertas.nivel_prioridad,
          label: watch_configuracion_general_alertas.prioridadAlerta.label,
        },
        notificacionEmail: alertas.envios_email,
        estadoAlerta: alertas.activa,
      });
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
  };

  // * Onsubmit

  // * <------------------ Crear fecha alerta ------------------>
  const onSubmit_alertas = handleSubmit_alertas(async (data) => {
    try {
      const data_alerta = {
        cod_clase_alerta: selectedValueFromSelect.value,
        dia_cumplimiento: data.dia_cumplimiento,
        mes_cumplimiento: data.mes_cumplimiento,
      };
      const res = await post_fecha_alerta(data_alerta);
      control_success('Fecha creada con éxito');
      limpiar_alertas();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      console.log('final');
    }
  });

  const onSubmit_destinatario = handleSubmit_destinatario(async (data) => {
    try {
      const data_destinatario = {
        cod_clase_alerta: selectedValueFromSelect.value,
        id_persona: persona?.id_persona,
        id_unidad_org_lider: data.id_unidad_org_lider,
        perfil_sistema: data.perfil_sistema.value,
        es_responsable_directo: data.es_responsable_directo,
      };
      const res = await post_persona_alerta(data_destinatario as any);
      control_success('Destinatario creado con éxito');
      limpiar_destinatario();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      console.log('final');
    }
  });

  const onSubmit_configuracion_general_alertas =
    handleSubmitConfiguracionGeneralAlertas(async (data) => {
      try {
        const data_configuracion_general_alertas = {
          envios_email: data.notificacionEmail,
          nivel_prioridad: data.prioridadAlerta,
          activa: data.estadoAlerta,
        };
        const res = await put_configuracion_alerta(
          data_configuracion_general_alertas as any,
          selectedValueFromSelect.value
        );
        control_success('Configuración general de alertas creada con éxito');
        // limpiar_configuracion_general_alertas();
      } catch (error: any) {
        control_error(error.response.data.detail);
      } finally {
        console.log('final');
      }
    });

  // * <------------------------------- Delete -------------------------->
  const confirmar_eliminar_fecha_alerta = (id_fecha: number): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro de eliminar esta fecha?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delete_fecha_alerta(id_fecha);
          void fetch_data_alerta_programada(selectedValueFromSelect.value);
          control_success('La fecha se eliminó correctamente');
        } catch (error: any) {
          control_error(error.response.data.detail);
        }
      }
    });
  };
  const confirmar_eliminar_persona_alerta = (id_destinatario: number): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro de eliminar este destinatario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delete_persona_alerta(id_destinatario);
          void fetch_data_personas(selectedValueFromSelect.value);
          control_success('El destinatario se eliminó correctamente');
        } catch (error: any) {
          control_error(error.response.data.detail);
        }
      }
    });
  };

  return {
    // * use form
    register_alertas,
    handleSubmit_alertas,
    errors_alertas,
    control_alertas,
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

    // * use form configuracion alertas
    controlConfiguracionGeneralAlertas,

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

    // * onSubmit
    onSubmit_alertas,
    onSubmit_destinatario,
    onSubmit_configuracion_general_alertas,

    // * delete
    confirmar_eliminar_fecha_alerta,
    confirmar_eliminar_persona_alerta,
  };
};
