import { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { set_current_transfer, set_transfers_nurseries } from '../store/slice/distribucionSlice';
import { get_current_trasnfer_service, get_nurseries_service, get_person_id_service, get_transfers_service } from '../store/thunks/distribucionThunks';
import { type IObjNursery } from '../interfaces/distribucion';
import { FamilyRestroomOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';

interface IProps {
  control_traslado: any;
  get_values: any;
  origin_nursery_list: IObjNursery[],
  destination_nursery_list: IObjNursery[],
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSiembra = ({
  control_traslado,
  get_values,
  origin_nursery_list,
  destination_nursery_list
}: IProps) => {

  const dispatch= useAppDispatch()
  const {  current_transfer, transfers_nurseries, nurseries} = useAppSelector((state) => state.distribucion);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>("");


  const columns_siembras: GridColDef[] = [
    { field: 'id_traslado', headerName: 'ID', width: 20 },
    {
      field: 'nro_traslado',
      headerName: '# traslado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_vivero_origen',
      headerName: 'Vivero origen',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {(nurseries.find((p) => p.id_vivero === params.value ))?.nombre??""}
        </div>
      ),
    },
    {
      field: 'id_vivero_destino',
      headerName: 'Vivero destino',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {(nurseries.find((p) => p.id_vivero === params.value ))?.nombre??""}
        </div>
      ),
    },
    {
      field: 'fecha_traslado',
      headerName: 'Fecha de traslado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'traslado_anulado',
      headerName: 'Estado de traslado',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.siembra_abierta ? (
          <Chip size="small" label="ANULADO" color="error" variant="outlined" />
        ) : (
          <Chip size="small" label="ACTIVO" color="success" variant="outlined" />
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
    void dispatch(get_person_id_service(userinfo.id_persona))
  }, []);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name)
        dispatch(set_current_transfer({ ...current_transfer,
           persona_traslada: get_values("persona_traslada"), 
           id_vivero_destino: get_values("id_vivero_destino"),
           id_vivero_origen: get_values("id_vivero_origen"), 
           observaciones: get_values("observaciones"), 
           ruta_archivo_soporte: file }))
      }
    }
  }, [file]);

  useEffect(() => {
    if(current_transfer.id_traslado !== null){  
      set_file_name(current_transfer.ruta_archivo_soporte)
    }
  }, [current_transfer]);

  const get_traslados: any = (async () => {
    const vivero_origen = get_values("id_vivero_origen") ?? ""
    const vivero_destino = get_values("id_vivero_destino") ?? ""
    const fecha_desde = get_values("fecha_desde") ?? ""
    const fecha_hasta = get_values("fecha_hasta") ?? ""
    void dispatch(get_transfers_service(vivero_origen, fecha_desde, fecha_hasta, vivero_destino));
  })

  const search_traslado: any = (async () => {
    const nro_traslado = get_values("nro_traslado") ?? ""
    void dispatch(get_current_trasnfer_service(nro_traslado));
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
          set_current_model={set_current_transfer}
          row_id={"id_traslado"}
          columns_model={columns_siembras}
          models={transfers_nurseries}
          get_filters_models={get_traslados}
          set_models={set_transfers_nurseries}
          button_submit_label='Buscar traslado'
          form_inputs={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 6,
              control_form: control_traslado,
              control_name: "id_vivero_origen",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Vivero origen requerido" } },
              label: "Vivero origen",
              disabled: current_transfer.id_traslado !== null,
              helper_text: "Seleccione vivero origen",
              select_options: origin_nursery_list,
              option_label: "nombre",
              option_key: "id_vivero",
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 6,
              control_form: control_traslado,
              control_name: "id_vivero_destino",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Vivero destino requerido" } },
              label: "Vivero destino",
              disabled: current_transfer.id_traslado !== null,
              helper_text: "Seleccione vivero destino",
              select_options: destination_nursery_list,
              option_label: "nombre",
              option_key: "id_vivero",
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: "nro_traslado",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerida" }  },
              label: "# de traslado",
              type: "number",
              disabled: current_transfer.id_traslado !== null,
              helper_text: current_transfer.nro_traslado === null?"Ingrese para buscar traslado":"",
              on_blur_function: search_traslado
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: "persona_traslada",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Persona que traslada",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_file_controller",
              xs: 12,
              md: 3,
              control_form: control_traslado,
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
              md: 3,
              control_form: control_traslado,
              control_name: "fecha_traslado",
              default_value: "",
              rules: { required_rule: { rule: false, message: "requerido" } },
              label: "Fecha de traslado",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_traslado,
              control_name: "observaciones",
              default_value: "",
              rules: { required_rule: { rule: true, message: "Observación requerida" } },
              label: "Observacion",
              type: "text",
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: ""
            }
          ]}
          modal_select_model_title='Seleccionar siembra'
          modal_form_filters={[
            {
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: "id_vivero_origen",
              default_value: "",
              rules: { required_rule: { rule: false, message: "Vivero origen requerido" } },
              label: "Vivero origen",
              disabled: current_transfer.id_traslado !== null,
              helper_text: "Seleccione vivero origen",
              select_options: origin_nursery_list,
              option_label: "nombre",
              option_key: "id_vivero",
            },
            {
              datum_type: "select_controller",
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: "id_vivero_destino",
              default_value: "",
              rules: { required_rule: { rule: FamilyRestroomOutlined, message: "Vivero destino requerido" } },
              label: "Vivero destino",
              disabled: current_transfer.id_traslado !== null,
              helper_text: "Seleccione vivero destino",
              select_options: destination_nursery_list,
              option_label: "nombre",
              option_key: "id_vivero",
            },
          ]}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSiembra;