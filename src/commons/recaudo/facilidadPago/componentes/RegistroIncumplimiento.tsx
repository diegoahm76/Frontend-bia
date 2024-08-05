import { Grid, Box, TextField, Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Add, Close, Save, CloudUpload, CloudDownload, Help } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Title } from '../../../../components/Title';
import { EditorTexto } from "./EditorTexto/EditorTexto";
import { DialogoInformativo } from './DialogoInformativo';
import { VistaProyeccionPagos } from '../componentes/VistaProyeccionPagos';
import { type FacilidadPagoSolicitud, type PlanPagoValidacion, type  Resolucion, type CrearResolucion } from '../interfaces/interfaces';
import { post_resolucion } from '../requests/requests';
import { use_form } from '../../../../hooks/useForm';

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
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

interface RootStateResolucion {
  resolucion_facilidad: {
    resolucion_facilidad: {
      data: Resolucion;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroIncumplimiento: React.FC = () => {
  const [file_name, set_file_name] = useState('');
  const [file, set_file] = useState({});
  const [modal, set_modal] = useState(false);
  const [sub_modal, set_sub_modal] = useState(false);
  const [modal_plan_pagos, set_modal_plan_pagos] = useState(false);
  const [respuesta_registro, set_respuesta_registro] = useState<CrearResolucion>();
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);
  const { plan_pagos } = useSelector((state: RootStatePlanPagos) => state.plan_pagos);
  const { resolucion_facilidad } = useSelector((state: RootStateResolucion) => state.resolucion_facilidad);
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
  const handle_close_sub = (): void => { set_sub_modal(false) };
  const handle_close_plan_pagos = (): void => { set_modal_plan_pagos(false) };

  useEffect(() => {
    if(respuesta_registro !== undefined){
      set_sub_modal(true);
    }
  }, [respuesta_registro])

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
                  value={''.concat(solicitud_facilidad.deudor.nombre_completo)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={''.concat(solicitud_facilidad.deudor.identificacion)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={''.concat(solicitud_facilidad.deudor.email)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={''.concat(solicitud_facilidad.deudor.direccion_notificaciones)}
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
                <a href={resolucion_facilidad.data.doc_asociado} target="_blank" rel="noreferrer">
                  <Button
                    fullWidth
                    color='primary'
                    variant='outlined'
                    startIcon={<CloudDownload />}
                    sx={{ marginTop: '30px' }}
                  >
                    Ver Resolución de Aceptación
                  </Button>
                </a>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Button
                  fullWidth
                  color='primary'
                  variant='outlined'
                  startIcon={<CloudDownload />}
                  sx={{ marginTop: '30px' }}
                  onClick={() => {
                    set_modal_plan_pagos(true)
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
                  required
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
        open={modal_plan_pagos}
        onClose={handle_close_plan_pagos}
        maxWidth="lg"
      >
        <Box component="form"
          onSubmit={()=>{}}>
          <DialogTitle><Title title='Liquidación de la Facilidad de Pago - Usuario Cormacarena' /></DialogTitle>
          <DialogActions>
            <Stack
              direction="column"
              justifyContent="center"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <VistaProyeccionPagos />
              <Stack
                direction="row"
                justifyContent="right"
                spacing={2}
                sx={{ mt: '40px' }}
              >
                <Button
                  variant='outlined'
                  color="primary"
                  startIcon={<Close />}
                  onClick={handle_close_plan_pagos}
                >
                  Cerrar
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
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
                <strong>{`¿Está seguro de que desea cancelar la Facilidad de Pago con Resolución Número ${'Aún no hay párametro'}?`}</strong>
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
            onClick={() => {
              const post_registro = async (): Promise<void> => {
                try {
                  const { data: { data: res_registro } } = await post_resolucion({
                    ...form_state,
                    id_plan_pago: plan_pagos.data.plan_pago.id,
                    doc_asociado: file as File,
                  });
                  set_respuesta_registro(res_registro ?? {});
                } catch (error: any) {
                  throw new Error(error);
                }
              }
              void post_registro();
              handle_close();
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <DialogoInformativo
        tipo_notificacion='info'
        mensaje_notificacion={`La Facilidad de Pago con Resolución Número ${'Aún no hay párametro'} ha sido cancelada`}
        abrir_modal={sub_modal}
        abrir_dialog={handle_close_sub}
      />
    </>
  )
}
