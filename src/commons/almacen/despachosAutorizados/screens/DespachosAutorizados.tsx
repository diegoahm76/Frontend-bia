import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DespachosEnProceso from './DespachosEnProceso';
import { interface_resumen_solicitud_despacho } from '../interfaces/types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../../hooks';
import { put_editar_anexo_despacho } from '../thunks/despachos_autorizados';



// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const DespachosAutorizados = () => {
  const dispatch = useAppDispatch();

  // estado para saber que accion esta realizando el usuario
  const [accion, set_accion] = useState<string>('null'); // [null, rechazar, ver, editar]

  // Form data
  const form_data = new FormData();

  // loadding del boton de guardar
  const [loadding_btn_guardar, set_loadding_btn_guardar] = useState<boolean>(false);

  const [position_tab, set_position_tab] = useState<string>('1');

  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  // Anexo file a editar
  const [data_anexo_opcional, set_data_anexo_opcional] = useState<any>(Object);

  const [data_resumen_solicitud_despacho, set_data_resumen_solicitud_despacho] = useState<interface_resumen_solicitud_despacho>(Object);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const validar_formulario: ()=>Promise<boolean> = async() => {
    if(!('name' in data_anexo_opcional)){
      control_error('Haz click en el icono de Editar, y sube un archivo para poder continuar');
      return false;
    }
    return true;
  }

  const guardar_edicion = async() => {
    const validacion = await validar_formulario();

    if ('name' in data_anexo_opcional) {
      form_data.append('anexo_opcional', data_anexo_opcional);
    }

    if(validacion){
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result: any) => {
        if (result.isConfirmed) {
          editar_anexo_despacho();
          return true;
        }
      });
    }
  }

  function editar_anexo_despacho() {
    set_loadding_btn_guardar(true);
    dispatch(put_editar_anexo_despacho(id_solicitud_activo, form_data))
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Anexo editado correctamente');
            set_loadding_btn_guardar(false);
            set_data_anexo_opcional({} as any);
            set_accion('null');
          } else {
            if (response.detail) {
              control_error(response.detail)
              set_loadding_btn_guardar(false);
            } else {
              control_error('Error interno al intentar crear el despacho');
              set_loadding_btn_guardar(false);
            }
            set_loadding_btn_guardar(false);
          }
        } else {
          control_error('Error interno al intentar crear el despacho');
          set_loadding_btn_guardar(false);
        }
      }
      )
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
          <Title title='Despachos autorizados' />
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver'} sx={{ minWidth: '50%' }} label="Despachos autorizados" value="1" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '50%' }} label="Resumen del despacho" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <DespachosEnProceso
                    accion={accion}
                    set_accion={set_accion}
                    set_position_tab={set_position_tab}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    set_data_resumen_solicitud_despacho={set_data_resumen_solicitud_despacho}
                    id_solicitud_activo={id_solicitud_activo}
                    data_anexo_opcional={data_anexo_opcional}
                    set_data_anexo_opcional={set_data_anexo_opcional}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>

                </Grid>
              </TabPanel>
            </TabContext>
          </Box>

          <Grid container item xs={12} sx={{
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
                startIcon={<SaveIcon />}
                disabled={loadding_btn_guardar}
                onClick={() => guardar_edicion()}
              >
                Guardar
              </Button>
            </Grid>

            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color="error"
                variant="contained"
                disabled={position_tab === '1'}
                startIcon={<ArrowBackIosIcon />}
                onClick={()=>set_position_tab('1')}
              >
                Atras
              </Button>
            </Grid>

            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                disabled={position_tab === '2'}
                startIcon={<NavigateNextIcon />}
                onClick={()=>set_position_tab('2')}
              >
                Siguiente
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DespachosAutorizados;