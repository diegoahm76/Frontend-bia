/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useEffect, useState } from 'react';
import type { IPlanAdquisiciones } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  post_plan_adiquisiciones,
  put_plan_adiquisiciones,
} from '../services/services';
import { DataContextAdquisiciones } from '../context/context';
import { set_current_persona_planes } from '../../store/slice/indexPlanes';
import { IList, InfoPersona } from '../../../../interfaces/globalModels';

export const useAdquisicionesHook = (): any => {
  const {
    control: control_adquisiciones,
    watch: watch_adquisiciones,
    register: register_adquisiciones,
    handleSubmit: handleSubmit_adquisiciones,
    setValue: set_value_adquisiciones,
    reset: reset_adquisiciones,
    formState: { errors: errors_adquisiciones },
  } = useForm<IPlanAdquisiciones>({
    defaultValues: {
      nombre_plan: '',
      nombre_intervalo: '',
      nombre_modalidad: '',
      nombre_fuente: '',
      nombre_estado: '',
      nombre_unidad: '',
      nombre_ubicacion: '',
      persona_responsable: '',
      descripcion: '',
      mes_inicio: '',
      mes_oferta: '',
      codigo_modalidad: '',
      email_persona_responsable: '',
      telefono_persona_responsable: '',
      duracion: 0,
      valor_total_estimado: 0,
      valor_vigencia_actual: 0,
      vigencia_futura: 0,
      decreto_paa: false,
      suministro_paa: false,
      id_plan: 0,
      id_intervalo: 0,
      id_modalidad: 0,
      id_recurso_paa: 0,
      id_estado_vf: 0,
      id_unidad_organizacional: 0,
      id_ubicaion: 0,
      id_persona_responsable: 0,
    },
  });

  // use form personas

  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    control: control_form,
    reset: reset_personas,
  } = useForm({
    defaultValues: {
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
    },
  });

  // estados personas

  const [is_loading, set_is_loading] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([]);
  const [nombre_completo, set_nombre_completo] = useState('');

  const data_watch_adquisiciones = watch_adquisiciones();
  const dispatch = useAppDispatch();

  const limipiar_formulario_personas = () => {
    reset_personas({
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
    });
    set_is_search(false);
    set_is_loading(false);
    set_tipo_documento('');
    set_tipo_documento_av('');
    set_nombre_completo('');
    set_rows([]);
    dispatch(
      set_current_persona_planes({
        id_persona: null,
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
        tipo_usuario: '',
        cod_naturaleza_empresa: '',
      })
    );
  };
  // limpiar formulario
  const limpiar_formulario_adquisiciones = async () => {
    reset_adquisiciones({
      nombre_plan: '',
      nombre_intervalo: '',
      nombre_modalidad: '',
      nombre_fuente: '',
      nombre_estado: '',
      nombre_unidad: '',
      nombre_ubicacion: '',
      persona_responsable: '',
      descripcion: '',
      mes_inicio: '',
      mes_oferta: '',
      duracion: 0,
      codigo_modalidad: '',
      email_persona_responsable: '',
      telefono_persona_responsable: '',
      valor_total_estimado: 0,
      valor_vigencia_actual: 0,
      vigencia_futura: 0,
      decreto_paa: false,
      suministro_paa: false,
      id_plan: 0,
      id_intervalo: 0,
      id_modalidad: 0,
      id_recurso_paa: 0,
      id_estado_vf: 0,
      id_unidad_organizacional: 0,
      id_ubicaion: 0,
      id_persona_responsable: 0,
    });
  };

  const { id_person, is_limpiar_formulario, set_is_limpiar_formulario } =
    useContext(DataContextAdquisiciones);

  useEffect(() => {
    //  console.log('')('is_limpiar_formulario', is_limpiar_formulario);
    limipiar_formulario_personas();
    set_is_limpiar_formulario(false);
  }, [is_limpiar_formulario]);

  // saving
  const [is_saving_adquisiciones, set_is_saving_adquisiciones] =
    useState<boolean>(false);

  // declaracion context
  const { fetch_data_plan_adquisiciones } = useContext(
    DataContextAdquisiciones
  );

  // declaracion redux
  const {
    plan_adquisiciones: { id_plan_anual },
    personas_planes: { id_persona },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_adquisiciones = handleSubmit_adquisiciones(async (data) => {
    try {
      set_is_saving_adquisiciones(true);
      //  console.log('')(data, 'data');
      data.id_persona_responsable = id_persona;
      if (!data.id_persona_responsable || data.id_persona_responsable === 0) {
        control_error('No se ha seleccionado una persona responsable');
        return;
      }
      // data.id_indicador = id_indicador;
      await post_plan_adiquisiciones(data as IPlanAdquisiciones);
      control_success('Se creó correctamente');
      await limpiar_formulario_adquisiciones();
      await fetch_data_plan_adquisiciones();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_adquisiciones(false);
      set_is_limpiar_formulario(true);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_adquisiciones(async (data) => {
    try {
      set_is_saving_adquisiciones(true);
      console.log('data', data);
      if (!data.id_persona_responsable || data.id_persona_responsable === 0) {
        data.id_persona_responsable = id_person;
        if (!id_person || id_person === 0) {
          control_error('No se ha seleccionado una persona responsable');
          return;
        }
      }
      if (data.id_persona_responsable !== id_person) {
        data.id_persona_responsable = id_person;
      }

      //  console.log('')(data, 'data');
      // data.id_indicador = id_indicador;
      await put_plan_adiquisiciones(
        (id_plan_anual as number) ?? 0,
        data as IPlanAdquisiciones
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_adquisiciones();
      await fetch_data_plan_adquisiciones();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_adquisiciones(false);
      set_is_limpiar_formulario(true);
    }
  });

  return {
    control_adquisiciones,
    watch_adquisiciones,
    register_adquisiciones,
    handleSubmit_adquisiciones,
    set_value_adquisiciones,
    reset_adquisiciones,
    errors_adquisiciones,

    data_watch_adquisiciones,

    onsubmit_adquisiciones,
    onsubmit_editar,
    is_saving_adquisiciones,

    limpiar_formulario_adquisiciones,

    // use form personas
    register,
    handle_submit,
    set_value,
    errors,
    control_form,

    // estados personas
    is_loading,
    set_is_loading,
    is_search,
    set_is_search,
    tipo_documento_opt,
    set_tipo_documento_opt,
    tipo_documento,
    set_tipo_documento,
    tipo_documento_av,
    set_tipo_documento_av,
    open_dialog,
    set_open_dialog,
    rows,
    set_rows,
    nombre_completo,
    set_nombre_completo,

    limipiar_formulario_personas,
  };
};
