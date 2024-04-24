/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Button,
  Stack,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Avatar,
  Fab,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Title } from '../../../../components/Title';
import React from 'react';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../hooks';
import { eviar_correo_radicado } from '../thunks/TramitesOServicios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { control_success } from '../../../../helpers';
const class_css = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};
interface IProps {
  usuario: any;
  usuario_cache: any;
  response_paso_1: any;
  radicado: any;
  set_restablecer: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Radicado: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [limpiar, set_limpiar] = useState<boolean>(false);

  useEffect(() => {
    if (limpiar) {
    }
  }, [limpiar]);

  const volver_enviar_correo = (): void => {
    dispatch(
      eviar_correo_radicado(props.response_paso_1?.id_solicitud_tramite)
    ).then((response: any) => {
      if (response.success) {
        control_success('Correo enviado con éxito');
      }
    });
  };

  return (
    <>
      <Grid item container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            mt: '1.8rem',
            mb: '1.7rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="button" gutterBottom>
            Otro procedimiento administrativo radicado con éxito
          </Typography>
        </Grid>
        <Grid item spacing={2}>
          {props.usuario !== null && (
            <Grid container xs={12} sm={12} sx={{ padding: '10px' }}>
              <Grid item xs={12} sm={12}>
                <Typography noWrap variant="button">
                  {' '}
                  Datos del solicitante{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography noWrap>
                  <Typography sx={{ fontWeight: 410 }}>
                    {props.usuario_cache.nombre}{' '}
                    {/*<strong style={{ fontSize: 11 }}>{'CC' + '1.121.869.905'}</strong>*/}
                  </Typography>
                  {/* <Typography>{'Representante legal de '}</Typography>*/}
                  <Typography sx={{ fontWeight: 410 }}>
                    Unidad organizacional :{' '}
                    {props.usuario_cache.nombre_unidad_organizacional}
                  </Typography>
                  <Typography>
                    {'Cel: ' + props.usuario_cache.telefono_celular}
                  </Typography>
                  <Typography variant="button">
                    Fecha y hora de radicación
                  </Typography>
                  <Typography>
                    {dayjs(props.radicado.fecha_radicado).format(
                      'DD-MM-YYYY HH:mm'
                    )}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center" sx={{ fontWeight: 410 }}>
            Radicado asignado
          </Typography>
          <Paper elevation={1} sx={{ marginTop: 1, bgcolor: 'grey.300' , pt: '17px', pb: '17px', my: '1.23rem'}}>
            <Typography variant="h5" gutterBottom textAlign="center">
              {props?.radicado?.radicado_nuevo ?? ''}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center">
            {`Se envía copia al correo ${
              props?.usuario_cache?.email ?? ''
            }, si no ha llegado puedes volver a enviarlo haciendo clic en el botón volver a enviar.`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} textAlign={'center'} sx= {{my: '1rem'}}>
          <Button
            variant="contained"
            onClick={() => {
              volver_enviar_correo();
            }}
            startIcon={<SendIcon />}
          >
            Volver a enviar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} textAlign={'center'}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              props.set_restablecer(true);
            }}
          >
            Volver al panel del usuario
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
