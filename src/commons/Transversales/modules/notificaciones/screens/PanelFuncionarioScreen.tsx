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
export function PanelFuncionarioScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const columns_pqrs: ColumnProps[] = [
    {
      headerStyle: { width: '4rem' },
      field: 'cod_tipo_PQRSDF',
      header: 'Tipo de notificación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.cod_tipo_PQRSDF}
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'fecha_registro',
      header: 'Funcionario asignado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(rowData.fecha_registro).toDateString()}
        </div>
      ),
      style: { width: 150 },
    },
    {
      headerStyle: { width: '4rem' },
      field: 'fecha_radicado',
      header: 'fecha de la asignación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_radicado === null
            ? '-'
            : new Date(rowData.fecha_radicado).toDateString()}
        </div>
      ),
    },
    {
      headerStyle: { width: '4rem' },
      field: 'numero_radicado_entrada',
      header: 'Fecha de finalizado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
        </div>
      ),
    },

    {
      field: 'nombre_estado_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Dias para finalizar',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
        </div>
      ),
    },

    {
      field: 'nombre_estado_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Estado de la tarea',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
        </div>
      ),
    },
    {
      field: 'nombre_estado_solicitud',
      headerStyle: { width: '4rem' },
      header: 'Estado de asignación de tarea',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
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
  const columns_solicitud: ColumnProps[] = [
    {
      field: 'nombre_tipo_oficio',
      header: 'Tipo de acción',
      sortable: false,
    },
    {
      field: 'fecha_radicado_salida',
      header: 'Funcionario asignado',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.fecha_radicado_salida === null
            ? '-'
            : new Date(rowData.fecha_radicado).toDateString()}
        </div>
      ),
    },
    {
      field: 'numero_radicado_salida',
      header: 'Fecha de la asignación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_salida === ''
            ? 'SIN RADICAR'
            : rowData.numero_radicado_salida}
        </div>
      ),
    },

    {
      field: 'fecha_solicitud',
      header: 'Fecha de finalizada',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(rowData.fecha_solicitud).toDateString()}
        </div>
      ),
    },

    {
      field: 'nombre_und_org_oficina_solicita',
      header: 'dias para finalizar',
      sortable: false,
    },
    {
      field: 'nombre_und_org_oficina_solicita',
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
      column_id: 'id_PQRSDF',
      level: 0,
      columns: columns_pqrs,
      table_name: 'Tareas de notificación asignadas',
      property_name: '',
    },
    {
      column_id: 'id_solicitud_al_usuario_sobre_pqrsdf',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Tipo de acción',
      property_name: 'solicitudes_pqr',
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
  } = useForm<any>();
  useEffect(() => {
    setExpandedRows(undefined);
    set_button_option('');
    setSelectedPqr({});
    set_detail_is_active(false);
  }, []);

  // Notificaciones
  const [titulo_notificacion, set_titulo_notificacion] = useState<string>('');
  const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>('');
  const [tipo_notificacion, set_tipo_notificacion] = useState<string>('');
  const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
  const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] =
    useState<boolean>(false);

  const generar_notificación_reporte = (
    titulo: string,
    tipo: string,
    mensaje: string,
    active: boolean
  ) => {
    set_titulo_notificacion(titulo);
    set_tipo_notificacion(tipo);
    set_mensaje_notificacion(mensaje);
    set_dialog_notificaciones_is_active(active);
    set_abrir_modal(active);
  };

  const reporte_evolucion_lote_fc: () => void = () => {
    generar_notificación_reporte(
      'Notificación',
      'warn',
      '¿Estas seguro de devolver o rechazar la solicitud?',
      true
    );
  };
  const columns_list: GridColDef[] = [
    {
      field: 'tipo_documento',
      headerName: 'Funcionario',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_documento',
      headerName: 'Vigencia del contrato',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_completo',
      headerName: 'Tareas asignadas',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'tipo_persona',
      headerName: 'Tareas resueltas',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'tipo_persona_1',
      headerName: 'Pendientes',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
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
          <Title title="Panel de funcionario - Lista de tareas asignadas por notificación"></Title>
          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={12}>
              <h3>
                Acciones de publicaciones en página de actos administrativos
              </h3>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Publicar en página - Gaceta'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Publicar en página - Edictos'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Generar constancia'}
                type_button="button"
                color_button="success"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={12}>
              <h3>Acciones de notificación de actos administrativos</h3>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Notificación personal'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Notificación por correo electrónico'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Notificación por medio fisico'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Notificación por publicación en pagina'}
                type_button="button"
                color_button="success"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={12}>
              <h3>Acciones de comunicaciones de actos administrativos</h3>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Comunicar por correo electrónico'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Notificación por medio fisico'}
                type_button="button"
                color_button="success"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Generar constancia'}
                type_button="button"
                color_button="success"
              />
            </Grid>
          </Grid>

          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              { datum_type: 'title', title_label: 'Buscar' },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de Tarea',
                disabled: false,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Estado de asignación de la tarea',
                disabled: false,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Estado de la tarea',
                disabled: false,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 2,
                label: 'Buscar',
                type_button: 'button',
                disabled: false,
                variant_button: 'contained',
                on_click_function: null,
                color_button: 'primary',
              },
            ]}
          />
        </Grid>

        <TableRowExpansion
          products={[]}
          definition_levels={definition_levels}
          selectedItem={selectedPqr}
          setSelectedItem={setSelectedPqr}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          onRowToggleFunction={null}
        />
      </Grid>
    </>
  );
}
