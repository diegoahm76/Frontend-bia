/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { Grid, Box, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, Divider, DialogActions } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResolucionRespuesta: React.FC = () => {
  const [modal, set_modal] = useState(false);
  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };

  return (
    <>
      <Title title='Crear Resolución de Respuesta - Usuario Cormacarena'/>
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
                  value={"1140239284"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre Deudor"
                  size="small"
                  fullWidth
                  value={"Maria Cardenas"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Número Facilidad Pago"
                  size="small"
                  fullWidth
                  value={"SDWE2300"}
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
        <h3>Crear Documento</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            mb='40px'
          >
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={12} sm={3}>
                <TextField
                  helperText="Cargar Resolución"
                  size="small"
                  fullWidth
                  type='file'
                />
              </Grid>
            </Grid>
            <CKEditor
              editor={ ClassicEditor }
              data="<p>Puedes empezar a escribir aquí</p>"
              onReady={ editor => {
                  console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  console.log( { event, editor, data } );
              } }
              onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                  console.log( 'Focus.', editor );
              } }
            />
          </Box>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="right"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <Button
          color='primary'
          variant='contained'
          sx={{ marginTop: '30px' }}
          onClick={() => {
            handle_open()
          }}
        >
          Guardar Resolución
        </Button>
      </Stack>
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
              <p><strong>Fecha y Hora:</strong> {Date()}</p>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={()=>{
              handle_close()
            }}>Cerrar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
