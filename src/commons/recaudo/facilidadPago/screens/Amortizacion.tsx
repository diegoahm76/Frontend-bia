/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Title } from '../../../../components/Title';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type event } from '../interfaces/interfaces';
import { TablaLiquidacion } from '../componentes/TablaLiquidacion';
import { TablaLiquidacionResumen } from '../componentes/TablaLiquidacionResumen';
import { TablaProyeccionPagos } from '../componentes/TablaProyeccionPagos';
import { ResumenLiquidacionFacilidad } from '../componentes/ResumenLiquidacionFacilidad';

interface RootState {
  deudores: {
    deudores: {
      identificacion: string;
      nombre: string;
      apellido: string;
      numero_facilidad: string;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Amortizacion: React.FC = () => {
  const [date, set_date] = useState<Date | null>(new Date());
  const [num_periodicidad, set_num_periodicidad] = useState(0);
  const [periodicidad, set_periodicidad] = useState('');
  const [tasa_usura, set_tasa_usura] = useState(0);
  const [tasa_diaria, set_tasa_diaria] = useState(0);
  const [modal, set_modal] = useState(false);
  const { deudores } = useSelector((state: RootState) => state.deudores);

  console.log('periodicidad: ', num_periodicidad);

  const handle_change_date = (date: Date | null) => {
    set_date(date);
  };

  useEffect(() => {
    const tasa = tasa_usura / 365;
    set_tasa_diaria(tasa);
  }, [tasa_usura])

  return (
    <>
      <Title title='Liquidación de la Facilidad de Pago - Usuario Cormacarena' />
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
            <h3>Datos de Encabezado</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombre Deudor"
                  size="small"
                  fullWidth
                  value={''.concat(deudores.nombre, ' ', deudores.apellido)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={`${deudores.identificacion}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nro. Solicitud Facilidad de Pago"
                  size="small"
                  fullWidth
                  value={`${deudores.numero_facilidad}`}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
            <h3>1. Datos Base para Liquidación al día de Abono</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  label="Tasa de Usura a Aplicar"
                  size="small"
                  fullWidth
                  type='number'
                  onChange={(event: event) => {
                    const { value } = event.target
                    set_tasa_usura(parseFloat(value))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl required size='small' fullWidth>
                    <InputLabel>Mes de Tasa</InputLabel>
                    <Select
                      label="Mes de Tasa"
                      defaultValue={""}
                      onChange={() => {}}
                    >
                      <MenuItem value='1'>Enero</MenuItem>
                      <MenuItem value='2'>Febrero</MenuItem>
                      <MenuItem value='3'>Marzo</MenuItem>
                      <MenuItem value='4'>Abril</MenuItem>
                      <MenuItem value='5'>Mayo</MenuItem>
                      <MenuItem value='6'>Junio</MenuItem>
                      <MenuItem value='7'>Julio</MenuItem>
                      <MenuItem value='8'>Agosto</MenuItem>
                      <MenuItem value='9'>Septiembre</MenuItem>
                      <MenuItem value='10'>Octubre</MenuItem>
                      <MenuItem value='11'>Noviembre</MenuItem>
                      <MenuItem value='12'>Diciembre</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Tasa Diaria a Utilizar"
                  size="small"
                  fullWidth
                  value={`${tasa_diaria.toFixed(2)}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  label="Valor del Abono"
                  size="small"
                  fullWidth
                  type='number'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="% Abono"
                  size="small"
                  fullWidth
                  value={`Valor Abonado / Valor Deuda`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size='small' fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                    <DatePicker
                      label="Fecha Pago Abono"
                      inputFormat="YYYY/MM/DD"
                      openTo="day"
                      views={['day', 'month', 'year']}
                      value={date}
                      onChange={handle_change_date}
                      renderInput={(params) => (
                        <TextField
                          size='small'
                          required
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Periodicidad</InputLabel>
                  <Select
                    label="Periodicidad"
                    name='periodicidad'
                    defaultValue={`${'1'}`}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_num_periodicidad(parseInt(value))
                      if(value === '1') {
                        set_periodicidad('meses')
                      }
                      if(value === '3') {
                        set_periodicidad('trimestres')
                      }
                      if(value === '6') {
                        set_periodicidad('semestres')
                      }
                      if(value === '12') {
                        set_periodicidad('años')
                      }
                    }}
                  >
                    <MenuItem value="1">Mensual</MenuItem>
                    <MenuItem value="3">Trimestral</MenuItem>
                    <MenuItem value="6">Semestral</MenuItem>
                    <MenuItem value="12">Anual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                    label={periodicidad !== '' ? `Número de Cuotas (${periodicidad})`: 'Número de Cuotas'}
                    size="small"
                    fullWidth
                    type='number'
                    defaultValue={`${'3'}`}
                  />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size='small' fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                    <DatePicker
                      label="Fecha Final de Pago"
                      inputFormat="YYYY/MM/DD"
                      openTo="day"
                      views={['day', 'month', 'year']}
                      value={date}
                      onChange={handle_change_date}
                      renderInput={(params) => (
                        <TextField
                          size='small'
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction="row"
            justifyContent="right"
            spacing={2}
            sx={{ mb: '20px' }}
          >
            <Button
              color='primary'
              variant='contained'
              startIcon={<Add />}
              sx={{ marginTop: '30px' }}
              onClick={() => {
                set_modal(true)
              }}
            >
              Generar Plan de Pagos
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {
        modal ? (
          <>
            <TablaLiquidacion />
            <TablaLiquidacionResumen />
            <ResumenLiquidacionFacilidad />
            <TablaProyeccionPagos />
          </>
        ) : null
      }
    </>
  )
}
