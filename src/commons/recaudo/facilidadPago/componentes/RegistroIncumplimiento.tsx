/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Box, TextField, Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { Add, Close, Save, CloudUpload, CloudDownload, Help } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EditorTexto } from "./EditorTexto/EditorTexto";
import { DialogoInformativo } from './DialogoInformativo';
import { use_form } from '../../../../hooks/useForm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroIncumplimiento: React.FC = () => {
  const [file_name, set_file_name] = useState('');
  const [file, set_file] = useState({});
  const [modal, set_modal] = useState(false);
  const [sub_modal, set_sub_modal] = useState(false);
  const { form_state, on_input_change } = use_form({});
  const navigate = useNavigate();

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file(selected_file);
      set_file_name(selected_file.name);
    }
  };

  const handle_open = (): void => { set_modal(true) };
  const handle_close = (): void => { set_modal(false) };

  const handle_open_sub = (): void => { set_sub_modal(true) };
  const handle_close_sub = (): void => { set_sub_modal(false) };

  return (
    <>
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
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombre o Razón Social"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={''}
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
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  color='primary'
                  variant='outlined'
                  startIcon={<CloudDownload />}
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
                  }}
                >
                  Ver Resolución de Aceptación
                </Button>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Button
                  fullWidth
                  color='primary'
                  variant='outlined'
                  startIcon={<CloudDownload />}
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
                  }}
                >
                  Ver Plan de Pagos
                </Button>
              </Grid>
            </Stack>
            <h3>Cancelación de Facilidad de Pagos</h3>
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={12} sm={5.2}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  {file_name !== '' ? file_name : 'Cargar Resolución de Cancelación de Facilidad de Pagos'}
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
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  label="Observación Cormacarena"
                  size="small"
                  fullWidth
                  name='observacion'
                  onChange={on_input_change}
                />
              </Grid>
            </Grid>
            <EditorTexto />
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Grid item xs={12} sm={2.4}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<Add />}
                  sx={{ marginTop: '30px' }}
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
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
                    navigate('../solicitud')
                  }}
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
                  sx={{ marginTop: '30px' }}
                  onClick={handle_open}
                >
                  Cancelar Facilidad de Pagos
                </Button>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handle_close}
      >
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item textAlign="center" xs={12}>
                <Help style={{ color: "#009BFF", fontSize: "60px" }} />
              </Grid>
              <Grid item textAlign="center" xs={12}>
                <strong>{`¿Está seguro de que desea cancelar la Facilidad de Pago con Resolución Número ${'FP1234942'}?`}</strong>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color="primary"
            autoFocus
            startIcon={<Close />}
            onClick={handle_close}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={()=>{
              handle_open_sub()
              handle_close()
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <DialogoInformativo
        tipo_notificacion='info'
        mensaje_notificacion={`La Facilidad de Pago con Resolución Número ${'FP1234942'} ha sido cancelada`}
        abrir_modal={sub_modal}
        abrir_dialog={handle_close_sub}
      />
    </>
  )
}
