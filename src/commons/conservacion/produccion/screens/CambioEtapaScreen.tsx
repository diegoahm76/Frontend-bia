import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarCambio from '../componentes/SeleccionarCambio';
import SeleccionarMaterialVegetal from '../componentes/SeleccionarMaterialVegetal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_current_stage_change,
  set_current_nursery,
  reset_state,
  initial_state_current_nursery,
} from '../store/slice/produccionSlice';
import { useEffect, useState } from 'react';
// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_planting_goods_service } from "../store/thunks/produccionThunks";
import { type IObjNursery, type IObjChange } from '../interfaces/produccion';
import { useForm } from 'react-hook-form';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
// import CloseIcon from '@mui/icons-material/Close';
import PersonaCambia from '../componentes/PersonaCambia';
import {
  add_stage_change_service,
  annul_stage_change_service,
  control_error,
  edit_stage_change_service,
  get_nurseries_service,
  get_person_id_service,
} from '../store/thunks/produccionThunks';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CambioEtapaScreen(): JSX.Element {
  const {
    current_stage_change,
    changing_person,
    nurseries,
    current_nursery,
    current_vegetal_material,
  } = useAppSelector((state) => state.produccion);
  const {
    control: control_cambio,
    handleSubmit: handle_submit,
    reset: reset_cambio,
    getValues: get_values_cambio,
    watch: watch_cambio,
  } = useForm<IObjChange>();
  const {
    control: control_material,
    reset: reset_material_vegetal,
    getValues: get_values_material,
  } = useForm<IObjChange>();
  const dispatch = useAppDispatch();

  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const [action, set_action] = useState<string>('Crear');
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const initial_values = (): void => {
    void dispatch(get_nurseries_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    set_action('crear');
  };
  useEffect(() => {
    dispatch(
      set_current_stage_change({
        ...current_stage_change,
        id_persona_cambia: changing_person?.id_persona,
        id_vivero: get_values_cambio('id_vivero'),
        id_bien: get_values_cambio('id_bien'),
        fecha_cambio: get_values_cambio('fecha_cambio'),
        cantidad_movida: get_values_cambio('cantidad_movida'),
        altura_lote_en_cms: get_values_cambio('altura_lote_en_cms'),
        observaciones: get_values_cambio('observaciones'),
      })
    );
  }, [changing_person]);

  useEffect(() => {
    reset_cambio(current_stage_change);
    if (current_stage_change.id_cambio_de_etapa !== null) {
      set_action('editar');
      // sdispatch(set_current_vegetal_material({ id_bien: current_stage_change.id_bien, codigo_bien: (current_stage_change.codigo??""), nombre: (current_stage_change.nombre??""), agno_lote: current_stage_change.agno_lote, nro_lote: current_stage_change.nro_lote, cod_etapa_lote: current_stage_change.cod_etapa_lote_origen, etapa_lote: (current_stage_change.desc_etapa_lote_origen??""), cantidad_disponible: current_stage_change.cantidad_disponible_al_crear }))
    }
  }, [current_stage_change]);

  useEffect(() => {
    reset_material_vegetal(current_vegetal_material);
    dispatch(
      set_current_stage_change({
        ...current_stage_change,
        id_bien: current_vegetal_material.id_bien,
        agno_lote: current_vegetal_material.agno_lote,
        nro_lote: current_vegetal_material.nro_lote,
        cod_etapa_lote_origen: current_vegetal_material.cod_etapa_lote,
        cantidad_disponible_al_crear:
          current_vegetal_material.cantidad_disponible,
        fecha_cambio: get_values_cambio('fecha_cambio'),
        cantidad_movida: get_values_cambio('cantidad_movida'),
        altura_lote_en_cms: get_values_cambio('altura_lote_en_cms'),
        observaciones: get_values_cambio('observaciones'),
      })
    );
  }, [current_vegetal_material]);

  useEffect(() => {
    if (watch_cambio('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch_cambio('id_vivero')
      );
      if (vivero !== undefined) {
        dispatch(
          set_current_stage_change({
            ...current_stage_change,
            id_vivero: vivero.id_vivero,
          })
        );
        dispatch(set_current_nursery(vivero));
      } else {
        dispatch(set_current_nursery(initial_state_current_nursery));
      }
    } else {
      dispatch(set_current_nursery(initial_state_current_nursery));
    }
  }, [watch_cambio('id_vivero')]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjChange) => {
    const form_data: any = new FormData();

    if (
      current_stage_change.id_cambio_de_etapa !== null &&
      current_stage_change.id_cambio_de_etapa !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_cambio = new Date(data.fecha_cambio ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_cambio.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        form_data.append('altura_lote_en_cms', Number(data.altura_lote_en_cms));
        form_data.append('observaciones', data.observaciones);
        form_data.append('id_persona_cambia', data.id_persona_cambia);
        form_data.append('cantidad_movida', Number(data.cantidad_movida));
        form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);

        void dispatch(
          edit_stage_change_service(
            form_data,
            current_stage_change.id_cambio_de_etapa
          )
        );
      } else {
        control_error(
          'Solo se pueden editar cambios de etapa hasta 30 dias despues de la fecha de cambio'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_cambio ?? '').toISOString();
      form_data.append('id_bien', Number(data.id_bien));
      form_data.append('id_vivero', Number(data.id_vivero));
      form_data.append('agno_lote', Number(data.agno_lote));
      form_data.append('nro_lote', Number(data.nro_lote));
      form_data.append('cod_etapa_lote_origen', data.cod_etapa_lote_origen);
      form_data.append(
        'fecha_cambio',
        fecha.slice(0, 10) + ' ' + fecha.slice(11, 19)
      );
      form_data.append(
        'cantidad_disponible_al_crear',
        Number(data.cantidad_disponible_al_crear) ?? 100
      );
      form_data.append('cantidad_movida', Number(data.cantidad_movida));
      form_data.append('altura_lote_en_cms', Number(data.altura_lote_en_cms));
      form_data.append('observaciones', data.observaciones);
      form_data.append('id_persona_cambia', Number(data.id_persona_cambia));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      void dispatch(add_stage_change_service(form_data));
    }
  };

  const on_submit_annul = (data: IObjChange): void => {
    if (
      current_stage_change.id_cambio_de_etapa !== null &&
      current_stage_change.id_cambio_de_etapa !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_cambio = new Date(current_stage_change.fecha_cambio ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_cambio.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(
          annul_stage_change_service(
            current_stage_change.id_cambio_de_etapa,
            data
          )
        );
      } else {
        control_error(
          'Solo se pueden anular cambios de etapa hasta 30 dias despues de la fecha de cambio'
        );
      }
    }
  };

  return (
    <>
      <Grid
        container
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
          <Title title="Cambio de etapa"></Title>
        </Grid>

        <SeleccionarMaterialVegetal
          control_material_vegetal={control_material}
          get_values={get_values_material}
        />
        <SeleccionarCambio
          control_cambio={control_cambio}
          get_values={get_values_cambio}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />

        <PersonaCambia title={'Persona que realiza el cambio de etapa'} />
        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_stage_change.cambio_anulado === true) && (
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}
                icon_class={<SaveIcon />}
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
              label={'Buscar cambio de etapa'}
              type_button="button"
              disabled={current_nursery.id_vivero === null}
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
          {current_stage_change.id_cambio_de_etapa !== null && (
            <Grid item xs={12} md={3}>
              <AnularEliminar
                action={
                  current_stage_change.cambio_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular'
                }
                button_icon_class={<Block />}
                button_disabled={false}
                modal_title={
                  current_stage_change.cambio_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular cambio de etapa'
                }
                button_submit_label={'Anular'}
                button_submit_disabled={current_stage_change.cambio_anulado}
                button_submit_icon_class={<Block />}
                button_submit_action={handle_submit(on_submit_annul)}
                modal_inputs={[
                  {
                    datum_type: 'select_controller',
                    xs: 12,
                    md: 4,
                    control_form: control_cambio,
                    control_name: 'id_vivero',
                    default_value: current_stage_change.id_vivero,
                    rules: {
                      required_rule: {
                        rule: true,
                        message: 'Vivero requerido',
                      },
                    },
                    label: 'Vivero',
                    disabled: true,
                    helper_text: '',
                    select_options: nurseries,
                    option_label: 'nombre',
                    option_key: 'id_vivero',
                  },
                  {
                    datum_type: 'input_controller',
                    person: true,
                    xs: 12,
                    md: 4,
                    control_form: control_cambio,
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
                    control_form: control_cambio,
                    control_name: 'fecha_anula',
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
                    control_form: control_cambio,
                    control_name: 'justificacion_anulacion',
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
    </>
  );
}
