import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from '@mui/material';
import FormButton from '../../../../../components/partials/form/FormButton';
// import CloseIcon from '@mui/icons-material/Close';
// import SendIcon from '@mui/icons-material/Send';
import { type IObjSolicitud } from '../../solicitudBienConsumo/interfaces/solicitudBienConsumo';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  get_uni_organizacional,
  get_person_id_service,
  get_funcionario_id_service,
  get_bienes_solicitud,
} from '../../solicitudBienConsumo/store/solicitudBienConsumoThunks';
import SeleccionarSolicitudDespacho from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/SeleccionarSolicitudesDespacho';
import { set_current_solicitud } from '../../solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';
import FuncionarioRechazo from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/PersonaRechazoSolicitud';
import SeleccionarBodega from '../components/SeleccionarBodega';
import {
  type IObjBienDespacho,
  type IObjDespacho,
} from '../interfaces/despacho';
import {
  set_current_despacho,
  set_persona_despacha, reset_state
} from '../store/slices/indexDespacho';
import {
  annul_despacho_service,
  closed_solicitud_service,
  crear_despacho,
  editar_despacho,
  get_bienes_despacho,
  get_num_despacho,
  get_person_id_despacho,
  get_solicitud_by_id,
} from '../store/thunks/despachoThunks';
import SeleccionarDespacho from '../components/SeleccionarDespacho';
import ListadoBienesSolicitud from '../components/ListadoBienesSolicitud';
import SeleccionarBienDespacho from '../components/SeleccionarBienDespacho';
import AnularEliminar from '../../../../conservacion/componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import Limpiar from '../../../../conservacion/componentes/Limpiar';
import { control_warning } from '../../../configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DespachoBienesConsumoScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_solicitud_despacho, handleSubmit: handle_submit_solicitud, reset: reset_solicitud_aprobacion, getValues: get_values_solicitud_despacho, watch: watch_solicitud } = useForm<IObjSolicitud>();
  const { control: control_despacho, handleSubmit: handle_submit, reset: reset_despacho, getValues: get_values, } = useForm<IObjDespacho>();
  const [action, set_action] = useState<string>('Guardar');
  const { current_solicitud, persona_solicita, current_funcionario } = useAppSelector((state: { solic_consumo: any }) => state.solic_consumo);
  const { persona_despacha, current_despacho, nro_despacho, bienes_despacho } = useAppSelector((state) => state.despacho);
  const { bodega_seleccionada } = useAppSelector((state: { bodegas: any }) => state.bodegas);
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => { set_open_search_modal(true); };
  const dispatch = useAppDispatch();
  const initial_values = (): void => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_despacho());
    dispatch(
      set_persona_despacha({
        nombre_completo: userinfo.nombre,
        id_persona: userinfo.id_persona,
      }))
    set_action('crear');
  };

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_despacho());
    dispatch(
      set_persona_despacha({
        nombre_completo: userinfo.nombre,
        id_persona: userinfo.id_persona,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      set_current_despacho({
        ...current_despacho,
        id_persona_despacha: persona_despacha.id_persona,
        persona_crea: persona_despacha.nombre_completo ?? '',
      })
    );
  }, [persona_despacha]);

  useEffect(() => {
    dispatch(
      set_current_despacho({
        ...current_despacho,
        numero_despacho_consumo: nro_despacho,
        id_persona_despacha: persona_despacha.id_persona,
        persona_crea: persona_despacha.nombre_completo ?? '',
      })
    );
  }, [nro_despacho]);

  useEffect(() => {
    reset_solicitud_aprobacion(current_solicitud);
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud_aprobacion(current_solicitud);
    } else {
      if (
        current_solicitud.id_persona_solicita !== null &&
        current_solicitud.id_persona_solicita !== undefined
      ) {
        void dispatch(
          get_person_id_service(current_solicitud.id_persona_solicita)
        );
      }
    }
    if (
      current_solicitud.id_solicitud_consumibles !== null &&
      current_solicitud.id_solicitud_consumibles !== undefined
    ) {
      void dispatch(
        get_bienes_solicitud(current_solicitud.id_solicitud_consumibles)
      );

      if (current_solicitud.id_solicitud_consumibles !== null) {
        if (
          current_solicitud.id_funcionario_responsable_unidad !==
          current_funcionario.id_persona
        ) {
          void dispatch(
            get_funcionario_id_service(
              current_solicitud.id_funcionario_responsable_unidad
            )
          );
          //  console.log('')('ok');
        }
      }
    }
  }, [current_solicitud]);

  useEffect(() => {
    // //  console.log('')(current_solicitud)
    //  console.log('')(current_despacho);
    reset_despacho(current_despacho);
    if ('persona_crea' in current_despacho) {
      reset_despacho(current_despacho);
    } else {
      if (
        current_despacho.id_persona_despacha !== null &&
        current_despacho.id_persona_despacha !== undefined
      )
        void dispatch(
          get_person_id_despacho(current_despacho.id_persona_despacha)
        ); // get persona despacho
    }
    if (
      current_despacho.numero_despacho_consumo !== null &&
      current_despacho.numero_despacho_consumo !== undefined
    ) {
      if (
        current_despacho.id_despacho_consumo !== null &&
        current_despacho.id_despacho_consumo !== undefined
      ) {
        set_action('editar');
        void dispatch(
          get_bienes_despacho(current_despacho.numero_despacho_consumo)
        ); // get bienes despacho
        if(current_despacho?.id_solicitud_consumo){
          void dispatch(
            get_solicitud_by_id(current_despacho.id_solicitud_consumo)
          );
        }else{
          control_warning('No se encontró solicitud asociada al despacho')
        }
      }
    }
  }, [current_despacho]);

  useEffect(() => {
    dispatch(
      set_current_solicitud({
        ...current_solicitud,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
      })
    );
  }, [persona_solicita]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjDespacho): void => {
    const form_data: any = new FormData();
    if (
      current_despacho.id_despacho_consumo !== null &&
      current_despacho.id_despacho_consumo !== undefined
    ) {
      set_action('editar');

      const aux_items: IObjBienDespacho[] = [];
      bienes_despacho.forEach((element: IObjBienDespacho, index: number) => {
        aux_items.push({ ...element, numero_posicion_despacho: index });
      });

      form_data.append('info_despacho', JSON.stringify({ ...data }));
      form_data.append(
        'ruta_archivo_doc_con_recibido',
        data.ruta_archivo_doc_con_recibido
      );
      form_data.append('items_despacho', JSON.stringify(aux_items));
      void dispatch(
        editar_despacho(
          current_despacho.id_despacho_consumo,
          form_data,
          current_solicitud.es_solicitud_de_conservacion
        )
      );
    } else {
      set_action('crear');
      const current_date = new Date();
      const formatted_date = `${current_date.getFullYear()}-${(current_date.getMonth() + 1).toString().padStart(2, '0')}-${current_date.getDate().toString().padStart(2, '0')}`;
      const formatted_time = `${current_date.getHours().toString().padStart(2, '0')}:${current_date.getMinutes().toString().padStart(2, '0')}:${current_date.getSeconds().toString().padStart(2, '0')}`;
      const formatted_date_time = `${formatted_date} ${formatted_time}`;

      const data_edit: IObjDespacho = {
        ...data,
        id_bodega_general: bodega_seleccionada.id_bodega,
        es_despacho_conservacion: current_solicitud.es_solicitud_de_conservacion,
        fecha_despacho: formatted_date_time,
        // fecha_despacho: current_solicitud.fecha_despacho,
        id_solicitud_consumo: current_solicitud.id_solicitud_consumibles,
        fecha_solicitud: current_solicitud.fecha_solicitud,
        numero_solicitud_por_tipo: current_solicitud.nro_solicitud_por_tipo,
        ruta_archivo_doc_con_recibido: current_solicitud.ruta_archivo_info_tecnico,
        id_unidad_para_la_que_solicita:
          current_solicitud.id_unidad_para_la_que_solicita,
        id_funcionario_responsable_unidad:
          current_solicitud.id_funcionario_responsable_unidad,
        id_persona_solicita: current_solicitud.id_persona_solicita,
      };
      const aux_items: IObjBienDespacho[] = [];
      bienes_despacho.forEach((element: IObjBienDespacho, index: number) => {
        aux_items.push({ ...element, numero_posicion_despacho: index });
      });
      const aux = {
        info_despacho: {
          ...data_edit,
        },
        ruta_archivo_doc_con_recibido: data.ruta_archivo_doc_con_recibido,
        items_despacho: aux_items,
      };
      //  console.log('')(aux);
      form_data.append('info_despacho', JSON.stringify({ ...data_edit }));
      form_data.append(
        'ruta_archivo_doc_con_recibido',
        data.ruta_archivo_doc_con_recibido
      );
      form_data.append('items_despacho', JSON.stringify(aux_items));
      void dispatch(
        crear_despacho(
          form_data,
          current_solicitud.es_solicitud_de_conservacion
        )
      );
    }
  };

  const on_submit_annul = (data: IObjDespacho): void => {
    const data_annul = {
      justificacion_anulacion: data.justificacion_anulacion,
    };
    //  console.log('')(data_annul);
    if (
      current_despacho.id_despacho_consumo !== null &&
      current_despacho.id_despacho_consumo !== undefined
    ) {
      void dispatch(
        annul_despacho_service(
          current_despacho.id_despacho_consumo,
          data_annul,
          current_solicitud.es_solicitud_de_conservacion
        )
      );
    }
  };

  const on_submit_closed = (data: IObjSolicitud): void => {
    const data_closed = {
      observacion_cierre_no_dispo_alm: data.observacion_cierre_no_dispo_alm,
    };
    //  console.log('')(data_closed);
    if (
      current_solicitud.id_solicitud_consumibles !== null &&
      current_solicitud.id_solicitud_consumibles !== undefined
    ) {
      void dispatch(
        closed_solicitud_service(
          current_solicitud.id_solicitud_consumibles,
          data_closed
        )
      );
    }
  };

  const clear_fields = (): void => {
    reset_solicitud_aprobacion((prev: any) => {
      return {
        ...prev,
        fecha_despacho_desde: null,
        fecha_despacho_hasta: null,
      }
    });
  }

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12} marginY={2}>
        <SeleccionarDespacho
          control_despacho={control_despacho}
          get_values={get_values}
          reset_values={reset_despacho}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />
        <SeleccionarSolicitudDespacho
          watch_solicitud={watch_solicitud}
          clear_fields={clear_fields}
          title={'Información de la solicitud'}
          control_solicitud_despacho={control_solicitud_despacho}
          get_values={get_values_solicitud_despacho} />

        <FuncionarioRechazo
          title={'Persona responsable'} get_values_solicitud={undefined} />
        <SeleccionarBodega />
        <ListadoBienesSolicitud />
        <SeleccionarBienDespacho />
      </Grid>

      <Grid justifyContent="flex-end" container direction="row" padding={2} spacing={2}>
        {!(current_despacho.despacho_anulado === true) && (
          <Grid item xs={12} md={2}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={action}
              type_button="button"
            />
          </Grid>
        )}
        <Grid item xs={6} md={2}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_open_select_model}
            icon_class={<SearchIcon />}
            label={'Buscar despacho'}
            type_button="button"
            disabled={false}
          />
        </Grid>
        {current_despacho.id_despacho_consumo !== null &&
          <Grid item xs={12} md={2}>
            <AnularEliminar
              action={
                current_solicitud.solicitud_abierta === true
                  ? 'Cerrar por no disponibilidad'
                  : 'Detalle del cierre'
              }
              button_icon_class={<Block />}
              button_disabled={false}
              modal_title={
                current_solicitud.solicitud_abierta === true
                  ? 'Cerrar solicitud'
                  : 'Detalle del cierre de solicitud por no disponibilidad'
              }
              button_submit_label={'Cierre de solicitud'}
              button_submit_disabled={
                !(current_solicitud.solicitud_abierta === true)
              }
              button_submit_icon_class={<Block />}
              button_submit_action={handle_submit_solicitud(on_submit_closed)}
              modal_inputs={[
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud_despacho,
                  control_name: 'nro_solicitud_por_tipo',
                  default_value: '',
                  rules: {},
                  label: 'Numero solicitud',
                  type: 'number',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  person: true,
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud_despacho,
                  control_name: 'persona_cierra',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Debe seleccionar la personas que la creó',
                    },
                  },
                  label: 'Cierre realizao por',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'date_picker_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_solicitud_despacho,
                  control_name:
                    current_solicitud.solicitud_anulada_solicitante === true
                      ? 'fecha_cierre_no_dispo_alm'
                      : 'fecha',
                  default_value: '',
                  rules: { required_rule: { rule: true, message: 'requerido' } },
                  label: 'Fecha actual',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_solicitud_despacho,
                  control_name: 'observacion_cierre_no_dispo_alm',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Observación requerida',
                    },
                  },
                  label: 'Observación',
                  type: 'text',
                  multiline_text: true,
                  rows_text: 4,
                  disabled: false,
                  helper_text: '',
                },
              ]}
            />
          </Grid>}
        {current_despacho.id_despacho_consumo !== null &&
          <Grid item xs={12} md={2}>
            <AnularEliminar
              action={
                current_despacho.despacho_anulado === true
                  ? 'Detalle anulación'
                  : 'Anular'
              }
              button_icon_class={<Block />}
              button_disabled={false}
              modal_title={
                current_despacho.despacho_anulado === true
                  ? 'Detalle anulación'
                  : 'Anular despacho'
              }
              button_submit_label={'Anular'}
              button_submit_disabled={current_despacho.despacho_anulado}
              button_submit_icon_class={<Block />}
              button_submit_action={handle_submit(on_submit_annul)}
              modal_inputs={[
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name: 'nro_despachos_viveros',
                  default_value: '',
                  rules: {},
                  label: 'Numero despacho',
                  type: 'number',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  person: true,
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name: 'persona_anula',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Debe seleccionar la personas que la creó',
                    },
                  },
                  label: 'Anulación realizada por',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'date_picker_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name:
                    current_solicitud.solicitud_anulada_solicitante === true
                      ? 'fecha_anulacion'
                      : 'fecha',
                  default_value: new Date().toString(),
                  rules: { required_rule: { rule: true, message: 'requerido' } },
                  label: 'Fecha actual',
                  type: 'text',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_despacho,
                  control_name: 'justificacion_anulacion',
                  default_value: '',
                  rules: {
                    required_rule: {
                      rule: true,
                      message: 'Observación requerida',
                    },
                  },
                  label: 'Justificacion',
                  type: 'text',
                  multiline_text: true,
                  rows_text: 4,
                  disabled: false,
                  helper_text: '',
                },
              ]}
            />


          </Grid>}

        <Grid item xs={12} md={1.2}>
          <Limpiar
            dispatch={dispatch}
            reset_state={reset_state}
            set_initial_values={initial_values}
            variant_button={'outlined'}
          />
        </Grid>
        <Grid item xs={12} md={1.4}>
          <ButtonSalir
          />
        </Grid>


      </Grid>

    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DespachoBienesConsumoScreen;
