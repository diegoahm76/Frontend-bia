import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../hooks";
import { anular_entrega } from "../thunks/EntregaBienes";
import { control_error } from "../../../../../../helpers";

interface IProps {
  is_modal_active: boolean,
  set_is_modal_active: Dispatch<SetStateAction<boolean>>,
  title: string,
  user_info: any,
  id_entrega: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AnularEntregaComponent = (props: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fecha, set_fecha] = useState<Date | null>(dayjs().toDate());
  const [motivo, set_motivo] = useState<string>("");

  const handle_change_fecha = (date: Date | null): void => {
    set_fecha(date);
  };

  const on_change_motivo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_motivo(e.target.value);
  };

  const guardar_anulacion = (): void => {
    dispatch(anular_entrega(props.id_entrega, { entrada_anulada: props.id_entrega,justificacion_anulacion: motivo })).then((response: { success: boolean, detail: string }) => {
      if (response.success) {
        navigate('/home');
        props.set_is_modal_active(false);
      }
    }).catch((error: any) =>{
      control_error(error);
    })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.is_modal_active}
      onClose={() => { props.set_is_modal_active(false); }}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Número entrega"
                  helperText=" "
                  size="small"
                  required
                  fullWidth
                  value={props.id_entrega}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha"
                    value={fecha}
                    onChange={(newValue) => { handle_change_fecha(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                      />
                    )}
                    readOnly={true}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={4}
                  label="Motivo o justificación"
                  helperText="Ingrese el motivo o justificación"
                  size="small"
                  required
                  fullWidth
                  onBlur={on_change_motivo} />
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                   <strong>{"Anulado por:"}</strong>
                                   {props.user_info.nombre}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='inherit'
          variant='contained'
          startIcon={<ClearIcon />}
          onClick={() => { props.set_is_modal_active(false); }}>Cancelar</Button>
        <Button
          color='primary'
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={guardar_anulacion}>Anular</Button>
      </DialogActions>
    </Dialog>
  )
}
// eslint-disable-next-line no-restricted-syntax
export default AnularEntregaComponent;