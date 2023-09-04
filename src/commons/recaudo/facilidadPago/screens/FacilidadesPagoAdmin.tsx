import { Box, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { TablaFacilidadesAdmin } from '../componentes/TablaFacilidadesAdmin';
import { get_facilidades_ingresadas } from '../slices/FacilidadesSlice';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadesPagoAdmin: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_facilidades_ingresadas());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      <Title title='Listado de Facilidades de Pago - Usuario Cormacarena Admin'/>
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
            <p>Buzón de facilidades de pago ingresadas:</p>
            <TablaFacilidadesAdmin />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
