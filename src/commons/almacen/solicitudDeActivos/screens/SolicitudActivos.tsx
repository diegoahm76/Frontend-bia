import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SolicitudesRealizadas from './SolicitudesRealizadas';
import { useAppDispatch } from '../../../../hooks';
import { get_buscar_solicitudes_activos } from '../thunks/solicitud_activos';
import dayjs, { Dayjs } from 'dayjs';
import { interface_solicitudes_realizadas, response_solicitudes_realizadas } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import BusquedaFuncionarios from './BusquedaFuncionarios';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudActivos: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loadding, set_loadding] = useState<boolean>(false);
  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('crear');

  // Estados pantalla 1 - Solicitudes realizadas
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);


  // Estados pantalla 2 - Solicitudes de activos

  
  // Datos de la tabla de solicitudes realizadas
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitudes_realizadas[]>([
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
  ]);


  const get_buscar_solicites_activos = () => {
    dispatch(get_buscar_solicitudes_activos(
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      estado
    )).then((response: response_solicitudes_realizadas) => {
      if(Object.keys(response).length !== 0){
        set_data_solicitudes_realizadas(response.data);
      } else {
        control_error('No se encontraron solicitudes');
        set_data_solicitudes_realizadas([]);
      }
    })
  }


  const solicites_obtenidas = useRef(false);
  useEffect(() => {
    if(!solicites_obtenidas.current){
      get_buscar_solicites_activos();
      solicites_obtenidas.current = true;
    }
  }, []);


  const [formulario_valido, set_formulario_valido] = useState(false);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const limpiar_formulario = () => {
    set_position_tab('1');
  }

  const onsubmit_form = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "40px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}       
        >
        <Grid item xs={12}>
          <Title title="Solicitud de activos"></Title>
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: '33.3%' }} label="Solicitudes realizadas" value="1" />
                  <Tab sx={{ minWidth: '33.3%' }} label="Solicitud de funcionarios" value="2" />
                  <Tab sx={{ minWidth: '33.3%' }} label="Búsqueda de  artículos" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesRealizadas
                    estado={estado}
                    set_estado={set_estado}
                    fecha_inicio={fecha_inicio}
                    set_fecha_inicio={set_fecha_inicio}
                    fecha_fin={fecha_fin}
                    set_fecha_fin={set_fecha_fin}
                    data_solicitudes_realizadas={data_solicitudes_realizadas}
                    get_buscar_solicites_activos={get_buscar_solicites_activos}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaFuncionarios
                    accion={accion}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  
                </Grid>
              </TabPanel>
            </TabContext>

            <Grid item xs={12}  sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
                gap: 2,
              }}
              >
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  disabled={loadding}
                  startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                  type='submit'
                >
                  {!loadding ? accion === 'crear' ? "Guardar" : 'Actualizar' : ''}
                </Button>
              </Grid>
              
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  disabled={position_tab === '1'}
                  color="error"
                  variant="contained"
                  startIcon={<ChevronLeftIcon />}
                  onClick={()=>{set_position_tab('1')}}
                >
                  Atras
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={limpiar_formulario}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
 
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudActivos;