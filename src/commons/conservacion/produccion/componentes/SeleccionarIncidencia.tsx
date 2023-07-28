import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_current_incidencia,
  set_incidencias,
} from '../store/slice/produccionSlice';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import {
  get_incidencias_service,
  get_nurseries_mortalidad_service,
} from '../store/thunks/produccionThunks';

interface IProps {
  control_incidencia: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
const max_date = new Date();
const min_date = new Date();
min_date.setDate(min_date.getDate() - 1);
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarIncidencia = ({
  control_incidencia,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  // const [action, set_action] = useState<string>("agregar");

  const {
    incidencias,
    nurseries,
    current_incidencia,
    changing_person,
    current_siembra_material_vegetal,
    current_nursery,
  } = useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_incidencia: GridColDef[] = [
    {
      field: 'consec_incidencia',
      headerName: 'Consecutivo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_incidencia',
      headerName: 'Fecha de incidencia',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'nombre_incidencia',
      headerName: 'Nombre/Asunto',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  useEffect(() => {
    void dispatch(get_nurseries_mortalidad_service());
  }, []);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_current_incidencia({
            ...current_incidencia,
            id_vivero: get_values('id_vivero'),
            fecha_incidencia: get_values('fecha_incidencia'),
            cod_tipo_incidencia: get_values('cod_tipo_incidencia'),
            altura_lote_en_cms: get_values('altura_lote_en_cms'),
            nombre_incidencia: get_values('nombre_incidencia'),
            descripcion: get_values('descripcion'),
            id_persona_registra: changing_person.id_persona,
            persona_crea: changing_person.nombre_completo,
            ruta_archivo_soporte: file,
            id_bien: current_siembra_material_vegetal.id_bien,
            agno_lote: current_siembra_material_vegetal.agno_lote,
            nro_lote: current_siembra_material_vegetal.nro_lote,
            cod_etapa_lote: current_siembra_material_vegetal.cod_etapa_lote,
          })
        );
      }
    }
  }, [file]);
  useEffect(() => {
    if (current_incidencia.ruta_archivo_soporte !== null) {
      if (typeof current_incidencia.ruta_archivo_soporte === 'string') {
        const name =
          current_incidencia.ruta_archivo_soporte?.split('/').pop() ?? '';
        set_file_name(name);
      }
    } else {
      set_file_name('');
    }
  }, [current_incidencia]);

  const get_incidencias: any = async () => {
    void dispatch(get_incidencias_service(current_nursery.id_vivero ?? 0));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_incidencia}
          row_id={'id_incidencias_mat_vegetal'}
          columns_model={columns_incidencia}
          models={incidencias}
          get_filters_models={get_incidencias}
          set_models={set_incidencias}
          button_submit_label="Buscar incidencias"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Información de incidencia',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_incidencia,
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
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_incidencia,
              control_name: 'consec_incidencia',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Consecutivo incidencia requerido',
                },
              },
              label: 'Consecutivo incidencia',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_incidencia,
              control_name: 'altura_lote_en_cms',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Altura de lote requerido',
                },
                min_rule: {
                  rule: 0.01,
                  message: 'Debe ser mayor a 0',
                },
              },
              label: 'Altura lote (cm)',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 5,
              control_form: control_incidencia,
              control_name: 'ruta_archivo_soporte',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Archivo requerido' },
              },
              label: 'Archivo soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              file_name,
              value_file:
                current_incidencia.id_incidencias_mat_vegetal !== null
                  ? current_incidencia.ruta_archivo_soporte ?? null
                  : null,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_incidencia,
              control_name: 'cod_tipo_incidencia',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Tipo de incidencia requerido',
                },
              },
              label: 'Tipo incidencia',
              helper_text: '',
              disabled: current_incidencia.id_incidencias_mat_vegetal !== null,
              select_options: [
                { label: 'Actividad', value: 'A' },
                { label: 'Seguimiento', value: 'S' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_incidencia,
              control_name: 'nombre_incidencia',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Nombre de incidencia requerido',
                },
              },
              label: 'Nombre/Asunto incidencia',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_incidencia,
              control_name: 'persona_crea',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar la personas que la creó',
                },
              },
              label: 'Incidencia realizada por',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_incidencia,
              control_name: 'fecha_incidencia',
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
              label: 'Fecha de incidencia',
              disabled: current_incidencia.id_incidencias_mat_vegetal !== null,
              helper_text: '',
              min_date,
              max_date,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_incidencia,
              control_name: 'descripcion',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Motivo',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar incidencias"
          modal_form_filters={[]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarIncidencia;
