/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Dialog, DialogActions, DialogTitle, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Title } from '../../../../components/Title';
import { TablaObligacionesAdminAsignadas } from '../componentes/TablaObligacionesAdminAsignadas';
import { get_facilidades_asignadas } from '../slices/FacilidadesSlice';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { type FacilidadPago } from '../interfaces/interfaces';

interface RootState {
  facilidades: {
    facilidades: FacilidadPago[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesAdminAsignadas: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const [modal, set_modal] = useState(facilidades.length === 0);

  const handle_close = () => { set_modal(false) };

  useEffect(() => {
    try {
      void dispatch(get_facilidades_asignadas());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      <Title title='Listado de Facilidades de Pago Asignadas - Usuario Cormacarena'/>
      {
        facilidades.length !== 0 ? (
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
                <p>Buzón de facilidades de pago asignadas:</p>
                <TablaObligacionesAdminAsignadas />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Dialog
            open={modal}
            onClose={handle_close}
            maxWidth="xs"
          >
            <Box component="form">
              <DialogTitle>Usted no tiene facilidades de pago asignadas.</DialogTitle>
              <DialogActions>
                <Button
                  variant='outlined'
                  color="primary"
                  startIcon={<Close />}
                  onClick={handle_close}
                >
                  Cerrar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        )
      }
    </>
  )
}
