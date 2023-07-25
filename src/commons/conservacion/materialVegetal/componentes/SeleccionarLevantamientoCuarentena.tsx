import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../hooks';
import {
  set_current_lifting,
  set_plant_quarantine_lifting,
} from '../store/slice/materialvegetalSlice';
import { useEffect } from 'react';

interface IProps {
  control_levantamiento: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
const max_date = new Date();
const min_date = new Date();
min_date.setDate(min_date.getDate() - 1);
let dias: number;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarLevantamientoCuarentena = ({
  control_levantamiento,
  open_modal,
  set_open_modal,
}: IProps) => {
  const {
    current_lifting,
    plant_quarantine_lifting,
    current_plant_quarantine,
  } = useAppSelector((state) => state.material_vegetal);

  const columns_levantamiento: GridColDef[] = [
    {
      field: 'consec_levan_por_cuaren',
      headerName: 'Consecutivo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_a_levantar',
      headerName: 'Cantidad levantada',
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
      field: 'levantamiento_anulado',
      headerName: '¿Anulada?',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.levantamiento_anulado ? (
          <Chip size="small" label="SI" color="error" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="success" variant="outlined" />
        );
      },
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fecha_levantamiento = new Date(
      current_lifting.fecha_levantamiento ?? ''
    );
    const diferencia_ms = max_date.getTime() - fecha_levantamiento.getTime();
    dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
  }, [current_lifting]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          md_button={5}
          set_current_model={set_current_lifting}
          row_id={'id_item_levanta_cuarentena'}
          columns_model={columns_levantamiento}
          models={plant_quarantine_lifting}
          get_filters_models={null}
          set_models={set_plant_quarantine_lifting}
          button_submit_label="Seleccionar levantamiento de cuarentena"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          button_submit_disabled={
            current_plant_quarantine.id_cuarentena_mat_vegetal === null
          }
          form_inputs={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_levantamiento,
              control_name: 'consec_levan_por_cuaren',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Consecutivo requerido' },
              },
              label: 'Consecutivo levantamiento',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 3,
              control_form: control_levantamiento,
              control_name: 'fecha_leventamiento',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
                min_rule: {
                  rule: new Date().setDate(new Date().getDate() - 30),
                  message: `La fecha minima posible es 
                  ${min_date.toString().slice(0, 16)}`,
                },
                max_rule: {
                  rule: new Date(),
                  message: `La fecha maxima posible es ${max_date
                    .toString()
                    .slice(0, 16)}`,
                },
              },
              label: 'Fecha de leventamiento',
              disabled: current_lifting.id_item_levanta_cuarentena !== null,
              helper_text: '',
              min_date,
              max_date,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_levantamiento,
              control_name: 'realizado_por',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Levantamiento realizado por:',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_levantamiento,
              control_name: 'Cantidad_cuarentena',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerido' },
              },
              label: 'Cantidad en cuarentena',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_levantamiento,
              control_name: 'cantidad_levantada',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerido' },
              },
              label: 'Cantidad levantada',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_levantamiento,
              control_name: 'cantidad_mortalidad',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerido' },
              },
              label: 'Cantidad mortalidad',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_levantamiento,
              control_name: 'cantidad_disponible',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerido' },
              },
              label: 'Cantidad disponible',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_levantamiento,
              control_name: 'cantidad_a_levantar',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerido' },
                min_rule: {
                  rule: 0.01,
                  message: 'La cantidad debe ser mayor a 0',
                },
                max_rule: {
                  rule: current_lifting.cantidad_disponible,
                  message:
                    'La cantidad debe ser maximo ' +
                    String(current_lifting.cantidad_disponible),
                },
              },
              label: 'Cantidad a levantar',
              type: 'number',
              disabled: dias > 2,
              helper_text: '',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_levantamiento,
              control_name: 'observaciones',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observación',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Seleccionar levantamiento de cuarentena"
          modal_form_filters={[]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarLevantamientoCuarentena;
