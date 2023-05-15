/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { InputsEncabezadoAdmin } from '../componentes/InputsEncabezadoAdmin';
import { VistaSolicitud } from '../componentes/VistaSolicitud';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, Button, Stack, DialogActions, Dialog, TextField, DialogTitle } from "@mui/material";
import { Close } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { use_form } from '../../../../hooks/useForm';
import { type event } from '../interfaces/interfaces';
import { get_facilidad_solicitud } from '../slices/FacilidadesSlice';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VisualizarSolicitudAdmin: React.FC = () => {
  const [plan_pagos, set_plan_pagos] = useState('');
  const [resolucion, set_resolucion] = useState('');
  const [existe] = useState(true); // Mientras nos conectamos con el Backend
  const [modal, set_modal] = useState(false);
  const [modal_option, set_modal_option] = useState('');
  const { form_state, on_input_change } = use_form({});
  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };
  const navigate = useNavigate();
  console.log('form', form_state)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_facilidad_solicitud());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      <Title title='Visualizar Solicitud Facilidad de Pago - Usuario Cormacarena'/>
      <InputsEncabezadoAdmin />
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
        <h3>Detalles de la Solicitud</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
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
        <h3>Respuesta de Cormacarena</h3>
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
                    <MenuItem value="aprobado">Aprobado</MenuItem>
                    <MenuItem value="negado">Negado</MenuItem>
                    <MenuItem value="enCurso">En Curso</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Aprobado</InputLabel>
                  <Select
                    label="Aprobado"
                    defaultValue={''}
                    name='isAprobado'
                    onChange={on_input_change}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
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
                    <Grid item>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {
                          if(existe){
                            set_modal_option('pago')
                            handle_open()
                          } else {
                            navigate('../amortizacion')
                          }
                        }}
                      >
                      Crear Plan de Pagos
                      </Button>
                    </Grid>
                    <Grid item sm={5}>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {}}
                      >
                      Ver Plan de Pagos
                      </Button>
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
                    <Grid item>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {
                          if(existe){
                            set_modal_option('resolucion')
                            handle_open()
                          } else {
                            navigate('../resolucion')
                          }
                        }}
                      >
                      Crear Resolución
                      </Button>
                    </Grid>
                    <Grid item sm={5}>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {}}
                      >
                      Ver Resolución
                      </Button>
                    </Grid>
                  </>
                ) : null
              }
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
                startIcon={<SaveIcon />}
                sx={{ marginTop: '30px' }}
                onClick={() => {}}
              >
              Actualizar / Enviar
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
          <DialogTitle>
            {
              modal_option === 'pago' ? `El radicado nro. ${'#RadicadoActual'} tiene Plan de Pagos creado, consulte presionando el botón Ver Plan de Pagos.` : `El radicado nro. ${'#RadicadoActual'} tiene Resolución creada, consulte presionando el botón Ver Resolución.`
            }
          </DialogTitle>
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
