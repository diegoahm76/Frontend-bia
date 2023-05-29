/* eslint-disable object-shorthand */
import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_plant_quarantine, set_plant_quarantines } from '../store/slice/materialvegetalSlice';
import { get_nurseries_quarantine_service, get_plant_quarantines_service } from '../store/thunks/materialvegetalThunks';


interface IProps {
  control_cuarentena: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarIngresoCuarentena = ({
  control_cuarentena,
  get_values
}: IProps) => {

  const dispatch = useAppDispatch()
  const { nurseries, current_plant_quarantine, plant_quarantines } = useAppSelector((state) => state.material_vegetal);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>("");


  const columns_cuarentena: GridColDef[] = [
    { field: 'id_cuarentena_mat_vegetal', headerName: 'ID', width: 20 },
    {
      field: 'consec_cueren_por_lote_etapa',
      headerName: 'Consecutivo',
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
          {(nurseries.find((p) => p.id_vivero === params.value))?.nombre ?? ""}
        </div>
      ),
    },
    {
      field: 'cantidad_cuarentena',
      headerName: 'Cantidad cuarentena',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_levantada',
      headerName: 'Cantidad levantada',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_bajas',
      headerName: 'Cantidad bajas',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_cuarentena',
      headerName: 'Fecha de cuarentena',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'cuarentena_abierta',
      headerName: 'Estado de cuarentena',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cuarentena_abierta ? (
          <Chip size="small" label="ABIERTA" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="CERRADA" color="error" variant="outlined" />

        );
      },
    },
    {
      field: 'cuarentena_anulada',
      headerName: '¿Anulada?',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cuarentena_anulada ? (
          <Chip size="small" label="SI" color="error" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="success" variant="outlined" />

        );
      },
    },
    {
      field: 'descrip_corta_diferenciable',
      headerName: 'Descripción',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

  ];

  useEffect(() => {
    void dispatch(get_nurseries_quarantine_service());
  }, []);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name)
        dispatch(set_current_plant_quarantine({
          ...set_current_plant_quarantine, 
          id_vivero: get_values("id_vivero"), 
          id_bien: get_values("id_bien"), 
          cantidad_cuarentena: get_values("cantidad_cuarentena"), 
          descrip_corta_diferenciable: get_values("descrip_corta_diferenciable"), 
          motivo: get_values("motivo")
        }))
      }
    }
  }, [file]);

  useEffect(() => {
    if (current_plant_quarantine.ruta_archivo_soporte !== null) {
      set_file_name(current_plant_quarantine.ruta_archivo_soporte)
    }
  }, [current_plant_quarantine]);

  const get_ingresos_cuarentena: any = (async () => {
    const code= get_values("codigo_bien") ?? ""
    const name= get_values("nombre_bien") ?? ""
    const agno_lote= get_values("agno_lote") ?? ""
    const cod_etapa= get_values("cod_etapa_lote") ?? ""
    void dispatch(get_plant_quarantines_service(code, name, agno_lote, cod_etapa));
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
          set_current_model={current_plant_quarantine}
          row_id={"id_cuarentena_mat_vegetal"}
          columns_model={columns_cuarentena}
          models={plant_quarantines}
          get_filters_models={get_ingresos_cuarentena}
          set_models={set_plant_quarantines}
          button_submit_label='Buscar ingresos a cuarentena'
          form_inputs={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 4,
              control_form: control_cuarentena,
              control_name: "id_vivero",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Vivero requerido" } },
              label: "Vivero",
              disabled: current_plant_quarantine.id_cuarentena_mat_vegetal !== null,
              helper_text: "Seleccione Vivero",
              select_options: nurseries,
              option_label: "nombre",
              option_key: "id_vivero",
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_cuarentena,
              control_name: "consec_cueren_por_lote_etapa",
              default_value: "",
              rules: { required_rule: { rule: true, message: "consecutivo rquerido" } },
              label: "Consecutivo cuarentena",
              type: "number",
              disabled: true,
              helper_text: "",
              hidden_text: current_plant_quarantine.id_cuarentena_mat_vegetal === null
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: current_plant_quarantine.id_cuarentena_mat_vegetal !== null?3:4,
              control_form: control_cuarentena,
              control_name: "fecha_cuarentena",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Fecha de cuarentena",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_file_controller",
              xs: 12,
              md: current_plant_quarantine.id_cuarentena_mat_vegetal !== null?3:4,
              control_form: control_cuarentena,
              control_name: "ruta_archivo_soporte",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Archivo requerido" } },
              label: "Archivo soporte",
              disabled: false,
              helper_text: "",
              set_value: set_file,
              file_name,
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: current_plant_quarantine.id_cuarentena_mat_vegetal === null ? 3:6,
              control_form: control_cuarentena,
              control_name: "cantidad_cuarentena",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerido" }, min_rule: {rule: 0.01, message: "La cantidad debe ser mayor a 0"}, max_rule: {rule: current_plant_quarantine.cantidad_disponible, message: "La cantidad debe ser maximo "+String(current_plant_quarantine.cantidad_disponible) }  },
              label: "Cantidad a cuarentena",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: current_plant_quarantine.id_cuarentena_mat_vegetal === null ? 3:6,
              control_form: control_cuarentena,
              control_name: "cantidad_disponible",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerido" } },
              label: "Cantidad disponible",
              type: "number",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "cantidad_levantada",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerido" }},
              label: "Cantidad levantada",
              type: "number",
              disabled: true,
              helper_text: "",
              hidden_text: current_plant_quarantine.id_cuarentena_mat_vegetal !== null
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "cantidad_bajas",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerido" } },
              label: "Cantidad bajas",
              type: "number",
              disabled: true,
              helper_text: "",
              hidden_text: current_plant_quarantine.id_cuarentena_mat_vegetal !== null
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_cuarentena,
              control_name: "descrip_corta_diferenciable",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Observación requerida" } },
              label: "Descripción",
              type: "text",
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_cuarentena,
              control_name: "motivo",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Observación requerida" } },
              label: "Motivo",
              type: "text",
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_cuarentena,
              control_name: "persona_cuarentena",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Cantidad requerido" } },
              label: "Cuarentena realizada por:",
              type: "text",
              disabled: true,
              helper_text: "",
            },
          ]}
          modal_select_model_title='Seleccionar ingresso a cuarentena'
          modal_form_filters={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "codigo_bien",
              default_value: "",
              rules: {},
              label: "Codigo bien",
              type: "text",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "nombre_bien",
              default_value: "",
              rules: {},
              label: "Nombre bien",
              type: "text",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "agno_lote",
              default_value: "",
              rules: {},
              label: "Año bien",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_cuarentena,
              control_name: "cod_etapa_lote",
              default_value: "",
              rules: {},
              label: "Etapa de lote",
              helper_text: "debe seleccionar campo",
              select_options: [{ label: "Germinación", value: "G" }, { label: "Producción", value: "P" }, { label: "Distribución", value: "D" }],
              option_label: "label",
              option_key: "value",
            },
           
          ]}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarIngresoCuarentena;