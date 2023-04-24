import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjPlanting } from "../interfaces/materialvegetal";
import type { AuthSlice } from '../../../auth/interfaces';
import {  useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../../../hooks';


import { set_current_planting, initial_state_planting, get_plantings } from '../store/slice/materialvegetalSlice';
import { get_nurseries_service, get_plantings_service, get_germination_beds_service, get_vegetal_materials_service } from '../store/thunks/materialvegetalThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSiembra = () => {
  const dispatch= useAppDispatch()
  const { current_planting, plantings, nurseries, germination_beds, vegetal_materials} = useAppSelector((state) => state.material_vegetal);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_siembra, reset: reset_siembra, getValues: get_values, watch} = useForm<IObjPlanting>();
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
    reset_siembra({...initial_state_planting, id_persona_siembra: userinfo.id_persona})
    void dispatch(get_nurseries_service());
    void dispatch(get_vegetal_materials_service());
  }, []);

  useEffect(() => {
    if(current_planting.id_persona_siembra === null){
    reset_siembra({...current_planting, id_persona_siembra: userinfo.id_persona})
  } else {
    reset_siembra(current_planting)
  }
  }, [current_planting]);

  useEffect(() => {
    if(watch("id_vivero") !== null){
      void dispatch(get_germination_beds_service(Number(watch("id_vivero"))));
  }
  }, [watch("id_vivero")]);

  

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
          set_models={get_plantings}
          reset_values={reset_siembra}
          button_submit_label='Buscar siembra'
          form_inputs={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_siembra,
              control_name: "id_vivero",
              default_value: "",
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Vivero",
              disabled: false,
              helper_text: "debe seleccionar campo",
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
              rules: { required_rule: { rule: true, message: "requerido" } },
              label: "Material vegetal",
              disabled: false,
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
              disabled: get_values("id_vivero") === null,
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
              rules: {},
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
              rules: {},
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
              rules: {},
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
              rules: {},
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
              rules: {},
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