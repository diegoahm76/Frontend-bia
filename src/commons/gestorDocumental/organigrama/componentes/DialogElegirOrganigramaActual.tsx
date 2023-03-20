import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
// import { add_organigrams_service } from '../store/thunks/organigramThunks';
// import { useAppDispatch } from '../../../../hooks';

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
const DialogElegirOrganigramaActual = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { handleSubmit: handle_submit } = useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    // void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_crear_organigrama();
  };

  const tipos_unidades = [
    {
      value: '1',
      label: 'Test',
    },
    {
      value: 'EUR',
      label: 'Test',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  return (
    <Dialog
      maxWidth="xs"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Elegir organigrama actual
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
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container sx={{ mb: '0px' }}>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <TextField
                name="tipoUnidad"
                select
                label="Organigrama"
                defaultValue="Seleccione"
                helperText="Elegir un organigrama"
                size="small"
                fullWidth
              >
                {tipos_unidades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <TextField
                name="tipoUnidad"
                select
                label="CCD"
                defaultValue="Seleccione"
                helperText="Cuadro de Clasificación Documental"
                size="small"
                fullWidth
              >
                {tipos_unidades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <TextField
                name="tipoUnidad"
                select
                label="TRD"
                defaultValue="Seleccione"
                helperText="Tabla de Retención Documental"
                size="small"
                fullWidth
              >
                {tipos_unidades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="tipoUnidad"
                select
                label="TCA"
                defaultValue="Seleccione"
                helperText="Tabla de Control de Acceso "
                size="small"
                fullWidth
              >
                {tipos_unidades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
              onClick={handle_close_crear_organigrama}
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
export default DialogElegirOrganigramaActual;
