/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, TextField, Button, Stack, DialogTitle, Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import { Close } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { use_form } from '../../../../hooks/useForm';
import { useFormFile, useFormMultipleFiles } from '../hooks/useFormFile';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroReposicionExterno: React.FC = () => {
  const [modal, set_modal] = useState(false);
  const { form_state, on_input_change } = use_form({});
  const { form_file, name_file, handle_change_one_file } = useFormFile({});
  const { form_multiple_files, name_multiple_files, handle_change_multiple_files } = useFormMultipleFiles({});
  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };


  console.log('texto', form_state);
  console.log('archivo', form_file);
  console.log('multiples archivos', form_multiple_files);

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
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Nombre o Razón Social"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Identificación"
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
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {name_file.recurso_reposicion !== undefined ? name_file.recurso_reposicion : 'Cargar Recurso de Reposición'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name="recurso_reposicion"
                      onChange={handle_change_one_file}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {name_multiple_files.length !== 0 ?
                    name_multiple_files.map((name: string, index: number) => (`${index + 1}. ${name} `))
                    : 'Anexos y Pruebas'}
                    <input
                      hidden
                      type="file"
                      multiple
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name="anexos"
                      onChange={handle_change_multiple_files}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  label="Observación"
                  size="small"
                  fullWidth
                  name='observacion'
                  onChange={on_input_change}
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<Close />}
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
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
                  startIcon={<SaveIcon />}
                  sx={{ marginTop: '30px' }}
                  onClick={handle_open}
                >
                  Enviar Recurso Reposición
                </Button>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handle_close}
        maxWidth="xs"
      >
        <Box component="form">
          <DialogTitle>{`Se ha registrado el recurso de reposición Nro. ${'RP1242'} con éxito`}</DialogTitle>
          <Divider />
          <DialogContent sx={{ mb: '0px' }}>
            <Grid container spacing={1}>
              <p><strong>Fecha y Hora:</strong> {Date()}</p>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={handle_close}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
