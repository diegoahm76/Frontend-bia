import { Button, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import type { Deudor, Expediente, FormLiquidacion } from "../../interfaces/liquidacion";
import { useEffect, useState } from 'react';
import axios from "axios";

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
    axios.get('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/deudores/')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/expedientes')
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
              onChange={handle_select_form_liquidacion_change}
            >
              {deudores.map((deudor) => (
                <MenuItem key={deudor.codigo} value={deudor.codigo}>
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
              onChange={handle_select_form_liquidacion_change}
            >
              {expedientes.map((expediente) => (
                <MenuItem key={expediente.id} value={expediente.id}>
                  {expediente.codigo_expediente}
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
          pb: '10px'
        }}
      >
        <Typography color='#00ACFF'>Total de la obligacion</Typography>
        <Typography variant="h4">${total_obligacion}</Typography>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
      >
        <Button
          color="success"
          variant="contained"
          onClick={handle_submit_liquidacion}
        >
          Guardar
        </Button>
      </Stack>
    </>
  )
}
