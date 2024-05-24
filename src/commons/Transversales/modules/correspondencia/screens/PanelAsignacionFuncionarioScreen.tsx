/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Grid, IconButton, Stack, Tooltip } from '@mui/material';
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
  get_status_list_service,
  get_document_types_service,
  get_groups_list_service,
  get_tareas_service_filter,
  get_solicitudes_notificacion,
  get_status_asignation_list_service,
  aceptar_rechazar_asignacion_notificacion_service,
  aceptar_rechazar_asignacion_tarea_service,
  add_asignacion_notificacion,
  add_asignacion_tarea,
  get_solicitudes_notificacion_funcionario,
  get_persons_service,
  actualizar_tarea_service,
  get_estados_notificacion,
  cancelar_asignacion_tarean,
  get_tipos_documento_notification,
  actualizar_solicitud_service,
} from '../store/thunks/notificacionesThunks';
import {
  set_notification_per_request,
  set_notification_request,
  set_notification_requests,
  set_notifications_per_request,
} from '../store/slice/notificacionesSlice';
import {
  IObjNotificacionType,
  IObjTypeDocument,
} from '../interfaces/notificaciones';
import DialogRechazo from '../componentes/DialogRechazo';
import { AuthSlice } from '../../../../auth/interfaces';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SolicitudDetailDialog from '../componentes/SolicitudDetailDialog';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AnexosSoporteDetailDialog from '../componentes/AnexosSoporteDetailDialog';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GestionarTareaDialog from '../componentes/GestionarTareaDialog';
import UpdateIcon from '@mui/icons-material/Update';
import DialogSetStatusTask from '../componentes/DialogSetStatusTask';
import RemoveIcon from '@mui/icons-material/Remove';

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
export function PanelAsignacionFuncionarioScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    notification_requests,
    tipos_documento_notificacion,
    list_status,
    list_status_asignation,
    list_groups,
    notification_request,
    tipos_notificacion,
    notifications_per_request,
    notification_per_request,
    persons,
    estados_notificacion,
  } = useAppSelector((state) => state.notificaciones_slice);
  const [rechazo_is_active, set_rechazo_is_active] = useState<boolean>(false);
  const [estado_is_active, set_estado_is_active] = useState<boolean>(false);
  const [rechazo_tarea_is_active, set_rechazo_tarea_is_active] =
    useState<boolean>(false);
  const [is_solicitud, set_is_solicitud] = useState<boolean>(false);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);
  const [anexos_is_active, set_anexos_is_active] = useState<boolean>(false);
  const [tarea_is_active, set_tarea_is_active] = useState<boolean>(false);
  const [tipo_tarea, set_tipo_tarea] = useState<string>('');

  const columns_pqrs: ColumnProps[] = [
    {
      headerStyle: { width: '4rem' },
      field: 'nombre_tipo_documento',
      header: 'Tipo de documento',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.nombre_tipo_documento}
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
      field: 'cod_estado_asignacion',
      headerStyle: { width: '4rem' },
      header: 'Estado asignacion',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {list_status_asignation?.find(
            (objeto: any) => objeto.key === rowData.cod_estado_asignacion
          )?.label ?? 'Sin asignar'}
        </div>
      ),
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => {
        return rowData.cod_estado_asignacion === 'Pe' &&
          rowData.id_persona_asignada == userinfo.id_persona ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Tooltip title="Aceptar">
              <IconButton
                onClick={() => {
                  void dispatch(
                    aceptar_rechazar_asignacion_notificacion_service(
                      rowData.id_notificacion_correspondencia,
                      true,
                      '',
                      rowData.id_persona_asignada
                    )
                  );
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
                  <CheckIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Rechazar">
              <IconButton
                onClick={() => {
                  set_rechazo_is_active(true);
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
                  <CloseIcon
                    sx={{
                      color: 'error.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <>
            <Tooltip title="Ver">
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver anexos">
              <IconButton
                onClick={() => {
                  set_anexos_is_active(true);
                  setSelectedPqr(rowData);
                  set_tipo_anexo('anexo');
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
                  <AttachFileIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            {rowData.cod_estado_asignacion === 'Ac' &&
              rowData.id_persona_asignada === userinfo.id_persona && (
                <Tooltip title="Actualizar estado de solicitud">
                  <IconButton
                    onClick={() => {
                      set_estado_is_active(true);
                      set_is_solicitud(true);
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
                      <UpdateIcon
                        sx={{
                          color: 'primary.main',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
          </>
        );
      },
    },
  ];
  const columns_solicitud: ColumnProps[] = [
    {
      field: 'tipo_gestion',
      header: 'Tipo de gestión',
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
      field: 'id_persona_asignada',
      headerStyle: { width: '4rem' },
      header: 'Funcionario asignado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {persons?.find(
            (objeto: any) => objeto.id_persona === rowData.id_persona_asignada
          )?.nombre_completo ?? 'Sin asignar'}
        </div>
      ),
    },
    {
      field: 'cod_estado_asignacion',
      headerStyle: { width: '4rem' },
      header: 'Estado asignacion',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {list_status_asignation?.find(
            (objeto: any) => objeto.key === rowData.cod_estado_asignacion
          )?.label ?? 'Sin asignar'}
        </div>
      ),
    },
    {
      field: 'justificacion_rechazo_asignacion',
      headerStyle: { width: '4rem' },
      header: 'Justificación rechazo',
      sortable: false,
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
      field: 'id_estado_actual_registro',
      header: 'Estado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {estados_notificacion?.find(
            (objeto: any) =>
              objeto.id_estado_notificacion_correspondencia ===
              rowData.id_estado_actual_registro
          )?.nombre ?? 'Sin asignar'}
        </div>
      ),
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => {
        return rowData.cod_estado_asignacion === 'Pe' &&
          rowData.id_persona_asignada === userinfo.id_persona ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Tooltip title="Aceptar">
              <IconButton
                onClick={() => {
                  void dispatch(
                    aceptar_rechazar_asignacion_tarea_service(
                      rowData.id_registro_notificacion_correspondencia,
                      true,
                      '',
                      rowData.id_persona_asignada
                    )
                  );
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
                  <CheckIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Rechazar">
              <IconButton
                onClick={() => {
                  set_rechazo_tarea_is_active(true);
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
                  <CloseIcon
                    sx={{
                      color: 'error.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Tooltip title="Ver">
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver soportes">
              <IconButton
                onClick={() => {
                  set_anexos_is_active(true);
                  setSelectedPqr(rowData);
                  set_tipo_anexo('soporte');
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
                  <AttachFileIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            {rowData.cod_estado_asignacion === 'Ac' &&
              rowData.id_persona_asignada === userinfo.id_persona && (
                <>
                  <Tooltip title="Actualizar estado de tarea">
                    <IconButton
                      onClick={() => {
                        set_estado_is_active(true);
                        set_is_solicitud(false);

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
                        <UpdateIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Gestionar tarea">
                    <IconButton
                      onClick={() => {
                        //set_tarea_is_active(true);
                        setSelectedPqr(rowData);
                        set_tipo_tarea('');
                      }}
                      href={`/#/app/transversal/correspondencia/gestionar_tarea_solicitud_correspondencia/`}
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
                        <AssignmentIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </>
              )}
            {rowData?.cod_estado_asignacion === 'Re' &&
              (notification_requests?.find(
                (objeto: any) =>
                  objeto.id_notificacion_correspondencia ===
                  rowData.id_notificacion_correspondencia
              )?.id_persona_asignada ?? null) === userinfo.id_persona && (
                <Tooltip title="Re-Asignar">
                  <IconButton
                    onClick={() => {
                      void dispatch(
                        add_asignacion_tarea({
                          id_persona_asignada: rowData.id_persona_asignada,
                          id_notificacion_correspondencia:
                            rowData.id_notificacion_correspondencia,
                          id_tipo_notificacion_correspondencia:
                            rowData.id_tipo_notificacion_correspondencia,
                        })
                      );
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
                      <SwapHorizIcon
                        sx={{
                          color: 'primary.main',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
            {rowData?.cod_estado_asignacion === 'Pe' && (
              <Tooltip title="Cancelar asignación">
                <IconButton
                  onClick={() => {
                    void dispatch(
                      cancelar_asignacion_tarean(
                        rowData.id_registro_notificacion_correspondencia
                      )
                    );
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
                    <RemoveIcon
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        );
      },
    },
  ];
  const definition_levels = [
    {
      column_id: 'id_notificacion_correspondencia',
      level: 0,
      columns: columns_pqrs,
      table_name: 'Solicitudes de correspondencia',
      property_name: '',
    },
    {
      column_id: 'id_registro_notificacion_correspondencia',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Registro de tareas por solicitud',
      property_name: 'registros_notificaciones',
    },
  ];

  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [button_option, set_button_option] = useState('');
  const [tipo_anexo, set_tipo_anexo] = useState('');
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
    getValues: get_values,
  } = useForm<any>();
  useEffect(() => {
    dispatch(set_notification_request({}));
    dispatch(set_notification_requests([]));
    dispatch(set_notification_per_request({}));
    dispatch(set_notifications_per_request([]));
    dispatch(get_status_list_service());
    dispatch(get_tipos_documento_notification());
    dispatch(get_groups_list_service());
    dispatch(get_status_asignation_list_service());
    void dispatch(get_estados_notificacion());
    void dispatch(get_persons_service('', '', '', '', '', ''));
  }, []);
  useEffect(() => {
    if (selectedPqr !== null) {
      if ('id_registro_notificacion_correspondencia' in selectedPqr) {
        dispatch(
          set_notification_request(
            notification_requests?.find(
              (objeto: any) =>
                objeto.id_notificacion_correspondencia ===
                selectedPqr.id_notificacion_correspondencia
            ) ?? {}
          )
        );
        dispatch(set_notification_per_request(selectedPqr));
        set_button_option('request');
      } else {
        dispatch(set_notification_request(selectedPqr));
        dispatch(set_notification_per_request({}));
        set_button_option('solicitud');
      }
    }
  }, [selectedPqr]);
  // Notificaciones
  const [titulo_notificacion, set_titulo_notificacion] = useState<string>('');
  const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>('');
  const [tipo_notificacion, set_tipo_notificacion] = useState<string>('');
  const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
  const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] =
    useState<boolean>(false);

  const columns_list: GridColDef[] = [
    {
      field: 'tipo_documento',
      headerName: 'Tipo de gesión',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'funcionario_asignado',
      headerName: 'Funcionario asignado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_asignacion',
      headerName: 'Fecha de la asignacion',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'tipo_persona_1',
      headerName: 'Fecha actuación',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'tipo_persona_2',
      headerName: 'Fecha resuelta',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'dias_faltantes',
      headerName: 'dias en gestión',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'tipo_persona_4',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  const get_tareas: any = async () => {
    const tipo_documento = get_values('tipo_documento') ?? '';
    const radicado = get_values('radicado') ?? '';
    const expediente = get_values('expediente') ?? '';
    const grupo_solicitante = get_values('grupo_solicitante') ?? '';
    const estado = get_values('estado') ?? '';
    //const estado_asignacion = get_values('estado_asignacion') ?? '';
    const funcionario_asignado = userinfo.id_persona;

    const params: any = {};

    if (tipo_documento !== '') {
      params.tipo_documento = tipo_documento;
    }

    if (radicado !== '') {
      params.radicado = radicado;
    }

    if (expediente !== '') {
      params.expediente = expediente;
    }

    if (grupo_solicitante !== '') {
      params.grupo_solicitante = grupo_solicitante;
    }
    if (estado !== '') {
      params.estado = estado;
    }
    params.funcionario_asignado = funcionario_asignado;
    params.flag = 'CD';
    void dispatch(get_solicitudes_notificacion_funcionario(params));
  };
  const get_x: any = (data: any) => {
    //  console.log('')(data);
  };
  const rechazar_solicitud_notificacion: any = (data: any) => {
    void dispatch(
      aceptar_rechazar_asignacion_notificacion_service(
        selectedPqr.id_notificacion_correspondencia,
        false,
        data.justificacion,
        selectedPqr.id_persona_asignada
      )
    );
  };
  const rechazar_tarea_notificacion: any = (data: any) => {
    void dispatch(
      aceptar_rechazar_asignacion_tarea_service(
        selectedPqr.id_registro_notificacion_correspondencia,
        false,
        data.justificacion,
        selectedPqr.id_persona_asignada
      )
    );
  };
  const actualizar_tarea_notificacion: any = (data: any) => {
    is_solicitud
      ? void dispatch(
          actualizar_solicitud_service(
            notification_request?.id_notificacion_correspondencia,
            data.id_estado,
            notification_per_request?.id_persona_asignada ?? 0
          )
        )
      : void dispatch(
          actualizar_tarea_service(
            notification_per_request?.id_registro_notificacion_correspondencia,
            data.id_estado,
            notification_per_request?.id_persona_asignada ?? 0
          )
        );
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
          <Title title="Solicitudes correspondencia asignadas funcionario"></Title>
          <Grid container direction="row" padding={2} spacing={2}>
            {/* <Grid item xs={12} md={6}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                label="Ver solicitud"
                type_button="button"
                color_button="warning"
              />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <FormButton
                disabled={
                  (notification_request?.id_notificacion_correspondencia ===
                    null ||
                    notification_request?.id_persona_asignada !==
                      userinfo.id_persona) &&
                  (notification_request?.cod_estado_asignacion ?? 'Pe') !== 'Ac'
                }
                href={`/#/app/transversal/correspondencia/panel_asignacion_tarea_funcionario/`}
                variant_button="outlined"
                on_click_function={null}
                icon_class={null}
                label={'Asignar tarea'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </Grid>
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
                control_name: 'tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: tipos_documento_notificacion?.filter(
                  (tipo: IObjTypeDocument) => tipo.aplica_para_correspondencia
                ),
                option_label: 'nombre',
                option_key: 'id_tipo_documento',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'radicado',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Radicado',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'expediente',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Expediente',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'grupo_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Grupo que proyecta',
                disabled: false,
                helper_text: '',
                select_options: list_groups,
                option_label: 'label',
                option_key: 'key',
              },

              // {
              //   datum_type: 'select_controller',
              //   xs: 12,
              //   md: 4,
              //   control_form: control_notificacion,
              //   control_name: 'type_applicant',
              //   default_value: '',
              //   rules: { required_rule: { rule: true, message: 'Requerido' } },
              //   label: 'Tipo de gestión',
              //   disabled: false,
              //   helper_text: '',
              //   select_options: [],
              //   option_label: 'label',
              //   option_key: 'key',
              // },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'estado',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Estado solicitud',
                disabled: false,
                helper_text: '',
                select_options: list_status,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'estado_asignacion',
                default_value: '',
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Estado asignación',
                disabled: false,
                helper_text: '',
                select_options: list_status_asignation,
                option_label: 'label',
                option_key: 'key',
              },
            ]}
          />
        </Grid>
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<CloseIcon />}
              disabled={!false}
              label={'Cancelar'}
              type_button="button"
              color_button="error"
            />
          </Grid>
          <>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={get_tareas}
                icon_class={<CheckIcon />}
                label={'Buscar'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </>
        </Grid>
        <TableRowExpansion
          products={notification_requests}
          definition_levels={definition_levels}
          selectedItem={selectedPqr}
          setSelectedItem={setSelectedPqr}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          onRowToggleFunction={get_x}
        />
        <DialogRechazo
          is_modal_active={rechazo_is_active}
          set_is_modal_active={set_rechazo_is_active}
          action={rechazar_solicitud_notificacion}
        />
        <DialogRechazo
          is_modal_active={rechazo_tarea_is_active}
          set_is_modal_active={set_rechazo_tarea_is_active}
          action={rechazar_tarea_notificacion}
        />
        <DialogSetStatusTask
          is_modal_active={estado_is_active}
          set_is_modal_active={set_estado_is_active}
          action={actualizar_tarea_notificacion}
          flag={is_solicitud}
        />
        <SolicitudDetailDialog
          is_modal_active={detail_is_active}
          set_is_modal_active={set_detail_is_active}
          action={button_option}
        />
        <AnexosSoporteDetailDialog
          is_modal_active={anexos_is_active}
          set_is_modal_active={set_anexos_is_active}
          action={tipo_anexo}
        />
        <GestionarTareaDialog
          is_modal_active={tarea_is_active}
          set_is_modal_active={set_tarea_is_active}
          action={tipo_tarea}
        />
      </Grid>
    </>
  );
}
