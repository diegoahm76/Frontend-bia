import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
  set_current_stage_change,
  set_stage_changes,
} from '../store/slice/produccionSlice';
import {
  get_nurseries_service,
  get_stage_changes_service,
} from '../store/thunks/produccionThunks';

interface IProps {
  control_cambio: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
const max_date = new Date();
const min_date = new Date();
min_date.setDate(min_date.getDate() - 30);
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarCambio = ({
  control_cambio,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  const dispatch = useAppDispatch();
  const {
    current_stage_change,
    stage_changes,
    nurseries,
    current_vegetal_material,
    current_nursery,
  } = useAppSelector((state) => state.produccion);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');

  const columns_cambios: GridColDef[] = [
    {
      field: 'nro_lote',
      headerName: '# lote',
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
      field: 'nombre',
      headerName: 'Material vegetal',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_movida',
      headerName: 'Cantidad movida',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'desc_etapa_lote_origen',
      headerName: 'Etapa origen',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'P'
            ? 'Producción'
            : params.value === 'D'
            ? 'Distribución'
            : params.value === 'G'
            ? 'Germinación'
            : '-'}
        </div>
      ),
    },
    {
      field: 'desc_etapa_lote_destino',
      headerName: 'Etapa destino',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'P'
            ? 'Producción'
            : params.value === 'D'
            ? 'Distribución'
            : params.value === 'G'
            ? 'Germinación'
            : '-'}
        </div>
      ),
    },
    {
      field: 'fecha_cambio',
      headerName: 'Fecha de cambio',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'cambio_anulado',
      headerName: 'Estado de cambio de etapa',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cambio_anulado ? (
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
    void dispatch(get_nurseries_service());
  }, []);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_current_stage_change({
            ...current_stage_change,
            id_vivero: get_values('id_vivero'),
            id_bien: get_values('id_bien'),
            fecha_cambio: get_values('fecha_cambio'),
            cantidad_movida: get_values('cantidad_movida'),
            altura_lote_en_cms: get_values('altura_lote_en_cms'),
            observaciones: get_values('observaciones'),
            ruta_archivo_soporte: file,
          })
        );
      }
    }
  }, [file]);

  useEffect(() => {
    if (current_stage_change.ruta_archivo_soporte !== null) {
      if (typeof current_stage_change.ruta_archivo_soporte === 'string') {
        const name =
          current_stage_change.ruta_archivo_soporte?.split('/').pop() ?? '';
        set_file_name(name);
      }
    } else {
      set_file_name('');
    }
  }, [current_stage_change]);

  const get_cambios: any = async () => {
    //  console.log('')('buscando...');
    const code_bien = get_values('codigo');
    const nombre_bien = get_values('nombre');
    const cod_etapa_lote_origen = get_values('cod_etapa_lote_origen');
    const agno_lote = get_values('agno_lote');
    if (current_nursery.id_vivero !== null) {
      void dispatch(
        get_stage_changes_service(
          current_nursery.id_vivero,
          code_bien,
          nombre_bien,
          cod_etapa_lote_origen,
          agno_lote
        )
      );
    }
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_stage_change}
          row_id={'id_cambio_de_etapa'}
          columns_model={columns_cambios}
          models={stage_changes}
          get_filters_models={get_cambios}
          set_models={set_stage_changes}
          button_submit_disabled={current_nursery.id_vivero === null}
          button_submit_label="Buscar cambios de etapa"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Información de cambio de etapa',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar vivero',
                },
              },
              label: 'Vivero',
              disabled: current_stage_change.id_cambio_de_etapa !== null,
              helper_text: 'Seleccione Vivero',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
              auto_focus: true,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: 'fecha_cambio',
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
              label: 'Fecha de cambio',
              disabled: current_stage_change.id_cambio_de_etapa !== null,
              helper_text: '',
              min_date,
              max_date,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
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
                current_stage_change.id_cambio_de_etapa !== null
                  ? current_stage_change.ruta_archivo_soporte ?? null
                  : null,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: 'cantidad_disponible_al_crear',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Cantidad requerida' },
              },
              label: 'Cantidad disponible',
              type: 'number',
              disabled: true,
              helper_text: '',
              hidden_text: current_vegetal_material.cod_etapa_lote === 'G',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: 'cantidad_movida',
              default_value: '',
              rules:
                current_vegetal_material.cod_etapa_lote !== 'G'
                  ? {
                      required_rule: {
                        rule: true,
                        message: 'Cantidad requerida',
                      },
                      min_rule: {
                        rule: 0.01,
                        message: 'La cantidad debe ser mayor a 0',
                      },
                      max_rule: {
                        rule: current_vegetal_material.cantidad_disponible ?? 0,
                        message: `La cantidad debe ser maximo ${
                          current_vegetal_material.cantidad_disponible ?? 0
                        }`,
                      },
                    }
                  : {
                      required_rule: {
                        rule: true,
                        message: 'Cantidad requerida',
                      },
                      min_rule: {
                        rule: 0.01,
                        message: 'La cantidad debe ser mayor a 0',
                      },
                    },
              label:
                current_vegetal_material.cod_etapa_lote === 'G'
                  ? 'Cantidad movida a producción'
                  : 'Cantidad movida a distribución',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: 'altura_lote_en_cms',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerida' },
                min_rule: {
                  rule: 0.01,
                  message: 'La altura debe ser mayor que 0 cms',
                },
              },
              label: 'Altura promedio (cm)',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_cambio,
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
          modal_select_model_title="Buscar cambios de etapa"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: 'codigo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerida' },
              },
              label: 'Codigo de material vegetal',
              type: 'string',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_cambio,
              control_name: 'nombre',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerida' },
              },
              label: 'Nombre de material vegetal',
              type: 'string',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: 'cod_etapa_lote_origen',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'requerido' } },
              label: 'Etapa de lote',
              helper_text: 'debe seleccionar campo',
              select_options: [
                { label: 'Germinación', value: 'G' },
                { label: 'Producción', value: 'P' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: 'agno_lote',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Cantidad requerida' },
              },
              label: 'Año de lote',
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
export default SeleccionarCambio;
