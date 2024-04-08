import { useContext, useEffect, useState } from 'react';

import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { v4 as uuid } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import {
  set_digitization_request,
  set_edit_digitization,
  set_request_status,
  set_request_type,
} from '../../store/slice/centralDigitalizacionSlice';
import {
  control_error,
  get_digitalization_responses_service,
  get_digitalization_responses_service_otros,
  get_digitalization_opas_responses_service
} from '../../store/thunks/centralDigitalizacionThunks';
import { OpcionOtrosContext } from '../../context/BusquedaOtrosDigitalizacion';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DigitalizacionesRespondidas = () => {
  const { opcion_otros } = useContext(OpcionOtrosContext);

  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_solicitud,
    reset,
    handleSubmit: handle_submit,
    getValues: get_values,

    
  } = useForm<any>();
  const { request_types, list_request_status, person, digitization_requests,digitization_request } =
    useAppSelector((state) => state.central_digitalizacion_slice);

  const on_change_select = (value: any, name: string): void => {
    if (name === 'pqr_status') {
      if (value !== undefined) {
        dispatch(set_request_type(value));
      } else {
        dispatch(set_request_type({ id: null, key: null, label: null }));
      }
    } else {
      if (value !== undefined) {
        dispatch(set_request_status(value));
      } else {
        dispatch(set_request_status({ id: null, key: null, label: null }));
      }
    }
  };
  const columns_list: GridColDef[] = [
    {
      field: 'nombre_tipo_solicitud',
      headerName: 'Tipo de solicitud',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_solicitud',
      headerName: 'Fecha de solicitud',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'numero_radicado',
      headerName: 'Número de radicado',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'asunto',
      headerName: 'asunto',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'titular',
      headerName: 'Titular',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_anexos',
      headerName: 'Número de anexos',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'estado_digitalizacion',
      headerName: 'Estado digitalización',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver">
            <IconButton
              onClick={() => {
                //  console.log('')(params);
                dispatch(set_edit_digitization(false));
                dispatch(set_digitization_request(params.row));
              }}
              href={`/#/app/gestor_documental/central_digitalizacion/anexos/${params.row.id_solicitud_de_digitalizacion}`}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <VisibilityIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const on_submit = (data: any): void => {
    const tipo_solicitud = get_values('tipo_solicitud') ?? '';
    let fecha_desde = '';
    let fecha_hasta = '';
    if (data.date_range !== null && data.date_range !== undefined) {
      if (
        data.date_range[0] !== null &&
        data.date_range[0] !== undefined &&
        data.date_range[1] !== null &&
        data.date_range[1] !== undefined
      ) {
        const fecha_start = new Date(data.date_range[0] ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
        const year_start = fecha_start.getFullYear(); // Obtén el año
        const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
        const day_start = fecha_start.getDate(); // Obtén el día
        const hours_start = fecha_start.getHours(); // Obtén las horas
        const minutes_start = fecha_start.getMinutes(); // Obtén los minutos
        const seconds_start = fecha_start.getSeconds(); // Obtén los segundos

        const fecha_end = new Date(data.date_range[1] ?? ''); // Obtén el valor de fecha_end del objeto enviado por el formulario
        const year_end = fecha_end.getFullYear(); // Obtén el año
        const month_end = fecha_end.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
        const day_end = fecha_end.getDate(); // Obtén el día
        const hours_end = fecha_end.getHours(); // Obtén las horas
        const minutes_end = fecha_end.getMinutes(); // Obtén los minutos
        const seconds_end = fecha_end.getSeconds(); // Obtén los segundos

        fecha_desde = `${year_start}-${month_start
          .toString()
          .padStart(2, '0')}-${day_start
            .toString()
            .padStart(2, '0')} ${hours_start
              .toString()
              .padStart(2, '0')}:${minutes_start
                .toString()
                .padStart(2, '0')}:${seconds_start.toString().padStart(2, '0')}`;
        fecha_hasta = `${year_end}-${month_end
          .toString()
          .padStart(2, '0')}-${day_end.toString().padStart(2, '0')} ${hours_end
            .toString()
            .padStart(2, '0')}:${minutes_end
              .toString()
              .padStart(2, '0')}:${seconds_end.toString().padStart(2, '0')}`;
      }
    }
    if (tipo_solicitud === '' && fecha_desde === '' && fecha_hasta === '') {
      control_error('Debe ingresa al menos una opción');
    } else {
      const params: {
        tipo_solicitud?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
      } = {};

      // Verificar y agregar propiedad al objeto solo si el valor no es una cadena vacía
      if (tipo_solicitud !== '') {
        params.tipo_solicitud = tipo_solicitud;
      }

      if (fecha_desde !== '') {
        params.fecha_desde = fecha_desde;
      }

      if (fecha_hasta !== '') {
        params.fecha_hasta = fecha_hasta;
      }

      if (tipo_solicitud === "OPAS") {
        void dispatch(get_digitalization_opas_responses_service(params));

      }else {

  
      if (tipo_solicitud === "OTROS") {
        void dispatch(get_digitalization_responses_service_otros(params));
        return
      }



      void dispatch(get_digitalization_responses_service(params));
      }

    }
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <PrimaryForm
          on_submit_form={null}
          button_submit_label=""
          button_submit_icon_class={null}
          show_button={false}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: 'tipo_solicitud',
              default_value: '',
              rules: {},
              label: 'Tipo de solicitud',
              disabled: false,
              helper_text: '',
              select_options: request_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'date_picker_range_controller',
              xs: 4,
              md: 4,
              control_form: control_solicitud,
              control_name: 'date_range',
              default_value: [null, null],
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Rango de fechas requerido',
                },
              },
              label_start: 'Fecha de inicio',
              label_end: 'Fecha de fin',
              disabled: false,
              helper_text: '',
              hidden_text: false,
              min_date: null,
              max_date: null,
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'button',
              xs: 12,
              md: 3,
              on_click_function: handle_submit(on_submit),
              label: 'BUSCAR',
              variant_button: 'contained',
              type_button: 'button',
            },
          ]}
        />
        <DataGrid
          density="compact"
          autoHeight
          rows={digitization_requests}
          columns={columns_list}
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) =>
            row['id_solicitud_de_digitalizacion' ?? uuid()] === null
              ? uuid()
              : row['id_solicitud_de_digitalizacion' ?? uuid()]
          }
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DigitalizacionesRespondidas;
