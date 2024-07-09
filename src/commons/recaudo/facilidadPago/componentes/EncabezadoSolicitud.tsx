import { Grid, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { TablaObligacionesSeleccionadasSolicitud } from "./TablaObligacionesSeleccionadasSolicitud";
import { TablaObligacionesUsuarioSolicitud } from "./TablaObligacionesUsuarioSolicitud";
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type FacilidadPagoSolicitud, type ObligacionesUsuario } from "../interfaces/interfaces";
import { get_obligaciones_id } from '../slices/ObligacionesSlice';
import dayjs from 'dayjs';
import { Title } from "../../../../components";

interface RootStateFacilidad {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

interface RootStateObligaciones {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EncabezadoSolicitud: React.FC = () => {
  const [modal_obligaciones, set_modal_obligaciones] = useState(false);
  const { solicitud_facilidad } = useSelector((state: RootStateFacilidad) => state.solicitud_facilidad);
  const { obligaciones } = useSelector((state: RootStateObligaciones) => state.obligaciones);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  return (
    <>
        {/* <h3>Encabezado</h3> */}
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre o Razón Social"
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
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={`${solicitud_facilidad.deudor.direccion_notificaciones}`}
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
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Obligaciones asociadas al radicado nro:"
                  size="small"
                  fullWidth
                  value={`${solicitud_facilidad.facilidad_pago.numero_radicacion}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                  onClick={() => {
                    void dispatch(get_obligaciones_id(solicitud_facilidad.deudor.identificacion))
                    set_modal_obligaciones(true)
                  }}
                >
                  Consultar listado obligaciones
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <>
        <Grid item xs={12}   marginTop={3}>
                    <Title title={`Obligaciones objeto de la solicitud `} />
                </Grid>
          <p><strong></strong></p>
          <TablaObligacionesSeleccionadasSolicitud />
        </>
        {
          modal_obligaciones && obligaciones.obligaciones !== undefined ? (
            <>
              <p><strong>Obligaciones Pendiente por Pago</strong></p>
              <TablaObligacionesUsuarioSolicitud />
            </>
          ) : null
        }
    </>
  )
}
