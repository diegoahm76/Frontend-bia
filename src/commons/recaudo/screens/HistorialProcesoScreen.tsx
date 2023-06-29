import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Title } from '../../../components/Title';
import { TablaIncumplimiento } from '../components/HistorialProceso/TablaIncumplimiento';
import { Encabezado } from '../components/HistorialProceso/Encabezado';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialProceso: React.FC = () => {
  const [modal_incumplimiento, set_modal_incumplimiento] = useState(false);
  const [modal_medidas, set_modal_medidas] = useState(false);
  const [modal_cobro, set_modal_cobro] = useState(false);

  return (
    <>
      <Encabezado />
      <Title title='Historial del Proceso' />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Box
          className={`border px-4 text-white fs-5 p-1`}
          sx={{
            display: 'grid',
            background:
              'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
            width: '100%',
            height: '40px',
            color: '#fff',
            borderRadius: '10px',
            pl: '20px',
            fontSize: '17px',
            fontWeight: '900',
            alignContent: 'center',
            marginTop: '10px',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: '20px', mt: '20px' }}
          >
            <Typography>{`Incumplimiento de pago ${'21-04-2022'}`}</Typography>
            <Button
              size='small'
              color='secondary'
              variant='text'
              onClick={() => {
                if(modal_incumplimiento){
                  set_modal_incumplimiento(false)
                } else {
                  set_modal_incumplimiento(true)
                }
            }}
            >
              {
                modal_incumplimiento ? 'Cerrar' : 'Abrir'
              }
            </Button>
          </Stack>
        </Box>
        {
          modal_incumplimiento ? <TablaIncumplimiento /> : null
        }
        <Box
          className={`border px-4 text-white fs-5 p-1`}
          sx={{
            display: 'grid',
            background:
              'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
            width: '100%',
            height: '40px',
            color: '#fff',
            borderRadius: '10px',
            pl: '20px',
            fontSize: '17px',
            fontWeight: '900',
            alignContent: 'center',
            marginTop: '10px',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: '20px', mt: '20px' }}
          >
            <Typography>{`Medidas Cautelares ${'25-06-2022'}`} </Typography>
            <Button
              size='small'
              color='secondary'
              variant='text'
              onClick={() => {
                if(modal_medidas){
                  set_modal_medidas(false)
                } else {
                  set_modal_medidas(true)
                }
            }}
            >
              {
                modal_medidas ? 'Cerrar' : 'Abrir'
              }
            </Button>
          </Stack>
        </Box>
        {
          modal_medidas ? 'Información Medidas Cautelares' : null
        }
        <Box
          className={`border px-4 text-white fs-5 p-1`}
          sx={{
            display: 'grid',
            background:
              'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
            width: '100%',
            height: '40px',
            color: '#fff',
            borderRadius: '10px',
            pl: '20px',
            fontSize: '17px',
            fontWeight: '900',
            alignContent: 'center',
            marginTop: '10px',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: '20px', mt: '20px' }}
          >
            <Typography>{`Cobro Coactivo ${'11-04-2023'}`}</Typography>
            <Button
              size='small'
              color='secondary'
              variant='text'
              onClick={() => {
                if(modal_cobro){
                  set_modal_cobro(false)
                } else {
                  set_modal_cobro(true)
                }
            }}
            >
              {
                modal_cobro ? 'Cerrar' : 'Abrir'
              }
            </Button>
          </Stack>
        </Box>
        {
          modal_cobro ? 'Información Cobro Coactivo' : null
        }
      </Grid>
    </>
  )
}
