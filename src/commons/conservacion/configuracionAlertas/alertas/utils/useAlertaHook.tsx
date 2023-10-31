/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { DataContext } from '../context/contextData';
import type { InfoPersona } from '../../../../../interfaces/globalModels';
import {
  delete_persona_alerta,
  get_unidades_organizacionales_by_id_organigrama_service,
  post_persona_alerta,
  put_configuracion_alerta,
} from '../request/request';
import { control_error, control_success } from '../../../../../helpers';
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
      cod_clase_alerta: selectedValueFromSelect,
      dia_cumplimiento: 0,
      mes_cumplimiento: 0,

      // * info alerta
      nombre_clase_alerta: '',
      descripcion_clase_alerta: '',
    },
  });

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
      id_unidad_org_lider: {
        value: null,
        label: '',
      },
      perfil_sistema: {
        value: null,
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
  const watch_destinatario_alertas = watch_destinatario();

  const limpiar_destinatario = () => {
    reset_destinatario();
    set_persona({
      id: 0,
      id_persona: 0,
      tipo_persona: '',
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      nombre_completo: '',
      razon_social: '',
      nombre_comercial: '',
      tiene_usuario: false,
      digito_verificacion: '',
      cod_naturaleza_empresa: '',
      tipo_usuario:'',
    });
  };
  const limpiar_alertas = () => {
    setValue_alertas('dia_cumplimiento', 0);
    setValue_alertas('mes_cumplimiento', 0);
    setSelectedMonth(null);
    setSelectedDay(null);
    setDaysArray([]);
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
    }
  }, [selectedValueFromSelect.value]);

  const options: any[] = [
    { value: '1', label: 'Alta' },
    { value: '2', label: 'Media' },
    { value: '3', label: 'Baja' },
  ];

  function findOptionByValue(value: string, options: any[]) {
    return options.find((option) => option.value === value);
  }

  useEffect(() => {
    if (alertas) {
      setValue_alertas('nombre_clase_alerta', alertas.nombre_clase_alerta);
      setValue_alertas(
        'descripcion_clase_alerta',
        alertas.descripcion_clase_alerta
      );
      resetConfiguracionGeneralAlertas({
        prioridadAlerta: findOptionByValue(alertas.nivel_prioridad, options),
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
    if (info_persona.id_persona !== 0) {
      set_persona(info_persona);
    }
  };

  // * is_loading

  const [is_loading_alerta, set_is_loading_alerta] = useState<boolean>(false);
  const [is_loading_persona, set_is_loading_persona] = useState<boolean>(false);
  const [
    is_loading_configuracion_general_alertas,
    set_is_loading_configuracion_general_alertas,
  ] = useState<boolean>(false);

  // * Onsubmit

  const onSubmit_destinatario = handleSubmit_destinatario(async (data) => {
    try {
      set_is_loading_persona(true);
      const data_destinatario = {
        cod_clase_alerta: selectedValueFromSelect.value,
        id_persona: persona?.id_persona === 0 ? null : persona?.id_persona,
        id_unidad_org_lider: data.id_unidad_org_lider.value ?? null,
        perfil_sistema: data.perfil_sistema?.value ?? null,
        es_responsable_directo: data.es_responsable_directo,
      };
      await post_persona_alerta(data_destinatario as any);
      control_success('Destinatario creado con éxito');
      await fetch_data_personas(selectedValueFromSelect.value);
      limpiar_destinatario();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_loading_persona(false);
    }
  });

  const onSubmit_configuracion_general_alertas =
    handleSubmitConfiguracionGeneralAlertas(async (data) => {
      try {
        set_is_loading_configuracion_general_alertas(true);
        const data_configuracion_general_alertas = {
          envios_email: data.notificacionEmail,
          nivel_prioridad: data.prioridadAlerta.value,
          activa: data.estadoAlerta,
        };
        await put_configuracion_alerta(
          data_configuracion_general_alertas as any,
          selectedValueFromSelect.value
        );
        control_success('Configuración general de alertas creada con éxito');
        // limpiar_configuracion_general_alertas();
      } catch (error: any) {
        control_error(error.response.data.detail);
      } finally {
        set_is_loading_configuracion_general_alertas(false);
      }
    });

    const [options_recaudo, set_options_recaudo]  = useState<string>('')

    const onSubmit_configuracion_general_alertas_recaudo =
    handleSubmitConfiguracionGeneralAlertas(async (data: any) => {
      try {
        set_is_loading_configuracion_general_alertas(true);
        const data_configuracion_general_alertas = {
          envios_email: data.notificacionEmail,
          nivel_prioridad: data.prioridadAlerta.value,
          activa: data.estadoAlerta,
        };
        await put_configuracion_alerta(
          data_configuracion_general_alertas as any,
          options_recaudo
        );
        control_success('Configuración general de alertas creada con éxito');
        // limpiar_configuracion_general_alertas();
      } catch (error: any) {
        control_error(error.response.data.detail);
      } finally {
        set_is_loading_configuracion_general_alertas(false);
      }
    });

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
    setValue_alertas,
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
    options,

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
    onSubmit_destinatario,
    onSubmit_configuracion_general_alertas,
    onSubmit_configuracion_general_alertas_recaudo,

    // * delete
    confirmar_eliminar_persona_alerta,

    // * is_loading
    is_loading_alerta,
    is_loading_persona,
    is_loading_configuracion_general_alertas,
    // recaudo
    set_options_recaudo,
  };
};
