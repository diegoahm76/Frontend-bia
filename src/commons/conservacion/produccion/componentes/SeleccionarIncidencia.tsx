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
import { get_nurseries_mortalidad_service } from '../store/thunks/produccionThunks';

interface IProps {
  control_incidencia: any;
  get_values: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarIncidencia = ({ control_incidencia, get_values }: IProps) => {
  // const [action, set_action] = useState<string>("agregar");

  const {
    incidencias,
    nurseries,
    current_incidencia,
    changing_person,
    current_siembra_material_vegetal,
  } = useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_incidencia: GridColDef[] = [
    { field: 'id_incidencia', headerName: 'ID', width: 20 },
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
            id_persona_crea: changing_person.id_persona,
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
    if (current_incidencia.id_incidencia !== null) {
      if (
        current_incidencia.ruta_archivo_soporte !== null &&
        current_incidencia.ruta_archivo_soporte !== undefined
      ) {
        set_file_name(String(current_incidencia.ruta_archivo_soporte));
      }
    }
  }, [current_incidencia]);

  const get_incidencias: any = async () => {
    //   const nro = get_values("nro_baja_por_tipo");
    //   void dispatch(get_incidencias_service(nro));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_incidencia}
          row_id={'id_incidencia'}
          columns_model={columns_incidencia}
          models={incidencias}
          get_filters_models={get_incidencias}
          set_models={set_incidencias}
          button_submit_label="Buscar incidencias"
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 5,
              control_form: control_incidencia,
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
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
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
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_incidencia,
              control_name: 'ruta_archivo_soporte',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Archivo requerido' },
              },
              label: 'Archivo soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              file_name,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
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
              disabled: false,
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
              md: 8,
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
              md: 12,
              control_form: control_incidencia,
              control_name: 'descripcion',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Motivo requerido' },
              },
              label: 'Motivo',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
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
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_incidencia,
              control_name: 'fecha_incidencia',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar fecha',
                },
              },
              label: 'Fecha de incidencia',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar incidencias"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_incidencia,
              control_name: 'nro_baja_por_tipo',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Consecutivo mezcla requerido',
                },
              },
              label: 'Consecutivo baja',
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
export default SeleccionarIncidencia;
