/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Chip, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarIngresoCuarentena from '../componentes/SeleccionarIngresoCuarentena';
import SeleccionarLoteSiembra from '../componentes/SeleccionarLoteSiembra';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_current_plant_quarantine,
  set_current_nursery,
  set_current_plant_seed_lot,
  initial_satate_current_plant_seed_lot,
  reset_state,
  initial_state_current_nursery,
} from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from 'react';
import {
  add_plant_quarantine_service,
  annul_plant_quarantine_service,
  control_error,
  edit_plant_quarantine_service,
  get_liftings_service,
  get_mortalities_service,
  get_nurseries_quarantine_service,
  get_person_id_service,
} from '../store/thunks/materialvegetalThunks';
import {
  type IObjNursery,
  type IObjQuarantine,
} from '../interfaces/materialvegetal';
import { useForm } from 'react-hook-form';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
// import CloseIcon from '@mui/icons-material/Close';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import Limpiar from '../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IngresoCuarentenaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    plant_quarantine_mortalities,
    plant_quarantine_lifting,
    planting_person,
    current_plant_seed_lot,
    nurseries,
    current_nursery,
    current_plant_quarantine,
  } = useAppSelector((state) => state.material_vegetal);

  const {
    control: control_cuarentena,
    handleSubmit: handle_submit,
    reset: reset_cuarentena,
    getValues: get_values,
    watch,
  } = useForm<IObjQuarantine>();

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
      headerName: 'Consecutivo de levantamiento',
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
    reset_cuarentena({
      ...current_plant_quarantine,
      id_persona_cuarentena: planting_person.id_persona,
      persona_cuarentena: planting_person.nombre_completo,
    });
  }, [planting_person]);

  useEffect(() => {
    if (current_plant_quarantine.id_cuarentena_mat_vegetal !== null) {
      set_action('editar');
      if (current_plant_quarantine.id_persona_cuarentena !== null) {
        void dispatch(
          get_person_id_service(
            current_plant_quarantine.id_persona_cuarentena ?? 0
          )
        );
        void dispatch(
          get_liftings_service(
            current_plant_quarantine.id_cuarentena_mat_vegetal ?? 0
          )
        );
        void dispatch(
          get_mortalities_service(
            current_plant_quarantine.id_cuarentena_mat_vegetal ?? 0
          )
        );
      }
    }
    reset_cuarentena(current_plant_quarantine);
  }, [current_plant_quarantine]);

  useEffect(() => {
    dispatch(set_current_plant_seed_lot(initial_satate_current_plant_seed_lot));
  }, [current_nursery]);

  useEffect(() => {
    dispatch(
      set_current_plant_quarantine({
        ...current_plant_quarantine,
        id_vivero: get_values('id_vivero'),
        id_bien: current_plant_seed_lot.id_bien,
        agno_lote: current_plant_seed_lot.agno_lote,
        nro_lote: current_plant_seed_lot.nro_lote,
        cod_etapa_lote: current_plant_seed_lot.cod_etapa_lote,
        saldo_disponible: current_plant_seed_lot.saldo_disponible,
        cantidad_cuarentena: get_values('cantidad_cuarentena'),
        descrip_corta_diferenciable: get_values('descrip_corta_diferenciable'),
        id_persona_cuarentena: planting_person.id_persona,
        persona_cuarentena: planting_person.nombre_completo,
        motivo: get_values('motivo'),
      })
    );
  }, [current_plant_seed_lot]);

  useEffect(() => {
    if (watch('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero')
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero));
      } else {
        dispatch(set_current_nursery(initial_state_current_nursery));
      }
    } else {
      dispatch(set_current_nursery(initial_state_current_nursery));
    }
  }, [watch('id_vivero')]);

  const on_submit = (data: IObjQuarantine): void => {
    const form_data: any = new FormData();
    //  console.log('')('submit');
    if (
      current_plant_quarantine.id_cuarentena_mat_vegetal !== null &&
      current_plant_quarantine.id_cuarentena_mat_vegetal !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_cuarentena = new Date(data.fecha_cuarentena ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_cuarentena.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        const data_edit = {
          ...data,
          cantidad_cuarentena: Number(data.cantidad_cuarentena),
        };
        form_data.append('data', JSON.stringify({ ...data_edit }));
        form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
        void dispatch(
          edit_plant_quarantine_service(
            form_data,
            current_plant_quarantine.id_cuarentena_mat_vegetal
          )
        );
      } else {
        control_error(
          'Solo se pueden editar ingresos a cuarentena hasta 30 dias despues de la fecha de registro de cuarentena'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_cuarentena ?? '').toISOString();

      const data_edit = {
        ...data,
        fecha_cuarentena: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        cantidad_cuarentena: Number(data.cantidad_cuarentena),
      };
      const aux = {
        data_ingreso_cuarentena: { ...data_edit },
        ruta_archivo_soporte: data.ruta_archivo_soporte,
      };
      //  console.log('')(aux);
      form_data.append(
        'data_ingreso_cuarentena',
        JSON.stringify({ ...data_edit })
      );
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      void dispatch(add_plant_quarantine_service(form_data));
    }
  };
  const on_submit_annul = (data: IObjQuarantine): void => {
    const data_annul = {
      cuarentena_abierta: false,
      cuarentena_anulada: true,
      justificacion_anulacion: data.justificacion_anulacion,
      fecha_anulacion: data.fecha_anulacion,
      id_persona_anula: data.id_persona_anula,
    };
    if (
      current_plant_quarantine.id_cuarentena_mat_vegetal !== null &&
      current_plant_quarantine.id_cuarentena_mat_vegetal !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_cuarentena = new Date(data.fecha_cuarentena ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_cuarentena.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 2) {
        void dispatch(
          annul_plant_quarantine_service(
            current_plant_quarantine.id_cuarentena_mat_vegetal,
            data_annul
          )
        );
      } else {
        control_error(
          'Solo se pueden anular ingresos a cuarentena hasta 2 dias despues del registro de cuarentena'
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
          <Title title="Ingreso a cuarentena de material vegetal"></Title>
        </Grid>
        {current_plant_quarantine.cuarentena_anulada === true && (
          <Chip
            label={`Este registro de cuarentena fue anulado el ${
              current_plant_quarantine.fecha_anulacion?.slice(0, 10) ?? ''
            }`}
            color="error"
            variant="outlined"
          />
        )}
        <SeleccionarLoteSiembra />
        <SeleccionarIngresoCuarentena
          control_cuarentena={control_cuarentena}
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
                  button_submit_label="Historial levantamientos"
                  form_inputs={[]}
                  modal_select_model_title="Historial levantamientos"
                  modal_form_filters={[]}
                  button_add_selection_hidden={true}
                  md_button={12}
                  button_icon_class={<ManageSearchIcon />}
                  border_show={false}
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
                  button_submit_label="Historial mortalidades"
                  form_inputs={[]}
                  modal_select_model_title="Historial mortalidades"
                  modal_form_filters={[]}
                  button_add_selection_hidden={true}
                  md_button={12}
                  button_icon_class={<ManageSearchIcon />}
                  border_show={false}
                />
              </Grid>
            )}
          </Grid>
        )}
        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_plant_quarantine.cuarentena_anulada === true) && (
            <>
              {(current_plant_quarantine.cantidad_levantada ?? 0) === 0 &&
                (current_plant_quarantine.cantidad_bajas ?? 0) === 0 && (
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
            </>
          )}
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_select_model}
              icon_class={<SearchIcon />}
              label={'Buscar cuarentena'}
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
          {current_plant_quarantine.id_cuarentena_mat_vegetal !== null &&
            (current_plant_quarantine.cantidad_levantada ?? 0) === 0 &&
            (current_plant_quarantine.cantidad_bajas ?? 0) === 0 && (
              <Grid item xs={12} md={3}>
                <AnularEliminar
                  action={
                    current_plant_quarantine.cuarentena_anulada === true
                      ? 'Detalle anulación'
                      : 'Anular'
                  }
                  button_icon_class={<Block />}
                  button_disabled={false}
                  modal_title={
                    current_plant_quarantine.cuarentena_anulada === true
                      ? 'Detalle anulación'
                      : 'Anular ingreso a cuarentena'
                  }
                  button_submit_label={'Anular'}
                  button_submit_disabled={
                    current_plant_quarantine.cuarentena_anulada
                  }
                  button_submit_icon_class={<Block />}
                  button_submit_action={handle_submit(on_submit_annul)}
                  modal_inputs={[
                    {
                      datum_type: 'select_controller',
                      xs: 12,
                      md: 4,
                      control_form: control_cuarentena,
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
                      control_form: control_cuarentena,
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
                      control_form: control_cuarentena,
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
                      control_form: control_cuarentena,
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
