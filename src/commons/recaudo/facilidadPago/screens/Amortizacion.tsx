/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Title } from '../../../../components/Title';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type event } from '../interfaces/interfaces';
import { TablaLiquidacion } from '../componentes/TablaLiquidacion';
import { TablaLiquidacionResumen } from '../componentes/TablaLiquidacionResumen';
import { TablaProyeccionPagos } from '../componentes/TablaProyeccionPagos';
import { ResumenLiquidacionFacilidad } from '../componentes/ResumenLiquidacionFacilidad';
import dayjs from 'dayjs';
import { get_datos_amortizacion } from '../requests/requests';

interface RootStateDeudor {
  deudores: {
    deudores: {
      cuotas: number;
      fecha_abono: string;
      id: number;
      identificacion: string;
      nombre_deudor: string;
      periodicidad: number;
      porcentaje_abonado: number;
      valor_abonado: string;
    }
  }
}

interface RootStateFacilidad {
  facilidades: {
    facilidades: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Amortizacion: React.FC = () => {
  const [date_final, set_date_final] = useState('');
  const [periodicidad, set_periodicidad] = useState('');
  const [tasa_usura, set_tasa_usura] = useState(0);
  const [tasa_diaria, set_tasa_diaria] = useState(0);
  const [modal, set_modal] = useState(false);
  const { deudores } = useSelector((state: RootStateDeudor) => state.deudores);
  const { facilidades } = useSelector((state: RootStateFacilidad) => state.facilidades);
  const [num_periodicidad, set_num_periodicidad] = useState(deudores.periodicidad);
  const [num_cuota, set_num_cuota] = useState(deudores.cuotas);

  const valor_abono_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(parseFloat(deudores.valor_abonado))

  const agregar_meses = (fecha: Date, meses: number) => {
    return new Date(fecha.setMonth(fecha.getMonth() + meses))
  }

  useEffect(() => {
    const tasa = tasa_usura / 365;
    set_tasa_diaria(tasa);
  }, [tasa_usura])

  useEffect(() => {
    const meses = num_periodicidad * num_cuota;
    const arr_fecha_abono = deudores.fecha_abono.split('-');
    const fecha_abono = new Date(parseInt(arr_fecha_abono[0]), (parseInt(arr_fecha_abono[1]) - 1), parseInt(arr_fecha_abono[2]))
    const fecha_final = agregar_meses(fecha_abono, meses)
    set_date_final(dayjs(fecha_final).format('DD/MM/YYYY'))
  }, [deudores, num_cuota, num_periodicidad])

  console.log(date_final)
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
                  value={''.concat(deudores.nombre_deudor)}
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
                  value={`${facilidades}`}
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
          {
            deudores.periodicidad !== undefined ? (
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
                      disabled
                      label="Valor del Abono"
                      size="small"
                      fullWidth
                      value={`${valor_abono_cop}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled
                      label="% Abono"
                      size="small"
                      fullWidth
                      value={`${deudores.porcentaje_abonado}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Fecha Pago Abono"
                      size="small"
                      fullWidth
                      value={`${dayjs(deudores.fecha_abono).format('DD/MM/YYYY')}`}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Periodicidad</InputLabel>
                      <Select
                        label="Periodicidad"
                        name='periodicidad'
                        defaultValue={
                          deudores.periodicidad.toString() === '1' ?
                          '1' : deudores.periodicidad.toString() === '3' ?
                          '3' : deudores.periodicidad.toString() === '6' ?
                          '6' : deudores.periodicidad.toString() === '12' ?
                          '12' : deudores.periodicidad.toString()
                        }
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
                      defaultValue={`${deudores.cuotas}`}
                      onChange={(event: event) => {
                        const { value } = event.target
                        set_num_cuota(parseInt(value))
                      }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Fecha Final de Pago"
                      size="small"
                      fullWidth
                      value={`${date_final}`}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : null
          }
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
                void get_datos_amortizacion(deudores.id, dayjs(date_final).format('YYYY-MM-DD'))
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
