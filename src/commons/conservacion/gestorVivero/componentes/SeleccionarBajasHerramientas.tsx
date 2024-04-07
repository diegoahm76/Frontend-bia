import { useEffect, useState } from 'react';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_genera_bajas,
  set_current_genera_baja,
} from '../store/slice/viveroSlice';
import { type IObjNursery } from '../interfaces/vivero';
import {
  get_bajas_nro_service,
  get_bajas_service,
  get_nurseries_baja_service,
} from '../store/thunks/gestorViveroThunks';
import { Chip, Grid } from '@mui/material';

interface IProps {
  control_genera_bajas: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
const max_date = new Date();
const min_date = new Date();
min_date.setDate(min_date.getDate() - 1);
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBajasHerramientas = ({
  control_genera_bajas,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  // const [action, set_action] = useState<string>("agregar");

  const {
    genera_bajas,
    nurseries,
    current_genera_baja,
    persona,
    current_nursery,
  } = useAppSelector((state) => state.nursery);
  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_baja: GridColDef[] = [
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
      field: 'id_vivero',
      headerName: 'Vivero',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {nurseries.find((p: IObjNursery) => p.id_vivero === params.value)
            ?.nombre ?? ''}
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
      field: 'baja_anulado',
      headerName: 'Estado de baja',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.baja_anulado ? (
          <Chip size="small" label="ANULADO" color="error" variant="outlined" />
        ) : (
          <Chip
            size="small"
            label="NO ANULADO"
            color="success"
            variant="outlined"
          />
        );
      },
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
    void dispatch(get_nurseries_baja_service());
  }, []);

  useEffect(() => {
    //  console.log('')(file);
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_current_genera_baja({
            ...current_genera_baja,
            id_vivero: get_values('id_vivero'),
            fecha_baja: get_values('fecha_baja'),
            motivo: get_values('motivo'),
            id_persona_baja: persona.id_persona,
            nombre_persona_baja: persona.nombre_completo,
            ruta_archivo_soporte: file,
          })
        );
      }
    }
  }, [file]);

  useEffect(() => {
    if (
      current_genera_baja.ruta_archivo_soporte !== null &&
      current_genera_baja.ruta_archivo_soporte !== undefined
    ) {
      if (typeof current_genera_baja.ruta_archivo_soporte === 'string') {
        const name =
          current_genera_baja.ruta_archivo_soporte?.split('/').pop() ?? '';
        set_file_name(name);
      }
    } else {
      set_file_name('');
    }
  }, [current_genera_baja]);

  const get_bajas: any = async () => {
    const nro = get_values('nro_baja_por_tipo');
    void dispatch(get_bajas_service(nro));
  };

  const search_baja: any = async () => {
    const nro = get_values('nro_baja_por_tipo');
    void dispatch(get_bajas_nro_service(nro));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_genera_baja}
          row_id={'nro_baja_por_tipo'}
          columns_model={columns_baja}
          models={genera_bajas}
          get_filters_models={get_bajas}
          set_models={set_genera_bajas}
          button_submit_label="Buscar bajas"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 5,
              control_form: control_genera_bajas,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un vivero',
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
              control_form: control_genera_bajas,
              control_name: 'nro_baja_por_tipo',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Número de baja requerido',
                },
              },
              label: 'Número baja',
              type: 'number',
              disabled: false,
              helper_text: '',
              on_blur_function: search_baja,
            },

            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 5,
              control_form: control_genera_bajas,
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
                current_genera_baja.id_baja !== null
                  ? current_genera_baja.ruta_archivo_soporte ?? null
                  : null,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 8,
              control_form: control_genera_bajas,
              control_name: 'nombre_persona_baja',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar la personas que la creó',
                },
              },
              label: 'Baja realizada por',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_genera_bajas,
              control_name: 'fecha_baja',
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
              label: 'Fecha de baja',
              disabled: current_genera_baja.id_baja !== null,
              helper_text: '',
              min_date,
              max_date,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_genera_bajas,
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
          ]}
          modal_select_model_title="Buscar baja de herramientas, insumos y semillas"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_genera_bajas,
              control_name: 'nro_baja_por_tipo',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Número de baja requerido',
                },
              },
              label: 'Número baja',
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
export default SeleccionarBajasHerramientas;
