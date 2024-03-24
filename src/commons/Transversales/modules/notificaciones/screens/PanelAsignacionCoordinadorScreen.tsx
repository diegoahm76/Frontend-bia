/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Title } from '../../../../../components/Title';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import TableRowExpansion from '../../../../../components/partials/form/TableRowExpansion';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { type ColumnProps } from 'primereact/column';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import ListadoAnexos from '../../../../gestorDocumental/CentralDigitalizacion/componentes/CentralDigitalizacion/ListadoAnexos';
import FormButton from '../../../../../components/partials/form/FormButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import { DialogNoticacionesComponent } from '../../../../../components/DialogNotificaciones';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';
import {
  get_asignaciones_id_person_service,
  get_document_types_service,
  get_persons_service,
  get_tipos_notificacion,
} from '../store/thunks/notificacionesThunks';
import { IObjNotificacionType } from '../interfaces/notificaciones';

// import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
// import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
// import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
// import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
// import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
// import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
// import FormButton from '../../../../components/partials/form/FormButton';
// import Limpiar from '../../../conservacion/componentes/Limpiar';
// import SaveIcon from '@mui/icons-material/Save';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function PanelAsignacionCoordinadorScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const columns_pqrs: ColumnProps[] = [
    {
      headerStyle: { width: '4rem' },
      field: 'nommbre_tipo_documento',
      header: 'Tipo de documento',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.nommbre_tipo_documento}
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'radicado',
      header: 'Radicado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.radicado}
        </div>
      ),
      style: { width: 150 },
    },
    {
      headerStyle: { width: '4rem' },
      field: 'expediente',
      header: 'Expediente',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.expediente}
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'unidad_solicitante',
      header: 'Grupo solicitante',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.unidad_solicitante}
        </div>
      ),
    },

    {
      field: 'funcuinario_solicitante',
      headerStyle: { width: '4rem' },
      header: 'Funcionario solicitante',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.funcuinario_solicitante}
        </div>
      ),
    },
    {
      field: 'fecha_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Fecha de la solicitud',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_solicitud && rowData.fecha_solicitud.split('T')[0]}
        </div>
      ),
    },
    {
      field: 'fecha_rta_final_gestion',
      headerStyle: { width: '4rem' },
      header: 'Fecha de finalización',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_rta_final_gestion !== null &&
            new Date(rowData.fecha_rta_final_gestion).toDateString()}
        </div>
      ),
    },
    {
      field: 'estado_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Estado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.estado_solicitud}
        </div>
      ),
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Tooltip title="Detalle">
          <IconButton
            onClick={() => {
              //set_detail_is_active(true);
              setSelectedPqr(rowData);
            }}
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
      ),
    },
  ];
  const columns_solicitud: ColumnProps[] = [
    {
      field: 'cod_tipo_documentoID',
      header: 'Tipo de gestión',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {
            tipos_notificacion?.find(
              (objeto: IObjNotificacionType) =>
                objeto.id_tipo_notificacion_correspondencia ===
                rowData.cod_tipo_documentoID
            )?.nombre
          }
        </div>
      ),
    },
    {
      field: 'funcionario_asignado',
      header: 'Funcionario asignado',
      sortable: false,
    },
    {
      field: 'fecha_asignacion',
      header: 'Fecha de asignación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_asignacion && rowData.fecha_asignacion.split('T')[0]}
        </div>
      ),
    },
    {
      field: 'fecha_actuacion',
      header: 'Fecha actución',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_actuacion && rowData.fecha_actuacion.split('T')[0]}
        </div>
      ),
    },
    {
      field: 'fecha_resuelta',
      header: 'Fecha resuelta',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_resuelta && rowData.fecha_resuelta.split('T')[0]}
        </div>
      ),
    },

    {
      field: 'nombre_und_org_oficina_solicita',
      header: 'Días en gestión',
      sortable: false,
    },
    {
      field: 'estado_notificacion',
      header: 'Estado',
      sortable: false,
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Tooltip title="Detalle">
          <IconButton
            onClick={() => {
              set_detail_is_active(true);
              setSelectedPqr(rowData);
            }}
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
      ),
    },
  ];
  const definition_levels = [
    {
      column_id: 'id_notificacion_correspondencia',
      level: 0,
      columns: columns_pqrs,
      table_name: 'Solicitudes de notificación',
      property_name: '',
    },
    {
      column_id: 'id_registro_notificacion_correspondencia',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Registro de notificación por solicitud',
      property_name: 'registros_notificaciones',
    },
  ];
  const {
    notification_requests,
    list_document_types,
    list_status,
    list_groups,
    notification_request,
    person,
    persons,
    tipos_notificacion,
    asignacion_funcionario,
  } = useAppSelector((state) => state.notificaciones_slice);
  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [button_option, set_button_option] = useState('');
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);
  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
  } = useForm<any>();
  useEffect(() => {
    setExpandedRows(undefined);
    set_button_option('');
    // setSelectedPqr({});
    void dispatch(get_persons_service('', '', '', '', '', ''));
    void dispatch(get_tipos_notificacion());
    void dispatch(get_document_types_service());
    set_detail_is_active(false);
  }, []);

  // Notificaciones
  const [titulo_notificacion, set_titulo_notificacion] = useState<string>('');
  const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>('');
  const [tipo_notificacion, set_tipo_notificacion] = useState<string>('');
  const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
  const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] =
    useState<boolean>(false);

  const columns_list: GridColDef[] = [
    {
      field: 'persona_asignada',
      headerName: 'Funcionario',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'vigencia_contrato',
      headerName: 'Vigencia del contrato',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'asignadas',
      headerName: 'Tareas asignadas',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'resueltas',
      headerName: 'Tareas resueltas',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'pendientes',
      headerName: 'Pendientes',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const on_change_select = (value: any, name: string): void => {
    if (name === 'id_persona_asignada') {
      if (value !== undefined) {
        console.log(value);
        void dispatch(get_asignaciones_id_person_service(value.id_persona));
        //  console.log('')(value);
      } else {
      }
    }
  };
  const get_x: any = (data: any) => {
    //  console.log('')(data);
  };
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} marginY={2}>
          <Title title="Panel de asignación"></Title>

          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'cod_tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: list_document_types,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'id_tipo_notificacion_correspondencia',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de notificación',
                disabled: false,
                helper_text: '',
                select_options: tipos_notificacion,
                option_label: 'nombre',
                option_key: 'id_tipo_notificacion_correspondencia',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'id_persona_asignada',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Funcionario a asignar',
                disabled: false,
                helper_text: '',
                select_options: persons,
                option_label: 'nombre_completo',
                option_key: 'id_persona',
                on_change_function: on_change_select,
              },
              // {
              //   datum_type: 'input_controller',
              //   xs: 12,
              //   md: 12,
              //   control_form: control_notificacion,
              //   control_name: 'comentario',
              //   default_value: '',
              //   rules: { required_rule: { rule: true, message: 'Requerido' } },
              //   label: 'Comentario de la asignación de tarea',
              //   disabled: true,
              //   helper_text: '',
              //   multiline_text: true,
              //   rows_text: 4,
              // },
            ]}
          />
        </Grid>
        <DataGrid
          density="compact"
          autoHeight
          rows={asignacion_funcionario !== null ? [asignacion_funcionario] : []}
          columns={columns_list}
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) =>
            row['id_persona_asignada' ?? uuid()] === null
              ? uuid()
              : row['id_persona_asignada' ?? uuid()]
          }
        />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<CloseIcon />}
              disabled={false}
              label={'Cancelar'}
              type_button="button"
              color_button="error"
            />
          </Grid>
          <>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={<CheckIcon />}
                label={'Asignar tarea'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </>
        </Grid>
        <TableRowExpansion
          products={[notification_request]}
          definition_levels={definition_levels}
          selectedItem={selectedPqr}
          setSelectedItem={setSelectedPqr}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          onRowToggleFunction={get_x}
        />
      </Grid>
    </>
  );
}
