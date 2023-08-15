import { type Dispatch, type SetStateAction } from 'react';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CheckCircle, Close } from '@mui/icons-material';
import dayjs from 'dayjs';

interface IProps {
  titulo_notificacion: string;
  tipo: string;
  numero_registro: any;
  abrir_modal: boolean;
  abrir_dialog: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogoRegistro: React.FC<IProps> = (props: IProps) => {
  const handle_close = (): void => {
    props.abrir_dialog(false);
  }

  return (
    <div>
      <Dialog
        open={props.abrir_modal}
        onClose={handle_close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo_notificacion}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid item textAlign="center" xs={12}>
                <CheckCircle style={{ color: "#23FE25", fontSize: "60px" }} />
              </Grid>
              <Grid item textAlign="center" xs={12}>
                {
                  props.numero_registro !== undefined ? <p><strong>Número de {props.tipo}:</strong> {props.numero_registro}</p> : null
                }
                <p><strong>Fecha y Hora:</strong> {dayjs(Date()).format('DD/MM/YYYY')} - {dayjs(Date()).hour()}:{dayjs(Date()).minute()} horas</p>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            startIcon={<Close />}
            variant='outlined'
            onClick={handle_close}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
