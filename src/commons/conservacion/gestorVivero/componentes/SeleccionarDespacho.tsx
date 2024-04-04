import { useState } from 'react';
import { api } from '../../../../api/axios';
import { Chip, Grid } from '@mui/material';
import { type ToastContent, toast } from 'react-toastify';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';

import { useAppDispatch } from '../../../../hooks';
import { format } from 'date-fns';
import {
  initial_state_despacho,
  set_current_despacho,
} from '../store/slice/viveroSlice';
import { type IDespacho } from '../interfaces/vivero';

interface IProps {
  control_despacho: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarDespacho = ({
  control_despacho,
  get_values,
  open_modal,
  set_open_modal,
}: IProps) => {
  const dispatch = useAppDispatch();

  const [despachos, set_despachos] = useState<IDespacho[]>([]);

  const columns_despachos: GridColDef[] = [
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
          {format(new Date(params.value), 'dd-MM-yyyy')}
        </div>
      ),
    },
    {
      field: 'distribucion_confirmada',
      headerName: '¿Despacho distribuido?',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.distribucion_confirmada ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'fecha_confirmacion_distribucion',
      headerName: 'Fecha distribución',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === null ? '-' : format(new Date(params.value), 'dd-MM-yyyy')}
        </div>
      ),
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
  const control_error = (
    message: ToastContent = 'Algo pasó, intente de nuevo'
  ) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
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
      theme: 'light',
    });

  const search_despacho: any = async () => {
    const numero: string = get_values('numero_despacho_consumo') ?? '';
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-list/?numero_despacho=${numero ?? ''}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        if (data.data.length > 0) {
          dispatch(set_current_despacho(data.data[0]));
          control_success('Se seleccionó el despacho ');
        } else {
          dispatch(set_current_despacho(initial_state_despacho));
          control_error(data.detail);
        }
      } else {
        control_error(data.detail);
      }
    } catch (err) {
      //  console.log('')(err);
    }
  };

  const get_despachos: any = async () => {
    try {
      const despacho: string = get_values('numero_despacho_consumo');
      const { data } = await api.get(
        `conservacion/despachos/get-list/?numero_despacho=${despacho ?? ''}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        if (data.data.length > 0) {
          set_despachos(data.data);
          control_success('Se encontraron despachos');
        } else {
          control_error('No se encontraron despachos');
          set_despachos([]);
        }
      }
    } catch (err) {
      //  console.log('')(err);
    }
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_despacho}
          row_id={'id_despacho_entrante'}
          columns_model={columns_despachos}
          models={despachos}
          get_filters_models={get_despachos}
          set_models={set_despachos}
          button_submit_label="Buscar despacho"
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'numero_despacho_consumo',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar despacho',
                },
              },
              label: 'Número de despacho',
              type: 'number',
              disabled: false,
              helper_text: '',
              on_blur_function: search_despacho,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'fecha_ingreso',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha ingreso de despacho',
              disabled: true,
              helper_text: '',
              min_date: null,
              max_date: null,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_despacho,
              control_name: 'persona_distribuye',
              default_value: '',
              rules: {},
              label: 'Distribución realizada por:',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_despacho,
              control_name: 'observacion_distribucion',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observación de distribución',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar despacho"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_despacho,
              control_name: 'numero_despacho_consumo',
              default_value: '',
              rules: {},
              label: 'Número despacho',
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
export default SeleccionarDespacho;
