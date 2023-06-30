import { Title } from '../../../../components/Title';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { FileDownloadOutlined, FilterAltOffOutlined, SearchOutlined } from '@mui/icons-material';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { get_cartera_edades, get_filtro_cartera_edades } from '../slices/ReportesSlice';
import { useState } from 'react';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { TablaCarteraEdad } from '../componentes/TablaCarteraEdad';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneralEdad: React.FC = () => {
  const [filter, set_filter] = useState('');
  const [consulta, set_consulta] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  return (
    <>
      <Title title='Informe General de Cartera - Gestión por Edades'/>
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
              <FormControl sx={{ minWidth: 130 }}>
                <InputLabel>Seleccionar: </InputLabel>
                  <Select
                    label="Seleccionar: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                      set_consulta(false)
                    }}
                  >
                    <MenuItem value='0 a 180 días'>0 a 180 Días</MenuItem>
                    <MenuItem value='181 a 360 días'>181 a 360 Días</MenuItem>
                    <MenuItem value='mayor a 361 días'>Mayor a 361 Días</MenuItem>
                  </Select>
              </FormControl>
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_filtro_cartera_edades({ valor: filter}));
                    set_consulta(true)
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
                    void dispatch(get_cartera_edades());
                    set_filter('')
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
              filter === '0 a 180 días' && consulta ? (
                <>
                  <h3>0 a 180 días</h3>
                  <TablaCarteraEdad />
                </>
              ) : filter === '181 a 360 días' && consulta ? (
                <>
                  <h3>181 a 360 días</h3>
                  <TablaCarteraEdad />
                </>
              ) : filter === 'mayor a 361 días' && consulta ? (
                <>
                  <h3>Mayor a 361 días</h3>
                  <TablaCarteraEdad />
                </>
              ) : null
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
