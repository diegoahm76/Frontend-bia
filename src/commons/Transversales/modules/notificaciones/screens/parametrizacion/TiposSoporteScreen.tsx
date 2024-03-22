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
import {
  add_tipo_soporte,
  delete_tipo_soporte,
  edit_tipo_soporte,
  get_causas_notificacion,
  get_tipos_notificacion,
  get_tipos_soporte,
} from '../../store/thunks/notificacionesThunks';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { set_tipo_soporte } from '../../store/slice/notificacionesSlice';
import { IObjSupportType } from '../../interfaces/notificaciones';

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
export function TiposSoporteScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { tipo_soporte, tipos_soporte, tipos_notificacion } = useAppSelector(
    (state) => state.notificaciones_slice
  );
  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
  } = useForm<any>();
  const [action, set_action] = useState<string>('crear');
  const [checked_activo, set_checked_activo] = useState(false);

  useEffect(() => {
    void dispatch(get_tipos_soporte());
    void dispatch(get_tipos_notificacion());
  }, []);
  useEffect(() => {
    reset_notificacion(tipo_soporte);
    if (tipo_soporte?.activo !== null && tipo_soporte?.activo !== undefined) {
      set_checked_activo(tipo_soporte?.activo);
    }
  }, [tipo_soporte]);
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
      field: 'id_tipo_notificacion_correspondencia',
      headerName: 'Tipo de notificacion/correspondencia',
      width: 250,
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
                  dispatch(set_tipo_soporte(params.row));
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
                  dispatch(delete_tipo_soporte(params.row));
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

  const on_submit = (data: IObjSupportType): void => {
    if (
      tipo_soporte?.id_tipo_anexo_soporte !== null &&
      tipo_soporte?.id_tipo_anexo_soporte !== undefined
    ) {
      set_action('editar');
      void dispatch(
        edit_tipo_soporte({
          ...data,
          activo: checked_activo,
          item_ya_usado: false,
          registro_precargado: false,
        })
      );
    } else {
      set_action('crear');
      void dispatch(
        add_tipo_soporte({
          ...data,
          activo: checked_activo,
          item_ya_usado: false,
          registro_precargado: false,
        })
      );
    }
  };
  const descartar = (): void => {
    dispatch(
      set_tipo_soporte({
        ...tipo_soporte,
        nombre: null,
        activo: null,
        id_tipo_notificacion_correspondencia: null,
      })
    );
    set_action('crear');
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
          <Title title="Tipos de soportes para anexos"></Title>
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
                control_name: 'id_tipo_notificacion_correspondencia',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo',
                disabled: false,
                helper_text: '',
                select_options: tipos_notificacion,
                option_label: 'nombre',
                option_key: 'id_tipo_notificacion_correspondencia',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 6,
                control_form: control_notificacion,
                control_name: 'nombre',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Nombre',
                disabled: false,
                helper_text: '',
              },

              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 2,
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
            rows={tipos_soporte || []}
            columns={columns_list}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) =>
              row['id_tipo_anexo_soporte' ?? uuid()] === null
                ? uuid()
                : row['id_tipo_anexo_soporte' ?? uuid()]
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
