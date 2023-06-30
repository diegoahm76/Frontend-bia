import { Title } from '../../../../components/Title';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { get_facilidad_general, get_facilidad_detallada, get_filtro_facilidad_detallada } from '../slices/ReportesSlice';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FileDownloadOutlined, FilterAltOffOutlined, SearchOutlined } from '@mui/icons-material';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { TablaFacilidadPagoGeneral } from '../componentes/TablaFacilidadPagoGeneral';
import { GraficasFacilidadPagoGeneral } from '../componentes/GraficasFacilidadPagoGeneral';
import { TablaFacilidadPagoDetallada } from '../componentes/TablaFacilidadPagoDetallada';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPago: React.FC = () => {
  const [filter, set_filter] = useState('');
  const [type, set_type] = useState('');
  const [search, set_search] = useState('');
  const [modal, set_modal] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_facilidad_general());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      <Title title='Reporte Facilidades de Pago con Detalle'/>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: '20px' }}
            >
            <Stack
              direction="row"
              justifyContent="left"
              spacing={2}
            >
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Seleccionar Estado del Cobro: </InputLabel>
                  <Select
                    required
                    label="Seleccionar Estado del Cobro: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_type(value)
                    }}
                  >
                    <MenuItem value='coactivo'>Coactivo</MenuItem>
                    <MenuItem value='persuasivo'>Persuasivo</MenuItem>
                  </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 130 }}>
                <InputLabel>Filtrar por: </InputLabel>
                  <Select
                    required
                    label="Filtrar por: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                    }}
                  >
                    <MenuItem value='identificacion'>NIT</MenuItem>
                    <MenuItem value='nombre_deudor'>Nombre Deudor</MenuItem>
                    <MenuItem value='codigo_expediente'>Expediente</MenuItem>
                    <MenuItem value='numero_resolucion'>Resolución</MenuItem>
                    <MenuItem value='numero_factura'># Factura</MenuItem>
                  </Select>
              </FormControl>
              <TextField
                required
                label="Búsqueda"
                size="medium"
                onChange={(event: event)=>{
                  const { value } = event.target
                  set_search(value)
                }}
              />
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_filtro_facilidad_detallada({tipo: type, parametro: filter, valor: search}));
                    set_modal(true);
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Consultar
              </Button>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<FilterAltOffOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_facilidad_detallada());
                    set_modal(true);
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Mostrar Todo
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
            >
              <Button
                color='primary'
                variant='outlined'
                startIcon={<FileDownloadOutlined />}
                onClick={() => {
                }}
              >
                Exportar Excel
              </Button>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<FileDownloadOutlined />}
                onClick={() => {
                }}
              >
                Exportar PDF
              </Button>
            </Stack>
            </Stack>
            {
              modal ? <TablaFacilidadPagoDetallada /> : (
                <>
                  <TablaFacilidadPagoGeneral />
                  <GraficasFacilidadPagoGeneral />
                </>
              )
            }
          </Box>
        </Grid>
      </Grid>

    </>
  )
}
