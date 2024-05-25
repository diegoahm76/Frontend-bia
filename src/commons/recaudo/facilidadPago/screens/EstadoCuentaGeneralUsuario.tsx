import { EncabezadoObligacionesUsuario } from '../componentes/EncabezadoObligacionesUsuario';
import { TablaObligacionesUsuario } from '../componentes/TablaObligacionesUsuario';
import { Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { get_obligaciones } from '../slices/ObligacionesSlice';
import { type ObligacionesUsuario } from '../interfaces/interfaces';
import { TablaObligacionesGralUsuario } from '../componentes/EstadoCuenta/TablaObligacionesGral';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario[];
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadoCuentaGeneralUsuario: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { obligaciones } = useSelector(
    (state: RootState) => state.obligaciones
  );

  useEffect(() => {
    try {
      void dispatch(get_obligaciones());
      console.log('obligaciones', obligaciones);
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  return (
    <>
      <EncabezadoObligacionesUsuario />
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
          <Box component="form" noValidate autoComplete="off">
            {obligaciones?.length !== 0 ? (
              <>
                <p>El usuario tiene las siguientes obligaciones:</p>
                <TablaObligacionesGralUsuario />
              </>
            ) : (
              <>Sin obligaciones</>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
