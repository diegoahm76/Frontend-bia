/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { Title } from '../../../../../../components';
import { useEffect, useState } from 'react';

export const ModalConfirmacionMail: React.FC<any> = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) => {
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [error, setError] = useState(false);
  const handleClick = async () => {
    // const emailEnviado = await enviarEmail(); // Reemplaza esto con la llamada a tu servicio de correo electrónico
    // if (emailEnviado) {
    // }
    setError(false);
    setTiempoRestante(120);
  };

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setTiempoRestante((prevTiempoRestante) => {
          if (prevTiempoRestante === 1) {
            setError(true);
          }
          return prevTiempoRestante - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setTiempoRestante(120);
  };

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogContent>
          <Title title="Confirmación Firma" />
          <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
            <Grid item xs={12}>
              <TextField
                label="Código Confirmación"
                variant="outlined"
                fullWidth
                size="small"
                error={error}
                helperText={
                  error
                    ? 'Por favor, solicita un nuevo código.'
                    : 'Ingrese el código de confirmación enviado a su correo'
                }
                // value={numero_documento}
                // onchange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              {tiempoRestante > 0 ? (
                <Typography variant="subtitle2">
                  Tiempo restante: {tiempoRestante} segundos
                </Typography>
              ) : (
                <Typography variant="subtitle2">
                  El tiempo ha expirado.{' '}
                  <Button onClick={handleClick}>Reenviar código</Button>
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            // onClick={clean_form}
          >
            Enviar
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ m: '1rem' }}
            startIcon={<ClearIcon />}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
