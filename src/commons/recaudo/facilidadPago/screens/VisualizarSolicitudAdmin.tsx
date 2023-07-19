/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { EncabezadoAdmin } from '../componentes/EncabezadoAdmin';
import { VistaSolicitud } from '../componentes/VistaSolicitud';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, Button, Stack, DialogActions, Dialog, TextField, DialogTitle, FormControlLabel, Checkbox } from "@mui/material";
import { Close } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { use_form } from '../../../../hooks/useForm';
import { type event, type check, type FacilidadPagoSolicitud } from '../interfaces/interfaces';
import { post_respuesta_fac_pago } from '../requests/requests';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_datos_deudor } from '../slices/DeudoresSlice';
import { get_datos_contacto } from '../slices/CalidadPersonasSlice';
import { TablaLiquidacion } from '../componentes/TablaLiquidacion';
import { TablaLiquidacionResumen } from '../componentes/TablaLiquidacionResumen';
import { ResumenLiquidacionFacilidad } from '../componentes/ResumenLiquidacionFacilidad';
import { VistaProyeccionPagos } from '../componentes/VistaProyeccionPagos';

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VisualizarSolicitudAdmin: React.FC = () => {
  const [plan_pagos, set_plan_pagos] = useState('');
  const [resolucion, set_resolucion] = useState('');
  const [check_dbme, set_check_dbme] = useState(false);
  const [existe] = useState(true); // Mientras nos conectamos con el Backend
  const [modal_anular, set_modal_anular] = useState(false);
  const [modal_plan_pagos, set_modal_plan_pagos] = useState(false);
  const [file, set_file] = useState({});
  const [file_name, set_file_name] = useState('');
  const { form_state, on_input_change } = use_form({});
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handle_open_anular = () => { set_modal_anular(true) };
  const handle_close_anular = () => { set_modal_anular(false) };
  const handle_close_plan_pagos = () => { set_modal_plan_pagos(false) };

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file(selected_file);
      set_file_name(selected_file.name);
    }
  };

  useEffect(() => {
    if(solicitud_facilidad.id_deudor !== undefined){
      try {
        void dispatch(get_datos_deudor(solicitud_facilidad.id_deudor));
        void dispatch(get_datos_contacto(solicitud_facilidad.id_deudor));
        // void get_bienes_deudor(solicitud_facilidad.id_deudor_actuacion);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }, [solicitud_facilidad])

  return (
    <>
      <Title title='Gestionar Solicitud de Facilidad de Pago'/>
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
        <h3>Datos de la Solicitud</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <EncabezadoAdmin fecha_solicitud={solicitud_facilidad.fecha_generacion} />
            <VistaSolicitud />
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
        <h3>Respuesta a la Solicitud</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
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
                    <MenuItem value="anulado" onClick={handle_open_anular}>Cancelado/Anulado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Aprobado</InputLabel>
                  <Select
                    label="Aprobado"
                    defaultValue={''}
                    name='aprobacion'
                    onChange={on_input_change}
                  >
                    <MenuItem value="true">Si</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Informe BDME'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='consulta_dbme'
                      onChange={handle_file_selected}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <FormControlLabel
                  control={ <Checkbox
                    name='reportado_dbme'
                    onChange={(event: check) => {
                      const { checked } = event.target
                      set_check_dbme(checked)
                    }}
                  />}
                  label="Usuario reportado en BDME"
                />
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  label="Observación Cormacarena"
                  helperText="Escribe una observación"
                  size="small"
                  fullWidth
                  name='observacion'
                  onChange={on_input_change}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>¿Crear plan de pagos?</InputLabel>
                  <Select
                    defaultValue={''}
                    label="¿Crear plan de pagos?"
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_plan_pagos(value)
                    }}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                plan_pagos === "si" ? (
                  <>
                    <Grid item xs={12} sm={3}>
                      {
                        existe ? (
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => {
                              set_modal_plan_pagos(true)
                            }}
                          >
                            Ver Plan de Pagos
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => {
                              navigate('../amortizacion')
                            }}
                          >
                            Crear Plan de Pagos
                          </Button>
                        )
                      }
                    </Grid>
                  </>
                ) : null
              }
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>¿Crear Resolución?</InputLabel>
                  <Select
                    defaultValue={''}
                    label="¿Crear Resolución?"
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_resolucion(value)
                    }}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                resolucion === "si" ? (
                  <>
                    <Grid item xs={12} sm={3}>
                      {
                        existe ? (
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => {}}
                          >
                            Ver Resolución
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => {
                              navigate('../resolucion')
                            }}
                          >
                            Crear Resolución
                          </Button>
                        )
                      }
                    </Grid>
                  </>
                ) : null
              }
            </Grid>
            <Dialog
              open={modal_anular}
              onClose={handle_close_anular}
              maxWidth="xs"
            >
              <Box component="form"
                onSubmit={()=>{}}>
                <DialogTitle>¿Desea establecer la facilidad de pago como Cancelada / Anulada?</DialogTitle>
                <DialogActions>
                  <Button
                    variant='outlined'
                    color="primary"
                    startIcon={<Close />}
                    onClick={handle_close_anular}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      navigate('../incumplimiento')
                  }}
                  >
                    Si
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
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
                    <TablaLiquidacion />
                    <TablaLiquidacionResumen />
                    <ResumenLiquidacionFacilidad />
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
                  void post_respuesta_fac_pago({
                    ...form_state,
                    id_facilidades_pago: solicitud_facilidad.id,
                    id_funcionario: solicitud_facilidad.id_funcionario,
                    reportado_dbme: check_dbme,
                    consulta_dbme: file
                  })
                }}
              >
                Actualizar / Enviar
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
