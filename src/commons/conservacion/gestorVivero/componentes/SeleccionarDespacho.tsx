import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { useForm } from 'react-hook-form';
import { Chip, Grid } from '@mui/material';
import { type ToastContent, toast } from 'react-toastify';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IDespacho } from "../interfaces/vivero";
import type { AuthSlice } from '../../../../commons/auth/interfaces';
import { useSelector } from 'react-redux';
import { set_current_despacho } from '../store/slice/viveroSlice';

const initial_state_despacho: IDespacho = {
  numero_despacho_consumo: null,
  fecha_ingreso: "",
  observacion_distribucion: "",
  persona_distribuye: "",
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarDespacho = () => {

  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_despacho, reset: reset_despacho} = useForm<IDespacho>();
  const [despachos, set_despachos] = useState<IDespacho[]>([]);

  const columns_despachos: GridColDef[] = [
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const control_success = (message: ToastContent) =>
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  useEffect(() => {
    reset_despacho({...initial_state_despacho, persona_distribuye: userinfo.nombre, id_persona_distribuye: userinfo.id_persona})
  }, []);

  

  const get_despachos: any = (async () => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-list/`
      );
      if ("data" in data) {
        if (data.data.length > 0) {
          set_despachos(data.data)
          control_success("Se encontraron despachos")
        } else {
          control_error("No se encontraron despachos")
          set_despachos([])
        }
      }
    } catch (err) {
      console.log(err);
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
          set_current_model={set_current_despacho}
          row_id={"id_despacho_entrante"}
          columns_model={columns_despachos}
          models={despachos}
          get_filters_models={get_despachos}
          set_models={set_despachos}
          reset_values={reset_despacho}
          button_submit_label='Buscar despacho'
          form_inputs={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 6,
              control_form: control_despacho,
              control_name: "numero_despacho_consumo",
              default_value: "",
              rules: {},
              label: "Numero despacho",
              type: "number",
              disabled: true,
              helper_text: "",
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 6,
              control_form: control_despacho,
              control_name: "fecha_ingreso",
              default_value: "",
              rules: {},
              label: "Fecha de ingreso",
              type: "text",
              disabled: true,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 12,
              control_form: control_despacho,
              control_name: "observacion_distribucion",
              default_value: "",
              rules: {},
              label: "Observacion de distribucion",
              type: "text",
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: ""
            },
            {
              datum_type: "input_controller",
              xs: 12,
              md: 6,
              control_form: control_despacho,
              control_name: "persona_distribuye",
              default_value: "",
              rules: {},
              label: "Distribución realizada por:",
              type: "text",
              disabled: true,
              helper_text: ""
            },
          ]}
          modal_select_model_title='Buscar despacho'
          modal_form_filters={[
            {
              datum_type: "input_controller",
              xs: 12,
              md: 2,
              control_form: control_despacho,
              control_name: "numero_despacho_consumo",
              default_value: "",
              rules: {},
              label: "Numero despacho",
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
export default SeleccionarDespacho;