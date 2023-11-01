import { Box, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { TablaFacilidadesFuncionario } from '../componentes/TablaFacilidadesFuncionario';
import { DialogoInformativo } from '../componentes/DialogoInformativo';
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
export const FacilidadesPagoFuncionario: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const [modal, set_modal] = useState(facilidades.length === 0);

  const handle_close = (): void => { set_modal(false) };

  useEffect(() => {
    try {
      void dispatch(get_facilidades_asignadas());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])
  useEffect(() => {
    set_modal(facilidades.length === 0); // Actualiza modal cuando cambie la longitud de facilidades
  }, [facilidades]);
  return (
    <>
     
      
      {/* {
        facilidades.length !== 0 ? ( */}
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
          > <Title title='Listado de Facilidades de Pago Asignadas - Usuario Cormacarena'/>
            <Grid item xs={12}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <p>Buzón de facilidades de pago asignadas:</p>
                <TablaFacilidadesFuncionario />
              </Box>
            </Grid>
          </Grid>
        {/* ) : ( */}
          <DialogoInformativo
            tipo_notificacion='info'
            mensaje_notificacion='Usted no tiene facilidades de pago asignadas'
            abrir_modal={modal}
            abrir_dialog={handle_close}
          />
        {/* )
      } */}
    </>
  )
}
