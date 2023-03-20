import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  nombre: string;
  version: string;
  descripcion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogGeneradorDeDirecciones = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { handleSubmit: handle_submit } = useForm<FormValues>();

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    // void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_busqueda_avanzada();
  };

  return (
    <Dialog
      maxWidth="lg"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Generador de direcciones
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Title title="DIRECCIÓN DE RESIDENCIA" />
          <Box component="form" sx={{ mt: '20px' }}>
            <Grid container sx={{ mb: '0px' }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="tipoUnidad"
                  label="Primer nombre"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
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
              onClick={handle_close_busqueda_avanzada}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogGeneradorDeDirecciones;
