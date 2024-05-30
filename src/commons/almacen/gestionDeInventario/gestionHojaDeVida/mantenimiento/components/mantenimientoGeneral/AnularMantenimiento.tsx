import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../../hooks";
import { override_maintenance } from "./thunks/maintenanceThunks";
import { control_error } from "../../../../../../../helpers";
interface IProps {
  is_modal_active: boolean,
  set_is_modal_active: Dispatch<SetStateAction<boolean>>,
  title: string,
  user_info: any,
  id_programado: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AnularMantenimientoComponent = ({ is_modal_active, set_is_modal_active, title, user_info, id_programado }: IProps) => {
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
    // const object_formulario = { id_mantenimiento: id_programado, id_funcionario: user_info.id_usuario, fecha_anulacion: fecha, motivo_anulacion: motivo };
    dispatch(override_maintenance(id_programado, { justificacion_anulacion: motivo })).then((response: { success: boolean, detail: string }) => {
      if (response.success) {
        // navigate('/home');
        set_is_modal_active(false);
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
      open={is_modal_active}
      onClose={() => { set_is_modal_active(false); }}
    >
      <DialogTitle>{title}</DialogTitle>
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
                  label="Funcionario"
                  helperText=" "
                  size="small"
                  required
                  fullWidth
                  value={user_info.nombre}
                  disabled={true}
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
                  label="Motivo"
                  helperText="Ingrese el motivo"
                  size="small"
                  required
                  fullWidth
                  onBlur={on_change_motivo} />
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
          onClick={() => { set_is_modal_active(false); }}>Cancelar</Button>
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
export default AnularMantenimientoComponent;