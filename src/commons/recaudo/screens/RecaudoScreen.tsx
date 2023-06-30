import { Box, Grid, Typography, Divider, List, ListItem } from '@mui/material';
import { Title } from '../../../components';
import { LinearWithValueLabel } from '../components/datos/LinearProgress/LinearProgressWithLabel';
import { CuadroInformacion } from '../components/datos/CuadroInformacion';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { CuadroComparacion } from '../components/datos/CuadroComparacion';
import { ChartComponent } from '../chart/ChartComponent';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoScreen: React.FC = () => {
  return (
    <>
      {/* CUADRO DE INFORMACION */}
      <Grid container direction='row'>

        {/* CANTIDAD DEUDORES */}
        <CuadroInformacion 
          titulo={'Cantidad Deudores'}
          numero_principal={'1000'}
          porcentaje={'-25%'}
          color={'red'} 
          icono={
            <AssignmentIcon color="info" sx={{ height: 40, width: 40 }}></AssignmentIcon>
          } 
        />

        {/* TAREAS PENDIENTES */}
        <CuadroInformacion 
          titulo={'Tareas Pendientes'}
          numero_principal={'14'}
          porcentaje={'+10%'}
          color={'green'} 
          icono={
            <PendingActionsIcon color="warning" sx={{ height: 40, width: 40 }}></PendingActionsIcon>
          } 
        />

        {/* TAREAS URGENTES */}
        <CuadroInformacion
          titulo={'Tareas Urgentes'}
          numero_principal={'5'}
          porcentaje={'-10%'}
          color={'red'} 
          icono={
            <AssignmentReturnedIcon color="error" sx={{ height: 40, width: 40 }}></AssignmentReturnedIcon>
          } 
        />

        {/* TAREAS COMPLETADAS */}
        <CuadroInformacion
          titulo={'Tareas Completadas'}
          numero_principal={'7'}
          porcentaje={'+25%'}
          color={'green'} 
          icono={
            <AssignmentTurnedInIcon color="success" sx={{ height: 40, width: 40 }}></AssignmentTurnedInIcon>
          } 
        />

      </Grid>

    <Grid container direction='row'>
      
      {/* CARTERA TOTAL */}
      <CuadroComparacion 
        titulo={'Cartera Total'}
        precio={'$1.2M'}
        porcentaje={'-25%'}
        color={'red'}
        icono={
          <TrendingDownIcon color='error' sx={{ height: 70, width: 70}}></TrendingDownIcon>
        }
      />

      {/* COMPARACION DEL AÑO ANTERIOR */}
      <CuadroComparacion 
        titulo={'Comparacion del Año anterior'}
        precio={'$1,534'}
        porcentaje={'+7%'}
        color={'green'}
        icono={
          <TrendingUpIcon color='success' sx={{ height: 70, width: 70}}></TrendingUpIcon>
        }
      />

      {/* TOTAL VISITANTES */}
      <CuadroComparacion 
        titulo={'Total Visitantes'}
        precio={'155k'}
        porcentaje={'+25%'}
        color={'green'}
        icono={
          <TrendingUpIcon color='success' sx={{ height: 70, width: 70}}></TrendingUpIcon>
        }
      />

      {/* TOTAL USUARIOS */}
      <CuadroComparacion 
        titulo={'Total Usuarios'}
        precio={'4234'}
        porcentaje={'+19%'}
        color={'green'}
        icono={
          <EqualizerIcon color='success' sx={{ height: 70, width: 70}}></EqualizerIcon>
        }
      />

    </Grid>

    <Title title="Información General"></Title>

    <Grid container direction='row'>

      <Grid
        item
        sx={{
          mt: '20px',
          ml: '10px',
        }}
      >
         <Box 
          sx={{ 
            width: 470,
            maxWidth: 3000,
            maxHeight: 1700,
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <List>

            <ListItem disablePadding>
              <Typography variant='subtitle2' color='gray'>Usuarios</Typography>
            </ListItem>

          </List>
          <Divider/>

          <List>
            <ListItem>
              <Box flexDirection='column'>

                <Typography>Proceso Facturación</Typography>

                <LinearWithValueLabel  />

                <Typography>Instancia de Cobro Persuasivo</Typography>
                
                <LinearWithValueLabel  />
                
                <Typography>Instancia de Cobro Coactivo</Typography>
                
                <LinearWithValueLabel  />
                
                <Typography>Notificaciones</Typography>
                
                <LinearWithValueLabel  />
                
                <Typography>Notificaciones</Typography>
                
                <LinearWithValueLabel  />
                
                <Typography>Alarmas</Typography>
                
                <LinearWithValueLabel  />

              </Box>
            </ListItem>
          </List>

        </Box>
      </Grid>

      <Grid
        item
        sx={{
          mt: '20px',
          ml: '10px',
          mr: '10px'
        }}
      >
        <Box 
          sx={{ 
            width: 630,
            maxWidth: 3000,
            maxHeight: 1700,
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >

          <List>
            <ListItem disablePadding>
                <Typography variant='subtitle2' color='gray'>Grafica de Tendencia</Typography>
            </ListItem>
          </List>

          <Divider />

          {/* CHART COMPONENT */}
          <ChartComponent />

        </Box>
      </Grid>

    </Grid>
          
    </>
  )
}
