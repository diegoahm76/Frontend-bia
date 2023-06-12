import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { Chip, Grid } from '@mui/material';
import { type ToastContent, toast } from 'react-toastify';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import {  useAppDispatch, useAppSelector } from '../../../../hooks';
import { set_genera_bajas, set_current_genera_baja,set_bienes_bajas,set_current_bien_baja, set_viveristas, set_current_viverista, set_historicos_viveristas, set_current_historico_viverista, set_nuevos_viveristas, set_current_nuevo_viverista} from '../store/slice/viveroSlice';
import { IObjBienBaja, type IDespacho, IObjGenerarBaja, IObjNursery } from "../interfaces/vivero";
import { get_bajas_nro_service, get_bajas_service, get_nurseries_baja_service } from '../store/thunks/gestorViveroThunks';


interface IProps {
  control_genera_bajas: any;
  get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBajasHerramientas = ({
  control_genera_bajas,
  get_values
}: IProps) => {

  // const [action, set_action] = useState<string>("agregar");

  const { genera_bajas, nurseries,  current_genera_baja, persona } = useAppSelector((state) => state.nursery);
  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>("");

  const columns_baja: GridColDef[] = [
      { field: 'id_baja', headerName: 'ID', width: 20 },
      {
          field: 'nro_baja_por_tipo',
          headerName: '# baja',
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
              {(nurseries.find((p: IObjNursery) => p.id_vivero === params.value))?.nombre ?? ""}
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
      void dispatch(get_nurseries_baja_service());
    }, []);

  useEffect(() => {
    console.log(file)
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name)
        dispatch(set_current_genera_baja({
          ...current_genera_baja, 
          id_vivero: get_values("id_vivero"), 
          fecha_baja: get_values("fecha_baja"), 
          motivo: get_values("motivo"),
          id_persona_baja: persona.id_persona,
          nombre_persona_baja: persona.nombre_completo,
          ruta_archivo_soporte: file
        }))
      }
    }
  }, [file]);

  useEffect(() => {
    if(current_genera_baja.id_baja !== null){
      if (current_genera_baja.ruta_archivo_soporte !== null) {
        set_file_name(current_genera_baja.ruta_archivo_soporte)
      }
    }
  }, [current_genera_baja]);

  const get_bajas: any = (async () => {
      const nro = get_values("nro_baja_por_tipo");
      void dispatch(get_bajas_service(nro));
  })   

  const search_baja: any = (async () => {
    const nro = get_values("nro_baja_por_tipo");
    void dispatch(get_bajas_nro_service(nro));
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
                  set_current_model={set_current_genera_baja}
                  row_id={"id_baja"}
                  columns_model={columns_baja}
                  models={genera_bajas}
                  get_filters_models={get_bajas}
                  set_models={set_genera_bajas}
                  button_submit_label='Buscar bajas'
                  form_inputs={[
                      {
                      datum_type: "select_controller",
                      xs: 12,
                      md: 5,
                      control_form: control_genera_bajas,
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
                          datum_type: "input_controller",
                          xs: 12,
                          md: 2,
                          control_form: control_genera_bajas,
                          control_name: "nro_baja_por_tipo",
                          default_value: "",
                          rules: { required_rule: { rule: true, message: "Numero de baja requerido" } },
                          label: "Nuero baja",
                          type: "number",
                          disabled: false,
                          helper_text: "",
                          on_blur_function: search_baja
                      },
                     
                    {
                      datum_type: "input_file_controller",
                      xs: 12,
                      md: 5,
                      control_form: control_genera_bajas,
                      control_name: "ruta_archivo_soporte",
                      default_value: "",
                      rules: { required_rule: { rule: false, message: "Archivo requerido" } },
                      label: "Archivo soporte",
                      disabled: false,
                      helper_text: "",
                      set_value: set_file,
                      file_name: file_name,
                    },               
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 12,
                        control_form: control_genera_bajas,
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
                      md: 5,
                      control_form: control_genera_bajas,
                      control_name: "nombre_persona_baja",
                      default_value: "",
                      rules: { required_rule: { rule: true, message: "Debe seleccionar la personas que la creó" } },
                      label: "Baja realizada por",
                      type: "text",
                      disabled: true,
                      helper_text: ""
                  },
                  {
                    datum_type: "input_controller",
                    xs: 12,
                    md: 4,
                    control_form: control_genera_bajas,
                    control_name: "fecha_baja",
                    default_value: "",
                    rules: { required_rule: { rule: true, message: "Debe seleccionar fecha" } },
                    label: "Fecha de preparación",
                    type: "text",
                    disabled: true,
                    helper_text: ""
                },
                  ]}
                  modal_select_model_title='Buscar preparación'
                  modal_form_filters={[
                    {
                      datum_type: "input_controller",
                      xs: 12,
                      md: 2,
                      control_form: control_genera_bajas,
                      control_name: "nro_baja_por_tipo",
                      default_value: "",
                      rules: { required_rule: { rule: true, message: "Numero de baja requerido" } },
                      label: "Nuero baja",
                      type: "number",
                      disabled: false,
                      helper_text: "",
                  },
                   ]}   
              />
          </Grid>
      </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBajasHerramientas;