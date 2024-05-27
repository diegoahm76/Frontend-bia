/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
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
import { type GridColDef } from '@mui/x-data-grid';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import {
  get_document_types_service,
  get_groups_list_service,
  get_persons_service,
  get_solicitudes_notificacion,
  get_status_list_service,
  get_status_asignation_list_service,
  add_asignacion_notificacion,
  aceptar_rechazar_solicitud_notificacion_service,
  cancelar_asignacion_notificacion,
  get_tipos_documento_notification,
} from '../store/thunks/notificacionesThunks';
import {
  set_notification_per_request,
  set_notification_request,
  set_notification_requests,
  set_notifications_per_request,
} from '../store/slice/notificacionesSlice';
import FormButton from '../../../../../components/partials/form/FormButton';
import {
  IObjNotificacionType,
  IObjTypeDocument,
} from '../interfaces/notificaciones';
import SolicitudDetailDialog from '../componentes/SolicitudDetailDialog';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DialogRechazo from '../componentes/DialogRechazo';
import RemoveIcon from '@mui/icons-material/Remove';
import AnexosSoporteDetailDialog from '../componentes/AnexosSoporteDetailDialog';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
export function PanelSolicitudNotificacionScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    notification_requests,
    tipos_documento_notificacion,
    list_status,
    list_groups,
    notification_request,
    tipos_notificacion,
    person,
    persons,
    list_status_asignation,
  } = useAppSelector((state) => state.notificaciones_slice);
  const [rechazo_solicitud_is_active, set_rechazo_solicitud_is_active] =
    useState<boolean>(false);
  const [anexos_is_active, set_anexos_is_active] = useState<boolean>(false);
  const [tipo_anexo, set_tipo_anexo] = useState('');

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
      field: 'asunto',
      header: 'Asunto',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.asunto}
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
      field: 'dias_faltantes',
      headerStyle: { width: '4rem' },
      header: 'Días faltantes',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.dias_faltantes}
        </div>
      ),
    },
    {
      field: 'solicitud_aceptada_rechazada',
      headerStyle: { width: '4rem' },
      header: 'Aceptado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.solicitud_aceptada_rechazada === true ? (
            <Chip size="small" label="Sí" color="success" variant="outlined" />
          ) : (
            <Chip size="small" label="No" color="error" variant="outlined" />
          )}
        </div>
      ),
    },
    {
      field: 'cod_medio_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Medio de solicitud',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.cod_medio_solicitud === 'MA' ? 'Manual' : 'Sistema'}
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
      field: 'justificacion_rechazo',
      headerStyle: { width: '4rem' },
      header: 'Estado',
      sortable: false,
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
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
          {rowData?.cod_estado_asignacion === 'Re' && (
            <Tooltip title="Re-Asignar">
              <IconButton
                onClick={() => {
                  void dispatch(
                    add_asignacion_notificacion({
                      id_persona_asignada: rowData.id_persona_asignada,
                      id_notificacion_correspondencia:
                        rowData.id_notificacion_correspondencia,
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
                    cancelar_asignacion_notificacion(
                      rowData.id_notificacion_correspondencia
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
      ),
    },
  ];
  const columns_solicitud: ColumnProps[] = [
    {
      field: 'tipo_gestion',
      header: 'Tipo de gestión',
      sortable: false,
    },
    {
      field: 'numero_identificacion',
      header: 'Número de oficio o requerimiento',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_identificacion}
        </div>
      ),
    },
    {
      field: 'radicado',
      header: 'Radicado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {(rowData.radicado ?? '') === '' ? 'SIN RADICAR' : rowData.radicado}
        </div>
      ),
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
      field: 'plazo_entrega',
      header: 'Plazo de entrega',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.plazo_entrega && rowData.plazo_entrega.split('T')[0]}
        </div>
      ),
    },
    {
      field: 'dias_faltantes',
      header: 'Días restantes',
      sortable: false,
    },
    {
      field: 'cod_estado_asignacion',
      header: 'Estado',
      sortable: false,
    },
    {
      header: 'Acciones',
      headerStyle: { width: '4rem' },
      body: (rowData) => (
        <>
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
        </>
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
    getValues: get_values,
  } = useForm<any>();
  useEffect(() => {
    dispatch(set_notification_request({}));
    dispatch(set_notification_requests([]));
    dispatch(set_notification_per_request({}));
    dispatch(set_notifications_per_request([]));
    dispatch(get_status_list_service());
    dispatch(get_status_asignation_list_service());
    dispatch(get_document_types_service());
    dispatch(get_groups_list_service());
    void dispatch(get_persons_service('', '', '', '', '', ''));
    void dispatch(get_tipos_documento_notification());
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
    console.log(selectedPqr);
  }, [selectedPqr]);
  const get_solicitudes: any = async () => {
    const tipo_documento = get_values('tipo_documento') ?? '';
    const radicado = get_values('radicado') ?? '';
    const expediente = get_values('expediente') ?? '';
    const grupo_solicitante = get_values('grupo_solicitante') ?? '';
    const estado = get_values('estado') ?? '';
    const estado_asignacion = get_values('estado_asignacion') ?? '';
    const funcionario_asignado = get_values('funcionario_asignado') ?? '';

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
    if (estado_asignacion !== '') {
      params.estado_asignacion = estado_asignacion;
    }
    if (funcionario_asignado !== '') {
      params.funcionario_asignado = funcionario_asignado;
    }
    params.flag = 'NO';
    console.log(params);

    void dispatch(get_solicitudes_notificacion(params));
  };
  const get_x: any = (data: any) => {
    //  console.log('')(data);
  };
  const rechazar_solicitud_notificacion: any = (data: any) => {
    void dispatch(
      aceptar_rechazar_solicitud_notificacion_service(
        selectedPqr.id_notificacion_correspondencia,
        data.justificacion
      )
    );
  };
  const handle_open_rechazo_solicitud = (): void => {
    set_rechazo_solicitud_is_active(true);
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
          <Title title="Listado de solicitudes de notificación"></Title>
          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={3}>
              <FormButton
                href={`/#/app/transversal/notificaciones/crear_notificacion/`}
                disabled={false}
                variant_button="outlined"
                on_click_function={null}
                icon_class={null}
                label={'Generar solicitud'}
                type_button="button"
                color_button="primary"
              />
            </Grid>

            {/* <Grid item xs={12} md={2}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                href={`/#/app/transversal/notificaciones/ver_notificacion/`}
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                label="Ver solicitud"
                type_button="button"
                color_button="warning"
              />
            </Grid> */}
            <Grid item xs={12} md={4}>
              <FormButton
                disabled={
                  (notification_request?.id_notificacion_correspondencia ===
                    null ||
                    notification_request?.id_persona_asignada !== null) &&
                  (notification_request?.cod_estado_asignacion ?? 'Pe') !== 'Re'
                }
                href={`/#/app/transversal/notificaciones/panel_asignacion_coordinador/`}
                variant_button="outlined"
                on_click_function={null}
                icon_class={null}
                label={'Asignar solicitud de notificación'}
                type_button="button"
                color_button="primary"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia ===
                    null ||
                  (notification_request?.cod_estado_asignacion ?? 'Re') !==
                    'Re' ||
                  notification_request?.justificacion_rechazo !== null
                }
                variant_button="contained"
                on_click_function={handle_open_rechazo_solicitud}
                icon_class={null}
                label={'Rechazar'}
                type_button="button"
                color_button="error"
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
                datum_type: 'title',
                title_label: 'Buscador',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: tipos_documento_notificacion?.filter(
                  (tipo: IObjTypeDocument) => tipo.aplica_para_notificaciones
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
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Radicado',
                type: 'number',
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
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Expediente',
                type: 'text',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'grupo_solicitante',
                default_value: '',
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Grupo que proyecta',
                disabled: false,
                helper_text: '',
                select_options: list_groups,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'estado',
                default_value: '',
                rules: { required_rule: { rule: false, message: 'Requerido' } },
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
                md: 3,
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
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'funcionario_asignado',
                default_value: '',
                rules: { required_rule: { rule: false, message: 'Requerido' } },
                label: 'Funcionario asignado',
                disabled: false,
                helper_text: '',
                select_options: persons,
                option_label: 'nombre_completo',
                option_key: 'id_persona',
              },
              {
                datum_type: 'blank_space',
                xs: 12,
                md: 6,
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: 'Descartar',
                type_button: 'button',
                disabled: false,
                variant_button: 'outlined',
                on_click_function: null,
                color_button: 'error',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: 'Buscar',
                type_button: 'button',
                disabled: false,
                variant_button: 'contained',
                on_click_function: handle_submit_notificacion(get_solicitudes),
                color_button: 'primary',
              },
            ]}
          />

          <TableRowExpansion
            products={notification_requests}
            definition_levels={definition_levels}
            selectedItem={selectedPqr}
            setSelectedItem={setSelectedPqr}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
            onRowToggleFunction={get_x}
          />
          <AnexosSoporteDetailDialog
            is_modal_active={anexos_is_active}
            set_is_modal_active={set_anexos_is_active}
            action={tipo_anexo}
          />
          <SolicitudDetailDialog
            is_modal_active={detail_is_active}
            set_is_modal_active={set_detail_is_active}
            action={button_option}
          />
        </Grid>
        <DialogRechazo
          is_modal_active={rechazo_solicitud_is_active}
          set_is_modal_active={set_rechazo_solicitud_is_active}
          action={rechazar_solicitud_notificacion}
        />
      </Grid>
    </>
  );
}
