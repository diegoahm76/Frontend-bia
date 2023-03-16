import { Box, Grid, Typography, Divider, List, ListItem } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Title } from '../../../components';
import { LinearWithValueLabel } from '../hooks/LinearProgressWithLabel';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoScreen: React.FC = () => {
  return (
    <>
      <Grid container direction='row'>
        <Grid item 
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
          }} 
          xs={2}
          md={3} 
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <AssignmentIcon color="info" sx={{ height: 40, width: 40 }}></AssignmentIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', pl: '20px' }}>
                <Typography variant="subtitle2" color='gray'>
                  Cantidad Deudores
                </Typography>
                <Typography variant="h5">
                  1000
                </Typography>
              </Box>
              <Typography sx={{ pl: '40px' }} variant="body2" color='red' alignContent='end'>
                -25%
              </Typography>
          </Box>
        </Grid>
        <Grid 
          item 
          sx={{
            // width: '200px',
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
          }} 
          xs={2} 
          md={3}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <PendingActionsIcon color="warning" sx={{ height: 40, width: 40 }}></PendingActionsIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', pl: '20px' }}>
                <Typography variant="subtitle2" color='gray'>
                  Tareas Pendientes
                </Typography>
                <Typography variant="h5">
                  14
                </Typography>
              </Box>
              <Typography sx={{ pl: '40px' }} variant="body2" color='green' alignContent='end'>
                +10%
              </Typography>
          </Box>
        </Grid>
        <Grid 
          item
          sx={{
            // width: '200px',
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
          xs={2}
          md={3}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <AssignmentReturnedIcon color="error" sx={{ height: 40, width: 40 }}></AssignmentReturnedIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', pl: '20px' }}>
                <Typography variant="subtitle2" color='gray'>
                  Tareas Urgentes
                </Typography>
                <Typography variant="h5">
                  5
                </Typography>
              </Box>
              <Typography sx={{ pl: '40px' }} variant="body2" color='red' alignContent='end'>
                -10%
              </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            // width: '200px',
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
          xs={2}
          md={3.1}
        >
         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <AssignmentTurnedInIcon color="success" sx={{ height: 40, width: 40 }}></AssignmentTurnedInIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', pl: '20px' }}>
                <Typography variant="subtitle2" color='gray'>
                  Tareas Completadas
                </Typography>
                <Typography variant="h5">
                  7
                </Typography>
              </Box>
              <Typography sx={{ pl: '40px' }} variant="body2" color='green' alignContent='end'>
                +25%
              </Typography>
          </Box>
        </Grid>
      </Grid>

    <Grid container direction='row'>

    <Grid item 
          sx={{
            m: '10px',
          }} 
          xs={2}
          md={3} 
        >

      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 300,
          maxHeight: 170,
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
            <Typography variant='subtitle2' color='gray'>Cartera Total</Typography>
          </ListItem>
        </List>
        <Divider />
          <List>
            <ListItem disablePadding>

              <Box flexDirection='column'>
                <Typography variant='h5'>
                  $1.2M
                </Typography>
                <Typography variant="body2" color='red' alignContent='end'>
                  -25%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <TrendingDownIcon color='error' sx={{ height: 70, width: 70}}></TrendingDownIcon>
              </Box>

            </ListItem>

          </List>
      </Box>
      </Grid>

      <Grid item 
          sx={{
            m: '10px',
          }} 
          xs={2}
          md={3} 
        >
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 300,
          maxHeight: 170,
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
            <Typography variant='subtitle2' color='gray'>Comparacion del Año anterior</Typography>
          </ListItem>
        </List>
        <Divider />
          <List>
            <ListItem disablePadding>

              <Box flexDirection='column'>
                <Typography variant='h5'>
                  $1,534
                </Typography>
                <Typography variant="body2" color='green' alignContent='end'>
                  +7%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <TrendingUpIcon color='success' sx={{ height: 70, width: 70}}></TrendingUpIcon>
              </Box>

            </ListItem>

          </List>
      </Box>
      </Grid>

      <Grid item 
          sx={{
            m: '10px',
          }} 
          xs={2}
          md={3} 
        >
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            // mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
        <List>
          <ListItem disablePadding>
            <Typography variant='subtitle2' color='gray'>Total Visitantes</Typography>
          </ListItem>
        </List>
        <Divider />
          <List>
            <ListItem disablePadding>

              <Box flexDirection='column'>
                <Typography variant='h5'>
                  $155K
                </Typography>
                <Typography variant="body2" color='green' alignContent='end'>
                  +25%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <TrendingUpIcon color='success' sx={{ height: 70, width: 70}}></TrendingUpIcon>
              </Box>

            </ListItem>

          </List>
        </Box>
      </Grid>

      <Grid item 
          sx={{
            m: '10px',
          }}
      >
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            // mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
          
        >
        <List>
          <ListItem disablePadding>
            <Typography variant='subtitle2' color='gray'>Total Usuarios</Typography>
          </ListItem>
        </List>
        <Divider />
          <List>
            <ListItem disablePadding>

              <Box flexDirection='column'>
                <Typography variant='h5'>
                  4234
                </Typography>
                <Typography variant="body2" color='green' alignContent='end'>
                  +19%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <EqualizerIcon color='success' sx={{ height: 70, width: 70}}></EqualizerIcon>
              </Box>

            </ListItem>

          </List>
        </Box>
      </Grid>

      <Grid item 
          sx={{
            m: '10px',
          }}
          xs={2}
          md={3} 
      >
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
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
            <Typography variant='subtitle2' color='gray'>Cantidad Deudores Vs Al dia</Typography>
          </ListItem>
        </List>
        <Divider />
          <List>
            <ListItem disablePadding>

              <Box flexDirection='column'>
                <Typography variant='h5'>
                  155k
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <PieChartIcon color='info' sx={{ height: 70, width: 70}}></PieChartIcon>
              </Box>

            </ListItem>

          </List>
        </Box>
      </Grid>
    </Grid>

    <Title title="INFORMACION DE ARTICULOS"></Title>

    <Grid container direction='row'>
      <Grid
        item
        sx={{
          mt: '20px',
          ml: '10px'
        }}
      >
         <Box 
          sx={{ 
            width: '160%',
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
                <Typography>
                  Proceso Facturación
                </Typography>
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

        {/* <Box 
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        ></Box> */}
      </Grid>

      <Grid
        container
        direction='column'
        sx={{
          mt: '10px',
          ml: '10px'
        }}
      >
        <Box
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
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
              <Typography variant='subtitle2' color='gray'>Total Balance</Typography>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>

            <Box flexDirection='column'>
                <Typography variant='h5'>
                  $1,534
                </Typography>
                <Typography variant="body2" color='green' alignContent='end'>
                  +7%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <TrendingUpIcon color='success' sx={{ height: 70, width: 70}}></TrendingUpIcon>
              </Box>

            </ListItem>

          </List>
        </Box>
        
      </Grid>
      <Grid
        container
        direction='column'
        sx={{
          mt: '5px',
          ml: '10px'
        }}
      >
        <Box
          sx={{ 
            width: '100%',
            maxWidth: 300,
            maxHeight: 170,
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
              <Typography variant='subtitle2' color='gray'>Total Users</Typography>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>

            <Box flexDirection='column'>
                <Typography variant='h5'>
                  4234
                </Typography>
                <Typography variant="body2" color='green' alignContent='end'>
                  +19%
                </Typography>
              </Box>

              <Box sx={{ pl: '100px' }}>
                <EqualizerIcon color='success' sx={{ height: 70, width: 70}}></EqualizerIcon>
              </Box>

            </ListItem>

          </List>
        </Box>
        
      </Grid>
    </Grid>
          
    </>
  )
}
