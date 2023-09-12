import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarMortalidad from '../componentes/SeleccionarMortalidad';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_items_mortalidad_service } from "../store/thunks/produccionThunks";
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarLoteSiembra from '../componentes/SeleccionarLoteSiembra';
import {
  type IObjNursery,
  type IObjItemMortalidad,
  type IObjMortalidad,
} from '../interfaces/produccion';
import {
  initial_state_current_material_vegetal,
  set_current_siembra_material_vegetal,
  set_current_nursery,
  set_items_mortalidad,
  set_current_mortalidad,
  reset_state,
} from '../store/slice/produccionSlice';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import {
  add_mortalidad_service,
  annul_mortalidad_service,
  edit_mortalidad_service,
  get_bien_mortalidad_id_service,
  get_nro_mortalidad_service,
  get_nurseries_mortalidad_service,
  get_person_id_service,
} from '../store/thunks/produccionThunks';
import { useForm } from 'react-hook-form';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MortalidadPlantasScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    current_mortalidad,
    changing_person,
    nurseries,
    current_nursery,
    items_mortalidad,
    nro_mortalidad,
  } = useAppSelector((state) => state.produccion);

  const {
    control: control_mortalidad,
    handleSubmit: handle_submit,
    reset: reset_mortalidad,
    getValues: get_values,
    watch,
  } = useForm<IObjMortalidad>();

  const [action, set_action] = useState<string>('Crear');
  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };

  const initial_values = (): void => {
    void dispatch(get_nro_mortalidad_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    set_action('crear');
  };

  useEffect(() => {
    reset_mortalidad({
      ...current_mortalidad,
      id_persona_baja: changing_person?.id_persona,
      persona_baja: changing_person.nombre_completo,
    });
  }, [changing_person]);

  useEffect(() => {
    void dispatch(get_nurseries_mortalidad_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    void dispatch(get_nro_mortalidad_service());
  }, []);
  useEffect(() => {
    dispatch(
      set_current_mortalidad({
        ...current_mortalidad,
        nro_baja_por_tipo: nro_mortalidad,
        id_persona_baja: changing_person?.id_persona,
        persona_baja: changing_person.nombre_completo,
      })
    );
  }, [nro_mortalidad]);

  useEffect(() => {
    if (
      current_mortalidad.id_baja !== null &&
      current_mortalidad.id_baja !== undefined
    ) {
      set_action('editar');
      void dispatch(get_bien_mortalidad_id_service(current_mortalidad.id_baja));
      if (current_mortalidad.id_persona_baja !== null) {
        void dispatch(
          get_person_id_service(current_mortalidad.id_persona_baja ?? 0)
        );
      }
    }
    reset_mortalidad(current_mortalidad);
  }, [current_mortalidad]);

  useEffect(() => {
    dispatch(set_items_mortalidad([]));
    dispatch(
      set_current_siembra_material_vegetal(
        initial_state_current_material_vegetal
      )
    );
  }, [current_nursery]);

  useEffect(() => {
    if (watch('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero')
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero));
      }
    }
  }, [watch('id_vivero')]);

  const on_submit = (data: IObjMortalidad): void => {
    const form_data: any = new FormData();

    if (
      current_mortalidad.id_baja !== null &&
      current_mortalidad.id_baja !== undefined
    ) {
      set_action('editar');
      const aux_items: IObjItemMortalidad[] = [];
      items_mortalidad.forEach((element: IObjItemMortalidad, index: number) => {
        aux_items.push({ ...element, nro_posicion: index });
      });
      form_data.append('data_mortalidad', JSON.stringify({ ...data }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('data_items_mortalidad', JSON.stringify(aux_items));
      void dispatch(
        edit_mortalidad_service(current_mortalidad.id_baja, form_data)
      );
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_baja ?? '').toISOString();

      const data_edit = {
        ...data,
        fecha_baja: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
      };
      const aux_items: IObjItemMortalidad[] = [];
      items_mortalidad.forEach((element: IObjItemMortalidad, index: number) => {
        aux_items.push({ ...element, nro_posicion: index });
      });
      form_data.append('data_mortalidad', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('data_items_mortalidad', JSON.stringify(aux_items));
      void dispatch(add_mortalidad_service(form_data));
    }
  };

  const on_submit_annul = (data: IObjMortalidad): void => {
    if (
      current_mortalidad.id_baja !== null &&
      current_mortalidad.id_baja !== undefined
    ) {
      void dispatch(annul_mortalidad_service(current_mortalidad.id_baja, data));
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
          <Title title="Registro de mortalidad de plantas"></Title>
        </Grid>
        <SeleccionarMortalidad
          control_mortalidad={control_mortalidad}
          get_values={get_values}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />
        {current_nursery.id_vivero !== null && <SeleccionarLoteSiembra />}
        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_mortalidad.baja_anulado === true) && (
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
              label={'Buscar mortalidad'}
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
          {current_mortalidad.id_baja !== null && (
            <Grid item xs={12} md={3}>
              <AnularEliminar
                action={
                  current_mortalidad.baja_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular'
                }
                button_icon_class={<Block />}
                button_disabled={false}
                modal_title={
                  current_mortalidad.baja_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular mortalidad'
                }
                button_submit_label={'Anular'}
                button_submit_disabled={current_mortalidad.baja_anulado}
                button_submit_icon_class={<Block />}
                button_submit_action={handle_submit(on_submit_annul)}
                modal_inputs={[
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 2,
                    control_form: control_mortalidad,
                    control_name: 'nro_baja_por_tipo',
                    default_value: current_mortalidad.nro_baja_por_tipo,
                    rules: {
                      required_rule: {
                        rule: false,
                        message: 'Número de baja requerido',
                      },
                    },
                    label: 'Número baja',
                    type: 'number',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    person: true,
                    xs: 12,
                    md: 4,
                    control_form: control_mortalidad,
                    control_name:
                      current_mortalidad.baja_anulado === true
                        ? 'persona_anula'
                        : 'persona',
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
                    control_form: control_mortalidad,
                    control_name:
                      current_mortalidad.baja_anulado === true
                        ? 'fecha_anulacion'
                        : 'fecha',
                    default_value: new Date().toString(),
                    rules: {
                      required_rule: { rule: true, message: 'Requerido' },
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
                    control_form: control_mortalidad,
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
