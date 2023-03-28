import { useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
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
import BusinessIcon from '@mui/icons-material/Business';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { quarantine_nursery_service, closing_nursery_service } from '../store/thunks/gestorViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery as FormValues } from '../interfaces/vivero';

interface IProps {
  action: string,
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AperturaCierreCuarentenaVivero = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {

  const dispatch = useAppDispatch();
  const {current_nursery} = useAppSelector((state) => state.nursery);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_vivero, handleSubmit: handle_submit, reset: reset_nursery } =
    useForm<FormValues>();

  const handle_close_closing_nursery = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_nursery(current_nursery);
    console.log(current_nursery)
  }, [current_nursery]);


  const on_submit = (data: FormValues): void => {
    if(action === "Abrir" || action === "Cerrar")
    {
        const form_data = {
        accion: action,
        justificacion_apertura: data.justificacion_apertura,
        justificacion_cierre: action==="Abrir"?null:data.justificacion_cierre,
        en_funcionamiento: action==="Abrir",
        item_ya_usado: action==="Abrir"?true:data.item_ya_usado
        }
    void dispatch(closing_nursery_service(form_data, data.id_vivero));

    } else {
        const form_data = {
            justificacion_cuarentena: data.justificacion_cuarentena,
        }
    void dispatch(quarantine_nursery_service(form_data, data.id_vivero));
    }
    
    handle_close_closing_nursery();
  };
 


  return (
    <Dialog
      maxWidth="sm"
      open={is_modal_active}
      onClose={handle_close_closing_nursery}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>{action==="Abrir"? "Apertura de vivero": action==="Cerrar"? "Cierre de vivero": action==="cuarentena"? "Iniciar cuarentena en vivero":"Finalizar cuarentena en vivero"}</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Grid item xs={11} md={12} margin={1}>
              <Controller
                name={action==="Abrir"? "justificacion_apertura": action==="Cerrar"? "justificacion_cierre": "justificacion_cuarentena" }
                control={control_vivero}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    label={action==="Abrir"? "Justificación de apertura": action==="Cerrar"? "Justificación de cierre": action==="cuarentena"?"Justificación iniciar cuarentena":"Justificación finalizar cuarentena"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar justificación'
                        : 'Ingrese justificación'
                    }
                  />
                )}
              />
            </Grid>
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
              variant="outlined"
              onClick={handle_close_closing_nursery}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === "Abrir"?
            <Button type="submit" variant="contained" startIcon={<LockOpenIcon />}>
              Realizar Apertura
            </Button>:
            action === "Cerrar"?
            <Button type="submit" variant="contained" startIcon={<LockIcon/>}>
              Realizar cierre
            </Button>:
            action==="cuarentena"?
            <Button type="submit" variant="contained" startIcon={<DomainDisabledIcon/>}>
              iniciar cuarentena
            </Button>:
            <Button type="submit" variant="contained" startIcon={<BusinessIcon />}>
            Finalizar cuarentena
          </Button>
            }
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AperturaCierreCuarentenaVivero;
