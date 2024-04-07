import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarBajasHerramientas from '../componentes/SeleccionarBajasHerramientas';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_bienes_bajas_service } from "../store/thunks/produccionThunks";
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarBajasBienes from '../componentes/SeleccionarBajasBienes';
import {
  type IObjNursery,
  type IObjBienBaja,
  type IObjGenerarBaja,
} from '../interfaces/vivero';
import {
  initial_state_current_insumo,
  set_current_insumo,
  set_current_nursery,
  set_bienes_bajas,
  reset_state,
  initial_state_current_nursery,
} from '../store/slice/viveroSlice';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import {
  add_baja_service,
  annul_baja_service,
  control_error,
  edit_baja_service,
  get_bien_baja_id_service,
  get_nurseries_baja_service,
  get_person_id_service,
} from '../store/thunks/gestorViveroThunks';
import { useForm } from 'react-hook-form';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BajaHerramientaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    current_genera_baja,
    persona,
    nurseries,
    current_nursery,
    bienes_bajas,
  } = useAppSelector((state) => state.nursery);

  const {
    control: control_baja,
    handleSubmit: handle_submit,
    reset: reset_baja,
    getValues: get_values,
    watch,
  } = useForm<IObjGenerarBaja>();

  const [action, set_action] = useState<string>('Crear');
  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const initial_values = (): void => {
    void dispatch(get_nurseries_baja_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    set_action('crear');
  };
  useEffect(() => {
    reset_baja({
      ...current_genera_baja,
      id_persona_baja: persona?.id_persona,
      nombre_persona_baja: persona.nombre_completo,
    });
  }, [persona]);

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona));
  }, []);

  useEffect(() => {
    if (current_genera_baja.id_baja !== null) {
      set_action('editar');
      void dispatch(get_bien_baja_id_service(current_genera_baja.id_baja ?? 0));
      if (current_genera_baja.id_persona_baja !== null) {
        void dispatch(
          get_person_id_service(current_genera_baja.id_persona_baja ?? 0)
        );
      }
    }
    reset_baja(current_genera_baja);
  }, [current_genera_baja]);

  useEffect(() => {
    dispatch(set_bienes_bajas([]));
    dispatch(set_current_insumo(initial_state_current_insumo));
  }, [current_nursery]);

  useEffect(() => {
    if (watch('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero')
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero as any));
      } else {
        dispatch(set_current_nursery(initial_state_current_nursery as any));
      }
    } else {
      dispatch(set_current_nursery(initial_state_current_nursery as any));
    }
  }, [watch('id_vivero')]);

  const on_submit = (data: IObjGenerarBaja): void => {
    const form_data: any = new FormData();

    if (
      current_genera_baja.id_baja !== null &&
      current_genera_baja.id_baja !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_baja = new Date(data.fecha_baja ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_baja.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');

        const aux_items: IObjBienBaja[] = [];
        bienes_bajas.forEach((element: IObjBienBaja, index: number) => {
          aux_items.push({ ...element, nro_posicion: index });
        });
        const aux = {
          info_baja: { ...data },
          items_baja: aux_items,
        };
        //  console.log('')(aux);
        form_data.append('info_baja', JSON.stringify({ ...data }));
        form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
        form_data.append('items_baja', JSON.stringify(aux_items));
        void dispatch(edit_baja_service(form_data));
      } else {
        control_error(
          'Solo se pueden editar bajas hasta 30 dias despues de la fecha de baja'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_baja ?? '').toISOString();

      const data_edit = {
        ...data,
        fecha_baja: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
      };
      const aux_items: IObjBienBaja[] = [];
      bienes_bajas.forEach((element: IObjBienBaja, index: number) => {
        aux_items.push({ ...element, nro_posicion: index });
      });
      form_data.append('info_baja', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('items_baja', JSON.stringify(aux_items));
      void dispatch(add_baja_service(form_data));
    }
  };
  const on_submit_annul = (data: IObjGenerarBaja): void => {
    if (
      current_genera_baja.id_baja !== null &&
      current_genera_baja.id_baja !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_baja = new Date(data.fecha_baja ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_baja.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 2) {
        void dispatch(annul_baja_service(current_genera_baja.id_baja, data));
      } else {
        control_error(
          'Solo se pueden anular bajas hasta 2 dias despues de la fecha de baja'
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
          <Title title="Baja herramientas, insumos y semillas"></Title>
        </Grid>
        <SeleccionarBajasHerramientas
          control_genera_bajas={control_baja}
          get_values={get_values}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />
        {current_nursery.id_vivero !== null && <SeleccionarBajasBienes />}
        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_genera_baja.baja_anulado === true) && (
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
              label={'Buscar bajas'}
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
          {current_genera_baja.id_baja !== null && (
            <Grid item xs={12} md={3}>
              <AnularEliminar
                action={
                  current_genera_baja.baja_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular'
                }
                button_icon_class={<Block />}
                button_disabled={false}
                modal_title={
                  current_genera_baja.baja_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular baja'
                }
                button_submit_label={'Anular'}
                button_submit_disabled={current_genera_baja.baja_anulado}
                button_submit_icon_class={<Block />}
                button_submit_action={handle_submit(on_submit_annul)}
                modal_inputs={[
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 2,
                    control_form: control_baja,
                    control_name: 'nro_baja_por_tipo',
                    default_value: current_genera_baja.nro_baja_por_tipo,
                    rules: {
                      required_rule: {
                        rule: false,
                        message: 'Número de baja requerido',
                      },
                    },
                    label: 'Número de baja',
                    type: 'number',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    person: true,
                    xs: 12,
                    md: 4,
                    control_form: control_baja,
                    control_name:
                      current_genera_baja.baja_anulado === true
                        ? 'nombre_persona_anula'
                        : 'persona',
                    default_value: '',
                    rules: {
                      required_rule: {
                        rule: true,
                        message: 'Debe seleccionar la persona que la creó',
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
                    control_form: control_baja,
                    control_name:
                      current_genera_baja.baja_anulado === true
                        ? 'fecha_anulacion'
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
                    control_form: control_baja,
                    control_name: 'justificacion_anulacion',
                    default_value: '',
                    rules: {
                      required_rule: {
                        rule: true,
                        message: 'Observación requerida',
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
