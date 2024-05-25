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

import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import {
  set_digitization_request,
  set_request_status,
  set_request_type,
  set_edit_digitization,
} from '../../store/slice/centralDigitalizacionSlice';
import {
  control_error,
  get_digitalization_requests_service,
  get_digitalization_requests_service_otros,
  get_Opas
} from '../../store/thunks/centralDigitalizacionThunks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { OpcionOtrosContext } from '../../context/BusquedaOtrosDigitalizacion';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DigitalizacionesPendientes = () => {

  const { set_opcion_otros } = useContext(OpcionOtrosContext)
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_solicitud,
    reset,
    handleSubmit: handle_submit,
    getValues: get_values,
  } = useForm<any>();
  const { request_types, list_request_status, person, digitization_requests } =
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
      minWidth: 300,
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
          <Tooltip title="Desarrollar">
            <IconButton
              onClick={() => {
                dispatch(set_edit_digitization(true));
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
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    // {
    //   field: 'acciones',
    //   headerName: 'Acciones',
    //   width: 90,
    //   renderCell: (params) => (
    //     <>
    //       {tipo_solicitud && (
    //       <Tooltip title="Desarrollar">
    //       <IconButton
    //         onClick={() => {
    //           dispatch(set_edit_digitization(true));
    //           dispatch(set_digitization_request(params.row));
    //         }}
    //         href={`/#/app/gestor_documental/digitalizacion_opas/digitalizacion_opas`}
    //       >
        
    //          <PlaylistAddCheckIcon/>
          
    //       </IconButton>
    //     </Tooltip>
    //       )}
    //       {!tipo_solicitud && (
    //         <Tooltip title="Desarrollar">
    //           <IconButton
    //             onClick={() => {
    //               dispatch(set_edit_digitization(true));
    //               dispatch(set_digitization_request(params.row));
    //             }}
    //             href={`/#/app/gestor_documental/central_digitalizacion/anexos/${params.row.id_solicitud_de_digitalizacion}`}
    //           >
    //             <Avatar
    //               sx={{
    //                 width: 24,
    //                 height: 24,
    //                 background: '#fff',
    //                 border: '2px solid',
    //               }}
    //               variant="rounded"
    //             >
    //               <EditIcon
    //                 sx={{ color: 'primary.main', width: '18px', height: '18px' }}
    //               />
    //             </Avatar>
    //           </IconButton>
    //         </Tooltip>
    //       )}
    //     </>
    //   ),
    // },
  ];

  const tipo_solicitud = get_values('tipo_solicitud') ?? '';
  const estado_solicitud = get_values('estado_solicitud') ?? '';
  const numero_radicado = get_values('numero_radicado') ?? '';
  const on_submit = (data: any): void => {

    if (
      tipo_solicitud === '' &&
      estado_solicitud === '' &&
      numero_radicado === ''
    ) {
      control_error('Debe ingresa al menos una opción');
    } else {
      const params: {
        tipo_solicitud?: string;
        estado_solicitud?: string;
        numero_radicado?: string;
      } = {};

      //Verificar y agregar propiedad al objeto solo si el valor no es una cadena vacía



      if (estado_solicitud !== '') {
        params.estado_solicitud = estado_solicitud;
      }

      if (numero_radicado !== '') {
        params.numero_radicado = numero_radicado;
      }

      if (tipo_solicitud === "OTROS") {
        void dispatch(get_digitalization_requests_service_otros(params));
        set_opcion_otros(tipo_solicitud)
        // console.log("si se pudo");
        return;
      }
      if (tipo_solicitud === "OPAS") {
        void dispatch(get_Opas(params));
        return;
      }
      if (tipo_solicitud !== '') {
        params.tipo_solicitud = tipo_solicitud;
        console.log(params, tipo_solicitud, params.tipo_solicitud);
      }

      void dispatch(get_digitalization_requests_service(params));
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
              datum_type: 'title',
              title_label: 'Tareas de digitalización',
            },
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
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: 'estado_solicitud',
              default_value: '',
              rules: {},
              label: 'Estado de solicitud',
              disabled: false,
              helper_text: '',
              select_options: list_request_status,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: 'numero_radicado',
              default_value: '',
              rules: {},
              label: 'Número de radicado',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'button',

              // xs: 12,
              // md: 3,
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
      {/* {tipo_solicitud} */}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DigitalizacionesPendientes;
