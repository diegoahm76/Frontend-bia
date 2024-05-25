/* eslint-disable @typescript-eslint/naming-convention */
import { Title } from '../../../../components/Title';
import { EncabezadoSolicitud } from '../componentes/EncabezadoSolicitud';
import { VistaSolicitud } from '../componentes/VistaSolicitud';
import { DialogoRegistro } from '../componentes/DialogoRegistro';
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  DialogActions,
  Dialog,
  TextField,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

import { Close, Save, CloudUpload, Help } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { use_form } from '../../../../hooks/useForm';
import {
  type event,
  type check,
  type FacilidadPagoSolicitud,
  type Resolucion,
  type RespuestaFacilidadPago,
} from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { VistaProyeccionPagos } from '../componentes/VistaProyeccionPagos';
import { post_respuesta_fac_pago } from '../requests/requests';
import {
  deudores,
  get_datos_deudor_amortizacion,
} from '../slices/DeudoresSlice';
import { datos_facilidad } from '../slices/FacilidadesSlice';
import { get_datos_amortizacion } from '../slices/PlanPagosSlice';
import { control_error } from '../../../../helpers';
import { api } from '../../../../api/axios';
import { Documento } from '../componentes/Documento';

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  };
}

interface RootStateValidacionPlanPagos {
  plan_pagos: {
    plan_pagos: {
      detail: string;
      success: boolean;
    };
  };
}

