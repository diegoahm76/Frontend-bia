// import { Title } from '../../../../components/Title';
// import { Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CrearMarcaForm } from '../components/CrearMarcaForm';
import {CrearMedidaForm} from '../components/CrearMedidaForm';
import {CrearPorcentajeForm} from '../components/CrearPorcentajeForm';
import { Grid } from '@mui/material';

// import VisibilityIcon from '@mui/icons-material/Visibility';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// const tipos_marcas = [
//   {
//     value: '1',
//     label: 'Hp',
//   },
//   {
//     value: 'EUR',
//     label: 'Acer',
//   },
//   {
//     value: 'BTC',
//     label: 'Lenovo',
//   },
//   {
//     value: 'JPY',
//     label: 'Toshiba',
//   },
// ];
// const tipos_unidades = [
//   {
//     value: '1',
//     label: 'Kg',
//   },
//   {
//     value: 'EUR',
//     label: 'Lt',
//   },
//   {
//     value: 'BTC',
//     label: 'Km',
//   },
//   {
//     value: 'JPY',
//     label: 'Cm',
//   },
// ];
// const tipos_porcentaje = [
//   {
//     value: '1',
//     label: '16%',
//   },
//   {
//     value: 'EUR',
//     label: '19%',
//   },
//   {
//     value: 'BTC',
//     label: '25%',
//   },
//   {
//     value: 'JPY',
//     label: '4%',
//   },
// ];

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const CrearMarcaPorcentajeMedidaScreen: React.FC = () => {
  const [value, set_value] = useState('1');

  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_value(newValue);
  };

  return (
    <Grid container
    sx={{
      position: 'relative',
      background: '#FAFAFA',
      borderRadius: '15px',
      p: '20px',
      mb: '20px',
      boxShadow: '0px 3px 6px #042F4A26',
    }}>
      <Box sx={{ width: '90%', typography: 'body1'}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="lab API tabs example">
              <Tab label="Marca" value="1" />
              <Tab label="Medida" value="2" />
              <Tab label="Porcentaje" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CrearMarcaForm />
          </TabPanel>
          <TabPanel value="2">
            <CrearMedidaForm/>
          </TabPanel>
          <TabPanel value="3">
          <CrearPorcentajeForm/>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
  //     <Grid
  //       container
  //       spacing={2}
  //       sx={{
  //         position: 'relative',
  //         background: '#FAFAFA',
  //         borderRadius: '15px',
  //         p: '20px',
  //         mb: '20px',
  //         boxShadow: '0px 3px 6px #042F4A26',
  //       }}
  //     >
  //       <Grid item xs={12}>
  //         <Title title="CREACIÓN DE MARCA "></Title>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <Stack direction="row" spacing={2}>
  //           <Button
  //           variant="outlined"
  //           startIcon={<AddIcon />}
  //       >
  //             CREAR
  //           </Button>
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <TextField
  //           select
  //           label="Marcas Creadas"
  //           defaultValue="1"
  //           size="small"
  //           fullWidth
  //         >
  //           {tipos_marcas.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>
  //       </Grid>

  //       <Grid item xs={12}>
  //         <Title title="CREACIÓN DE PORCENTAJE "></Title>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <Stack direction="row" spacing={2}>
  //           <Button variant="outlined" startIcon={<AddIcon />}>
  //             CREAR
  //           </Button>
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <TextField
  //           select
  //           label="Porcentajes Creados"
  //           defaultValue="1"
  //           size="small"
  //           fullWidth
  //         >
  //           {tipos_porcentaje.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>
  //       </Grid>

  //       <Grid item xs={12}>
  //         <Title title="CREACIÓN DE UNIDAD DE MEDIDA "></Title>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <Stack direction="row" spacing={2}>
  //           <Button variant="outlined" startIcon={<AddIcon />}>
  //             CREAR
  //           </Button>
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={12} sm={3}>
  //         <TextField
  //           select
  //           label="Unidad de Medida Creadas"
  //           defaultValue="1"
  //           size="small"
  //           fullWidth
  //         >
  //           {tipos_unidades.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>
  //       </Grid>
  //     </Grid>
  //   </>
  // );
};
