import { Autocomplete, Grid, TextField } from '@mui/material';
import ViveristaActual from '../componentes/ViveristaActual';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from '../interfaces/vivero';
import { useEffect, useState } from 'react';
import SeleccionarNuevoViverista from '../componentes/SeleccionarNuevoViverista';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { useForm } from 'react-hook-form';
import FormInputController from '../../../../components/partials/form/FormInputController';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import {
  asignar_viverista_service,
  get_historico_viverista_service,
  get_nursery_service,
  get_viverista_id_service,
  get_viveros_viverista_service,
  remover_viverista_service,
} from '../store/thunks/gestorViveroThunks';
import {
  initial_state_current_viverista_nuevo,
  reset_state,
  set_current_nuevo_viverista,
  set_current_nursery,
} from '../store/slice/viveroSlice';
import { useParams } from 'react-router-dom';
import Limpiar from '../../componentes/Limpiar';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { type GridColDef } from '@mui/x-data-grid';

interface Iasignar {
  accion_realizar: string | null;
  observaciones: string | null;
}
const initial_state_asignar: Iasignar = {
  accion_realizar: 'reemplazar',
  observaciones: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AsignarResponsableViveroScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const {
    control: control_asignar,
    handleSubmit: handle_submit,
    reset: reset_asignar,
    getValues: get_values,
    watch,
  } = useForm<Iasignar>();

  const {
    nurseries,
    current_nursery,
    current_viverista,
    current_nuevo_viverista,
    historicos_viveristas,
  } = useAppSelector((state) => state.nursery);

  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);
  const [action, set_action] = useState<string>('Reemplazar viverista');

  const columns_historico: GridColDef[] = [
    {
      field: 'nombre_viverista',
      headerName: 'Nombre viverista',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'tipo_documento',
      headerName: 'tipo de documento',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_documento',
      headerName: 'Número de documento',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_inicio_periodo',
      headerName: 'Fecha de inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'fecha_fin_periodo',
      headerName: 'Fecha de fin',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'nombre_persona_cambia',
      headerName: 'Persona que cambia',
      width: 250,
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
    reset_asignar(initial_state_asignar);
    void dispatch(get_viveros_viverista_service());
    if (id !== null && id !== undefined) {
      void dispatch(get_nursery_service(id));
    } else set_nursery(current_nursery);
  }, []);

  useEffect(() => {
    if (watch('accion_realizar') !== null) {
      if (get_values('accion_realizar') === 'reemplazar') {
        if (current_viverista.id_viverista_actual === null) {
          set_action('Asignar viverista');
        } else {
          set_action('Reemplazar viverista');
        }
      } else {
        set_action('Remover viverista');
      }
    }
  }, [watch('accion_realizar')]);

  useEffect(() => {
    //  console.log('')(nursery);
    dispatch(set_current_nursery(nursery));
  }, [nursery]);

  useEffect(() => {
    if (current_nursery.id_vivero !== null) {
      void dispatch(get_historico_viverista_service(current_nursery.id_vivero));
      void dispatch(
        get_viverista_id_service(Number(current_nursery.id_vivero ?? 0))
      );
      set_nursery(current_nursery);
    }
    dispatch(
      set_current_nuevo_viverista(initial_state_current_viverista_nuevo)
    );
  }, [current_nursery]);
  useEffect(() => {
    if (current_viverista.id_viverista_actual === null) {
      reset_asignar({
        accion_realizar: 'reemplazar',
        observaciones: '',
      });
      set_action('Asignar viverista');
    } else {
      reset_asignar({
        accion_realizar: 'reemplazar',
        observaciones: '',
      });
      set_action('Reemplazar viverista');
    }
  }, [current_viverista]);

  const nurseries_quarantine = {
    options: nurseries,
    getOptionLabel: (option: IObjNursery) => option.nombre,
  };

  const on_submit = (data: Iasignar): void => {
    const id_vivero = current_nursery.id_vivero;
    if (id_vivero !== null && id_vivero !== undefined) {
      if (data.accion_realizar === 'reemplazar') {
        const data_aux = {
          id_persona: current_nuevo_viverista.id_persona,
          observaciones: data.observaciones,
        };
        void dispatch(asignar_viverista_service(id_vivero, data_aux));
      } else {
        const data_aux = {
          observaciones: data.observaciones,
        };
        void dispatch(remover_viverista_service(id_vivero, data_aux));
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
          <Title title="Responsable de vivero"></Title>
        </Grid>
        <Grid item xs={12} md={12} margin={2}>
          <Autocomplete
            {...nurseries_quarantine}
            id="controlled-demo"
            value={nursery}
            onChange={(event: any, newValue: any) => {
              set_nursery(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccione vivero"
                variant="standard"
              />
            )}
          />
        </Grid>
        {current_viverista.id_viverista_actual !== null && (
          <>
            <ViveristaActual />
            <FormSelectController
              xs={12}
              md={12}
              control_form={control_asignar}
              control_name="accion_realizar"
              default_value="reemplazar"
              rules={{
                required_rule: { rule: true, message: 'Seleccione vivero' },
              }}
              label="Acción a realizar"
              disabled={current_nursery.id_vivero === null}
              helper_text="Debe seleccionar campo"
              select_options={[
                { label: 'Remover viverista', value: 'remover' },
                { label: 'Reemplazar viverista', value: 'reemplazar' },
              ]}
              option_label="label"
              option_key="value"
            />
          </>
        )}
        {watch('accion_realizar') !== 'remover' && (
          <SeleccionarNuevoViverista />
        )}
        <FormInputController
          xs={12}
          md={12}
          control_form={control_asignar}
          control_name="observaciones"
          default_value=""
          rules={{
            required_rule: { rule: true, message: 'Observación requerida' },
          }}
          label="Observaciones"
          type="text"
          disabled={false}
          multiline_text={true}
          rows_text={4}
          helper_text=""
        />

        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={'guardar' ?? action}
              type_button="button"
              disabled={
                current_nursery.id_vivero === null ||
                get_values('accion_realizar') === 'remover'
                  ? false
                  : current_nuevo_viverista.id_persona === null
              }
            />
          </Grid>
          {historicos_viveristas.length > 0 && (
            <Grid item xs={12} md={3}>
              <BuscarModelo
                set_current_model={null}
                row_id={'id_histo_responsable_vivero'}
                columns_model={columns_historico}
                models={historicos_viveristas}
                get_filters_models={null}
                set_models={null}
                button_submit_label="Ver historial"
                form_inputs={[]}
                modal_select_model_title="Historial de viveristas"
                modal_form_filters={[]}
                button_add_selection_hidden={true}
                md_button={12}
                button_icon_class={<PlaylistAddCheckIcon />}
                border_show={false}
              />
            </Grid>
          )}
          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={null}
              variant_button={'outlined'}
              button_clean_show={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
