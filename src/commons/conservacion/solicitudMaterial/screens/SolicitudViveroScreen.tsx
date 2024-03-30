/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from '@mui/material';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import type { AuthSlice } from '../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import PersonaResponsable from '../components/PersonaResponsable';
import {
  reset_state,
  set_current_nursery,
  set_current_solicitud,
  set_persona_solicita,
} from '../store/slices/indexSolicitud';
import {
  type IObjBienesSolicitud,
  type IObjNursery,
  type IObjSolicitudVivero,
} from '../interfaces/solicitudVivero';
import {
  annul_solicitud_service,
  crear_solicitud,
  editar_solicitud,
  get_bienes_solicitud,
  get_funcionario_id_service,
  get_num_solicitud,
  get_nurcery,
  get_person_id_service,
  get_uni_organizacional,
} from '../store/thunks/solicitudViveroThunks';
import SeleccionarSolicitud from '../components/SeleccionarSolicitud';
import DestinoSolicitud from '../components/DestinoElementos';
import SeleccionarBienConsumo from '../components/SeleccionarBien';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudViveroScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_solicitud,
    handleSubmit: handle_submit,
    reset: reset_solicitud,
    getValues: get_values,
    watch,
  } = useForm<IObjSolicitudVivero>();
  const {
    nro_solicitud,
    current_solicitud,
    nurseries,
    persona_solicita,
    current_funcionario,
    bienes_solicitud,
  } = useAppSelector((state) => state.solicitud_vivero);

  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const initial_values = (): void => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_solicitud());
    void dispatch(get_nurcery());
    void dispatch(get_person_id_service(userinfo.id_persona));
    dispatch(
      set_persona_solicita({
        nombre: userinfo.nombre,
        id_persona: userinfo.id_persona,
        unidad_organizacional: userinfo.nombre_unidad_organizacional,
      })
    );
    set_action('crear');
  };
  const [action, set_action] = useState<string>('Crear');

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_solicitud());
    void dispatch(get_nurcery());
    dispatch(
      set_persona_solicita({
        nombre: userinfo.nombre,
        id_persona: userinfo.id_persona,
        unidad_organizacional: userinfo.nombre_unidad_organizacional,
      })
    );
  }, []);

  useEffect(() => {
    //  console.log('')(watch('id_vivero_solicitud'));
    if (watch('id_vivero_solicitud') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero_solicitud')
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero));
      }
    }
  }, [watch('id_vivero_solicitud')]);

  useEffect(() => {
    dispatch(
      set_current_solicitud({
        ...current_solicitud,
        nro_solicitud,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
      })
    );
  }, [nro_solicitud]);

  useEffect(() => {
    // //  console.log('')(current_solicitud)
    reset_solicitud(current_solicitud);
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud(current_solicitud);
    } else {
      if (
        current_solicitud.id_persona_solicita !== null &&
        current_solicitud.id_persona_solicita !== undefined
      )
        void dispatch(
          get_person_id_service(current_solicitud.id_persona_solicita)
        );
    }
    if (
      current_solicitud.id_solicitud_vivero !== null &&
      current_solicitud.id_solicitud_vivero !== undefined
    ) {
      set_action('editar');
      void dispatch(
        get_bienes_solicitud(current_solicitud.id_solicitud_vivero)
      );
      if (
        current_solicitud.id_funcionario_responsable_und_destino !==
        current_funcionario.id_persona
      ) {
        void dispatch(
          get_funcionario_id_service(
            current_solicitud.id_funcionario_responsable_und_destino ?? 0
          )
        );
      }
    }
  }, [current_solicitud]);

  useEffect(() => {
    dispatch(
      set_current_solicitud({
        ...current_solicitud,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
        id_unidad_org_del_responsable:
          persona_solicita.id_unidad_organizacional_actual,
      })
    );
    //  console.log('')(persona_solicita);
  }, [persona_solicita]);

  useEffect(() => {
    const id_vivero_solicitud = get_values('id_vivero_solicitud');
    const nro_info_tecnico = get_values('nro_info_tecnico');
    const observaciones = get_values('observaciones');
    const motivo = get_values('motivo');
    const id_unidad_para_la_que_solicita = get_values(
      'id_unidad_para_la_que_solicita'
    );
    if (
      current_funcionario.id_persona !==
      current_solicitud.id_funcionario_responsable_und_destino
    ) {
      dispatch(
        set_current_solicitud({
          ...current_solicitud,
          id_funcionario_responsable_und_destino:
            current_funcionario.id_persona,
          observaciones,
          motivo,
          id_vivero_solicitud,
          nro_info_tecnico,
          id_unidad_para_la_que_solicita,
        })
      );
    }
  }, [current_funcionario]);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjSolicitudVivero): void => {
    const form_data: any = new FormData();
    if (
      current_solicitud.id_solicitud_vivero !== null &&
      current_solicitud.id_solicitud_vivero !== undefined
    ) {
      set_action('editar');
      const fecha_retiro = new Date(
        data.fecha_retiro_material ?? ''
      ).toISOString();

      const data_edit = {
        ...data,
        fecha_retiro_material: fecha_retiro.slice(0, 10),
      };
      const aux_items: IObjBienesSolicitud[] = [];
      bienes_solicitud.forEach(
        (element: IObjBienesSolicitud, index: number) => {
          aux_items.push({ ...element, nro_posicion: index });
        }
      );

      form_data.append('data_solicitud', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_tecnico', data.ruta_archivo_info_tecnico);
      form_data.append('data_items_solicitados', JSON.stringify(aux_items));
      void dispatch(
        editar_solicitud(
          current_solicitud.id_solicitud_vivero,
          form_data,
          aux_items
        )
      );
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_solicitud ?? '').toISOString();
      const fecha_retiro = new Date(
        data.fecha_retiro_material ?? ''
      ).toISOString();

      const data_edit = {
        ...data,
        fecha_solicitud: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        fecha_retiro_material: fecha_retiro.slice(0, 10),
      };
      const aux_items: IObjBienesSolicitud[] = [];
      bienes_solicitud.forEach(
        (element: IObjBienesSolicitud, index: number) => {
          aux_items.push({ ...element, nro_posicion: index });
        }
      );
      form_data.append('data_solicitud', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_tecnico', data.ruta_archivo_info_tecnico);
      form_data.append('data_items_solicitados', JSON.stringify(aux_items));
      //  console.log('')(data);
      void dispatch(crear_solicitud(form_data));
    }
  };

  const on_submit_annul = (data: IObjSolicitudVivero): void => {
    const data_annul = {
      justificacion: data.justificacion_anulacion_solicitante,
    };
    if (
      current_solicitud.id_solicitud_vivero !== null &&
      current_solicitud.id_solicitud_vivero !== undefined
    ) {
      void dispatch(
        annul_solicitud_service(
          current_solicitud.id_solicitud_vivero,
          data_annul
        )
      );
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
        marginTop: '10px',
      }}
    >
      <SeleccionarSolicitud
        title={'Solicitudes a viveros'}
        control_solicitud={control_solicitud}
        get_values={get_values}
        open_modal={open_search_modal}
        set_open_modal={set_open_search_modal}
      />

      <PersonaResponsable
        title={'Funcionario responsable'}
        get_values_solicitud={get_values}
      />

      <DestinoSolicitud
        title={'Destino de los elementos'}
        control_solicitud={control_solicitud}
        get_values={get_values}
      />

      <SeleccionarBienConsumo />

      <Grid container direction="row" padding={2} spacing={2}>
        {!(current_solicitud.solicitud_anulada_solicitante === true) && (
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              // label={action}
              label={'guardar' ?? action}
              type_button="button"
            />
          </Grid>
        )}
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_open_select_model}
            icon_class={<SearchIcon />}
            label={'Buscar solicitud'}
            type_button="button"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Limpiar
            dispatch={dispatch}
            reset_state={reset_state}
            set_initial_values={initial_values}
            variant_button={'outlined'}
          />
        </Grid>
        {current_solicitud.id_solicitud_vivero !== null && (
          <Grid item xs={12} md={3}>
            <AnularEliminar
              action={
                current_solicitud.solicitud_anulada_solicitante === true
                  ? 'Detalle anulación'
                  : 'Anular'
              }
              button_icon_class={<Block />}
              button_disabled={false}
              modal_title={
                current_solicitud.solicitud_anulada_solicitante === true
                  ? 'Detalle anulación'
                  : 'Anular solicitud'
              }
              button_submit_label={'Anular'}
              button_submit_disabled={
                current_solicitud.solicitud_anulada_solicitante
              }
              button_submit_icon_class={<Block />}
              button_submit_action={handle_submit(on_submit_annul)}
              modal_inputs={[
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud,
                  control_name: 'nro_solicitud',
                  default_value: '',
                  rules: {},
                  label: 'Número de solicitud',
                  type: 'number',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  person: true,
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud,
                  control_name: 'persona_anula',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Debe seleccionar la personas que la creó',
                    },
                  },
                  label: 'Preparación realizada por',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'date_picker_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud,
                  control_name:
                    current_solicitud.solicitud_anulada_solicitante === true
                      ? 'fecha_anulacion_solicitante'
                      : 'fecha',
                  default_value: new Date().toString(),
                  rules: {
                    required_rule: { rule: true, message: 'requerido' },
                  },
                  label: 'Fecha actual',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_solicitud,
                  control_name: 'justificacion_anulacion_solicitante',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Justificación requerida',
                    },
                  },
                  label: 'Justificación',
                  type: 'text',
                  multiline_text: true,
                  rows_text: 4,
                  disabled: false,
                  helper_text: '',
                },
              ]}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudViveroScreen;
