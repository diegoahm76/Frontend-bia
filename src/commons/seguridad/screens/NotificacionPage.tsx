import { Button, Checkbox, FormControlLabel, Grid, Stack } from '@mui/material';
import { Title } from '../../../components';
import UpdateIcon from '@mui/icons-material/Update';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { AuthSlice } from '../../auth/interfaces';
import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { control_error } from '../../../helpers';
import { consultar_notificaciones_cuenta_propia } from '../request/Request';
import { DialogAutorizaDatos } from '../../../components/DialogAutorizaDatos';
import type { UpdateAutorizaNotificacion } from '../../../interfaces/globalModels';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionPage: React.FC = () => {

  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [dialog_notificaciones, set_dialog_notificaciones] =
    useState<boolean>(false);

  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handle_submit,
    setValue: set_value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
    watch
  } = useForm();

  const acepta_notificacion_email =
    watch('acepta_notificacion_email') ?? false;
  const acepta_notificacion_sms =
    watch('acepta_notificacion_sms') ?? false;

  const respuesta_autorizacion = (data: UpdateAutorizaNotificacion): void => {
    set_value('acepta_notificacion_email', data.acepta_autorizacion_email);
    set_value('acepta_notificacion_sms', data.acepta_autorizacion_sms);
  };

  // abrir modal actualizar Notificaciones
  const handle_open_dialog_notificaciones = (): void => {
    set_dialog_notificaciones(true);
  };

  const datos_usuario = async (id_persona: number): Promise<void> => {
    try {
      const data = await consultar_notificaciones_cuenta_propia(id_persona);
      console.log(data)
      console.log(data.acepta_notificacion_email)
      set_value('acepta_notificacion_email', data.acepta_notificacion_email)
      set_value('acepta_notificacion_sms', data.acepta_notificacion_sms)
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };

  useEffect(() => {
    void datos_usuario(userinfo.id_persona);
  }, []);


  return (
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
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12}>
          <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="¿Autoriza notificaciones judiciales por correo electrónico?"
            control={
              <Checkbox
                size="small"
                disabled={true}
                checked={acepta_notificacion_email}
                {...register('acepta_notificacion_email')}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="¿Autoriza notificaciones informativas a través de mensajes de texto?"
            control={
              <Checkbox
                size="small"
                disabled={true}
                checked={acepta_notificacion_sms}
                {...register('acepta_notificacion_sms')}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            justifyContent="flex-end"
            sx={{ m: '10px 0 20px 0' }}
            direction="row"
            spacing={2}
          >
            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              onClick={() => {
                handle_open_dialog_notificaciones();
              }}
            >
              Actualizar Notificaciones
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <DialogAutorizaDatos
        is_modal_active={dialog_notificaciones}
        set_is_modal_active={set_dialog_notificaciones}
        id_persona={userinfo?.id_persona ?? 0}
        data_autorizacion={{
          acepta_autorizacion_email: acepta_notificacion_email,
          acepta_autorizacion_sms: acepta_notificacion_sms,
        }}
        on_result={respuesta_autorizacion}
      />
    </Grid>
  );
};