interface RootStateValidacionResolucion {
  resolucion_facilidad: {
    resolucion_facilidad: {
      data: Resolucion;
      detail: string;
      success: boolean;
    };
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaFacilidadFuncionario: React.FC = () => {
  const [plan_pagos_pregunta, set_plan_pagos_pregunta] = useState('');
  const [resolucion_pregunta, set_resolucion_pregunta] = useState('');
  const [check_dbme, set_check_dbme] = useState(false);
  const [modal, set_modal] = useState(false);
  const [modal_anular, set_modal_anular] = useState(false);
  const [modal_plan_pagos, set_modal_plan_pagos] = useState(false);
  const [respuesta_registro, set_respuesta_registro] =
    useState<RespuestaFacilidadPago>();
  const [file, set_file] = useState({});
  const [file_name, set_file_name] = useState('');
  const { form_state, on_input_change } = use_form({});
  const { solicitud_facilidad } = useSelector(
    (state: RootState) => state.solicitud_facilidad
  );
  const { plan_pagos } = useSelector(
    (state: RootStateValidacionPlanPagos) => state.plan_pagos
  );
  const { resolucion_facilidad } = useSelector(
    (state: RootStateValidacionResolucion) => state.resolucion_facilidad
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handle_close = (): void => {
    set_modal(false);
  };
  const handle_open_anular = (): void => {
    set_modal_anular(true);
  };
  const handle_close_anular = (): void => {
    set_modal_anular(false);
  };
  const handle_close_plan_pagos = (): void => {
    set_modal_plan_pagos(false);
  };

  const handle_file_selected = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file(selected_file);
      set_file_name(selected_file.name);
    }
  };

  useEffect(() => {
    if (respuesta_registro !== undefined) {
      set_modal(true);
    }
  }, [respuesta_registro]);

  useEffect(() => {
    if (
      solicitud_facilidad &&
      solicitud_facilidad.deudor &&
      solicitud_facilidad.deudor.email
    ) {
      setCorreo(solicitud_facilidad.deudor.email);
    }
  }, [solicitud_facilidad]); // Ejecutar efecto cuando cambie solicitud_facilidad

  const [correo, setCorreo] = useState(` `);
  const [nombre, setNombre] = useState(' ');
  const [asunto, setAsunto] = useState(' ');
  const [mensaje, setMensaje] = useState(' ');

  const enviarCorreo = async () => {
    try {
      const datos = {
        correo,
        nombre,
        asunto,
        mensaje,
      };
      const response = await api.post(
        '/hidrico/zonas-hidricas/enviar_correo/',
        datos
      );
      console.log('Correo enviado con éxito', response.data);
      // Aquí puedes agregar una notificación o mensaje de éxito
    } catch (error) {
      console.error('Error al enviar el correo', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const [is_modal_active_doc, set_doc] = useState<boolean>(false);

  const handle_open_documento = (): void => {
    set_doc(true);
  };

  return (
    <>
      {/* <Title title='Gestionar Solicitud de Facilidad de Pago'/> */}
      {solicitud_facilidad.facilidad_pago !== undefined ? (
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
            <Title title="Gestionar Solicitud de Facilidad de Pago" />
            <h3>Datos de la Solicitud</h3>
            <Grid item xs={12}>
              <Box component="form" noValidate autoComplete="off">
                <EncabezadoSolicitud />
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
            <Grid item xs={12}>
              <Title title={`Respuesta a la Solicitud `} />
            </Grid>

            <Grid item marginTop={2} xs={12}>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Asignar Estado</InputLabel>
                      <Select
                        required
                        label="Asignar Estado"
                        defaultValue={''}
                        name="estado"
                        onChange={on_input_change}
                      >
                        <MenuItem value="ingresado">Ingresado</MenuItem>
                        <MenuItem value="revision">En revisión</MenuItem>
                        {plan_pagos.success && resolucion_facilidad.success ? (
                          <MenuItem onClick={handle_open_anular}>
                            Cancelado/Anulado
                          </MenuItem>
                        ) : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Aprobado</InputLabel>
                      <Select
                        required
                        label="Aprobado"
                        defaultValue={''}
                        name="aprobacion"
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
                      size="medium"
                      component="label"
                      startIcon={<CloudUpload />}
                    >
                      {file_name !== '' ? file_name : 'Informe BDME'}
                      <input
                        hidden
                        type="file"
                        required
                        autoFocus
                        style={{ opacity: 0 }}
                        name="consulta_dbme"
                        onChange={handle_file_selected}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="reportado_dbme"
                          onChange={(event: check) => {
                            const { checked } = event.target;
                            set_check_dbme(checked);
                          }}
                        />
                      }
                      label="Usuario reportado en BDME"
                    />
                  </Grid>
                  <Grid item xs={12} sm={15}>
                    <TextField
                      required
                      multiline
                      rows={4}
                      label="Observación Cormacarena"
                      helperText="Escribe una observación"
                      size="small"
                      fullWidth
                      name="observacion"
                      onChange={on_input_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>¿Crear plan de pagos?</InputLabel>
                      <Select
                        defaultValue={''}
                        label="¿Crear plan de pagos?"
                        onChange={(event: event) => {
                          const { value } = event.target;
                          set_plan_pagos_pregunta(value);
                        }}
                      >
                        <MenuItem value="si">Si</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {plan_pagos_pregunta === 'si' ? (
                    <>
                      <Grid item xs={12} sm={3}>
                        {plan_pagos.success ? (
                          <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              set_modal_plan_pagos(true);
                            }}
                          >
                            Ver Plan de Pagos
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              try {
                                void dispatch(
                                  get_datos_deudor_amortizacion(
                                    solicitud_facilidad.facilidad_pago.id
                                  )
                                );
                                void dispatch(
                                  datos_facilidad({
                                    id_facilidad:
                                      solicitud_facilidad.facilidad_pago.id,
                                    radicado:
                                      solicitud_facilidad.facilidad_pago
                                        .numero_radicacion,
                                  })
                                );
                                void dispatch(
                                  get_datos_amortizacion({
                                    id_facilidad:
                                      solicitud_facilidad.facilidad_pago.id,
                                    fecha_final:
                                      solicitud_facilidad.facilidad_pago
                                        .fecha_abono,
                                    cuotas:
                                      solicitud_facilidad.facilidad_pago.cuotas,
                                    periodicidad:
                                      solicitud_facilidad.facilidad_pago
                                        .periodicidad,
                                  })
                                );
                                navigate('../amortizacion');
                              } catch (error: any) {
                                throw new Error(error);
                              }
                            }}
                          >
                            Crear Plan de Pagos
                          </Button>
                        )}
                      </Grid>
                    </>
                  ) : null}
                  {plan_pagos.success ? (
                    <Grid item xs={12} sm={3}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>¿Crear Resolución?</InputLabel>
                        <Select
                          defaultValue={''}
                          label="¿Crear Resolución?"
                          onChange={(event: event) => {
                            const { value } = event.target;
                            set_resolucion_pregunta(value);
                          }}
                        >
                          <MenuItem value="si">Si</MenuItem>
                          <MenuItem value="no">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : null}
                  {resolucion_pregunta === 'si' ? (
                    <>
                      <Grid item>
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<DescriptionIcon />}
                          onClick={() => {
                            handle_open_documento();
                          }}
                        >
                          Enviar Resolución
                        </Button>
                      </Grid>

                      <Documento
                        // idFacilidadSeleccionada={idFacilidadSeleccionada}
                        is_modal_active_doc={is_modal_active_doc}
                        set_doc={set_doc}
                        // idFacilidades={idFacilidades}
                      />

                      {/* <Grid item xs={12} sm={3}>
                            {
                              resolucion_facilidad.success ? (
                                <a href={resolucion_facilidad.data.doc_asociado} target="_blank" rel="noreferrer">
                                  <Button
                                    fullWidth
                                    color='primary'
                                    variant='contained'
                                  >
                                    Ver Resolución
                                  </Button>
                                </a>
                              ) : (
                                <Button
                                  fullWidth
                                  color='primary'
                                  variant='contained'
                                  onClick={() => {
                                    try {
                                      void dispatch(deudores({
                                        identificacion: solicitud_facilidad.deudor.identificacion,
                                        nombre: solicitud_facilidad.deudor.nombres,
                                        apellido: solicitud_facilidad.deudor.apellidos,
                                        numero_facilidad: solicitud_facilidad.facilidad_pago.numero_radicacion
                                      }));
                                      navigate('../resolucion');
                                    } catch (error: any) {
                                      throw new Error(error);
                                    }
                                  }}
                                >
                                  Crear Resolución
                                </Button>
                              )
                            }
                          </Grid> */}
                    </>
                  ) : null}
                </Grid>
                <Dialog open={modal_anular} onClose={handle_close_anular}>
                  <DialogContent>
                    <DialogContentText>
                      <Grid container>
                        <Grid item textAlign="center" xs={12}>
                          <Help
                            style={{ color: '#009BFF', fontSize: '60px' }}
                          />
                        </Grid>
                        <Grid item textAlign="center" xs={12}>
                          <strong>
                            ¿Desea establecer la facilidad de pago como
                            Cancelada / Anulada?
                          </strong>
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      color="primary"
                      autoFocus
                      startIcon={<Close />}
                      onClick={handle_close_anular}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => {
                        navigate('../incumplimiento');
                      }}
                    >
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={modal_plan_pagos}
                  onClose={handle_close_plan_pagos}
                  maxWidth="lg"
                >
                  <Box component="form" onSubmit={() => {}}>
                    <DialogTitle>
                      <Title title="Liquidación de la Facilidad de Pago - Usuario Cormacarena" />
                    </DialogTitle>
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
                            variant="outlined"
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

                <Grid container marginTop={2} spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Correo Electrónico"
                      size="small"
                      fullWidth
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Nombre"
                      size="small"
                      fullWidth
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Asunto"
                      size="small"
                      fullWidth
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Mensaje"
                      size="small"
                      fullWidth
                      rows={4}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                    />
                  </Grid>
                  {/* {solicitud_facilidad.deudor.email} */}
                  {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setCorreo(solicitud_facilidadd.deudor.email)}
                    >
                      Mismo Correo
                    </Button> */}
                  {/*                     
                    <Grid item >
                      <Button variant="contained" color="primary" onClick={enviarCorreo}>
                        Enviar Correo
                      </Button>
                    </Grid> */}
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="right"
                  spacing={2}
                  sx={{ mb: '20px' }}
                >
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ marginTop: '30px' }}
                    onClick={() => {
                      const post_registro = async (): Promise<void> => {
                        try {
                          const {
                            data: { data: res_registro },
                          } = await post_respuesta_fac_pago({
                            ...form_state,
                            id_facilidad_pago:
                              solicitud_facilidad.facilidad_pago.id,
                            id_funcionario:
                              solicitud_facilidad.facilidad_pago.id_funcionario,
                            reportado_dbme: check_dbme,
                            informe_dbme: file,
                          });
                          set_respuesta_registro(res_registro ?? {});
                          enviarCorreo;
                        } catch (error: any) {
                          // throw new Error(error);
                          control_error(error.response.data.detail);
                        }
                      };
                      void post_registro();
                    }}
                  >
                    Actualizar / Enviar
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <DialogoRegistro
            titulo_notificacion="La Respuesta de Facilidad de Pago fue Registrada con Éxito"
            tipo=""
            numero_registro={undefined}
            abrir_modal={modal}
            abrir_dialog={handle_close}
          />
        </>
      ) : null}
    </>
  );
};
