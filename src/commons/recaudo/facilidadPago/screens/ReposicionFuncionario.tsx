/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Add, Close, Save, CloudUpload } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { use_form } from '../../../../hooks/useForm';
import { Title } from '../../../../components/Title';
import { VistaReposicion } from '../componentes/VistaReposicion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReposicionFuncionario: React.FC = () => {
  const { form_state, on_input_change } = use_form({});
  const [file, set_file] = useState({});
  const [file_name, set_file_name] = useState('');
  const navigate = useNavigate();

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file(selected_file);
      set_file_name(selected_file.name);
    }
  };

  return (
    <>
      <Title title='Ver Recurso de Reposición - Usuario Interno Cormacarena'/>
      <VistaReposicion />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <h3>Respuesta de Cormacarena</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Asignar Estado</InputLabel>
                  <Select
                    label="Asignar Estado"
                    defaultValue={''}
                    name='estado'
                    onChange={on_input_change}
                  >
                    <MenuItem value="ingresado">Ingresado</MenuItem>
                    <MenuItem value="revision">En revisión</MenuItem>
                    <MenuItem value="anulado">Cancelado/Anulado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  {file_name !== '' ? file_name : 'Cargar Oficio Respuesta'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='oficio_respuesta'
                      onChange={handle_file_selected}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  label="Observación"
                  helperText="Escribe una observación"
                  size="small"
                  fullWidth
                  name='observacion'
                  onChange={on_input_change}
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent='flex-end'
              spacing={2}
              sx={{ mb: '20px', mt: '30px' }}
            >
              <Grid item xs={12} sm={2.4}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<Add />}
                  onClick={() => {
                    navigate('../notificaciones/creacion')
                  }}
                >
                  Crear Notificación
                </Button>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<Close />}
                  onClick={() => {}}
                >
                  Cerrar
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<Save />}
                  onClick={()=>{}}
                >
                  Actualizar Facilidad de Pagos
                </Button>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
