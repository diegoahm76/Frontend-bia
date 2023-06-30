import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_current_mortalidad,
  set_mortalidades,
} from '../store/slice/produccionSlice';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import {
  get_mortalidades_service,
  get_mortalidad_nro_service,
  get_nurseries_mortalidad_service,
} from '../store/thunks/produccionThunks';

interface IProps {
  control_mortalidad: any;
  get_values: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarMortalidad = ({ control_mortalidad, get_values }: IProps) => {
  // const [action, set_action] = useState<string>("agregar");

  const { mortalidades, nurseries, current_mortalidad, changing_person } =
    useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_mortalidad: GridColDef[] = [
    { field: 'id_baja', headerName: 'ID', width: 20 },
    {
      field: 'nro_baja_por_tipo',
      headerName: 'Número de baja',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_baja',
      headerName: 'Fecha de baja',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'motivo',
      headerName: 'Motivo',
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
        console.log(file.name);
        dispatch(
          set_current_mortalidad({
            ...current_mortalidad,
            id_vivero: get_values('id_vivero'),
            motivo: get_values('motivo'),
            id_persona_baja: changing_person.id_persona,
            persona_baja: changing_person.nombre_completo,
            ruta_archivo_soporte: file,
          })
        );
      }
    }
  }, [file]);
  useEffect(() => {
    if (current_mortalidad.id_baja !== null) {
      if (
        current_mortalidad.ruta_archivo_soporte !== null &&
        current_mortalidad.ruta_archivo_soporte !== undefined
      ) {
        set_file_name(String(current_mortalidad.ruta_archivo_soporte));
      }
    }
  }, [current_mortalidad]);

  const get_mortalidades: any = async () => {
    const nro = get_values('nro_baja_por_tipo');
    void dispatch(get_mortalidades_service(nro));
  };
  const search_mortalidad: any = async () => {
    const nro = get_values('nro_baja_por_tipo');
    void dispatch(get_mortalidad_nro_service(nro));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_mortalidad}
          row_id={'id_baja'}
          columns_model={columns_mortalidad}
          models={mortalidades}
          get_filters_models={get_mortalidades}
          set_models={set_mortalidades}
          button_submit_label="Buscar mortalidades"
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 5,
              control_form: control_mortalidad,
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
              control_form: control_mortalidad,
              control_name: 'nro_baja_por_tipo',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Consecutivo mezcla requerido',
                },
              },
              label: 'Consecutivo baja',
              type: 'number',
              disabled: false,
              helper_text: '',
              on_blur_function: search_mortalidad,
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_mortalidad,
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
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_mortalidad,
              control_name: 'motivo',
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
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_mortalidad,
              control_name: 'persona_baja',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar la personas que la creó',
                },
              },
              label: 'Mortalidad realizada por',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_mortalidad,
              control_name: 'fecha_baja',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar fecha',
                },
              },
              label: 'Fecha de baja',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar mortalidad"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_mortalidad,
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
export default SeleccionarMortalidad;
