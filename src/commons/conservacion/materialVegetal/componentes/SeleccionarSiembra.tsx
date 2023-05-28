/* eslint-disable object-shorthand */
import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_planting, set_plantings } from '../store/slice/materialvegetalSlice';
import { get_nurseries_service, get_plantings_service, get_vegetal_materials_service } from '../store/thunks/materialvegetalThunks';


interface IProps {
  control_siembra: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSiembra = ({
  control_siembra,
  get_values
}: IProps) => {

  const dispatch = useAppDispatch()
  const { current_planting, plantings, nurseries, germination_beds, vegetal_materials, current_nursery } = useAppSelector((state) => state.material_vegetal);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>("");


  const columns_siembras: GridColDef[] = [
    { field: 'id_siembra', headerName: 'ID', width: 20 },
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
      field: 'fecha_siembra',
      headerName: 'Fecha de siembra',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'siembra_abierta',
      headerName: 'Estado de siembra',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.siembra_abierta ? (
          <Chip size="small" label="ABIERTA" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="CERRADA" color="error" variant="outlined" />

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
    void dispatch(get_vegetal_materials_service());
    void dispatch(get_plantings_service());
  }, []);

  useEffect(() => {
    console.log(file)
  }, [file]);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name)
        dispatch(set_current_planting({ ...current_planting, id_vivero: get_values("id_vivero"), id_bien_sembrado: get_values("id_bien_sembrado"), cama_germinacion: get_values("cama_germinacion"), distancia_entre_semillas: get_values("distancia_entre_semillas"), observaciones: get_values("observaciones"), ruta_archivo_soporte: file }))
      }
    }
  }, [file]);

  useEffect(() => {
    if (current_planting.ruta_archivo_soporte !== null) {
      set_file_name(current_planting.ruta_archivo_soporte)

    }
  }, [current_planting]);

  const get_siembras: any = (async () => {
    void dispatch(get_plantings_service());
    console.log(get_siembras)
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
              disabled: current_planting.id_siembra !== null,
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
              disabled: current_planting.id_siembra !== null,
              helper_text: "debe seleccionar campo",
              select_options: vegetal_materials,
              option_label: "nombre",
              option_key: "id_bien",
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 6,
              control_form: control_siembra,
              control_name: "cama_germinacion",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Cama de germinación",
              disabled: current_nursery.id_vivero === null,
              helper_text: "debe seleccionar campo",
              select_options: germination_beds,
              option_label: "nombre",
              option_key: "id_cama_germinacion_vivero",
              multiple: true
            },
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
              datum_type: "input_file_controller",
              xs: 12,
              md: 6,
              control_form: control_siembra,
              control_name: "ruta_archivo_soporte",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Archivo requerido" } },
              label: "Archivo soporte",
              disabled: current_planting.id_siembra !== null,
              helper_text: "",
              set_value: set_file,
              file_name: file_name,
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
          modal_select_model_title='Seleccionar siembra'
          modal_form_filters={[]}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSiembra;