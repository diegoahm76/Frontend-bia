import { Grid, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { TablaObligacionesSolicitud } from "./TablaObligacionesSolicitud";
import { TablaObligacionesUsuarioInterno } from "./TablaObligacionesUsuarioInterno";
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type Deudor } from "../interfaces/interfaces";
import { get_obligaciones_id } from '../slices/ObligacionesSlice';


interface RootState {
  deudores: {
    deudores: Deudor;
  }
}

interface Fecha {
  fecha_solicitud: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EncabezadoAdmin: React.FC<Fecha> = (props: Fecha) => {
  const [obligaciones, set_obligaciones] = useState(false);
  const { deudores } = useSelector((state: RootState) => state.deudores);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  return (
    <>
        <h3>Encabezado</h3>
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
                  value={''.concat(deudores.nombres, ' ', deudores.apellidos)}
                  disabled
                />
              </Grid>
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
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={`${deudores.email}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={`${deudores.ubicacion}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Fecha Solicitud"
                  size="small"
                  fullWidth
                  value={`${props.fecha_solicitud}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Obligaciones asociadas al radicado nro:"
                  size="small"
                  fullWidth
                  value={"QWEO9283812"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    void dispatch(get_obligaciones_id(deudores.identificacion))
                    set_obligaciones(true)
                  }}
                >
                  Consultar listado obligaciones
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <>
          <p><strong>Obligaciones objeto de la solicitud</strong></p>
          <TablaObligacionesSolicitud />
        </>
        {
          obligaciones ? (
            <>
              <p><strong>Obligaciones Pendiente por Pago</strong></p>
              <TablaObligacionesUsuarioInterno />
            </>
          ) : null
        }
    </>
  )
}
