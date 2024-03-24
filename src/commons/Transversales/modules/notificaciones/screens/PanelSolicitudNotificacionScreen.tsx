/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Chip, Grid, IconButton, Tooltip } from '@mui/material';
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
  get_solicitudes_notificacion,
  get_status_list_service,
} from '../store/thunks/notificacionesThunks';
import { set_notification_request } from '../store/slice/notificacionesSlice';
import FormButton from '../../../../../components/partials/form/FormButton';
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
export function PanelSolicitudNotificacionScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    notification_requests,
    list_document_types,
    list_status,
    list_groups,
    notification_request,
    tipos_notificacion,
  } = useAppSelector((state) => state.notificaciones_slice);
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
    dispatch(get_status_list_service());
    dispatch(get_document_types_service());
    dispatch(get_groups_list_service());
  }, []);
  useEffect(() => {
    dispatch(set_notification_request(selectedPqr));
  }, [selectedPqr]);
  const get_solicitudes: any = async () => {
    const tipo_documento = get_values('tipo_documento') ?? '';
    const radicado = get_values('radicado') ?? '';
    const expediente = get_values('expediente') ?? '';
    const grupo_solicitante = get_values('grupo_solicitante') ?? '';
    const estado = get_values('estado') ?? '';

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

    void dispatch(get_solicitudes_notificacion(params));
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
          <Title title="Listado de solicitudes de notificación"></Title>
          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={3}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                variant_button="outlined"
                on_click_function={null}
                icon_class={null}
                label={'Generar solicitud'}
                type_button="button"
                color_button="primary"
              />
            </Grid>

            <Grid item xs={12} md={2}>
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
            </Grid>
            <Grid item xs={12} md={3}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                href={`/#/app/transversal/notificaciones/panel_asignacion_coordinador/`}
                variant_button="outlined"
                on_click_function={null}
                icon_class={null}
                label={'Asignar notificación'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                label={'Asignar tarea'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormButton
                disabled={
                  notification_request?.id_notificacion_correspondencia === null
                }
                variant_button="contained"
                on_click_function={null}
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
                select_options: list_document_types,
                option_label: 'label',
                option_key: 'key',
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
                label: 'Grupo solicitante',
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
                label: 'Estado',
                disabled: false,
                helper_text: '',
                select_options: list_status,
                option_label: 'label',
                option_key: 'key',
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
        </Grid>
      </Grid>
    </>
  );
}
