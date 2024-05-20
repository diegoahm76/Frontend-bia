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
import ListadoAnexos from './ListadoAnexos';
import FormButton from '../../../../../components/partials/form/FormButton';

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const GestionarTareaDialog = ({
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

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box component="form">
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title={'Gestionar tarea de notificación'} />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            {notification_request?.tipo_documento
              ?.aplica_para_publicaciones && (
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
            )}
            {notification_request?.tipo_documento
              ?.aplica_para_notificaciones_publicaciones && (
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
            )}
            {notification_request?.tipo_documento
              ?.aplica_para_comunicaciones && (
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
            )}
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
export default GestionarTareaDialog;
