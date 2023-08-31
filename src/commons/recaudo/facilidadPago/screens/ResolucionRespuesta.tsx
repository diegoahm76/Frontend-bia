import { Title } from '../../../../components/Title';
import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { Save, CloudUpload } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditorTexto } from '../componentes/EditorTexto/EditorTexto';
import { DialogoRegistro } from '../componentes/DialogoRegistro';
import { post_resolucion } from '../requests/requests';
import { type PlanPagoValidacion } from '../interfaces/interfaces';

interface RootStateDeudor {
  deudores: {
    deudores: {
      identificacion: string;
      nombre: string;
      apellido: string;
      numero_facilidad: string;
    }
  }
}

interface RootStatePlanPagos {
  plan_pagos: {
    plan_pagos: {
      data: {
        plan_pago: PlanPagoValidacion;
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResolucionRespuesta: React.FC = () => {
  const [modal, set_modal] = useState(false);
  const [file_name, set_file_name] = useState('');
  const [file, set_file] = useState({});
  const { deudores } = useSelector((state: RootStateDeudor) => state.deudores);
  const { plan_pagos } = useSelector((state: RootStatePlanPagos) => state.plan_pagos);

  const handle_open = (): void => { set_modal(true) }
  const handle_close = (): void => { set_modal(false) }

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file(selected_file);
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
                  startIcon={<CloudUpload />}
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
                startIcon={<Save />}
                sx={{ marginTop: '30px' }}
                onClick={() => {
                  try {
                    void post_resolucion({
                      id_plan_pago: plan_pagos.data.plan_pago.id,
                      doc_asociado: file as File,
                      observacion: 'observacion',
                    });
                    handle_open();
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Guardar Resolución Facilidad
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <DialogoRegistro
        titulo_notificacion='La Resolución fue Registrada con Éxito'
        tipo='Resolución'
        numero_registro={`${'DSAS23141'}`}
        abrir_modal={modal}
        abrir_dialog={handle_close}
      />
    </>
  )
}
