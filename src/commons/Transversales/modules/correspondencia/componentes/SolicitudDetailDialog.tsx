import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../../components';
import type {
  IObjNotificationPerRequest,
  IObjNotificationRequest,
} from '../interfaces/notificaciones';

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudDetailDialog = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useAppDispatch();

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
    notification_per_request,
    list_status_asignation,
  } = useAppSelector((state) => state.notificaciones_slice);

  const {
    control: control_detail,
    handleSubmit: handle_submit,
    reset: reset_detail,
    watch,
  } = useForm<IObjNotificationRequest | IObjNotificationPerRequest>();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    if (notification_request !== null) {
      reset_detail(notification_request);
    }
  }, [notification_request]);
  useEffect(() => {
    if (notification_per_request !== null) {
      reset_detail(notification_per_request);
    }
  }, [notification_per_request]);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box component="form">
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title
            title={
              action === `request`
                ? 'Resumen del registro de tarea'
                : 'Resumen solicitid de correspondencia'
            }
          />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <PrimaryForm
              show_button={false}
              on_submit_form={null}
              button_submit_label=""
              button_submit_icon_class={null}
              form_inputs={
                action === 'request'
                  ? [
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'funcionario_asignado',
                        default_value: '',
                        rules: {},
                        label: 'Funcionario asignado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'cod_estado_asignacion',
                        default_value: '',
                        rules: {},
                        label: 'Estado de asignación',
                        type: 'text',
                        select_options: list_status_asignation,
                        option_label: 'label',
                        option_key: 'key',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'fecha_asignacion',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de asignacion',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'persona_a_quien_se_dirige',
                        default_value: '',
                        rules: {},
                        label: 'Persona a quien se dirije',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'estado_registro',
                        default_value: '',
                        rules: {},
                        label: 'Estado solicitud',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'fecha_registro',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de asignacion',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                    ]
                  : [
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'funcionario_asignado',
                        default_value: '',
                        rules: {},
                        label: 'Funcionario asignado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'cod_estado_asignacion',
                        default_value: '',
                        rules: {},
                        label: 'Estado de asignación',
                        type: 'text',
                        select_options: list_status_asignation,
                        option_label: 'label',
                        option_key: 'key',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'fecha_asignacion',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de asignacion',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'persona_a_quien_se_dirige',
                        default_value: '',
                        rules: {},
                        label: 'Persona a quien se dirije',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'estado_solicitud',
                        default_value: '',
                        rules: {},
                        label: 'Estado solicitud',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'fecha_registro',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de asignacion',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },

                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'nombre_tipo_documento',
                        default_value: '',
                        rules: {},
                        label: 'Tipo documento',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'expediente',
                        default_value: '',
                        rules: {},
                        label: 'Expediente',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'email_notificacion',
                        default_value: '',
                        rules: {},
                        label: 'Email notificación',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'dir_notificacion_nal',
                        default_value: '',
                        rules: {},
                        label: 'Dirección notificación',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'tel_celular',
                        default_value: '',
                        rules: {},
                        label: 'Celular',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'tel_fijo',
                        default_value: '',
                        rules: {},
                        label: 'Fijo',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'asunto',
                        default_value: '',
                        rules: {},
                        label: 'Asunto',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 12,
                        control_form: control_detail,
                        control_name: 'descripcion',
                        default_value: '',
                        rules: {},
                        multiline: true,
                        rows: 4,
                        label: 'Descripción',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                    ]
              }
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handle_close_add_bien}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudDetailDialog;
