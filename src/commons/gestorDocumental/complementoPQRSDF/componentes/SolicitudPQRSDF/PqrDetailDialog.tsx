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
import { IObjPqr, IObjPqrRequest } from '../../interfaces/complemento_pqrsdf';

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PqrDetailDialog = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useAppDispatch();

  const { pqr, pqr_request } = useAppSelector((state) => state.pqrsdf_slice);

  const {
    control: control_detail,
    handleSubmit: handle_submit,
    reset: reset_detail,
    watch,
  } = useForm<IObjPqr | IObjPqrRequest>();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    reset_detail(pqr);
  }, [pqr]);
  useEffect(() => {
    reset_detail(pqr_request);
  }, [pqr_request]);

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
                ? 'Resumen de la solicitud PQRSDF'
                : 'Resumen PQRSDF'
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
                        control_name: 'cod_tipo_PQRSDF',
                        default_value: '',
                        rules: {},
                        label: 'Tipo de solicitud',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 4,
                        control_form: control_detail,
                        control_name: 'notification_at',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de notificación',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'organizational_unit',
                        default_value: '',
                        rules: {},
                        label: 'Grupo solicitante',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'asunto',
                        default_value: '',
                        rules: {},
                        label: 'Asunto',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
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
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'request_number',
                        default_value: '',
                        rules: {},
                        label: 'Número de radicado de salida',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'request_at',
                        default_value: '',
                        rules: {},
                        label: 'Fecha de radicado de salida',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
                      },
                    ]
                  : [
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'cod_tipo_PQRSDF',
                        default_value: '',
                        rules: {},
                        label: 'Tipo de tramite',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'nombre_estado_solicitud',
                        default_value: '',
                        rules: {},
                        label: 'Estado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'nombre_completo_titular',
                        default_value: '',
                        rules: {},
                        label: 'Titular',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'asunto',
                        default_value: '',
                        rules: {},
                        label: 'Asunto',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
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
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'numero_radicado',
                        default_value: '',
                        rules: {},
                        label:
                          pqr.id_radicado === null
                            ? 'NO RADICADA AÚN'
                            : 'Número de radicado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name:
                          pqr.fecha_radicado === null
                            ? 'fecha_registro'
                            : 'fecha_radicado',
                        default_value: '',
                        rules: {},
                        label:
                          pqr.fecha_radicado === null
                            ? 'Fecha de registro'
                            : 'Fecha de radicado',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
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
export default PqrDetailDialog;
