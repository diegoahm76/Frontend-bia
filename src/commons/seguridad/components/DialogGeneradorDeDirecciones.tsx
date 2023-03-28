import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
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
const ubicacion_options = [
  { label: 'Urbano', value: 'urb' },
  { label: 'Rural', value: 'rur' },
];

const via_principal_options = [
  { label: 'Autopista', value: 'Autopista' },
  { label: 'Avenida', value: 'Avenida' },
  { label: 'Boulevar', value: 'Boulevar' },
  { label: 'Calle', value: 'Calle' },
  { label: 'Carrera', value: 'Carrera' },
  { label: 'Circunvalar', value: 'Circunvalar' },
  { label: 'Diagonal', value: 'Diagonal' },
  { label: 'Kilometro', value: 'Kilometro' },
  { label: 'Sector', value: 'Sector' },
  { label: 'Transversal', value: 'Transversal' },
];

const letras_options = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
  { label: 'I', value: 'I' },
  { label: 'J', value: 'J' },
  { label: 'K', value: 'K' },
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'N', value: 'N' },
  { label: 'O', value: 'O' },
  { label: 'P', value: 'P' },
  { label: 'Q', value: 'Q' },
  { label: 'R', value: 'R' },
  { label: 'S', value: 'S' },
  { label: 'T', value: 'T' },
  { label: 'U', value: 'U' },
  { label: 'V', value: 'V' },
  { label: 'W', value: 'W' },
  { label: 'X', value: 'X' },
  { label: 'Y', value: 'Y' },
  { label: 'Z', value: 'Z' },
];
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
          <Box component="form" sx={{ m: '20px 0' }}>
            <Grid container sx={{ mb: '0px' }} spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="tipoUnidad"
                  label="Dirección actual"
                  defaultValue="Calle 12 #17-39 Barrio Porvenir, San José del Guaviare "
                  fullWidth
                  multiline
                  maxRows={4}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Ubicación"
                  size="small"
                  fullWidth
                >
                  {ubicacion_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Title title="DATOS DE DIRECCIÓN" />
          <Box component="form" sx={{ mt: '20px' }}>
            <Grid container sx={{ mb: '0px' }} spacing={2}>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="principal"
                  select
                  label="Principal"
                  size="small"
                  fullWidth
                >
                  {via_principal_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="numero_o_nombre_via"
                  label="Numero"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="letra_via_principal"
                  select
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={1}>
                <FormControlLabel
                  control={<Checkbox checked={true} name="bis" />}
                  label="Bis"
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Orientación"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  label="Numero"
                  type="number_orientacion"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  label="Numero secundario"
                  type="number_secundario"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Orientación"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Complemento"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="tipoUnidad"
                  label="Adicional"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ mt: '20px' }}>
              <TextField
                name="tipoUnidad"
                label="Dirección estandarizada"
                fullWidth
                multiline
                maxRows={4}
              />
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
