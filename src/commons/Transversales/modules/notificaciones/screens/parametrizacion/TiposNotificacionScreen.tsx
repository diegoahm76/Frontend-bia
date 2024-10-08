/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Chip, Grid, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Title } from '../../../../../../components/Title';
import BuscarModelo from '../../../../../../components/partials/getModels/BuscarModelo';
import TableRowExpansion from '../../../../../../components/partials/form/TableRowExpansion';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { type ColumnProps } from 'primereact/column';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import PrimaryForm from '../../../../../../components/partials/form/PrimaryForm';
import ListadoAnexos from '../../../../../gestorDocumental/CentralDigitalizacion/componentes/CentralDigitalizacion/ListadoAnexos';
import FormButton from '../../../../../../components/partials/form/FormButton';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';
import { IObjNotificacionType } from '../../interfaces/notificaciones';
import {
  add_tipo_notificacion,
  delete_tipo_notificacion,
  edit_tipo_notificacion,
  get_tipos_notificacion,
} from '../../store/thunks/notificacionesThunks';
import {
  set_tipo_notificacion,
  reset_state,
} from '../../store/slice/notificacionesSlice';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
export function TiposNotificacionScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [checked_activo, set_checked_activo] = useState(false);
  const columns_pqrs: ColumnProps[] = [
    {
      headerStyle: { width: '4rem' },
      field: 'cod_tipo_PQRSDF',
      header: 'Tipo de documento',
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
      header: 'Asunto',
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
      header: 'Expediente',
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
      header: 'Grupo solicitante',
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
      header: 'Funcionario solicitante',
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
      header: 'Fecha de la solicitud',
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
      header: 'Fecha de finalizacion',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {rowData.numero_radicado_entrada ?? 'SIN RADICAR'}
        </div>
      ),
    },
    {
      field: 'Dias Faltantes',
      headerStyle: { width: '4rem' },
      header: 'Fecha de la solicitud',
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
      header: 'Aceptado',
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
      header: 'Medio de solicitud',
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
      header: 'Estado',
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
      header: 'Tipo de gestión',
      sortable: false,
    },
    {
      field: 'fecha_radicado_salida',
      header: 'Número de oficio o requerimiento',
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
      header: 'Radicado',
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
      header: 'Fecha de asignación',
      sortable: false,
      body: (rowData) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(rowData.fecha_solicitud).toDateString()}
        </div>
      ),
    },

    {
      field: 'nombre_und_org_oficina_solicita',
      header: 'Plazo de entrega',
      sortable: false,
    },
    {
      field: 'nombre_und_org_oficina_solicita',
      header: 'Días restantes',
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
      table_name: 'Solicitudes de notificación',
      property_name: '',
    },
    {
      column_id: 'id_solicitud_al_usuario_sobre_pqrsdf',
      level: 1,
      columns: columns_solicitud,
      table_name: 'Registro de notificación por solicitud',
      property_name: 'solicitudes_pqr',
    },
  ];
  const { tipo_notificacion, tipos_notificacion } = useAppSelector(
    (state) => state.notificaciones_slice
  );
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
  const [action, set_action] = useState<string>('crear');

  useEffect(() => {
    setExpandedRows(undefined);
    set_button_option('');
    setSelectedPqr({});
    set_detail_is_active(false);
    void dispatch(get_tipos_notificacion());
  }, []);
  useEffect(() => {
    reset_notificacion(tipo_notificacion);
    if (
      tipo_notificacion?.activo !== null &&
      tipo_notificacion?.activo !== undefined
    ) {
      set_checked_activo(tipo_notificacion?.activo);
    }
  }, [tipo_notificacion]);
  const columns_list: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'aplica_para_notificaciones',
      headerName: 'Aplica notificación',
      width: 150,
      renderCell: (params) => {
        return params.row.aplica_para_notificaciones === true ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'aplica_para_correspondencia',
      headerName: 'Aplica correspondencia',
      width: 150,
      renderCell: (params) => {
        return params.row.aplica_para_correspondencia === true ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },

    {
      field: 'tiempo_en_dias',
      headerName: 'Días permitidos',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'registro_precargado',
      headerName: 'Precargado',
      width: 150,
      renderCell: (params) => {
        return params.row.registro_precargado === true ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'activo',
      headerName: '¿Activo?',
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return params.row.activo === true ? (
          <Chip
            size="small"
            label="Activo"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="Inactivo"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'item_ya_usado',
      headerName: '¿Usado?',
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return params.row.item_ya_usado === true ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.item_ya_usado ? null : (
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  dispatch(
                    set_tipo_notificacion({
                      ...params.row,
                      aplica_para: [
                        params.row.aplica_para_correspondencia &&
                          'correspondencia',
                        params.row.aplica_para_notificaciones &&
                          'notificaciones',
                      ],
                      accion: params.row.publicar_pagina_gaceta
                        ? 'a'
                        : params.row.publicar_pagina_edictos
                        ? 'b'
                        : params.row.notificacion_correo_electronico
                        ? 'c'
                        : params.row.notificacion_medio_fisico
                        ? 'd'
                        : params.row.notificacion_personal
                        ? 'e'
                        : null,
                    })
                  );
                  set_action('editar');
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
                  <EditIcon
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
          {/* <Tooltip title={params.row.activo ? "Desactivar" : "Activar"}>
            <IconButton
              onClick={() => {
                dispatch(activate_deactivate_marca_service(params.row.id_marca, params.row));// true -> activar false -> desactivar

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
                {params.row.activo ?
                  <BlockIcon // icon desactivar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  /> :
                  <DoneOutlineIcon // icon activar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                }

              </Avatar>
            </IconButton>
          </Tooltip> */}
          {params.row.item_ya_usado ? null : (
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  dispatch(delete_tipo_notificacion(params.row));
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
                  <DeleteIcon
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
      ),
    },
  ];

  const on_submit = (data: IObjNotificacionType): void => {
    if (
      tipo_notificacion?.id_tipo_notificacion_correspondencia !== null &&
      tipo_notificacion?.id_tipo_notificacion_correspondencia !== undefined
    ) {
      set_action('editar');
      if (data.aplica_para !== null && data.aplica_para !== undefined) {
        const data_edit: IObjNotificacionType = {
          ...data,
          aplica_para_correspondencia:
            data.aplica_para.includes('correspondencia'),
          aplica_para_notificaciones:
            data.aplica_para.includes('notificaciones'),
          item_ya_usado: false,
          registro_precargado: false,
          activo: checked_activo,
          publicar_pagina_gaceta: data.accion === 'a',
          publicar_pagina_edictos: data.accion === 'b',
          notificacion_correo_electronico: data.accion === 'c',
          notificacion_medio_fisico: data.accion === 'd',
          notificacion_personal: data.accion === 'e',
          publicacion_por_aviso: data.accion === 'f',
        };
        void dispatch(edit_tipo_notificacion(data_edit));
      }
    } else {
      set_action('crear');
      if (data.aplica_para !== null && data.aplica_para !== undefined) {
        const data_edit: IObjNotificacionType = {
          ...data,
          aplica_para_correspondencia:
            data.aplica_para.includes('correspondencia'),
          aplica_para_notificaciones:
            data.aplica_para.includes('notificaciones'),
          item_ya_usado: false,
          registro_precargado: false,
          activo: checked_activo,
          publicar_pagina_gaceta: data.accion === 'a',
          publicar_pagina_edictos: data.accion === 'b',
          notificacion_correo_electronico: data.accion === 'c',
          notificacion_medio_fisico: data.accion === 'd',
          notificacion_personal: data.accion === 'e',
          publicacion_por_aviso: data.accion === 'f',
        };
        void dispatch(add_tipo_notificacion(data_edit));
      }
    }
  };
  const [notificaciones, set_notificaciones] = useState<boolean>(false);

  const on_change_select = (value: any, name: string): void => {
    if (name === 'aplica_para') {
      console.log(value);
      if (value !== undefined) {
        if (value.includes('notificaciones')) {
          set_notificaciones(true);
        } else {
          set_notificaciones(false);
        }
      }
    }
  };
  const descartar = (): void => {
    dispatch(
      set_tipo_notificacion({
        ...tipo_notificacion,
        nombre: null,
        activo: null,
        aplica_para: [],
        habiles_o_calendario: null,
        tiempo_en_dias: null,
        accion: null,
      })
    );
    set_action('crear');
    set_checked_activo(false);
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
          <Title title="Tipos de notificaciones y/o correspondencias"></Title>
          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: 'Nuevo registro',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'aplica_para',
                default_value: [],
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Aplica a:',
                disabled: false,
                helper_text: '',
                multiple: true,
                select_options: [
                  { label: 'Notificaciones', key: 'notificaciones' },
                  { label: 'Correspondencia', key: 'correspondencia' },
                ],
                option_label: 'label',
                option_key: 'key',
                on_change_function: on_change_select,
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'nombre',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Nombre',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'accion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acción relacionada:',
                disabled: false,
                helper_text: '',
                select_options: [
                  { label: 'Publicar en gaceta', key: 'a' },
                  { label: 'Publicar edicto', key: 'b' },
                  { label: 'Correo electronico', key: 'c' },
                  { label: 'Correspondencia fisica', key: 'd' },
                  { label: 'Notificacion personal', key: 'e' },
                  { label: 'Publicación por aviso', key: 'f' },
                ],
                option_label: 'label',
                option_key: 'key',
                hidden_text: !notificaciones,
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tiempo_en_dias',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Días maximos permitidos',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'habiles_o_calendario',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo',
                disabled: false,
                helper_text: '',
                select_options: [
                  { label: 'Días habiles', key: 'H' },
                  { label: 'Días calendario', key: 'C' },
                ],
                option_label: 'label',
                option_key: 'key',
              },

              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'activo',
                default_value: checked_activo,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Activo',
                disabled: false,
                helper_text: '',
                checked: checked_activo,
                set_checked: set_checked_activo,
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
                on_click_function: descartar,
                color_button: 'error',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: action,
                type_button: 'button',
                disabled: false,
                variant_button: 'contained',
                on_click_function: handle_submit_notificacion(on_submit),
                color_button: 'success',
              },
            ]}
          />
          <DataGrid
            density="compact"
            autoHeight
            rows={tipos_notificacion || []}
            columns={columns_list}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) =>
              row['id_tipo_notificacion_correspondencia' ?? uuid()] === null
                ? uuid()
                : row['id_tipo_notificacion_correspondencia' ?? uuid()]
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
