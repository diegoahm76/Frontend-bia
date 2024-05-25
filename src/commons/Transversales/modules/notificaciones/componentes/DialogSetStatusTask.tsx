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
import { get_estados_notificacion } from '../store/thunks/notificacionesThunks';

interface IProps {
  action: any;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  flag?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogSetStatusTask = ({
  action,
  is_modal_active,
  set_is_modal_active,
  flag,
}: IProps) => {
  const dispatch = useAppDispatch();

  const {
    notification_per_request,
    estados_notificacion,
    notification_request,
  } = useAppSelector((state) => state.notificaciones_slice);
  useEffect(() => {
    void dispatch(get_estados_notificacion());
  }, []);

  const {
    control: control_detail,
    handleSubmit: handle_submit,
    reset: reset_detail,
    watch,
  } = useForm<any>();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };
  const action_aux: any = (data: any) => {
    handle_close_add_bien();
    action(data);
  };
  return (
    <Dialog
      maxWidth="xs"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box component="form">
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title
            title={
              flag
                ? 'Actualizar estado de solicitud'
                : 'Actualizar estado de tarea '
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
              form_inputs={[
                {
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_detail,
                  control_name: 'id_estado',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: flag ? 'Estado de solicitud' : 'Estado de tarea',
                  type: 'text',
                  disabled: false,
                  helper_text: '',
                  select_options: flag
                    ? [
                        { label: 'Recibida', key: 'RE' },
                        { label: 'Devuelto', key: 'DE' },
                        { label: 'En Gestión', key: 'EG' },
                        { label: 'Pendiente', key: 'PE' },
                        { label: 'Notificado', key: 'NT' },
                      ]
                    : estados_notificacion?.filter(
                        (objeto: any) =>
                          objeto.cod_tipo_notificacion_correspondencia ===
                          notification_per_request?.id_tipo_notificacion_correspondencia
                      ),
                  option_label: flag ? 'label' : 'nombre',
                  option_key: flag
                    ? 'key'
                    : 'id_estado_notificacion_correspondencia',
                },
              ]}
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
            <Button
              color="primary"
              variant="contained"
              onClick={handle_submit(action_aux)}
              startIcon={null}
            >
              Actualizar estado
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogSetStatusTask;
