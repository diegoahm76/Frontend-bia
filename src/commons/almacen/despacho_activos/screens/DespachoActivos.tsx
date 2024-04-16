import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SolicitudesEnProceso from './SolicitudesEnProceso';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { interface_activos_disponibles, interface_busqueda_articulos, interface_busqueda_bodegas, interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_buscar_bodega, interface_inputs_funcionarios } from '../interfeces/types';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import BusquedaArticulos from './BusquedaArticulos';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DespachoActivos = () => {

  const [position_tab, set_position_tab] = useState<string>('1');
  const [accion, set_accion] = useState<string>('null'); // [null, ver, crear, editar]

  // Estado para saber si se está viendo los despachos sin solicitud
  const [despacho_sin_solicitud, set_despacho_sin_solicitud] = useState<boolean>(false);

  // ---- Estados de pagina 2  ------ //
  // Inputs Búsqueda funcionarios
  const [inputs_funcionarios, set_inputs_funcionarios] = useState<interface_inputs_funcionarios>(Object);
  // Inputs de busqueda de bodega
  const [inputs_buscar_bodega, set_inputs_buscar_bodega] = useState<interface_inputs_buscar_bodega>(Object);
  // INput OBservacion
  const [observacion, set_observacion] = useState<string>('');
  // Anexo file obligatorio
  const [data_anexo_obligatorio, set_data_anexo_obligatorio] = useState<any>(Object);
  // Data funcionario responsable seleccionado
  const [funcionario_responsable_seleccionado, set_funcionario_responsable_seleccionado] = useState<interface_busqueda_responsable>(Object);
  // Data funcionario operario seleccionado
  const [funcionario_operario_seleccionado, set_funcionario_operario_seleccionado] = useState<interface_busqueda_operario>(Object);
  // Data bodega seleccionada
  const [bodega_seleccionada, set_bodega_seleccionada] = useState<interface_busqueda_bodegas>(Object);


  // ---- Estados de pagina 3  ------ //
    //Data de la tabla de articulos agregados
    const [data_articulos_agregados_padres, set_data_articulos_agregados_padres] = useState<interface_busqueda_articulos[]>([]);

  useEffect(() => {
    // SI hay data de funcionario responsable seleccionado se rellenará los inputs
    if (Object.keys(funcionario_responsable_seleccionado).length !== 0) {
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_responsable: funcionario_responsable_seleccionado.tipo_documento,
        documento_funcionario_responsable: funcionario_responsable_seleccionado.numero_documento,
        nombres_funcionario_responsable: funcionario_responsable_seleccionado.primer_nombre,
        apellidos_funcionario_responsable: funcionario_responsable_seleccionado.primer_apellido,
      });
    }
    // Si hay data de funcionario operario seleccionado se rellenará los inputs
    if (Object.keys(funcionario_operario_seleccionado).length !== 0) {
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_operario: funcionario_operario_seleccionado.tipo_documento,
        documento_funcionario_operario: funcionario_operario_seleccionado.numero_documento,
        nombres_funcionario_operario: funcionario_operario_seleccionado.primer_nombre,
        apellidos_funcionario_operario: funcionario_operario_seleccionado.primer_apellido,
      });
    }
    // Si hay data de bodega seleccionada se rellenará los inputs
    if (Object.keys(bodega_seleccionada).length !== 0) {
      set_inputs_buscar_bodega({
        nombre_bodega: bodega_seleccionada.nombre,
        departamento: '',
        municipio: bodega_seleccionada.cod_municipio,
        direccion: bodega_seleccionada.direccion,
      });
    }
  }, [funcionario_operario_seleccionado, funcionario_responsable_seleccionado, bodega_seleccionada]);


  /**
   * Función para cambiar de tab - Pestaña
   */
  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  }

  // Crear despacho sin solicitud
  const btn_ver_despachos_sin_solicitudes = () => {
    set_despacho_sin_solicitud(true);
  }

  /**
   * Función para crear un despacho sin solicitud
   */
  const btn_crear_despacho_sin_solicitud = () => {
    set_position_tab('2');
    set_accion('crear');
  }

  /**
   * Función para ir a la siguiente pantalla
   */
  const btn_siguiente = () => {
    if (position_tab === '2') {
      set_position_tab('3');
    }
  }

  /**
   * Función para regresar a la pantalla anterior
   */
  const btn_atras = () => {
    if (position_tab === '3') {
      set_position_tab('2');
    }
  }

  /**
   * Función para salir de una crear o ver despacho sin solicitud
   */
  const btn_salir = () => {
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Si sale se perderán los cambios realizados",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        set_position_tab('1');
        set_accion('null');
        return true;
      }
    });
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
          <Title title='Despachos de activos' />
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver' || accion === 'crear'} sx={{ minWidth: '33.3%' }} label={despacho_sin_solicitud ? 'Despachos sin solicitud' : 'Despachos con solicitud'} value="1" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '33.3%' }} label="Búsqueda funcionarios" value="2" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '33.3%' }} label="Búsqueda activos" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesEnProceso
                    set_accion={set_accion}
                    despacho_sin_solicitud={despacho_sin_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaFuncionarios
                    accion={accion}
                    inputs_funcionarios={inputs_funcionarios}
                    set_inputs_funcionarios={set_inputs_funcionarios}
                    set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
                    set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
                    set_bodega_seleccionada={set_bodega_seleccionada}
                    inputs_buscar_bodega={inputs_buscar_bodega}
                    set_inputs_buscar_bodega={set_inputs_buscar_bodega}
                    observacion={observacion}
                    set_observacion={set_observacion}
                    data_anexo_obligatorio={data_anexo_obligatorio}
                    set_data_anexo_obligatorio={set_data_anexo_obligatorio}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaArticulos 
                    data_articulos_agregados_padres={data_articulos_agregados_padres}
                    set_data_articulos_agregados_padres={set_data_articulos_agregados_padres}
                  />
                </Grid>
              </TabPanel>

            </TabContext>

            <Grid item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 2,
            }}
            >
              {despacho_sin_solicitud && position_tab === '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => set_despacho_sin_solicitud(false)}
                  >
                    Regresar a despachos con solicitudes
                  </Button>
                </Grid>
              }

              {despacho_sin_solicitud && position_tab === '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={btn_crear_despacho_sin_solicitud}
                  >
                    Crear despacho sin solicitud
                  </Button>
                </Grid>
              }

              {!despacho_sin_solicitud &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={btn_ver_despachos_sin_solicitudes}
                  >
                    Ver despachos sin solicitudes
                  </Button>
                </Grid>
              }

              {despacho_sin_solicitud && position_tab === '2' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={btn_salir}
                  >
                    Salir
                  </Button>
                </Grid>
              }

              {despacho_sin_solicitud && position_tab !== '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    disabled={position_tab === '2'}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={btn_atras}
                  >
                    Atras
                  </Button>
                </Grid>
              }

              {despacho_sin_solicitud && position_tab !== '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={position_tab === '3'}
                    startIcon={<NavigateNextIcon />}
                    onClick={btn_siguiente}
                  >
                    Siguiente
                  </Button>
                </Grid>
              }

            </Grid>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DespachoActivos;