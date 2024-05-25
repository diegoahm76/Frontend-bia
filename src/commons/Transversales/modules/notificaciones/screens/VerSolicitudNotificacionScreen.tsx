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
import ListadoAnexos from '../componentes/ListadoAnexos';
import FormButton from '../../../../../components/partials/form/FormButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
  aceptar_rechazar_solicitud_notificacion_service,
  get_solicitud_notificacion_id_service,
} from '../store/thunks/notificacionesThunks';
import DialogRechazo from '../componentes/DialogRechazo';
import { AuthSlice } from '../../../../auth/interfaces';
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
export function VerSolicitudNotificacionScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    notification_requests,
    list_document_types,
    list_status,
    list_groups,
    notification_request,
    tipos_notificacion,
    person,
    persons,
    list_status_asignation,
  } = useAppSelector((state) => state.notificaciones_slice);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);
  const [rechazo_solicitud_is_active, set_rechazo_solicitud_is_active] =
    useState<boolean>(false);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
  } = useForm<any>();
  useEffect(() => {
    if (notification_request !== null) {
      if (
        notification_request.id_notificacion_correspondencia !== null &&
        notification_request.id_notificacion_correspondencia !== undefined
      ) {
        void dispatch(
          get_solicitud_notificacion_id_service(
            notification_request.id_notificacion_correspondencia
          )
        );
      }
    }
    set_detail_is_active(false);
  }, []);
  const rechazar_solicitud_notificacion: any = (data: any) => {
    void dispatch(
      aceptar_rechazar_solicitud_notificacion_service(
        notification_request?.id_notificacion_correspondencia,
        data.justificacion
      )
    );
  };
  useEffect(() => {
    reset_notificacion(notification_request);
  }, [notification_request]);
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
          <Title title="Ver solicitud de notificación"></Title>
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
                control_form: control_notificacion,
                control_name: 'cod_tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: true,
                helper_text: '',
                select_options: list_document_types,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'expediente',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Expediente',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'tramite',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Solicitud de trámite',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'acto_administrativo',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acto administrativo',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'oficina_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'oficina solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'persona_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Persona solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_solicitud',
                default_value: new Date(),
                rules: {},
                label: 'Fecha de solicitud',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_rta_final_gestion',
                default_value: new Date(),
                rules: {},
                label: 'Fecha de finaliazación',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'procede_recurso_reposicion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Procede recurso de reposición',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: 'Notificado',
                type_button: 'button',
                disabled: true,
                variant_button: 'contained',
                on_click_function: null,
                color_button: 'success',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'funcuinario_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Persona quien notificó',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_solicitud',
                default_value: new Date(),
                rules: {},
                label: 'Fecha de notificación',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
            ]}
          />

          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: 'Datos a quien se dirige',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'cod_tipo_documentoID',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: true,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'nro_documentoID',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Número de identificación',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'persona_a_quien_se_dirige',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Nombre persona o entidad',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'cod_municipio_notificacion_nal',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Municipio',
                disabled: true,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 8,
                control_form: control_notificacion,
                control_name: 'dir_notificacion_nal',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Dirección',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tel_fijo',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Teléfono fijo',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tel_celular',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Celular',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'email_notificacion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Email',
                disabled: true,
                helper_text: '',
              },

              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'permite_notificacion_email',
                default_value: notification_request?.permite_notificacion_email,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label:
                  'El usuario autorizó el correo electrónico para notificaciones',
                disabled: true,
                helper_text: '',
              },
            ]}
          />

          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: 'Datos básicos de la solicitud',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'asunto',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Asunto',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'descripcion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Descripción',
                disabled: true,
                helper_text: '',
                multiline_text: true,
                rows_text: 4,
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'allega_copia_fisica',
                default_value: notification_request?.allega_copia_fisica,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Allega copia física',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'cantidad_anexos',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Cantidad de anexos',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'nro_folios_totales',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Cantidad de folios',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'funcionario_recibe',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Funcionario que recibe',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'requiere_digitalizacion',
                default_value: notification_request?.requiere_digitalizacion,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Requiere digitalización',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'ya_digitizado',
                default_value: notification_request?.ya_digitizado,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Ya digitalizado',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_envio_definitivo_a_digitalizacion',
                default_value: new Date(),
                rules: {},
                label: 'Fecha envio a digitalización',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_digitalizacion_completada',
                default_value: new Date(),
                rules: {},
                label: 'Fecha digitalización completada',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
            ]}
          />
        </Grid>
        <ListadoAnexos />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              disabled={
                notification_request?.id_notificacion_correspondencia ===
                  null ||
                (notification_request?.cod_estado_asignacion ?? 'Re') !==
                  'Re' ||
                notification_request?.justificacion_rechazo !== null
              }
              on_click_function={handle_open_rechazo_solicitud}
              icon_class={<CloseIcon />}
              label={'Rechazar'}
              type_button="button"
              color_button="error"
            />
          </Grid>
          <>
            {/* Validar si la persona logueada es coordinador o funcionario */}
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="outlined"
                disabled={
                  (notification_request?.id_notificacion_correspondencia ===
                    null ||
                    notification_request?.id_persona_asignada !== null) &&
                  (notification_request?.cod_estado_asignacion ?? 'Pe') !== 'Re'
                }
                href={`/#/app/transversal/notificaciones/panel_asignacion_coordinador/`}
                on_click_function={null}
                icon_class={<StarOutlineIcon />}
                label={'Asignar solicitud de notificación'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                disabled={
                  notification_request?.id_persona_asignada !==
                    userinfo.id_persona &&
                  (notification_request?.cod_estado_asignacion ?? 'Pe') !== 'Pe'
                }
                href={`/#/app/transversal/notificaciones/panel_asignacion_tarea_funcionario/`}
                on_click_function={null}
                icon_class={<CheckIcon />}
                label={'Asignar tarea'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </>
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
