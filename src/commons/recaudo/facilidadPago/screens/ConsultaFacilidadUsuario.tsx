import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField } from '@mui/material';
import { Title } from '../../../../components/Title';
import { Add, CloudDownload } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TablaPlanPagosUsuario } from '../componentes/TablaPlanPagosUsuario';
import { type FacilidadPagoSolicitud, type ConsultaFacilidadPagoUsuario, type Resolucion } from '../interfaces/interfaces';
import dayjs from 'dayjs';

interface RootStateSolicitud {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

interface RootStateFacilidad {
  facilidades: {
    facilidades: ConsultaFacilidadPagoUsuario;
  }
}

interface RootStateValidacionPlanPagos {
  plan_pagos: {
    plan_pagos: {
      detail: string;
      success: boolean;
    }
  }
}

interface RootStateValidacionResolucion {
  resolucion_facilidad: {
    resolucion_facilidad: {
      data: Resolucion
      detail: string;
      success: boolean;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaFacilidadUsuario: React.FC = () => {
  const [plan_pagos_boton, set_plan_pagos_boton] = useState(false);
  const { facilidades } = useSelector((state: RootStateFacilidad) => state.facilidades);
  const { solicitud_facilidad } = useSelector((state: RootStateSolicitud) => state.solicitud_facilidad);
  const { plan_pagos } = useSelector((state: RootStateValidacionPlanPagos) => state.plan_pagos);
  const { resolucion_facilidad } = useSelector((state: RootStateValidacionResolucion) => state.resolucion_facilidad);
  const navigate = useNavigate();

  const capitalize = (str: string): string => {
    const str_min = str.toLowerCase();
    return str_min.charAt(0).toUpperCase() + str_min.slice(1);
  };

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
        {
          solicitud_facilidad.facilidad_pago !== undefined && facilidades !== undefined ? (
            <Grid item xs={12}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Title title={facilidades.estado !== 'Cancelada/Anulada' ?
                        `Detalle de la Facilidad de Pago ${'#2121231'}` :
                        `Facilidad de Pago Cancelada o Bloqueada ${'#2121231'}`}
                      />
                    </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Nombres"
                      size="small"
                      fullWidth
                      value={''.concat(solicitud_facilidad.deudor.nombre_completo)}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Identificación"
                      size="small"
                      fullWidth
                      value={`${solicitud_facilidad.deudor.identificacion}`}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Correo Electrónico"
                      size="small"
                      fullWidth
                      value={`${solicitud_facilidad.deudor.email}`}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Número Resolución"
                      size="small"
                      fullWidth
                      value={`${solicitud_facilidad.facilidad_pago.numero_radicacion}`}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Fecha Solicitud"
                      size="small"
                      fullWidth
                      value={`${dayjs(solicitud_facilidad.facilidad_pago.fecha_generacion.slice(0, 10)).format('DD/MM/YYYY')}`}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={15}>
                    <TextField
                      multiline
                      rows={4}
                      value={`${solicitud_facilidad.facilidad_pago.observaciones}`}
                      label="Observación"
                      size="small"
                      disabled
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ) : null
        }
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
        {
          facilidades !== undefined ? (
            <>
              <h3>Seguimiento - Detalle</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        label="Estado"
                        size="small"
                        value={capitalize(''.concat(facilidades.estado))}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <a href={facilidades.informe_dbme !== undefined ? facilidades.informe_dbme : ''} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Informe DBME
                        </Button>
                      </a>
                    </Grid>
                    <Grid item xs={12} sm={15} mt='20px' mb='20px'>
                      <Grid item xs={12} sm={3}>
                        <FormGroup>
                          {
                            facilidades.reportado_dbme !== undefined ?
                            facilidades.reportado_dbme ?
                            (<FormControlLabel checked disabled control={<Checkbox />} label="Reportado en DBME" />) :
                            (<FormControlLabel disabled control={<Checkbox />} label="Reportado en DBME" />) : null
                          }
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <FormGroup>
                          {
                            facilidades.aprobacion !== undefined ?
                            facilidades.aprobacion ?
                            (<FormControlLabel checked disabled control={<Checkbox />} label="Aprobado" />) :
                            (<FormControlLabel disabled control={<Checkbox />} label="Aprobado" />) : null
                          }
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={15} mt='20px' mb='20px'>
                      <TextField
                        multiline
                        rows={4}
                        value={''.concat(facilidades.observacion)}
                        label="Observación Funcionario"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {
                facilidades.estado !== "Cancelada/Anulada" ? (
                  <Grid item xs={12} mt='20px'>
                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Plan de Pagos"
                            size="small"
                            fullWidth
                            value={plan_pagos.success ? 'Si' : 'No'}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button
                            color='primary'
                            variant='outlined'
                            size='medium'
                            disabled={!plan_pagos.success}
                            startIcon={<CloudDownload />}
                            onClick={() => {
                              set_plan_pagos_boton(true)
                            }}
                          >
                            Ver
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Resolución"
                            size="small"
                            fullWidth
                            value={resolucion_facilidad.success ? 'Si' : 'No'}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <a href={resolucion_facilidad.success ? resolucion_facilidad.data.doc_asociado : ''} target="_blank" rel="noreferrer">
                            <Button
                              color='primary'
                              variant='outlined'
                              size='medium'
                              disabled={!resolucion_facilidad.success}
                              startIcon={<CloudDownload />}
                            >
                              Ver
                            </Button>
                          </a>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12} mt='20px'>
                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Plan de Pagos"
                            size="small"
                            fullWidth
                            value={"No"}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Resolución"
                            size="small"
                            fullWidth
                            value={"Si"}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button
                            color='primary'
                            variant='outlined'
                            size='medium'
                            startIcon={<CloudDownload />}
                            onClick={() => {}}
                          >
                            Ver
                          </Button>
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
                          startIcon={<Add />}
                          sx={{ marginTop: '30px' }}
                          onClick={() => {
                            navigate('../reposicion_externa')
                          }}
                        >
                          Crear recurso de reposición
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                )
              }
            </>
          ) : null
        }
      </Grid>
      {
        plan_pagos_boton ? (
          <TablaPlanPagosUsuario />
        ) : null
      }
    </>
  )
}
