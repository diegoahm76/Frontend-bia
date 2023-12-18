import { Box, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type ObligacionesUsuario, type FacilidadPagoUsuario } from '../interfaces/interfaces';
import { TablaFacilidadesUsuario } from '../componentes/TablaFacilidadesUsuario';
import { get_obligaciones } from '../slices/ObligacionesSlice';
import { get_fac_pago_autorizadas } from '../slices/FacilidadesSlice';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}

interface RootState {
  facilidades: {
    facilidades: FacilidadPagoUsuario[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadesPagoUsuario: React.FC = () => {
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_obligaciones());
      void dispatch(get_fac_pago_autorizadas());
    } catch (error: any) {
      // throw new Error(error);
    }
  }, [])

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
              <Grid item xs={12}  >
                <Title title='Mis Facilidades de Pago' />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombres"
                  size="small"
                  fullWidth
                  value={`${obligaciones.nombre_completo}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={`${obligaciones.numero_identificacion}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={`${obligaciones.email}`}
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
          >
            {
              facilidades.length !== 0 ? (
                <>
                  <p>Sus facilidades de pago actuales son:</p>
                  <TablaFacilidadesUsuario />
                </>
              ): <p>Usted no tiene facilidades de pago pendientes.</p>
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
