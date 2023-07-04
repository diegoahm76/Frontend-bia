import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../hooks/hooks';

import {
  set_current_solicitud,
  set_solicitudes,
} from '../store/slices/indexSolicitud';
import { useEffect, useState } from 'react';

interface IProps {
  title?: string;
  control_solicitud_aprobada: any;
  get_values: any;
  function_search?: any;
  despacho?: boolean | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudAprobada = ({
  title,
  control_solicitud_aprobada,
  get_values,
  function_search,
  despacho,
}: IProps) => {
  // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { unidad_organizacional, solicitudes, nurseries, current_solicitud } =
    useAppSelector(
      (state: { solicitud_vivero: any }) => state.solicitud_vivero
    );

  const [file_name, set_file_name] = useState<string>('');
  const columns_solicitudes: GridColDef[] = [
    { field: 'id_solicitud_consumibles', headerName: 'ID', width: 20 },
    {
      field: 'fecha_solicitud',
      headerName: 'Fecha de solicitud',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'fecha_retiro_material',
      headerName: 'Fecha retiro del material',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'nombre_unidad_organizacional_destino',
      headerName: 'Unidad organizacional destino',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'persona_solicita',
      headerName: 'Persona solicita',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (
      current_solicitud.id_solicitud_vivero !== null &&
      current_solicitud.id_solicitud_vivero !== undefined
    ) {
      if (current_solicitud.ruta_archivo_info_tecnico !== null) {
        set_file_name(String(current_solicitud.ruta_archivo_info_tecnico));
      }
    }
  }, [current_solicitud]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_solicitud}
          row_id={'id_solicitud_vivero'}
          columns_model={columns_solicitudes}
          models={solicitudes}
          get_filters_models={function_search}
          set_models={set_solicitudes}
          button_submit_label={
            despacho ?? false ? 'Buscar solicitud' : 'Seleccionar solicitud'
          }
          form_inputs={[
            {
              datum_type: 'title',
              title_label: title ?? 'hh',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'nro_solicitud',
              default_value: '',
              rules: {},
              label: 'Número solicitud',
              type: 'number',
              disabled: true,
              helper_text: '',
            },

            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'id_vivero_solicitud',
              default_value: '',
              rules: {},
              label: 'Vivero Origen',
              disabled: true,
              helper_text: 'Debe seleccionar campo',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'nro_info_tecnico',
              default_value: '',
              rules: {},
              label: 'Informe técnico Número:',
              type: 'text',
              multiline_text: true,
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'fecha_solicitud',
              default_value: '',
              rules: {},
              label: 'Fecha de ingreso',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'fecha_retiro_material',
              default_value: '',
              rules: {},
              label: 'Fecha de retiro material',
              disabled: true,
              min_date: new Date().toString(),
              format: 'YYYY-MM-DD',
              helper_text: '',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud_aprobada,
              control_name: 'ruta_archivo_info_tecnico',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Archivo requerido' },
              },
              label: 'Archivo soporte',
              disabled: true,
              helper_text: '',
              set_value: null,
              file_name: file_name,
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_solicitud_aprobada,
              control_name: 'observaciones',
              default_value: '',
              rules: {},
              label: 'Observación de solicitud',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_solicitud_aprobada,
              control_name: 'motivo',
              default_value: '',
              rules: {},
              label: 'Motivo de solicitud',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud_aprobada,
              control_name: 'id_unidad_para_la_que_solicita',
              default_value: '',
              rules: {},
              label: 'Unidad organizacional',
              disabled: true,
              helper_text: 'Debe seleccionar campo',
              select_options: unidad_organizacional,
              option_label: 'nombre',
              option_key: 'id_unidad_organizacional',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_solicitud_aprobada,
              control_name: 'persona_solicita',
              default_value: '',
              rules: {},
              label: 'Solicitud elaborada por:',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          title_table_modal={
            despacho ?? false
              ? 'Solicitudes por despachar'
              : 'Solicitudes pendientes por aprobar'
          }
          modal_active_init={!(despacho ?? false)}
          modal_select_model_title="Listado de solicitudes"
          modal_form_filters={
            despacho ?? false
              ? [
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 2,
                    control_form: control_solicitud_aprobada,
                    control_name: 'nro_solicitud',
                    default_value: '',
                    rules: {},
                    label: 'Número solicitud',
                    type: 'number',
                    disabled: false,
                    helper_text: '',
                  },
                ]
              : []
          }
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitudAprobada;
