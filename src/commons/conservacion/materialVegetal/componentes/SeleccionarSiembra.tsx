import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_planting,  set_plantings } from '../store/slice/materialvegetalSlice';
import { get_nurseries_service, get_plantings_service,  get_vegetal_materials_service } from '../store/thunks/materialvegetalThunks';


interface IProps {
  control_siembra: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSiembra = ({
  control_siembra,
  get_values
}: IProps) => {

  const dispatch= useAppDispatch()
  const {  current_planting, plantings, nurseries, vegetal_materials, current_nursery, germination_beds} = useAppSelector((state) => state.material_vegetal);
  const [file, set_file] = useState<any>(null);

  const columns_siembras: GridColDef[] = [
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
    void dispatch(get_vegetal_materials_service());
  }, []);

  useEffect(() => {console.log(file)
    dispatch(set_current_planting({ ...current_planting, id_vivero: get_values("id_vivero"), id_bien_sembrado: get_values("id_bien_sembrado"), cama_germinacion: get_values("cama_germinacion"), distancia_entre_semillas: get_values("distancia_entre_semillas"), observaciones: get_values("observaciones"), ruta_archivo_soporte: file }))
  }, [file]);

  const get_siembras: any = (async () => {
    void dispatch(get_plantings_service());
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
          set_current_model={set_current_planting}
          row_id={"id_siembra"}
          columns_model={columns_siembras}
          models={plantings}
          get_filters_models={get_siembras}
          set_models={set_plantings}
          button_submit_label='Buscar siembra'
          form_inputs={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_siembra,
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
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_siembra,
              control_name: "id_bien_sembrado",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Material vegetal requerido" } },
              label: "Material vegetal",
              disabled: false,
              helper_text: "debe seleccionar campo",
              select_options: vegetal_materials,
              option_label: "nombre",
              option_key: "id_bien",
            },
            // {
            //   datum_type: "select_controller",
            //   xs: 12,
            //   md: 6,
            //   control_form: control_siembra,
            //   control_name: "cama_germinacion",
            //   default_value: "",
            //   rules: { required_rule: { rule: true, message: "requerido" } },
            //   label: "Cama de germinación",
            //   disabled: current_nursery.id_vivero === null,
            //   helper_text: "debe seleccionar campo",
            //   select_options: germination_beds,
            //   option_label: "nombre",
            //   option_key: "id_cama_germinacion_vivero",
            //   multiple: true
            // },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 6,
              control_form: control_siembra,
              control_name: "distancia_entre_semillas",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Distancia requerida" } },
              label: "Distancia entre semillas (cms)",
              type: "number",
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 6,
              control_form: control_siembra,
              control_name: "ruta_archivo_soporte",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Archivo requerido" } },
              label: "Archivo soporte",
              type: "file",
              disabled: false,
              helper_text: "",
              set_value: set_file
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_siembra,
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
            {
              datum_type: "input_controller",
              xs: 12,
              md: 4,
              control_form: control_siembra,
              control_name: "nro_lote",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "# lote",
              type: "number",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 5,
              control_form: control_siembra,
              control_name: "fecha_siembra",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Fecha de siembra",
              type: "text",
              disabled: true,
              helper_text: ""
            },
          ]}
          modal_select_model_title='Buscar siembra'
          modal_form_filters={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_siembra,
              control_name: "id_siembra",
              default_value: "",
              rules: {},
              label: "Id siembra",
              type: "number",
              disabled: false,
              helper_text: "",
            }
          ]}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSiembra;