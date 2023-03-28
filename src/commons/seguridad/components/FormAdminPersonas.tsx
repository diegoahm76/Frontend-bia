import { type Dispatch, type SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import { Title } from '../../../components/Title';
import DialogBusquedaAvanzada from './DialogBusquedaAvanzada';
import DialogGeneradorDeDirecciones from './DialogGeneradorDeDirecciones';

interface IProps {
  set_position_tab_admin_personas: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormAdminPersonas = ({
  set_position_tab_admin_personas,
}: IProps): JSX.Element => {
  const [busqueda_avanzada_is_active, set_busqueda_avanzada_is_active] =
    useState<boolean>(false);
  const [
    generador_de_direcciones_is_active,
    set_generador_de_direcciones_is_active,
  ] = useState<boolean>(false);

  const tipos_documentos = [
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
    <>
      <Grid item xs={12}>
        <Title title="DATOS PERSONALES" />
        <Box sx={{ m: '20px 0' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Tipo de documento"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Número de documento"
                  variant="outlined"
                  // disabled={organigram_current.fecha_terminado !== null}
                  // value={value}
                  // onChange={onChange}
                  // error={!(error == null)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  control={<Checkbox checked={true} name="nombre_comercial" />}
                  label="¿Requiere nombre comercial?"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Digito de verificación"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Nombre comercial"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Primer nombre"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Segundo nombre"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Primer apellido"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Segundo apellido"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Sexo"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Estado civil"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Fecha de nacimiento"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="País de nacimiento"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Title title="LUGAR DE RESIDENCIA" />
        <Box sx={{ m: '20px 0' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="País de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento de residencia"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => {
                    set_generador_de_direcciones_is_active(true);
                  }}
                >
                  AGREGAR DIRECCIÓN
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="tipoUnidad"
                  label="Dirección completa"
                  fullWidth
                  multiline
                  maxRows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Title title="DATOS LABORALES" />
        <Box sx={{ m: '20px 0' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento donde labora"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Municipio donde labora"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  label="Email empresarial"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  label="Teléfono empresa"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" fullWidth startIcon={<AddIcon />}>
                  AGREGAR DIRECCIÓN LABORAL
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="tipoUnidad"
                  label="Dirección completa"
                  fullWidth
                  multiline
                  maxRows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Title title="DATOS DE NOTIFICACIÓN" />
        <Box sx={{ m: '20px 0' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Departamento de notificación"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Municipio de notificación"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="tipoUnidad"
                  label="Email"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="tipoUnidad"
                  label="Indicativo"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="tipoUnidad"
                  label="Celular"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" fullWidth startIcon={<AddIcon />}>
                  AGREGAR DIRECCIÓN NOTIFICACIÓN
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="tipoUnidad"
                  label="Dirección de notificación"
                  fullWidth
                  multiline
                  maxRows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      <DialogBusquedaAvanzada
        is_modal_active={busqueda_avanzada_is_active}
        set_is_modal_active={set_busqueda_avanzada_is_active}
      />
      <DialogGeneradorDeDirecciones
        is_modal_active={generador_de_direcciones_is_active}
        set_is_modal_active={set_generador_de_direcciones_is_active}
      />
    </>
  );
};
