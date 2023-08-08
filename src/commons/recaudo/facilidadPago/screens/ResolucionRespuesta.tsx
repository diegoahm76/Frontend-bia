/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { Grid, Box, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, Divider, DialogActions } from "@mui/material";
import { Close } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditorTexto } from '../componentes/EditorTexto/EditorTexto';
import dayjs from 'dayjs';

interface RootState {
  deudores: {
    deudores: {
      identificacion: string;
      nombre: string;
      apellido: string;
      numero_facilidad: string;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResolucionRespuesta: React.FC = () => {
  const [modal, set_modal] = useState(false);
  const [file_name, set_file_name] = useState('');
  const { deudores } = useSelector((state: RootState) => state.deudores);

  const handle_open = () => { set_modal(true) }
  const handle_close = () => { set_modal(false) }

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file_name(selected_file.name);
    }
  };

  return (
    <>
      <Title title="Crear Resolución de Respuesta - Usuario Cormacarena" />
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
        <h3>Datos de Encabezado</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
                <TextField
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={`${deudores.identificacion}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre Deudor"
                  size="small"
                  fullWidth
                  value={''.concat(deudores.nombre, ' ', deudores.apellido)}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Número Facilidad Pago"
                  size="small"
                  fullWidth
                  value={`${deudores.numero_facilidad}`}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            mb='40px'
          >
            <h3>Crear Documento</h3>
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={11} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Cargar Resolución'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      onChange={handle_file_selected}
                    />
                </Button>
              </Grid>
            </Grid>
            <EditorTexto />
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Button
                color='primary'
                variant='contained'
                startIcon={<SaveIcon />}
                sx={{ marginTop: '30px' }}
                onClick={() => {
                  handle_open()
                }}
              >
                Guardar Resolución Facilidad
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handle_close}
        maxWidth="xs"
      >
        <Box component="form"
          onSubmit={()=>{}}>
          <DialogTitle align='center'>Se ha registrado la resolución Nro. {'DSAS23141'} con éxito</DialogTitle>
          <Divider />
          <DialogContent sx={{ mb: '0px' }}>
            <Grid container spacing={1}>
              <p><strong>Fecha y Hora:</strong> {dayjs(Date()).format('DD/MM/YYYY')} - {dayjs(Date()).hour()}:{dayjs(Date()).minute()} horas</p>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={() => {
                handle_close()
            }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
