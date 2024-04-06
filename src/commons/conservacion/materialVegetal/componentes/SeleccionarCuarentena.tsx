/* eslint-disable object-shorthand */
import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
  initial_state_current_nursery,
  set_current_lifting,
  set_current_nursery,
  set_current_plant_quarantine,
  set_plant_quarantines,
} from '../store/slice/materialvegetalSlice';
import {
  get_nurseries_quarantine_service,
  get_lifting_quarantines_service,
  get_liftings_service,
  get_quareantines_code_service,
  get_mortalities_service,
} from '../store/thunks/materialvegetalThunks';
import {
  type IObjNursery,
  type IObjQuarantine,
} from '../interfaces/materialvegetal';
import { useForm } from 'react-hook-form';
import SeleccionarModeloDialogForm from '../../../../components/partials/getModels/SeleccionarModeloDialogForm';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarCuarentena = () => {
  const {
    control: control_cuarentena,
    reset: reset_cuarentena,
    getValues: get_values,
    watch,
  } = useForm<IObjQuarantine>();

  const dispatch = useAppDispatch();
  const {
    nurseries,
    current_plant_quarantine,
    plant_quarantines,
    current_lifting,
    current_nursery,
    planting_person,
  } = useAppSelector((state) => state.material_vegetal);
  const [bienes, set_bienes] = useState<any>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);

  const columns_cuarentena: GridColDef[] = [
    {
      field: 'consec_cueren_por_lote_etapa',
      headerName: 'Consecutivo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_lote',
      headerName: 'Año lote',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_vivero',
      headerName: 'Vivero',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {nurseries.find((p) => p.id_vivero === params.value)?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'cantidad_cuarentena',
      headerName: 'Cantidad cuarentena',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_levantada',
      headerName: 'Cantidad levantada',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_bajas',
      headerName: 'Cantidad bajas',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_cuarentena',
      headerName: 'Fecha de cuarentena',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'cuarentena_abierta',
      headerName: 'Estado de cuarentena',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cuarentena_abierta ? (
          <Chip
            size="small"
            label="ABIERTA"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip size="small" label="CERRADA" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'cuarentena_anulada',
      headerName: '¿Anulada?',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cuarentena_anulada ? (
          <Chip size="small" label="SI" color="error" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="success" variant="outlined" />
        );
      },
    },
    {
      field: 'descrip_corta_diferenciable',
      headerName: 'Descripción',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_nurseries_quarantine_service());
  }, []);

  useEffect(() => {
    if (current_plant_quarantine.id_cuarentena_mat_vegetal !== null) {
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
      dispatch(
        set_current_lifting({
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
        })
      );
    }
    reset_cuarentena(current_plant_quarantine);
  }, [current_plant_quarantine]);

  const get_ingresos_cuarentena: any = async () => {
    const code = get_values('codigo_bien') ?? '';
    const name = get_values('nombre_bien') ?? '';
    const agno_lote = get_values('agno_lote') ?? null;
    const cod_etapa = get_values('cod_etapa_lote') ?? '';
    void dispatch(
      get_lifting_quarantines_service(
        current_nursery.id_vivero,
        code,
        name,
        agno_lote,
        cod_etapa
      )
    );
  };

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

  const search_bien: any = async () => {
    try {
      const id_vivero = current_nursery.id_vivero;
      if (id_vivero !== null && id_vivero !== undefined) {
        const codigo = get_values('codigo_bien') ?? '';
        const data = await dispatch(
          get_quareantines_code_service(id_vivero, codigo)
        );
        set_bienes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if ('success' in bienes) {
      if (bienes.success === true) {
        if ('data' in bienes) {
          if (bienes.data.length > 1) {
            set_select_model_is_active(true);
          }
        }
      }
    }
  }, [bienes]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_plant_quarantine}
          row_id={'id_cuarentena_mat_vegetal'}
          columns_model={columns_cuarentena}
          models={plant_quarantines}
          get_filters_models={get_ingresos_cuarentena}
          set_models={set_plant_quarantines}
          button_submit_label="Buscar cuarentena"
          button_submit_disabled={current_nursery.id_vivero === null}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 8,
              control_form: control_cuarentena,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar vivero',
                },
              },
              label: 'Vivero',
              disabled:
                current_plant_quarantine.id_cuarentena_mat_vegetal !== null,
              helper_text: 'Seleccione Vivero',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
              auto_focus: true,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_cuarentena,
              control_name: 'consec_cueren_por_lote_etapa',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'consecutivo rquerido' },
              },
              label: 'Consecutivo cuarentena',
              type: 'number',
              disabled: true,
              helper_text: '',
              hidden_text:
                current_plant_quarantine.id_cuarentena_mat_vegetal === null,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_cuarentena,
              control_name: 'fecha_cuarentena',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha de cuarentena',
              disabled: true,
              helper_text: '',
              min_date: null,
              max_date: null,
              format: 'YYYY-MM-DD',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Bien requerido' },
              },
              label: 'Codigo bien',
              type: 'text',
              disabled: current_nursery.id_vivero === null,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'nombre_bien',
              default_value: '',
              rules: {},
              label: 'Nombre bien',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'agno_lote',
              default_value: '',
              rules: {},
              label: 'Año lote',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'cod_etapa_lote',
              default_value: '',
              rules: {},
              disabled: true,
              label: 'Etapa de lote',
              helper_text: 'debe seleccionar campo',
              select_options: [
                { label: 'Germinación', value: 'G' },
                { label: 'Producción', value: 'P' },
                { label: 'Distribución', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_cuarentena,
              control_name: 'descrip_corta_diferenciable',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Descripción requerida' },
              },
              label: 'Descripción',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Seleccionar cuarentena"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {},
              label: 'Código bien',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'nombre_bien',
              default_value: '',
              rules: {},
              label: 'Nombre bien',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'agno_lote',
              default_value: '',
              rules: {},
              label: 'Año bien',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: 'cod_etapa_lote',
              default_value: '',
              rules: {},
              label: 'Etapa de lote',
              helper_text: 'Debe seleccionar campo',
              select_options: [
                { label: 'Germinación', value: 'G' },
                { label: 'Producción', value: 'P' },
                { label: 'Distribución', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
          ]}
        />
        <SeleccionarModeloDialogForm
          set_current_model={set_current_plant_quarantine}
          is_modal_active={select_model_is_active}
          set_is_modal_active={set_select_model_is_active}
          modal_title={'Seleccionar ingreso a cuarentena'}
          form_filters={[]}
          set_models={set_plant_quarantines}
          get_filters_models={null}
          models={plant_quarantines}
          columns_model={columns_cuarentena}
          row_id={'id_cuarentena_mat_vegetal'}
          title_table_modal={'Resultados de la busqueda'}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarCuarentena;
