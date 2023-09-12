import { Title } from '../../../../components/Title';
import { TablaCarteraDetallada } from '../componentes/TablaCarteraDetallada';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_cartera_detallada } from '../slices/ReportesSlice';
import { Box, Grid } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraDetallada: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_cartera_detallada());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      {/* <Title title=''/> */}
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
          <Title title={`Reporte General de Cartera con Detalle `} />
        </Grid>
        <Grid item  marginTop={2} xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TablaCarteraDetallada />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
