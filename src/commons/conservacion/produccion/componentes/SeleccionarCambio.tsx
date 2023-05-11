import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_stage_change, set_stage_changes } from '../store/slice/produccionSlice';
import { get_nurseries_service, get_stage_changes_service } from '../store/thunks/produccionThunks';


interface IProps {
  control_cambio: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarCambio = ({
  control_cambio,
  get_values
}: IProps) => {

  const dispatch = useAppDispatch()
  const { current_stage_change, stage_changes, nurseries, current_vegetal_material, current_nursery } = useAppSelector((state) => state.produccion);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>("");

  const columns_cambios: GridColDef[] = [
    { field: 'id_despacho_entrante', headerName: 'ID', width: 20 },
    {
      field: 'numero_despacho_consumo',
      headerName: '# despacho',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_ingreso',
      headerName: 'Fecha ingreso',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'distribucion_confirmada',
      headerName: '¿Despacho distribuido?',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.activo ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />

        );
      },
    },
    {
      field: 'observacion_distribucion',
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
        set_file_name(file.name)
        dispatch(set_current_stage_change({ ...current_stage_change, id_vivero: get_values("id_vivero"), id_bien: get_values("id_bien"), fecha_cambio: get_values("fecha_cambio"), cantidad_movida: get_values("cantidad_movida"), altura_lote_en_cms: get_values("altura_lote_en_cms"), observaciones: get_values("observaciones"), ruta_archivo_soporte: file }))

      }
    }
  }, [file]);

  const get_cambios: any = (async () => {
    const code_bien = get_values("codigo_bien")
    const nombre_bien = get_values("nombre_bien")
    const cod_etapa_lote_origen = get_values("cod_etapa_lote_origen")
    const agno_lote = get_values("agno_lote")
    if (current_nursery.id_vivero !== null) {
      void dispatch(get_stage_changes_service(current_nursery.id_vivero, code_bien, nombre_bien, cod_etapa_lote_origen, agno_lote));
    }
  })

  return (
    <>
      <Grid
        container
        direction="row"
        padding={2}
        borderRadius={2}
      >
        
        <BuscarModelo
          set_current_model={set_current_stage_change}
          row_id={"id_cambio_de_etapa"}
          columns_model={columns_cambios}
          models={stage_changes}
          get_filters_models={get_cambios}
          set_models={set_stage_changes}
          button_submit_label='Buscar cambios de etapa'
          form_inputs={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "id_vivero",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Vivero requerido" } },
              label: "Vivero",
              disabled: false,
              helper_text: "Seleccione Vivero",
              select_options: nurseries,
              option_label: "nombre",
              option_key: "id_vivero",
            },
            {
              datum_type: "date_picker_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "fecha_cambio",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Fecha de cambio",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_file_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "ruta_archivo_soporte",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Archivo requerido" } },
              label: "Archivo soporte",
              disabled: false,
              helper_text: "",
              set_value: set_file,
              file_name: file_name,
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "cantidad_disponible_al_crear",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerida" } },
              label: "Cantidad disponible",
              type: "number",
              disabled: true,
              helper_text: "",
              hidden_text: current_vegetal_material.cod_etapa_lote === "G"
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "cantidad_movida",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: current_vegetal_material.cod_etapa_lote === "G" ? "Cantidad movida a producción" : "Cantidad movida a distribución",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 4,
              control_form: control_cambio,
              control_name: "altura_lote_en_cms",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Altura promedio",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_cambio,
              control_name: "observaciones",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Observación requerida" } },
              label: "Observacion",
              type: "text",
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: ""
            },
          ]}
          modal_select_model_title='Buscar cambios de etapa'
          modal_form_filters={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: "codigo_bien",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Codigo de material vegetal",
              type: "string",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cambio,
              control_name: "nombre_bien",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Nombre de material vegetal",
              type: "string",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: "cod_etapa_lote_origen",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Etapa de lote",
              helper_text: "debe seleccionar campo",
              select_options: [{ label: "Germinación", value: "G" }, { label: "Producción", value: "P" }],
              option_label: "label",
              option_key: "value",
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_cambio,
              control_name: "agno_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Año de lote",
              type: "number",
              disabled: true,
              helper_text: ""
            },
          ]}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarCambio;