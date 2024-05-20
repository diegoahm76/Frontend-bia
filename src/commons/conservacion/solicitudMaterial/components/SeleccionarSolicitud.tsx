import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

import { get_solicitud_service } from '../store/thunks/solicitudViveroThunks';
import {
  set_current_solicitud,
  set_solicitudes,
} from '../store/slices/indexSolicitud';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
interface IProps {
  title?: string;
  control_solicitud: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitud = ({
  title,
  control_solicitud,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { unidad_organizacional, solicitudes, nurseries, current_solicitud } =
    useAppSelector(
      (state: { solicitud_vivero: any }) => state.solicitud_vivero
    );
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<string>('');
  const dispatch = useAppDispatch();

  const columns_solicitudes: GridColDef[] = [
    // { field: 'id_solicitud_consumibles', headerName: 'ID', width: 20 },
    {
      field: 'fecha_solicitud',
      headerName: 'Fecha de solicitud',
      width: 400,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {format(new Date(params.value), 'dd-MM-yyyy')}
        </div>
      ),
    },
    {
      field: 'persona_solicita',
      headerName: 'Observación',
      width: 350, flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        //  console.log('')(file.name);
        set_file_name(file.name);
        dispatch(
          set_current_solicitud({
            ...current_solicitud,
            id_vivero_solicitud: get_values('id_vivero_solicitud'),
            nro_info_tecnico: get_values('nro_info_tecnico'),
            fecha_solicitud: get_values('fecha_solicitud'),
            fecha_retiro_material: get_values('fecha_retiro_material'),
            observaciones: get_values('observaciones'),
            motivo: get_values('motivo'),
            id_unidad_para_la_que_solicita: get_values(
              'id_unidad_para_la_que_solicita'
            ),
            persona_solicita: get_values('persona_solicita'),
            nombre_unidad_organizacional: get_values(
              'nombre_unidad_organizacional'
            ),
            ruta_archivo_info_tecnico: file,
          })
        );
      }
    }
  }, [file]);

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

  const get_solicitudes_filtro: any = async () => {
    void dispatch(get_solicitud_service());
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_solicitud}
          row_id={'id_solicitud_vivero'}
          columns_model={columns_solicitudes}
          models={solicitudes}
          get_filters_models={get_solicitudes_filtro}
          set_models={set_solicitudes}
          button_submit_label={'Buscar solicitud'}
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: title ?? 'hh',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
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
              control_form: control_solicitud,
              control_name: 'id_vivero_solicitud',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Vivero Origen',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'nro_info_tecnico',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Informe técnico Número:',
              type: 'text',
              multiline_text: true,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'ruta_archivo_info_tecnico',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Archivo requerido' },
              },
              label: 'Archivo soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              // eslint-disable-next-line object-shorthand
              file_name: file_name,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'fecha_solicitud',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Fecha solicitud',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'fecha_retiro_material',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Fecha de retiro material',
              disabled: true,
              min_date: new Date().toString(),
              format: 'YYYY-MM-DD',
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_solicitud,
              control_name: 'observaciones',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Observación de solicitud',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_solicitud,
              control_name: 'motivo',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Motivo de solicitud',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'id_unidad_para_la_que_solicita',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Unidad organizacional',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: unidad_organizacional,
              option_label: 'nombre',
              option_key: 'id_unidad_organizacional',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'persona_solicita',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Solicitud elaborada por:',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'nombre_unidad_organizacional',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Unidad a la que pertenece:',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar solicitud"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_solicitud,
              control_name: 'id_solicitud_consumibles',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Número de solicitud',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitud;
