/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField, Button } from "@mui/material";
import { CloudDownload } from '@mui/icons-material';
import { type FacilidadPagoSolicitud } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { Title } from "../../../../components";

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

export const PersonaNatural: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  return (
    <>
      <Grid item xs={12}  >
        <Title title={`Caso Persona Natural `} />
      </Grid>
      {/* <p><strong></strong></p> */}
      <Grid item marginTop={2} xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 1) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Documento de Identidad
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${solicitud_facilidad.datos_deudor_actuacion.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Ciudad"
                value={`${solicitud_facilidad.datos_deudor_actuacion.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${solicitud_facilidad.datos_deudor_actuacion.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const PersonaJuridica: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  return (
    <>
      <p><strong>Caso Persona Juridica / Apoderado</strong></p>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 2) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Documento de Identidad Apoderado
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 3) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Documento Poder
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 4) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Cert. Existencia y Representación Legal
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${solicitud_facilidad.datos_deudor_actuacion.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Ciudad"
                value={`${solicitud_facilidad.datos_deudor_actuacion.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${solicitud_facilidad.datos_deudor_actuacion.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const DeudorSolidarioNatural: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  return (
    <>

      <Grid item xs={12} >
        <Title title={`Caso Deudor Solidario Natural `} />
      </Grid>
      {/* <p><strong></strong></p> */}
      <Grid item marginTop={2} xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 5) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Documento Deudor Solidario
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 6) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Oficio Respaldando Deuda
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${solicitud_facilidad.datos_deudor_actuacion.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Ciudad"
                value={`${solicitud_facilidad.datos_deudor_actuacion.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${solicitud_facilidad.datos_deudor_actuacion.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const DeudorSolidarioJuridico: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  return (
    <>
      <p><strong>Caso Deudor Solidario Juridico</strong></p>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 7) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Documento Deudor Solidario
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 8) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Oficio Respaldando Deuda
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            {
              solicitud_facilidad.documentos_deudor_actuacion.map((obj) => {
                if (obj.id_requisito_actuacion === 9) {
                  return (
                    <Grid item xs={12} sm={5} key={obj.id_requisito_actuacion}>
                      <a href={obj.documento} target="_blank" rel="noreferrer">
                        <Button
                          fullWidth
                          color='primary'
                          variant='outlined'
                          size='medium'
                          startIcon={<CloudDownload />}
                        >
                          Ver Cert. Existencia y Representación Legal
                        </Button>
                      </a>
                    </Grid>
                  )
                }
              })
            }
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${solicitud_facilidad.datos_deudor_actuacion.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Ciudad"
                value={`${solicitud_facilidad.datos_deudor_actuacion.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${solicitud_facilidad.datos_deudor_actuacion.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}
