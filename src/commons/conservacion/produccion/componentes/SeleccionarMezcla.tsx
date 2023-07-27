import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_current_preparacion,
  set_preparaciones,
} from '../store/slice/produccionSlice';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import {
  get_mezclas_service,
  get_nurseries_service,
  get_preparaciones_service,
} from '../store/thunks/produccionThunks';
import { type IObjMezcla } from '../interfaces/produccion';

interface IProps {
  control_preparacion: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}

const max_date = new Date();
const min_date = new Date();
min_date.setDate(min_date.getDate() - 1);

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarMezcla = ({
  control_preparacion,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  // const [action, set_action] = useState<string>("agregar");

  const {
    preparaciones,
    nurseries,
    mezclas,
    current_preparacion,
    current_nursery,
  } = useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();
  const fecha_actual = new Date();
  const fecha_preparacion = new Date(
    current_preparacion.fecha_preparacion ?? ''
  );
  const diferencia_ms = fecha_actual.getTime() - fecha_preparacion.getTime();
  const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
  const columns_preparacion: GridColDef[] = [
    {
      field: 'consec_vivero_mezclas',
      headerName: 'Consecutivo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_mezcla',
      headerName: 'Mezcla',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {mezclas.find((p: IObjMezcla) => p.id_mezcla === params.value)
            ?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'cantidad_creada',
      headerName: 'Cantidad preparada',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_preparacion',
      headerName: 'Fecha de preparacion',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'unidad',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  useEffect(() => {
    void dispatch(get_nurseries_service());
    void dispatch(get_mezclas_service(''));
  }, []);

  const get_preparaciones: any = async () => {
    const vivero = get_values('id_vivero');
    const mezcla = get_values('id_mezcla');
    const name = get_values('nombre_mezcla');

    void dispatch(get_preparaciones_service(mezcla, vivero, name));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_preparacion}
          row_id={'id_preparacion_mezcla'}
          columns_model={columns_preparacion}
          models={preparaciones}
          get_filters_models={get_preparaciones}
          set_models={set_preparaciones}
          button_submit_label="Buscar preparaciones"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: current_preparacion.id_preparacion_mezcla === null ? 6 : 5,
              control_form: control_preparacion,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar vivero',
                },
              },
              label: 'Vivero',
              disabled: current_nursery.id_vivero !== null,
              helper_text: 'Seleccione Vivero',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
              auto_focus: true,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: current_preparacion.id_preparacion_mezcla === null ? 6 : 4,
              control_form: control_preparacion,
              control_name: 'id_mezcla',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Mezcla requerida' },
              },
              label: 'Mezcla',
              disabled: false,
              helper_text: 'Seleccione Mezcla',
              select_options: mezclas,
              option_label: 'nombre',
              option_key: 'id_mezcla',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_preparacion,
              control_name: 'consec_vivero_mezclas',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Consecutivo mezcla requerido',
                },
              },
              label: 'Consecutivo mezcla en vivero',
              type: 'number',
              disabled: false,
              helper_text: '',
              hidden_text: current_preparacion.id_preparacion_mezcla === null,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_preparacion,
              control_name: 'cantidad_creada',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar cantidad a crear',
                },
              },
              label: 'Cantidad creada',
              type: 'number',
              disabled: diferencia_dias > 2,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_preparacion,
              control_name: 'unidad_medida',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar mezcla',
                },
              },
              label: 'unidad',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_preparacion,
              control_name: 'nombre_persona_prepara',
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
              control_form: control_preparacion,
              control_name: 'fecha_preparacion',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
                min_rule: {
                  rule: new Date().setDate(new Date().getDate() - 1),
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
              label: 'Fecha de preparacion',
              disabled: current_preparacion.id_preparacion_mezcla !== null,
              helper_text: '',
              min_date,
              max_date,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_preparacion,
              control_name: 'observaciones',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observacion',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar preparación"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_preparacion,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Vivero requerido' },
              },
              label: 'Vivero',
              disabled: false,
              helper_text: 'Seleccione Vivero',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_preparacion,
              control_name: 'id_mezcla',
              default_value: '',
              rules: {},
              label: 'Mezcla',
              disabled: false,
              helper_text: 'Seleccione Mezcla',
              select_options: mezclas,
              option_label: 'nombre',
              option_key: 'id_mezcla',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_preparacion,
              control_name: 'nombre_mezcla',
              default_value: '',
              rules: {},
              label: 'Nombre de la mezcla',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarMezcla;
