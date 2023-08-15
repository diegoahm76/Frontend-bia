import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Info, Warning, Error, Close } from '@mui/icons-material';

interface IProps {
  tipo_notificacion: string,
  mensaje_notificacion: string,
  abrir_modal: boolean,
  abrir_dialog: Dispatch<SetStateAction<boolean>>,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogoInformativo: React.FC<IProps> = (props: IProps) => {
  const [tipo_alerta_info, set_tipo_alerta_info] = useState<boolean>(false);
  const [tipo_alerta_warn, set_tipo_alerta_warn] = useState<boolean>(false);
  const [tipo_alerta_error, set_tipo_alerta_error] = useState<boolean>(false);

  const handle_close = (): void => {
    props.abrir_dialog(false);
  }

  useEffect(() => {
    switch (props.tipo_notificacion) {
      case "info":
        set_tipo_alerta_error(false);
        set_tipo_alerta_warn(false);
        set_tipo_alerta_info(true);
        break;
      case "warn":
        set_tipo_alerta_error(false);
        set_tipo_alerta_info(false);
        set_tipo_alerta_warn(true);
        break;
      case "error":
        set_tipo_alerta_warn(false);
        set_tipo_alerta_info(false);
        set_tipo_alerta_error(true);
        break;
    }
  }, [props])

  return (
    <div>
      <Dialog
        open={props.abrir_modal}
        onClose={handle_close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              {
                tipo_alerta_info && (
                  <Grid item textAlign="center" xs={12}>
                    <Info style={{ color: "#009BFF", fontSize: "60px" }} />
                  </Grid>
                )
              }
              {
                tipo_alerta_warn && (
                  <Grid item textAlign="center" xs={12}>
                    <Warning style={{ color: "#FFD800", fontSize: "60px" }} />
                  </Grid>
                )
              }
              {
                tipo_alerta_error && (
                  <Grid item textAlign="center" xs={12}>
                    <Error style={{ color: "#FF0000", fontSize: "60px" }} />
                  </Grid>
                )
              }
              <Grid item textAlign="center" xs={12}>
                <strong>{props.mensaje_notificacion}</strong>
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
