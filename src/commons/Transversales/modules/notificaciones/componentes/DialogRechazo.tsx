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

interface IProps {
  action: any;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogRechazo = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useAppDispatch();

  const { notification_request } = useAppSelector(
    (state) => state.notificaciones_slice
  );

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
          <Title title="Rechazar" />
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
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_detail,
                  control_name: 'justificacion',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Jutificación de rechazo',
                  type: 'text',
                  disabled: false,
                  helper_text: '',
                  multiline_text: true,
                  rows_text: 4,
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
              Rechazar
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogRechazo;
