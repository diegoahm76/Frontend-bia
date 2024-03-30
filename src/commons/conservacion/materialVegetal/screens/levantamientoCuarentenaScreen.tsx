/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarLevantamientoCuarentena from '../componentes/SeleccionarLevantamientoCuarentena';
import SeleccionarCuarentena from '../componentes/SeleccionarCuarentena';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_current_lifting,
  initial_satate_current_lifting,
  reset_state,
} from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from 'react';
import {
  add_lifting_quarantine_service,
  annul_lifting_quarantine_service,
  control_error,
  edit_lifting_quarantine_service,
  get_nurseries_quarantine_service,
  get_person_id_service,
} from '../store/thunks/materialvegetalThunks';
import { type IObjLifting } from '../interfaces/materialvegetal';
import { useForm } from 'react-hook-form';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function LevantamientoCuarentenaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    nurseries,
    current_lifting,
    plant_quarantine_lifting,
    planting_person,
    current_nursery,
    current_plant_quarantine,
    plant_quarantine_mortalities,
  } = useAppSelector((state) => state.material_vegetal);

  const {
    control: control_levantamiento,
    handleSubmit: handle_submit,
    reset: reset_levantamiento,
    getValues: get_values,
  } = useForm<IObjLifting>();

  const [action, set_action] = useState<string>('Crear');
  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const initial_values = (): void => {
    void dispatch(get_nurseries_quarantine_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    set_action('crear');
  };

  const columns_levantamiento: GridColDef[] = [
    {
      field: 'consec_levan_por_cuaren',
      headerName: 'Consecutivo levantamiento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_levantamiento',
      headerName: 'Fecha de levantamiento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'cantidad_a_levantar',
      headerName: 'Cantidad',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const columns_mortalidad: GridColDef[] = [
    {
      field: 'consecutivo_mortalidad',
      headerName: 'Consecutivo mortalidad',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_mortalidad',
      headerName: 'Fecha de mortalidad',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'cantidad_mortalidad',
      headerName: 'Cantidad',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona));
  }, []);

  useEffect(() => {
    reset_levantamiento({
      ...current_lifting,
      id_persona_levanta: planting_person.id_persona,
      realizado_por: planting_person.nombre_completo,
    });
  }, [planting_person]);

  useEffect(() => {
    if (current_lifting.id_item_levanta_cuarentena !== null) {
      set_action('editar');
      //  console.log('')(current_plant_quarantine);
      reset_levantamiento({
        ...current_lifting,
        id_cuarentena_mat_vegetal:
          current_plant_quarantine.id_cuarentena_mat_vegetal ?? null,
        cantidad_cuarentena: current_plant_quarantine.cantidad_cuarentena,
        cantidad_levantada: current_plant_quarantine.cantidad_levantada,
        cantidad_mortalidad: current_plant_quarantine.cantidad_bajas,
        cantidad_disponible:
          (current_plant_quarantine.cantidad_cuarentena ?? 0) -
          (current_plant_quarantine.cantidad_levantada ?? 0) -
          (current_plant_quarantine.cantidad_bajas ?? 0),
        id_persona_levanta: planting_person.id_persona,
        realizado_por: planting_person.nombre_completo,
      });
    } else {
      reset_levantamiento(current_lifting);
    }
  }, [current_lifting]);

  useEffect(() => {
    dispatch(set_current_lifting(initial_satate_current_lifting));
  }, [current_nursery]);

  const on_submit = (data: IObjLifting): void => {
    const form_data: any = new FormData();
    if (
      current_lifting.id_item_levanta_cuarentena !== null &&
      current_lifting.id_item_levanta_cuarentena !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_levantamiento = new Date(data.fecha_levantamiento ?? '');
      const diferencia_ms =
        fecha_actual.getTime() - fecha_levantamiento.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');

        form_data.append(
          'cantidad_a_levantar',
          Number(data.cantidad_a_levantar)
        );
        form_data.append('observaciones', data.observaciones);
        void dispatch(
          edit_lifting_quarantine_service(
            form_data,
            current_lifting.id_item_levanta_cuarentena
          )
        );
      } else {
        control_error(
          'Solo se puede editar levantamientos hasta 30 dias despues de la fecha de levantamiento'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_levantamiento ?? '').toISOString();
      form_data.append(
        'id_cuarentena_mat_vegetal',
        current_plant_quarantine.id_cuarentena_mat_vegetal
      );
      form_data.append(
        'fecha_levantamiento',
        fecha.slice(0, 10) + ' ' + fecha.slice(11, 19)
      );
      form_data.append('cantidad_a_levantar', Number(data.cantidad_a_levantar));
      form_data.append('observaciones', data.observaciones);
      const aux = {
        id_cuarentena_mat_vegetal:
          current_plant_quarantine.id_cuarentena_mat_vegetal,
        fecha_levantamiento: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        cantidad_a_levantar: Number(data.cantidad_a_levantar),
        observaciones: data.observaciones,
      };
      //  console.log('')(aux);
      void dispatch(add_lifting_quarantine_service(form_data));
    }
  };
  const on_submit_annul = (data: IObjLifting): void => {
    const form_data: any = new FormData();

    form_data.append('justificacion_anulacion', data.justificacion_anulacion);

    if (
      current_lifting.id_item_levanta_cuarentena !== null &&
      current_lifting.id_item_levanta_cuarentena !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_levantamiento = new Date(
        current_lifting.fecha_levantamiento ?? ''
      );
      const diferencia_ms =
        fecha_actual.getTime() - fecha_levantamiento.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 2) {
        void dispatch(
          annul_lifting_quarantine_service(
            current_lifting.id_item_levanta_cuarentena,
            form_data
          )
        );
      } else {
        control_error(
          'Solo se puede eliminar levantamientos hasta 2 dias despues de la fecha de levantamiento'
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
          <Title title="Levantamiento de cuarentena de material vegetal"></Title>
        </Grid>
        <SeleccionarCuarentena />

        <SeleccionarLevantamientoCuarentena
          control_levantamiento={control_levantamiento}
          get_values={get_values}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />

        {current_plant_quarantine.id_cuarentena_mat_vegetal !== null && (
          <Grid container direction="row" padding={2} spacing={2}>
            {plant_quarantine_lifting.length > 0 && (
              <Grid item xs={12} md={4}>
                <BuscarModelo
                  set_current_model={null}
                  row_id={'id_item_levanta_cuarentena'}
                  columns_model={columns_levantamiento}
                  models={plant_quarantine_lifting}
                  get_filters_models={null}
                  set_models={null}
                  button_submit_label="Historial de levantamientos"
                  form_inputs={[]}
                  modal_select_model_title="Historial de levantamientos"
                  modal_form_filters={[]}
                  button_add_selection_hidden={true}
                  md_button={12}
                  button_icon_class={<PlaylistAddCheckIcon />}
                />
              </Grid>
            )}
            {plant_quarantine_mortalities.length > 0 && (
              <Grid item xs={12} md={4}>
                <BuscarModelo
                  set_current_model={null}
                  row_id={'id_item_baja_viveros'}
                  columns_model={columns_mortalidad}
                  models={plant_quarantine_mortalities}
                  get_filters_models={null}
                  set_models={null}
                  button_submit_label="Historial de mortalidades"
                  form_inputs={[]}
                  modal_select_model_title="Historial de mortalidades"
                  modal_form_filters={[]}
                  button_add_selection_hidden={true}
                  md_button={12}
                  button_icon_class={<PlaylistAddCheckIcon />}
                />
              </Grid>
            )}
          </Grid>
        )}
        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_lifting.levantamiento_anulado === true) && (
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
              label={'Buscar levantamiento'}
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
          {current_lifting.id_item_levanta_cuarentena !== null && (
            <Grid item xs={12} md={3}>
              <AnularEliminar
                action={
                  current_lifting.levantamiento_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular'
                }
                button_icon_class={<Block />}
                button_disabled={false}
                modal_title={
                  current_lifting.levantamiento_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular levantamiento'
                }
                button_submit_label={'Anular'}
                button_submit_disabled={current_lifting.levantamiento_anulado}
                button_submit_icon_class={<Block />}
                button_submit_action={handle_submit(on_submit_annul)}
                modal_inputs={[
                  {
                    datum_type: 'select_controller',
                    xs: 12,
                    md: 4,
                    control_form: control_levantamiento,
                    control_name: 'id_vivero',
                    default_value: current_plant_quarantine.id_vivero,
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
                    control_form: control_levantamiento,
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
                    control_form: control_levantamiento,
                    control_name:
                      current_plant_quarantine.cuarentena_anulada === true
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
                    control_form: control_levantamiento,
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
