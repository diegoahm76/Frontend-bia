import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_vegetal_material,  set_vegetal_materials } from '../store/slice/produccionSlice';
import { get_vegetal_materials_service } from '../store/thunks/produccionThunks';


interface IProps {
  control_material_vegetal: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarMaterialVegetal = ({
  control_material_vegetal,
  get_values
}: IProps) => {

  const dispatch= useAppDispatch()
  const { vegetal_materials, current_nursery} = useAppSelector((state) => state.produccion);


  const columns_material_vegetal: GridColDef[] = [
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

 

  const get_vegetal_materials: any = (async () => {
    const code_bien = get_values("codigo_bien")
    const nombre_bien = get_values("nombre")
    const cod_etapa_lote_origen = get_values("cod_etapa_lote")
    const agno_lote = get_values("agno_lote")
    if (current_nursery.id_vivero !== null) {
    void dispatch(get_vegetal_materials_service(current_nursery.id_vivero, code_bien, nombre_bien, cod_etapa_lote_origen, agno_lote ));
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
          set_current_model={set_current_vegetal_material}
          row_id={"id_inventario_vivero"}
          columns_model={columns_material_vegetal}
          models={vegetal_materials}
          get_filters_models={get_vegetal_materials}
          set_models={set_vegetal_materials}
          button_submit_label='Buscar material vegetal'
          form_inputs={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_material_vegetal,
              control_name: "codigo_bien",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Codigo material vegetal",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_material_vegetal,
              control_name: "nombre",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Nombre material vegetal",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "nro_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Numero lote",
              type: "number",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "agno_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Año lote",
              type: "number",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "cod_etapa_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Etapa de lote",
              disabled: true,
              select_options: [{label: "Germinación", value: "G"}, {label: "Producción", value: "P"}],
              option_label: "label",
              option_key: "value",
          },
          ]}
          modal_select_model_title='Buscar material vegetal'
          modal_form_filters={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "codigo_bien",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Codigo material vegetal",
              type: "text",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_material_vegetal,
              control_name: "nombre",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Nombre material vegetal",
              type: "text",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "agno_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Cantidad requerida" } },
              label: "Año lote",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 2,
              control_form: control_material_vegetal,
              control_name: "cod_etapa_lote",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Etapa de lote",
              disabled: false,
              select_options: [{label: "Germinación", value: "G"}, {label: "Producción", value: "P"}],
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
export default SeleccionarMaterialVegetal;