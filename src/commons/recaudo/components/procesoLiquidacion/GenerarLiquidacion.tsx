import { Button, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import type { Deudor, Expediente, FormLiquidacion } from "../../interfaces/liquidacion";
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { api } from "../../../../api/axios";

interface IProps {
  total_obligacion: number;
  form_liquidacion: FormLiquidacion;
  handle_input_form_liquidacion_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void;
  handle_submit_liquidacion: () => void;
}

const periodos = [
  { id: 0, nombre: 'enero' },
  { id: 1, nombre: 'febrero' },
  { id: 2, nombre: 'marzo' },
  { id: 3, nombre: 'abril' },
  { id: 4, nombre: 'mayo' },
  { id: 5, nombre: 'junio' },
  { id: 6, nombre: 'julio' },
  { id: 7, nombre: 'agosto' },
  { id: 8, nombre: 'septiembre' },
  { id: 9, nombre: 'octubre' },
  { id: 10, nombre: 'noviembre' },
  { id: 11, nombre: 'diciembre' }
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GenerarLiquidacion: React.FC<IProps> = ({
  total_obligacion, form_liquidacion,
  handle_input_form_liquidacion_change,
  handle_select_form_liquidacion_change,
  handle_submit_liquidacion
}: IProps) => {
  const [deudores, set_deudores] = useState<Deudor[]>([]);
  const [expedientes, set_expedientes] = useState<Expediente[]>([]);

  useEffect(() => {
    api.get('recaudo/liquidaciones/deudores/')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api.get('recaudo/liquidaciones/expedientes')
      .then((response) => {
        set_expedientes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Selecciona deudor</InputLabel>
            <Select
              label='Selecciona deudor'
              name="cod_deudor"
              value={form_liquidacion.cod_deudor}
              MenuProps={{
                style: {
                  maxHeight: 224,
                  maxWidth: 124
                }
              }}
              onChange={handle_select_form_liquidacion_change}
            >
              {deudores.map((deudor) => (
                <MenuItem key={deudor.id} value={deudor.id}>
                  {`${deudor.nombres} ${deudor.apellidos}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Selecciona expediente</InputLabel>
            <Select
              label='Selecciona expediente'
              name="cod_expediente"
              value={form_liquidacion.cod_expediente}
              MenuProps={{
                style: {
                  maxHeight: 224,
                }
              }}
              onChange={handle_select_form_liquidacion_change}
            >
              {expedientes.map((expediente) => (
                <MenuItem key={expediente.id} value={expediente.id}>
                  {expediente.cod_expediente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            helperText='Ingrese fecha de liquidación'
            size="small"
            fullWidth
            name="fecha_liquidacion"
            value={form_liquidacion.fecha_liquidacion}
            onChange={handle_input_form_liquidacion_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            helperText='Ingrese vencimiento'
            size="small"
            fullWidth
            name="vencimiento"
            value={form_liquidacion.vencimiento}
            onChange={handle_input_form_liquidacion_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Selecciona periodo</InputLabel>
            <Select
              label='Selecciona periodo'
              name="periodo_liquidacion"
              value={form_liquidacion.periodo_liquidacion}
              MenuProps={{
                style: {
                  maxHeight: 224,
                }
              }}
              onChange={handle_select_form_liquidacion_change}
            >
              {periodos.map((periodo) => (
                <MenuItem key={periodo.id} value={periodo.nombre}>
                  {periodo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          py: '20px'
        }}
      >
        <Typography color='black' variant="h4">Total de la obligacion</Typography>
        <Typography color='green' variant="h4" sx={{ textAlign: 'center' }}>${total_obligacion}</Typography>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          py: '20px'
        }}
      >
        <Grid xs={12} sm={3}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
            onClick={handle_submit_liquidacion}
          >
            Guardar nueva liquidación
          </Button>
        </Grid>
      </Stack>
    </>
  )
}
