import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
  set_current_transfer,
  set_transfers_nurseries,
} from '../store/slice/distribucionSlice';
import {
  get_current_trasnfer_service,
  get_nurseries_service,
  get_person_id_service,
  get_transfers_service,
} from '../store/thunks/distribucionThunks';
import { type IObjNursery } from '../interfaces/distribucion';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';

interface IProps {
  control_traslado: any;
  get_values: any;
  origin_nursery_list: IObjNursery[];
  destination_nursery_list: IObjNursery[];
  open_modal: boolean;
  set_open_modal: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarTraslado = ({
  control_traslado,
  get_values,
  origin_nursery_list,
  destination_nursery_list,
  open_modal,
  set_open_modal,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { current_transfer, transfers_nurseries, nurseries, origin_nursery } =
    useAppSelector((state) => state.distribucion);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_traslado: GridColDef[] = [
    {
      field: 'nro_traslado',
      headerName: 'Número de traslado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_vivero_origen',
      headerName: 'Vivero de origen',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {nurseries.find((p) => p.id_vivero === params.value)?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'id_vivero_destino',
      headerName: 'Vivero de destino',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {nurseries.find((p) => p.id_vivero === params.value)?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'fecha_traslado',
      headerName: 'Fecha de traslado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },

    {
      field: 'traslado_anulado',
      headerName: 'Estado de traslado',
      width: 150,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.traslado_anulado ? (
          <Chip size="small" label="ANULADO" color="error" variant="outlined" />
        ) : (
          <Chip
            size="small"
            label="ACTIVO"
            color="success"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_nurseries_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
  }, []);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_current_transfer({
            ...current_transfer,
            persona_traslada: get_values('persona_traslada'),
            id_vivero_destino: get_values('id_vivero_destino'),
            id_vivero_origen: get_values('id_vivero_origen'),
            observaciones: get_values('observaciones'),
            ruta_archivo_soporte: file,
          })
        );
      }
    }
  }, [file]);

  useEffect(() => {
    if (current_transfer.ruta_archivo_soporte !== null) {
      if (typeof current_transfer.ruta_archivo_soporte === 'string') {
        const name =
          current_transfer.ruta_archivo_soporte?.split('/').pop() ?? '';
        set_file_name(name);
      }
    } else {
      set_file_name('');
    }
  }, [current_transfer]);

  const get_traslados: any = async () => {
    const vivero_origen = get_values('id_vivero_origen') ?? '';
    const vivero_destino = get_values('id_vivero_destino') ?? '';
    const fecha_desde = get_values('fecha_desde') ?? '';
    const fecha_hasta = get_values('fecha_hasta') ?? '';
    void dispatch(
      get_transfers_service(
        vivero_origen,
        fecha_desde,
        fecha_hasta,
        vivero_destino
      )
    );
  };

  const search_traslado: any = async () => {
    const nro_traslado = get_values('nro_traslado') ?? '';
    void dispatch(get_current_trasnfer_service(nro_traslado));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_transfer}
          row_id={'id_traslado'}
          columns_model={columns_traslado}
          models={transfers_nurseries}
          get_filters_models={get_traslados}
          set_models={set_transfers_nurseries}
          button_submit_label="Buscar traslado"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 5,
              control_form: control_traslado,
              control_name: 'id_vivero_origen',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar vivero origen',
                },
              },
              label: 'Vivero de origen',
              disabled: origin_nursery.id_vivero !== null,
              helper_text: 'Seleccione vivero de origen',
              select_options: origin_nursery_list,
              option_label: 'nombre',
              option_key: 'id_vivero',
              auto_focus: true,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_traslado,
              control_name: 'id_vivero_destino',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Vivero de destino requerido',
                },
              },
              label: 'Vivero de destino',
              disabled: current_transfer.id_traslado !== null,
              helper_text: 'Seleccione vivero de destino',
              select_options: destination_nursery_list,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: 'nro_traslado',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerida' } },
              label: 'Número de traslado',
              type: 'number',
              disabled: current_transfer.id_traslado !== null,
              helper_text:
                current_transfer.nro_traslado === null
                  ? 'Ingrese para buscar traslado'
                  : '',
              on_blur_function: search_traslado,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_traslado,
              control_name: 'persona_traslada',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'requerido' } },
              label: 'Persona que traslada',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_traslado,
              control_name: 'fecha_traslado',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha de traslado',
              disabled: true,
              helper_text: '',
              min_date: null,
              max_date: null,
              format: 'YYYY/MM/DD',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 5,
              control_form: control_traslado,
              control_name: 'ruta_archivo_soporte',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Archivo requerido' },
              },
              label: 'Archivo de soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              file_name,
              value_file:
                current_transfer.id_traslado !== null
                  ? current_transfer.ruta_archivo_soporte ?? null
                  : null,
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_traslado,
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
          modal_select_model_title="Seleccionar traslado"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: 'id_vivero_origen',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Vivero origen requerido',
                },
              },
              label: 'Vivero de origen',
              disabled: true,
              helper_text: '',
              select_options: origin_nursery_list,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: 'id_vivero_destino',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Vivero destino requerido',
                },
              },
              label: 'Vivero de destino',
              disabled: current_transfer.id_traslado !== null,
              helper_text: 'Seleccione vivero de destino',
              select_options: destination_nursery_list,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarTraslado;
