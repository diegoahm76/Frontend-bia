import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box, Button, Grid, Tab } from '@mui/material';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ConfiguracionGeneral from './ConfiguracionGeneral';
import dayjs, { Dayjs } from 'dayjs';
import { interface_anexo_opcional, interface_form_inf_tercero, interface_inf_tercero } from '../interfaces/types';
import DetallesActivos from './DetallesActivos';


// eslint-disable-next-line @typescript-eslint/naming-convention
const SalidaEspecialActivos: React.FC = () => {
  const [position_tab, set_position_tab] = useState<string>('1');
  const [loadding, set_loadding] = useState<boolean>(false);
  const [accion, set_accion] = useState<string>('null'); 

  const [loadding_registro_baja, set_loadding_registro_baja] = useState<boolean>(false);

  // Pantalla 1 - Configuración general
  const [consecutivo, set_consecutivo] = useState<number | null>(null);
  const [consecutivo_buscar, set_consecutivo_buscar] = useState<number>(0);
  const [fecha_salida, set_fecha_salida] = useState<Dayjs | null>(dayjs());
  const [form_inf_tercero, set_form_inf_tercero] = useState<interface_form_inf_tercero>(Object);
  const [referencia_salida, set_referencia_salida] = useState<string>('');
  const [concepto, set_concepto] = useState<string>('');
  const [data_anexos_opcionales, set_data_anexos_opcionales] = useState<interface_anexo_opcional[]>([]);

  // Datos de la inf persona tercero seleccionado del modal
  const [data_inf_tercero_seleccionado, set_data_inf_tercero_seleccionado] = useState<interface_inf_tercero>(Object);

  useEffect(() => {
    if (Object.keys(data_inf_tercero_seleccionado).length !== 0){
      set_accion('crear');
    } else if(referencia_salida.trim() !== ''){
      set_accion('crear');
    } else if(concepto.trim() !== ''){
      set_accion('crear');
    } else if(form_inf_tercero.tipo_documento !== undefined && form_inf_tercero.tipo_documento !== ''){
      set_accion('crear');
    } else if(form_inf_tercero.documento !== undefined && form_inf_tercero.documento !== ''){
      set_accion('crear');
    } else {
      set_accion('null');
    }
  }, [accion,data_inf_tercero_seleccionado,concepto,referencia_salida,form_inf_tercero]);
  
  // Cargar datos de la inf persona tercero seleccionado del modal
  useEffect(() => {
    if (Object.keys(data_inf_tercero_seleccionado).length > 0) {
      set_form_inf_tercero({
        id_persona_tercero: data_inf_tercero_seleccionado.id_persona,
        tipo_documento: data_inf_tercero_seleccionado.tipo_documento,
        documento: data_inf_tercero_seleccionado.numero_documento,
        nombres: `${data_inf_tercero_seleccionado.primer_nombre ?? ''} ${data_inf_tercero_seleccionado.segundo_nombre ?? ''}`,
        apellidos: `${data_inf_tercero_seleccionado.primer_apellido ?? ''} ${data_inf_tercero_seleccionado.segundo_apellido ?? ''}`
      });
    }
  }, [data_inf_tercero_seleccionado]);


  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      /* AQUI SE PUEDEN HACER ACCIONES EN DADO CASO QUE SE SELECIONE UNA PAGINA O LA OTRA */
    }
  };

  const limpiar_formulario = () => {
    set_position_tab('1');
    set_consecutivo_buscar(0);
    set_concepto('');
    set_referencia_salida('');
    set_form_inf_tercero({} as interface_form_inf_tercero);
    set_data_inf_tercero_seleccionado({} as interface_inf_tercero);
  }

  const onsubmit_form = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    set_loadding(true);
  }

  const btn_continuar = () => {
    set_position_tab('2');
  }

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
          <Title title="Registrar salida especial activos" />
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: '50%'}} label="Configuración general" value="1" />
                  <Tab sx={{ minWidth: '50%'}} label="Detalles y activos" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <ConfiguracionGeneral
                    set_loadding_registro_baja={set_loadding_registro_baja}
                    loadding_registro_baja={loadding_registro_baja}
                    set_accion={set_accion}
                    accion={accion}
                    set_consecutivo={set_consecutivo}
                    consecutivo={consecutivo}
                    set_consecutivo_buscar={set_consecutivo_buscar}
                    consecutivo_buscar={consecutivo_buscar}
                    fecha_salida={fecha_salida}
                    concepto={concepto}
                    set_concepto={set_concepto}
                    referencia_salida={referencia_salida}
                    set_referencia_salida={set_referencia_salida}
                    set_form_inf_tercero={set_form_inf_tercero}
                    form_inf_tercero={form_inf_tercero}
                    set_data_inf_tercero_seleccionado={set_data_inf_tercero_seleccionado}
                    data_anexos_opcionales={data_anexos_opcionales}
                    set_data_anexos_opcionales={set_data_anexos_opcionales}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <DetallesActivos />
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
              {position_tab !== '3' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    disabled={loadding || position_tab === '1'}
                    startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                    type='submit'
                  >
                    {!loadding ? accion === 'crear' ? "Guardar" : 'Actualizar' : ''}
                  </Button>
                </Grid>
              }
              
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  disabled={position_tab === '1'}
                  color="error"
                  variant="contained"
                  startIcon={<ChevronLeftIcon />}
                  onClick={()=>{set_position_tab(position_tab === '1' ? '1' : (parseInt(position_tab) - 1).toString())}}
                >
                  Atras
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  type='button'
                  variant='contained'
                  color='primary'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={()=>btn_continuar()}
                >
                  Continuar
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
}
 
// eslint-disable-next-line no-restricted-syntax
export default SalidaEspecialActivos;
